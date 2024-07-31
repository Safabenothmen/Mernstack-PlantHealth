import vd from'../../../Assets/vd2.mp4'
import Section from '../../../HOC/Section'
import './home.css'
import slide from '../../../Assets/slide2.jpg'
import About from '../About/About'
import Service from '../Services/Service'



export default function Home() {
  
  return (
    <div className='body'>
    <section className="cardSection flex">
        <div className="rightCard flex">
          <h1>Bienvenue au VAGROK FARMER  </h1>
            <p>La nature nourrit nos vies, l'agriculture cultive notre avenir</p>
            
          
      <div className="videoDiv">
            <video src={vd} autoPlay loop muted></video>
           </div>
      </div>

      </section>


   <section >
        <About/>

      </section>

      <section >
        <Service/>

      </section>  
      <section >
        <About/>

      </section> 
      <section >
        <About/>

      </section> 
      </div>

  )


}



















/*import React from 'react';

import Section from '../../../HOC/Section';
import bgImage from '../../../Assets/home_bg.jpg';
import Link from '../../UI/Link/Link';

const home = () => {
  return (
    <Section id='home'>
      <div>
        <div
          className='home-content p-5'
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className='intro container text-center text-light'>
            <h1 className='title'>WELCOME</h1>
            <h2 className='sub-title mb-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              laborum minus molestiae.
            </h2>
            <Link target='about' classes='btn btn-primary rounded-0 mr-2'>
              Learn More
            </Link>
            <Link target='contact' classes='btn btn-light text-dark rounded-0'>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default home;
*/