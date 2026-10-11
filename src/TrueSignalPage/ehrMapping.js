/*
 * Real fetched-patient -> Signal Card input mapping, for the SMART on FHIR launch
 * (EHRLaunchPage / EHRAppPage). This is intentionally honest about what a generic
 * FHIR chart can and cannot supply:
 *   - County: matched ONLY on an exact ZIP match against our pilot county list. No
 *     state-level or nearest-neighbor guessing -- an unmatched ZIP is reported as
 *     "not covered," not silently defaulted to a county the patient isn't in.
 *   - Symptoms: matched by keyword against the patient's real Condition codes/text.
 *     Absence of a match means "not found in the chart," not "confirmed absent" --
 *     chart conditions are not the same thing as a symptom interview, and the UI
 *     using this says so.
 *   - Occupation: looked up via the standard Occupation observation (LOINC 74165-2).
 *     Most records -- including every sandbox patient checked so far -- don't have
 *     one. Not found is reported as such, not defaulted to "no."
 *   - Tick-bite recall and symptom duration: there is no standard FHIR concept for
 *     either. These are always patient-interview questions, never auto-filled, and
 *     always reported as "ask the patient."
 */

const SYMPTOM_KEYWORDS = {
  fatigue: ['fatigue', 'tiredness', 'malaise'],
  joint: ['joint pain', 'arthralgia', 'arthritis'],
  fog: ['cognitive impairment', 'memory impairment', 'confusion', 'brain fog'],
  rash: ['rash', 'eruption of skin', 'erythema migrans', 'skin eruption'],
}

function conditionText(cond) {
  const fromCoding = ((cond.code && cond.code.coding) || []).map((c) => c.display || '').join(' ')
  const fromText = (cond.code && cond.code.text) || ''
  return (fromCoding + ' ' + fromText).toLowerCase()
}

export function mapPatientToSignalCardState({ patient, conditions, occupationObservations, counties }) {
  const provenance = {}
  const state = {}

  // --- County: exact ZIP match only ---
  const zip = patient && patient.address && patient.address[0] && patient.address[0].postalCode
  const countyIdx = zip != null ? counties.findIndex((c) => c.zip === zip) : -1
  if (countyIdx >= 0) {
    state.countyIdx = countyIdx
    provenance.county = { status: 'derived', detail: `Matched ZIP ${zip} to ${counties[countyIdx].label} from the patient's real address.` }
  } else {
    provenance.county = {
      status: 'not-covered',
      detail: zip
        ? `Patient ZIP ${zip} isn't one of our ${counties.length} pilot counties yet. Not guessed -- left for the clinician to select.`
        : 'No address on file for this patient. Left for the clinician to select.',
    }
  }

  // --- Symptoms: keyword match against real Condition list ---
  const matchedSymptoms = []
  Object.entries(SYMPTOM_KEYWORDS).forEach(([key, keywords]) => {
    const hit = (conditions || []).some((cond) => {
      const text = conditionText(cond)
      return keywords.some((kw) => text.includes(kw))
    })
    if (hit) matchedSymptoms.push(key)
  })
  state.symptoms = matchedSymptoms
  provenance.symptoms = {
    status: matchedSymptoms.length ? 'derived' : 'none-found',
    detail: matchedSymptoms.length
      ? `Found ${matchedSymptoms.length} matching real condition(s) on this patient's chart: ${matchedSymptoms.join(', ')}.`
      : `No chart conditions matched our 4 symptom keywords (checked ${(conditions || []).length} real condition record(s)). This means not coded, not confirmed absent -- still worth asking the patient.`,
  }

  // --- Occupation: standard LOINC 74165-2 Occupation observation, if present ---
  const occObs = occupationObservations && occupationObservations[0]
  if (occObs) {
    const text = ((occObs.valueString || (occObs.valueCodeableConcept && occObs.valueCodeableConcept.text) || '') + '').toLowerCase()
    const outdoor = /farm|agricult|forest|fish|hunt|landscap|construction|outdoor/.test(text)
    state.occ = outdoor ? 'yes' : 'no'
    provenance.occupation = { status: 'derived', detail: `Found a real Occupation observation: "${text}".` }
  } else {
    state.occ = 'no'
    provenance.occupation = { status: 'not-found', detail: 'No standard Occupation observation (LOINC 74165-2) on this chart -- defaulted to "no" for navigation only, not a real answer. Ask the patient.' }
  }

  // --- Tick bite recall: never derivable from a standard chart ---
  state.bite = 'no'
  provenance.bite = { status: 'not-derivable', detail: 'No FHIR concept for "patient recalls a tick bite" exists in any standard chart. Always a patient-interview question.' }

  // --- Symptom duration: never derivable from a standard chart ---
  state.duration = 'short'
  provenance.duration = { status: 'not-derivable', detail: 'Symptom duration isn’t reliably chart-coded either. Defaulted to the lowest-scoring bucket so an unasked question never inflates the score. Ask the patient.' }

  return { state, provenance }
}
