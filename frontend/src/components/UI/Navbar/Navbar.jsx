import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Outlet } from 'react-router-dom'
import Home from '../../Section/Home/Home'
import Service from '../../Section/Services/Service'
import "./navbar.css"
import Contact from '../../Section/Contact/Contact'
import { HashLink as Link } from 'react-router-hash-link';
import About from '../../Section/About/About';
import Login from'../../Section/Login/Login';
import Signup from '../../Section/Signup/Signup';
import logo from "../../../Assets/v.png";


export default function Navbar() {




  return (
    <>
    
      
  <div className="container-fluid bg-white " >
  {/* <div className="logo">
  {/* <img src={logo} alt="logo" /> }
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
          <Link to="/About" > À propos de nous </Link>
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
        
        <li>
          <a href="gallery.html">Galerie</a>
        </li>
        <li>
          <a href="blog.html">Blog</a>
        </li>
        <li>
          <a href="contact-us.html">Contact</a>
        </li>
      </ul>
    </div>
    <div className="hamburger-menu">
      <span /> <span /> <span />
    </div>
    <div className="navbar-button">
      <Link to="/login">
        <i className="flaticon-headphones iconp" />

        <span className="callp"> Login </span>{" "}
        
      </Link>
   
      <Link to="/signup">
        <i className="flaticon-headphones iconp" />
        

        <span className="callp"> S'inscrire </span>{" "}
      </Link>
    </div>
    
   
  </div>
  
 
    
    </>
  
    );


}


{/* 
export default function Navbar() {

  const currentPath = window.location.hash;
  const navbarLinks = document.querySelectorAll('.navbar-link');
  navbarLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  return (
    <>
            <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-300 fixed w-full top-0 left-0 z-50" >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                        
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                       

                    <Link  smooth to="#home" > Home </Link>
                    <Link smooth to="#about"> About </Link>
                     <Link smooth to="#service">Services</Link>
                     <Link smooth to="#contact"> Contact </Link>
                     
                  
                     <Link smooth to="/Login"> Login </Link>
                     
                     
  <Link to="/signup">Signup</Link>
                
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                
                <Link smooth to="#home"> Home </Link>
                    <Link smooth to="#about"> About </Link>
                     <Link smooth to="#service">Services</Link>
                     <Link smooth to="#contact"> Contact </Link>      
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="ml-3">
                    </div>
                   
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <NavLink>
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                      </NavLink>
                      

                    ))}
                    <NavLink
                      to={userNavigation[0].to}
                     className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                             )}
                        activeClassName='bg-gray-900 text-white'>
                                            
                       {userNavigation[0].name}
                      </NavLink>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}





        </Disclosure>
        <Outlet/>

        
      </div>
      <Home/> 
      <About/> 
      <Service/> 
      <Contact/>
      
   
    
     
    </>
  )
}

*/}
