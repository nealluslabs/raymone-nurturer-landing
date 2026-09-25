/*
 * Lightweight "persistence" for Signal Card without a backend: the full assessment
 * state is encoded into the URL's query string, so a link can be shared or bookmarked
 * and reopening it reproduces the exact same result -- no database, no accounts.
 * Scoped down from full backend/persistence (see beta-demo-plan.md gap #4) on purpose:
 * this solves "can I share/save this result" without inventing server infrastructure
 * this project doesn't have.
 */

export function encodeStateToSearch({ symptoms, bite, occ, countyIdx, duration }) {
  const params = new URLSearchParams()
  if (symptoms.length) params.set('s', symptoms.join('-'))
  params.set('b', bite)
  params.set('o', occ)
  params.set('c', String(countyIdx))
  params.set('d', duration)
  return params.toString()
}

export function decodeStateFromSearch(search, validSymptomKeys) {
  const params = new URLSearchParams(search)
  if (!params.has('c')) return null // no shared state in the URL, use defaults

  const s = params.get('s')
  const symptoms = s ? s.split('-').filter((k) => validSymptomKeys.includes(k)) : []
  const bite = params.get('b') === 'yes' ? 'yes' : 'no'
  const occ = params.get('o') === 'no' ? 'no' : 'yes'
  const countyIdx = Math.max(0, Math.min(3, parseInt(params.get('c'), 10) || 0))
  const durationRaw = params.get('d')
  const duration = ['short', 'mid', 'long'].includes(durationRaw) ? durationRaw : 'long'

  return { symptoms, bite, occ, countyIdx, duration }
}
