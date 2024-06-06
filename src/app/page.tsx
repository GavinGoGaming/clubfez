'use client';
import Image from "next/image";
import { Button, CssVarsProvider, ThemeProvider } from "@mui/joy";
import { useState, ReactNode, useMemo } from "react";
import Link from "next/link";
import { CoordinateRegion, Marker, Map } from "mapkit-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// 9 photos of https://source.unsplash.com/random/500x360?nature
const photosOne = ["https://source.unsplash.com/random/500x360?nature", "https://source.unsplash.com/random/500x360?nature", "https://source.unsplash.com/random/500x360?nature"];
const photosTwo = ["https://source.unsplash.com/random/500x360?nature", "https://source.unsplash.com/random/500x360?nature", "https://source.unsplash.com/random/500x360?nature"];
const photosThree = ["https://source.unsplash.com/random/500x360?nature", "https://source.unsplash.com/random/500x360?nature", "https://source.unsplash.com/random/500x360?nature"];

function Gap({ height = 20 }: { height?: number }) {
  return <div className="gap" style={{ height: height }} />;
}
function Centered({ children, id }: { children: ReactNode, id?: string }) {
  return <div className="section" id={id} style={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: "center", minHeight: '100%' }}>{children}</div>;
}
function SmallCentered({ children, id }: { children: ReactNode, id?: string }) {
  return <div className="section" id={id} style={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: "center", paddingTop: '10%', paddingBottom: '10%', margin: '5%' }}>{children}</div>;
}

function MapElement() {
  return (
    <div className="map">
      <iframe frameBorder="0" src="https://www.google.com/maps/embed/v1/place?q=6310+Tompkins+Way,+Culver+City,+CA+90232&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
    </div>
  );
}
function Icon({ icon }: { icon: string }) {
  return <i className={`fa-regular fa-${icon}`} style={{marginRight:'4px'}}></i>
}

export default function Home() {

  const [lbOpen, setLbOpen] = useState(false);

  function closeMenu() {
    document.querySelector('.menu')?.classList.remove('open');
  }
  function Card({ image, title, clickOpenLightbox=false }: { image: string, title: string, clickOpenLightbox?: boolean }) {
    // Image with 30px border radius with text under. Dead simple. Will have 3 in container.
    return (
      <div className="card" onClick={clickOpenLightbox?()=>{setLbOpen(true)}:undefined}>
        <img alt={title} src={image} width="250" height="180" />
        <span>{title}</span>
      </div>
    )
  }
  return (
    <>
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
      <div className="split">
        <div className="split-left mobile-only">
          <div className="image"></div>
        </div>
        <div className="split-right">
          <Centered id="title">
            <img src="/cornerpattern.png" style={{position:'absolute',top:-20,right:-20,width:'50%'}} alt="" />
            <img src="/cornerpattern.png" style={{position:'absolute',top:-20,left:-20,width:'50%',transform:'scaleX(-1)'}} alt="" />
            <span>A party celebrating</span>
            <span>the marriage of</span>
            <Gap />
            <h2>Wendy Kanako Tahara</h2>
            <h2>and</h2>
            <h2>Christopher Ward Paine</h2>
            <Gap />
            <span>Saturday, the 12th of october. 2024</span>
            <span>10:00 PM</span>
            <Gap height={40}/>
            <div className="buttons">
              <Link className="click" href="https://partiful.com/e/RFzmStNEzc6lFKf2AGdT" target="_blank" style={{width:'200px'}}>
                RSVP Here
              </Link>
            </div>
            <Gap height={30} />
            <Link href="#details" style={{cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
            <span style={{fontSize:'16px'}}>See Info</span>
            <i className="fa-solid fa-caret-down"></i>
  </Link>
          </Centered>
          <SmallCentered id="details">
            <h2>Party Details</h2>
            <Gap />
            <span style={{ textAlign: 'center' }}>Join us for a joyous celebration on</span>
            <span style={{ textAlign: 'center' }}><b>Saturday, October 12th, 2024</b>, starting 10:00 PM at<br/>the Marrakesh House (6310 Tompkins Way).</span>
            <span style={{ textAlign: 'center' }}>Dress enchanting, elegant, with beauty.</span>
            <span style={{ textAlign: 'center' }}>A private party by invitation only - 21 and over.</span>
            <span style={{ textAlign: 'center' }}>Please RSVP by September 12th to secure your spot.</span>
            <Gap height={40}/>
            <MapElement/>
          </SmallCentered>
        </div>
        <div className="split-left desktop-only">
          <div className="image"></div>
        </div>
      </div>
    </CssVarsProvider>
    <Lightbox
        open={lbOpen}
        close={() => setLbOpen(false)}
        slides={photosOne.concat(photosTwo).concat(photosThree).map((photo, index) => ({ src: photo, caption: `Photo ${index + 1}` }))}
      />
    </>
  );
}
