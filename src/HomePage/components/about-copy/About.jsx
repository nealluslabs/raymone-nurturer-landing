import React from 'react'
import './about.css'
import mobileAndWeb from '../../../images/oil-gas.jpg'
import {AiOutlineArrowRight} from 'react-icons/ai'
//import { useNavigate } from 'react-router-dom'

const DummyAbout = () => {


//const navigate= useNavigate()


  return (

    <>


    <section id='about' >

    <p style={{fontSize:"2.8rem",fontWeight:"700",color:"#000",paddingBottom:"1rem",paddingLeft:"0.8rem",paddingRight:"0.8rem",borderBottom:"1px solid #40255F",width:"max-content",margin:"0 auto",marginBottom:"2rem",marginTop:"3rem"}}> The Solution{/*<span className="text-accent">  get the Job! </span>*/}</p>
    <div className="container-hp about__container" style ={{marginTop:"2rem",}}>
       


    {<div className='aboutCTA1'>
        <div className='CTAboximg1-wrapper'>
            <img className='CTAboximg1' src={mobileAndWeb} alt="search image"/>
        </div>
        </div>}
       

      <div className="aboutExplainer">
      <h1 style={{fontWeight:"600",color:"#000",fontSize:"2.2rem"}}> Every Shipment is Strategic{/*<span className="text-accent">  get the Job! </span>*/}</h1>

         <p style={{fontSize:"1.1rem"}}>
         Stand out by showing you deliver more than products—you deliver reliability. Every shipment is about your customer's needs, not just your logistics. Provide AI-powered tracking updates, proactive delivery insights, and meaningful check-ins that build trust from purchase to arrival.
        </p>

       {/*<div className = "about-btn-placement" >
        <button   onClick={()=>{navigate('/login')}} className="btn ">
           Get Started 
         </button>

         <p  onClick={()=>{navigate('/dashboard/home')}} className="btn-invisible" >See How It Works</p>
     </div>*/}


      </div>
     
     {/*<div className='aboutCTA'>
    
       <img  className='CTAbox' src={countPennies} alt="counting coins"/>
     

     <div className='clip-path-bottom-right'></div>
     <div className='clip-path-bottom-left'></div>
     <div className='clip-path-top-left'></div>
</div>*/}  



      

   
   
</div>

    </section>


</>
  )
}

export default DummyAbout