
import 'bootstrap/dist/css/bootstrap.css';
import Swiper   from 'swiper';
import 'swiper/swiper-bundle.min.css';
import React, { useEffect }  from 'react';
import "./styles/swiper.css"
import { Link } from 'react-router-dom';


export default function EventsCarousel({ eventarray }){

      // useEffect(() => {
      //   const swiperEl = document.querySelector('swiper-container');
      //   const params = {
      //     injectStyles: [`
      //     .swiper-pagination-bullet {
      //       background: #666;
      //     }
    
      //     .swiper-pagination-bullet-active {
      //       background: #111;
      //     }
      //     `],
          
          
      //   }
        
      //   Object.assign(swiperEl, params)
    
      //   swiperEl.initialize();
      // });

    // useEffect(() => {
    //     const homeSwiper = new Swiper(".home-slider", {
    //       effect: "coverflow",
    //       grabCursor: true,
    //       centeredSlides: true,
    //       slidesPerView: 6,
    //       loop: true,
    //       coverflowEffect: {
    //           rotate: 50,
    //           stretch: 0,
    //           depth: 100,
    //           modifier: 3,
    //           slideShadows: true,
    //       },
    //       navigation: true,
    //       navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //       },
    //       pagination: true,
    //       pagination: {
    //           el: ".swiper-pagination",
    //           dynamicBullets: true,
    //       },
          
    //       autoplay: {
    //           delay: 10,
    //           disableOnInteraction: false,
    //       }
          
    //     });
    
    //     // Cleanup Swiper instance on component unmount
    //     return () => {
    //       homeSwiper.destroy();
    //     };
    //   }
    //   ); // Empty dependency array to run the effect only once on component mount
    
      return (
        <section className="home" id="home">
    
                <swiper-container id="home-slider"  className="home-slider" pagination="true" effect="coverflow" grab-cursor="true" centered-slides="true"
                slides-per-view='auto' coverflow-effect-rotate="0" coverflow-effect-stretch="0" coverflow-effect-depth="10"
                coverflow-effect-modifier="3" coverflow-effect-slide-shadows="true" pagination-clickable="true" style={{marginLeft:"3rem", marginTop:"3rem"}}>
                {eventarray.map((event, index)=>{
                  // console.log(event);
                  return (
                    <swiper-slide className="swiper-slide" key={index}>
                    <img src={event.eventPoster} />
                    <h4>{event.eventName}</h4>
                    <Link to={"./"}><span className="material-symbols-outlined">
                      info 
                    </span></Link> 
                    {/* <Link to={"./"} className='button'><button>Go here</button></Link> */}
                    </swiper-slide>
                  
                  )})}
                  </ swiper-container> 
        </section>
      );
    }
