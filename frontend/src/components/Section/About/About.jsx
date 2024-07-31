import './about.css'
import Section from '../../../HOC/Section'
import aboutImage from '../../../Assets/aboutbg.png';
import nature from "../../../Assets/natura-about.png";


export default function About() {
  return (
    <div class="container">
      <div class="row">
      <div class="col-md-4 galeri1">
        <img class="imagerotate catr" src={aboutImage} alt="" />
      </div>
      <div className="col-md-4 galeri2">
      <img src={nature} alt="Natura About"/>
      </div>

      

      <div class="col-md-8 us">
        <h2 class="about-title "> À propos de nous </h2>
        <p class="paragraf">
        Notre plateforme est conçue pour vous aider à résoudre les défis que vous rencontrez dans votre activité agricole, 
        en vous offrant un accès facile à des informations précises et fiables.
     
        </p>
        <p class="paragraf">
        Nos membres ont également accès à un forum en ligne où ils peuvent poser des questions et échanger avec des experts de l'industrie. 
       
        </p>
        <p class="paragraf">
        Notre plateforme contient également une bibliothèque de connaissances comprenant des articles, des guides, des vidéos, des podcasts et 
        des webinaires pour vous aider à améliorer vos compétences et à rester informé des dernières tendances de l'industrie.
        </p>
      </div>
    </div>
  </div>
  

  )


}



  
    {/*   <div>

      <Section  id="about">
      <div className='container pt-2 pb-15'>
        <div className='section-header pt-10 pb-7 text-center'>
          <h1 className='section-title '>
            <span> Notre </span> Plateforme
            
          </h1>
          <h6 className='section-subtitle mr-auto ml-auto'>
            
          </h6>
        </div>
       
      </div>
      </Section>

      
  </div>  */}

