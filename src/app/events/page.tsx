'use client';
import Image from "next/image";
import { Accordion, AccordionDetails, AccordionSummary, Button, CssVarsProvider, ThemeProvider } from "@mui/joy";
import { useState, ReactNode, useMemo, useEffect } from "react";
import Link from "next/link";
import { CoordinateRegion, Marker, Map } from "mapkit-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./events.css";
import { useRouter } from "next/navigation";
import Navbar from "../utils/Navbar";

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

  const router = useRouter();
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

  function swapToEventPage(id: string) {
    return () => {
      router.push(`/events/${id}`);
    };
  }

  // const [indexlb, setIndexlb] = useState(-1);
  return (
    <>
    
        {/* <Lightbox
        open={indexlb >= 0}
        close={() => setIndexlb(-1)}
        index={indexlb}
        slides={[
          {
            src: "/PARTY_INVITE.png",
            alt: "Mystical Ritual"
          },{
            src: "/poster2.png",
            alt: "Puttin' on the Ritz"
          },{
            src: "/poster3.png",
            alt: "Nordic Vinter"
          },{
            src: "/ono.jpg",
            alt: "One Night Only"
          },{
            src: "/vr_MH.png",
            alt: "Marrakesh House VR NYE 2021"
          },{
            src: "/uncharted_waters_without_date_info.png",
            alt: "Uncharted Waters NYE 2017"
          }
        ]}
      /> */}
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
        <Navbar/>
        <div className="three-posters">
            <div className="presents">
              <h2>Mystical Ritual</h2>
              <img src="/PARTY_INVITE.png" onClick={()=>{router.push('/mystical-ritual')}} />
            </div>
            <div className="presents">
              <h2>Puttin' on the Ritz</h2>
              <img src="/poster2.png" onClick={swapToEventPage("puttin-on-the-ritz")} />
            </div>
            <div className="presents">
              <h2>Nordic Vinter</h2>
              <img src="/poster3.png" onClick={swapToEventPage("nordic-vinter")} />
            </div>
            <div className="presents">
              <h2>One Night Only</h2>
              <img src="/ono.jpg" onClick={swapToEventPage("one-night-only")} />
            </div>
        </div>
        <div className="three-posters">
            <div className="presents">
              <h2>Marrakesh House VR NYE 2021</h2>
              <img src="/vr_MH.png" onClick={swapToEventPage("vr-nye-2021")} />
            </div>
            <div className="presents">
              <h2>Uncharted Waters NYE 2017</h2>
              <img src="/uncharted_waters_without_date_info.png" onClick={swapToEventPage("uncharted-waters-nye-2017")} />
            </div>
        </div>
        <div style={{
          height: '8vh',
          width: '100%'
        }}></div>
      </CssVarsProvider>
    </>
  );
}
