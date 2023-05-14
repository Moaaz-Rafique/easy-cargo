import React from 'react';
import './About.css'
// import Footer from '../Footer';

export default function About() {
  return (
    <>
    <div className='parent-container'>
    <h1 className='about'>ABOUT US</h1>
    <div className='imgg'>
    <img src='images/aboutsus.png' alt='aboutus'/>
    </div>

   <div className='para'> 
   <p> 
   Aenean rutrum, nibh ut condimentum varius, metus metus volutpat nulla, id hendrerit lorem lectus vel dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur ut ultricies elit. Duis gravida tortor in nulla aliquam, ornare ultricies odio accumsan. Suspendisse potenti. Maecenas aliquam tortor id augue sodales vulputate. Fusce varius lacus id maximus interdum. Nam vehicula dignissim magna ut cursus. Nam id cursus mi
   </p>

   </div>
   </div>
   </>

  
  );
}

