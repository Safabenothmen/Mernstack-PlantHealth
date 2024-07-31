import { NavLink, Outlet } from 'react-router-dom'

import "./topbar.css"
import Contact from '../../Section/Contact/Contact'
import { HashLink as Link } from 'react-router-hash-link';
import About from '../../Section/About/About';
import logo from "../../../Assets/v.png";



export default function Topbar() {

  return (
    <>
    
    <div className="container-fluid bg-white " >
    {/* <div className="logo">
  <img src={logo} alt="logo" />
  <h1 className="logo-text">
 VAGROK FARMER</h1> 
</div> */}
<div><h1 className="titre">VAGROK FARMER</h1></div>
 
      
      <div className="site-menu">
        <ul className="menueffect">
          <li>
            <Link to="/Home" > Acceuil  </Link>
          </li>
          <li>
            <Link to="/About" > À propos de nous  </Link>
          </li>
          <li className="dropdown">
          <Link to="/Services" > Services ▾ </Link>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="agricultural-products.html">
                  Agricultural Products
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="organic-products.html">
                  Organic Products
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="organic-fresh-vegetables.html">
                  Organic Fresh Vegetables
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="organic-fresh-fruits.html">
                  Organic Fresh Fruits
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="fertilizer-production.html">
                  Fertilizer Production
                </a>
              </li>
            </ul>
          </li>
          {/* <li>
            <a href="products.html">Produit</a>
          </li> */}
          <li>
            <a href="gallery.html">Gallerie</a>
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
    
  
      
      </>
  

    );


}
