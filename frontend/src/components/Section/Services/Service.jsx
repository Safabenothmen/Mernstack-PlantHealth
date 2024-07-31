/*
export default function Service() {
    return (
        <div>

        <header className="bg-white shadow" id="service">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Services</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            Services Content
          </div>
        </main>
      </div>
    )
  
  
  }
  
  */

  import './service.css'
import Section from '../../../HOC/Section';
import { FiChevronRight } from "react-icons/fi";

import banner1 from '../../../Assets/service-banner-1.jpg';
import banner2 from '../../../Assets/service-banner-2.jpg';
import banner3 from '../../../Assets/service-banner-3.jpg';
import banner4 from '../../../Assets/service-banner-4.jpg';
import header from '../../../Assets/page-header.jpg';
import forum from '../../../Assets/forum.jpg';
import know from '../../../Assets/know.jpg';


import { HashLink as Link } from 'react-router-hash-link';


export default function Service() {

  
  return (
      
<>
<header
  className="page-header wow fadeUp" style={{backgroundImage: `url(${header})`}}
 
>
  <div className="container">
    <h2>Services</h2>
    <p style={{ display: "flex", alignItems: "center" }}>
  <Link to="/Home" style={{ color: "white" }}>Home</Link>
  <span style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
    <FiChevronRight />
    <span style={{ marginLeft: "5px" }}>Services</span>
  </span>
</p>

  </div>
</header>




<div className="serviceb-alani">
      <div className="h-yazi-ortalama h-yazi-margin-orta-3">
        <h2 className="h2-baslik-hizmetler-2 wow.fade">
        Nos services pour les agriculteurs
        </h2>
        <p
          className="h2-baslik-hizmetler-3__paragraf wow.fade animated"
          
        >
          "Nos services agricoles complets sont à votre <br/> disposition 
           pour vous aider à améliorer vos pratiques, <br/>
          à résoudre vos problèmes et à réussir dans votre activité."
        </p>
      </div>
      <div className="container">
        <div className="carousel-classes">
          <div className="swiper-wrapper">
              <div className="component-systemTabs">
                <div
                  id="tab-1"
                  data-tab-title="Agricultural Products"
                  className="tab-content current wow zoomIn animated"
                  data-wow-delay="100ms"
                  data-wow-duration="1000ms"
                >
                  <div className="cards">
                    <div
                      className="card"
                      onClick="window.location.href='agricultural-products.html'"
                    >
                      <img src={know} alt="banner1" />
                      <div className="cardContent">
                        <div className="iconserv">
                          <i className="flaticon-rye" />
                        </div>
                        <h2>service 1</h2>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* end swiper-slide */}
              <div className="component-systemTabs">
                <div
                  id="tab-2"
                  data-tab-title="Organic Products"
                  className="tab-content current wow zoomIn animated"
                  data-wow-delay="100ms"
                  data-wow-duration="1000ms"
                >
                  <div className="cards">
                    <div
                      className="card"
                      onClick="window.location.href='organic-products.html'"
                    >
                      <img src={know} alt="banner2" />
                      <div className="cardContent">
                        <div className="iconserv">
                          <i className="flaticon-farm-products" />
                        </div>
                        <h2>service 2</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="component-systemTabs">
                <div
                  id="tab-3"
                  data-tab-title="Organic Fresh Vegetables"
                  className="tab-content current wow zoomIn animated"
                  data-wow-delay="100ms"
                  data-wow-duration="1000ms"
                >
                  <div className="cards">
                    <div
                      className="card"
                      
                    >
                      <img src={know} alt="Project" />
                      <div className="cardContent">
                        <div className="iconserv">
                          <i className="flaticon-lemon" />
                        </div>
                        <h2>service 3</h2>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* end swiper-slide */}
              <div className="component-systemTabs">
                <div
                  id="tab-4"
                  data-tab-title="Organic Fresh Fruits"
                  className="tab-content current wow zoomIn animated"
                  data-wow-delay="100ms"
                  data-wow-duration="1000ms"
                >
                  <div className="cards">
                    <div
                      className="card"
                      onClick="window.location.href='organic-fresh-fruits.html'"
                    >
                      <img src={know} alt="Project" />
                      <div className="cardContent">
                        <div className="iconserv">
                          <i className="flaticon-fruit" />
                        </div>
                        <h2>service 4</h2>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
           
            {/* end swiper-slide */}
          </div>
         
        </div>
      </div>
    </div>
</>

      
    
  )


}

