import React from 'react';
import footer from '../../../Assets/logo-footer.png'
import facebook from '../../../Assets/facebook.png'
import instagram from '../../../Assets/instagram2.png'
import twitter from '../../../Assets/twitter.png'
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


import top from '../../../Assets/go-top.png'
import Link from '../Link/Link';
import './footer.css'
const Footer = () => {
  return (
    <div className='bodyfo'>

   <div className="footer" >
    <div className="row">
      <div className="col-xl-3 col-lg-3">
        <div className="logo wow fadeInUp">
       
          <img src={footer} alt="Image" />
        </div>

        <div className="footer-info wow fadeInUp">
        <h1>
          <div className="flaticon-road iconpfooter" style={{ fontSize:"16px", display: "block" }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            &nbsp;&nbsp;&nbsp;Tunisie
          </div>
        </h1>
        <br />
        <br />
        <h1>
          <div className="flaticon-email iconpfooter" style={{ fontSize:"16px", display: "block"}}>
            <FiMail /> 
           
          </div>
          &nbsp;&nbsp;&nbsp;example@example.com
        </h1>
  <br />
  <br />
</div>
        <ul className="footer-social wow fadeInUp">
          <li>
            <a href="#">
              <img
                  style={{ width: "30px", height: "30px" , display: "block",
                  margin: "auto"}}

                src={facebook}
                alt="Facebook"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                 style={{ width: "20px", height: "20px",
                 margin: "auto"}}
                src={instagram}
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img  style={{ width: "30px", height: "30px" , display: "block",
                  margin: "auto"}} src={twitter} alt="Twitter" />
            </a>
          </li>
        </ul>
      </div>


      <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
        <h6 className="widget-title">nom de plateforme</h6>
        <p className="footerp">
        Notre plateforme de gestion de connaissances en agriculture a 
        été conçue pour aider les agriculteurs à réussir dans leur activité et à devenir plus autonomes. 
        </p>
        <br />
        <a href="contact-us.html" className="custom-button">
          CONTACT US
        </a>{" "}
      </div>
      <div
        className="col-lg-2 offset-xl-1 col-sm-6 wow fadeInUp"
        data-wow-delay="0.7s"
      >
        <h6 className="widget-title">Services</h6>
        <ul className="footer-menu">
          <li>
            <a href="agricultural-products.html">Service 1</a>
          </li>
          <li>
            <a href="organic-products.html"> Service 2</a>
          </li>
          <li>
            <a href="organic-fresh-vegetables.html">Service 3</a>
          </li>
          <li>
            <a href="organic-fresh-fruits.html">Service 4</a>
          </li>
          
        </ul>
      </div>
      <div className="col-lg-2 col-sm-6 wow fadeInUp" data-wow-delay="0.8s">
        <h6 className="widget-title">Quick Links</h6>
        <ul className="footer-menu">
          <li>
            <a href="about-us.html">About Us </a>
          </li>
          
          <li>
            <a href="gallery.html">Gallery</a>
          </li>
          <li>
            <a href="blog.html">Blog</a>
          </li>
          <li>
            <a href="contact-us.html">Contact</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-12 wow fadeInUp" data-wow-delay="0.9s">
        <p className="copyright">© 2023 nom de plateforme - All Rights Reserved.</p>
      </div>
    </div>
  <div id="top" style={{ cursor: "pointer" }}>
    <img width={50} height={50} src={top} alt="" />
  </div>
</div>


</div>
  );
};

export default Footer;
