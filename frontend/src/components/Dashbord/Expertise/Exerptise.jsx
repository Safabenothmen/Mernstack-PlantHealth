
import './expertise.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Expertise() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allevent');
      setEvents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements', error);
    }
  };
  
  const token = localStorage.getItem('token');
  const participateEvent = async (eventId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.post(`http://localhost:5000/${eventId}/participate`, null, config);
      const updatedEvents = events.map(event => {
        if (event._id === eventId) {
          return {
            ...event,
            participated: true
          };
        }
        return event;
      });
      setEvents(updatedEvents);
  
      const hasParticipated = updatedEvents.some(event => event._id === eventId && event.participated);
      if (hasParticipated) {
        // Afficher une alerte indiquant que l'utilisateur a déjà participé à l'événement
        alert('Already participated in the event');
        return;
      }
      console.log('Inscription à l\'événement réussie');
      // Mettre à jour l'état ou effectuer d'autres actions après l'inscription réussie
    } catch (error) {
      console.error('Erreur lors de la participation à l\'événement', error);
    }
  };
  
  return (
    < >
    <section id="team" className='exp' >
   
      <h5 className="section-title h1">Nos Experts</h5>
      <div className="row">
      {events.map(event => (
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="image-flip">
            <div className="mainflip flip-0">
              <div className="frontside">
                <div className="card">
                  <div className="card-body text-center">
                
                    <p>
                      <img
                        className=" img-fluid"
                        src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"
                        alt="card image"
                      
                      />
           
                    </p>
                    <h4 className="card-title">{event.nom} {event.prenom}</h4>
                    <p className="card-text">
                      {event.titre}
                    </p>
                  
                  </div>
                </div>
              </div>
              <div className="backside">
                <div className="card">
                  <div className="card-body text-center mt-4">
                    <h4 className="card-title">{event.nom} {event.prenom}</h4>
                    <p className="card-text">
              {event.description}
              <br/>
              {event.date}
                    </p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a
                          className="social-icon text-xs-center"
                          target="_blank"
                          href="https://www.fiverr.com/share/qb8D02"
                        >
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          className="social-icon text-xs-center"
                          target="_blank"
                          href="https://www.fiverr.com/share/qb8D02"
                        >
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          className="social-icon text-xs-center"
                          target="_blank"
                          href="https://www.fiverr.com/share/qb8D02"
                        >
                          <i className="fa fa-skype" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          className="social-icon text-xs-center"
                          target="_blank"
                          href="https://www.fiverr.com/share/qb8D02"
                        >
                          <i className="fa fa-google" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
       
         className="btn btn-primary btn-sm"
         onClick={() => participateEvent(event._id)}
       >
         <i className="fa fa-plus" />
       
       </a>
        </div>
       
        ))}
         
      </div>
  
  </section>
  </>

    )
}

export default Expertise