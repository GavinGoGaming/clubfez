'use client';
import Image from "next/image";
import { Accordion, AccordionDetails, AccordionSummary, Button, CssVarsProvider, ThemeProvider } from "@mui/joy";
import { useState, ReactNode, useMemo, useEffect } from "react";
import Link from "next/link";
import { CoordinateRegion, Marker, Map } from "mapkit-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// define window as any
declare let Math: any;
declare let window: any;

function Gap({ height = 20 }: { height?: number }) {
  return <div className="gap" style={{ height: height }} />;
}
function Centered({ children, id }: { children: ReactNode, id?: string }) {
  return <div className="section" id={id} style={{ display: "flex", justifyContent: "center", flexDirection: 'column', minHeight: '100%' }}>{children}</div>;
}
function SmallCentered({ children, id }: { children: ReactNode, id?: string }) {
  return <div className="section" id={id} style={{ display: "flex", justifyContent: "center", flexDirection: 'column', paddingTop: '10px', paddingBottom: '10px', margin: '5%' }}>{children}</div>;
}
function Icon({ icon }: { icon: string }) {
  return <i className={`fa-regular fa-${icon}`} style={{ marginRight: '4px' }}></i>
}
function Detail() {
  return <div className="section-detail"></div>
}

export default function Home() {
  useEffect(()=>{
    function scrollToElement(element: HTMLElement, to:number, duration:number) {
      var start = element.scrollTop,
          change = to - start,
          currentTime = 0,
          increment = 20;
  
      var animateScroll = function(){        
          currentTime += increment;
          var val = Math.easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;
          if(currentTime < duration) {
              setTimeout(animateScroll, increment);
          }
      };
      animateScroll();
    }
    window.scrollToThing = function(element: HTMLElement) {
      let container: HTMLElement = document.querySelector('.split-right') as HTMLElement;
      scrollToElement(container, element.offsetTop-(20*document.documentElement.clientHeight/100), 100);
    }
  
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function (t: number, b: number, c: number, d: number) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
  },[]);

  const [lbOpen, setLbOpen] = useState(false);

  function closeMenu() {
    document.querySelector('.menu')?.classList.remove('open');
  }
  function Card({ image, title, clickOpenLightbox = false }: { image: string, title: string, clickOpenLightbox?: boolean }) {
    // Image with 30px border radius with text under. Dead simple. Will have 3 in container.
    return (
      <div className="card" onClick={clickOpenLightbox ? () => { setLbOpen(true) } : undefined}>
        <img alt={title} src={image} width="250" height="180" />
        <span>{title}</span>
      </div>
    )
  }
  return (
    <>
    
        <Lightbox
        open={lbOpen}
        close={() => setLbOpen(false)}
        slides={[{
          src: "/PARTY_INVITE.png",
          alt: "Mystical Ritual"
        }]}
      />
      <CssVarsProvider defaultMode="light">
        {/* <div className="menu-button" onClick={()=>{document.querySelector('.menu')?.classList.toggle('open')}}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="menu">
        <div className="menu-items">
          <Link href="#title" onClick={closeMenu}><Icon icon="home"/> Home</Link>
          <Link href="#registry" onClick={closeMenu}><Icon icon="honey-pot"/> Registry</Link>
          <Link href="#details" onClick={closeMenu}><Icon icon="memo-pad"/> Details</Link>
          <Link href="#hotels" onClick={closeMenu}><Icon icon="hotel"/> Accomodations</Link>
        </div>
      </div> */}
        <nav>
          <div className="center-horizontal">
            <div className="nbml" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
              <Button className="nav-button" onClick={()=>{
                window.location.href="/";
              }}>CURRENT</Button>
            </div>
            <img src="/CLUB FEZ NEW.png" alt="" className="pointer" />
            <div className="nbmr" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
              <Button className="nav-button" onClick={()=>{
                window.location.href="/events";
              }}>PAST</Button>
            </div>
          </div>
        </nav>
        <div className="split">
          <div className="split-left desktop-only">
            <div className="presents" style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <h2>Presents...</h2>
              <img style={{
                width: '50%'
              }} src="/PARTY_INVITE.png" onClick={()=>{setLbOpen(true)}} alt="" />
            </div>
          </div>
          <div className="split-right">
            <SmallCentered id="schedule">
              <img src="/PARTY_INVITE.png" className="mobile-only party-image" alt="" />
              <Gap/>
              <h2>SCHEDULE</h2>
              <span>Club Fez presents: Mystical Ritual</span>
              <span>Saturday, October 12, 2024</span>
              <span>A private party, by invitation only, 21 and over</span>
              <span>Dress: enchanting, wild, beauty</span>
            </SmallCentered>
            <SmallCentered id="address">
              <h2>ADDRESS</h2>
              <span>Club Fez @ Marrakesh House</span>
              <span>6310 Tompkins Way</span>
              <span>Culver City, CA</span>
            </SmallCentered>
            <SmallCentered id="buttons">
              <Gap height={40} />
              <div className="buttons mobile100" style={{ justifyContent: 'space-between', width: '60%' }}>
                <Link className="click" href="https://partiful.com/e/RFzmStNEzc6lFKf2AGdT" target="_blank" style={{ width: '200px' }}>
                  RSVP Here
                </Link>
                <Link href="#" onClick={()=>{
                  window.scrollToThing(document.getElementById('details'));
                }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  <span style={{ fontSize: '16px', width: '120%', textAlign: 'center' }}>MORE DETAILS</span>
                  <i className="fa-solid fa-caret-down"></i>
                </Link>
              </div>
              <Gap height={40} />
            </SmallCentered>
            <Detail />
            <SmallCentered id="details">
              <h2>F A Q</h2>
              <span><b className="faq-question">When is the RSVP deadline?</b></span>
              <span>Please RSVP online by September 12th so we have an accurate headcount.</span>
              <br />

              <span><b className="faq-question">Can I bring a date?</b></span>
              <span>We love everyone but have limited space availability and is by invite only. Please check with us if questions.</span>
              <br />

              <span><b className="faq-question">Is this a wedding?</b></span>
              <span>Yes, it’s the culmination party of our wedding day.  It happens immediately after our family ceremony at Marrakesh House. It’s when the reception opens up and transforms into the Club Fez many of you know from our theme parties. Call up your creativity and get ready to dance at “Mystical Ritual.”</span>
              <br />

              <span><b className="faq-question">Do I need to have a ticket?</b></span>
              <span>No tickets for this party but you need to be on the RSVP list. No at-door entries.</span>
              <br />

              <span><b className="faq-question">Can I bring kids or teenagers?</b></span>
              <span>This is a 21 and over only.</span>
              <br />

              <span><b className="faq-question">How should I get there?</b></span>
              <span>Rideshare to our home (the venue) is highly recommended. We have arranged a shuttle for those parking on Jefferson Boulevard (about 500 yards down the hill from our house). The shuttle will run from 9PM to 11PM from the roundabout at the entrance to Baldwin Hills Scenic Overlook State Park. This is just at start of Hetzler Road off of Jefferson Blvd and it will make return trips to the house. Please, no parking at the house, on Tompkins Way, or on Hetzler Road.</span>
              <br />

              <span><b className="faq-question">What will the weather be like?</b></span>
              <span>Usually in the 60s at night but please check weather for Culver City before heading over. Definitely bring a warm coat.</span>
              <br />

              <span><b className="faq-question">What should I wear?</b></span>
              <span>Club Fez events are always costume parties, and the theme for this one "Mystical Ritual" (to go with our wedding) is designed to be anything that you like that feels enchanting, elegant or an expression of your wild beauty. Feel free to be creative. We want you to be comfortable too so find a good balance that suits you.</span>
              <br />

              <span><b className="faq-question">Do you have costume ideas to consider?</b></span>
              <span>The vibe is a little bit boho, art deco, & art nouveau mixed with mystical and mythical creatures & beings. Be creative & colorful with your costume ideas and have fun! For more ideas, please check out our <a href="https://fb.me/1Pohcuh3pDDR3zk">Club Fez mystical ritual Facebook page</a>.</span>
              <br />

              <span><b className="faq-question">What's the venue like?</b></span>
              <span>Marrakesh House is an eco-friendly remodel of a mid-century modern home showcasing art and renewable energy on a hillside in Culver City. It is also a home for our four year old son Everett, chickens and plants so please go enjoy the venue with respect.</span>
              <br />

              <span><b className="faq-question">Is Club Fez indoors or outdoors?</b></span>
              <span>Most of this party will be outdoors, but portions of the house will also be open.</span>
              <br />

              <span><b className="faq-question">If I'm coming in from out of town, where should I stay?</b></span>
              <span>Please see the travel section of this website for more information.</span>
              <br />

              <span><b className="faq-question">Photos</b></span>
              <span>Photography is welcome but please ask people for permission if you don't know them. And please post photos after the party here <a href="https://fb.me/1Pohcuh3pDDR3zk">https://fb.me/1Pohcuh3pDDR3zk</a> so we can get them up on our Club Fez site. Thanks!</span>
              <br />

              <span><b className="faq-question">What kind of shoes should/shouldn't I wear?</b></span>
              <span>Wear something comfortable so your feet will be happy on the dance floor or lounging around a campfire.</span>
              <br />

              <span><b className="faq-question">What time will the party end?</b></span>
              <span>We never really know but music curfew is around 2am.</span>
              <br />

              <span><b className="faq-question">Is there a gifts registry?</b></span>
              <span>If you want to offer a wedding gift to Chris and Wendy check out the <a href="https://www.hitchd.com/wendyandchris" target="_blank">wedding registry</a> (three donation ideas). Thanks</span>
              <br />

              <span><b className="faq-question">Will the party be live streamed?</b></span>
              <span>There may be a live stream laptop for friends that can't attend in person. It will be well marked.</span>
              <br />

              <span><b className="faq-question">Can I help with the party?</b></span>
              <span>Yes! Volunteers are always very welcome and needed to put these parties together. Please contact Christian Colquhoun <a href="mailto:achristocat@gmail.com">achristocat@gmail.com</a> who's offered to manage Club Fez for the night. Thank you Christian! When you're here looking out for each other and the house is always appreciated too.</span>
              <br />

              <span><b className="faq-question">Will there be food and drinks?</b></span>
              <span>Dessert delicacies and an open bar with non-alcoholic choice as well. Please party responsibly.</span>
              <br />

              <span><b className="faq-question">What should I bring?</b></span>
              <span>Bring your own cup (to help us reduce waste), towels (if you want to jump in spa/pool), warm coat (it can get chilly), your best self.</span>
              <br />

              <span><b className="faq-question">Pets</b></span>
              <span>We love animals but no pets at this event.</span>
              <br />

              <span><b className="faq-question">Whom should I contact with questions?</b></span>
              <span>Please email us at <a href="mailto:chris@papercutfilms.com">chris@papercutfilms.com</a>, <a href="mailto:wktahara@gmail.com">wktahara@gmail.com</a> or Christian (see above).</span>
              <br />

            </SmallCentered>
            <Detail />
            {/* Travel */}
            <SmallCentered id="travel">
              <h2>TRAVEL</h2>
              <span>We recommend flying into Los Angeles International Airport (LAX).</span>
              <br/>
              <span>For those of you coming in from out of town, we recommend staying at</span>
              <span>The Culver Hotel, located about a mile away from our house. The hotel offered our guests a 15% off group discount code (CAT15) when they make reservations online.</span>
              <span>The Culver celebrates it's 100th year this September and is located adjacent to a new walking plaza “The Culver Steps" with coffee and bagel shops, cafes, restaurants, and a grocery store in the midst of downtown Culver City.  </span>
              <span><a href="https://www.culverhotel.com/">https://www.culverhotel.com/</a></span>
              <br/>
              <span>An additional option is The Pali Hotel, which is located a few steps away from The Culver Hotel.</span>
              <span><a href="https://www.palisociety.com/hotels/culver-city">https://www.palisociety.com/hotels/culver-city</a></span>
              <br/>
              <span>There are many other Airbnbs and hotels options located close by as well.</span>
            </SmallCentered>
          </div>
        </div>
      </CssVarsProvider>
    </>
  );
}
