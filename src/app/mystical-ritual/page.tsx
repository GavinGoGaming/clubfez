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
    useEffect(() => {
        function scrollToElement(element: HTMLElement, to: number, duration: number) {
            var start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20;

            var animateScroll = function () {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val;
                if (currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        }
        window.scrollToThing = function (element: HTMLElement) {
            let container: HTMLElement = document.querySelector('.split-right') as HTMLElement;
            scrollToElement(container, element.offsetTop - (20 * document.documentElement.clientHeight / 100), 100);
        }

        //t = current time
        //b = start value
        //c = change in value
        //d = duration
        Math.easeInOutQuad = function (t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    }, []);

    const [lbOpen, setLbOpen] = useState(-1);

    const images = [
        1,2,3,4,5,6,7,8,9,10,11,12
    ];
    const imageList = images.map((_,idx)=>{return {src:`/idea${_}.jpg`, index:_, alt:`Costume Idea ${_}`}});
    return (
        <>

            <Lightbox
                open={lbOpen>-1}
                close={() => setLbOpen(-1)}
                index={lbOpen}
                slides={imageList}
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
                        <div className="nbml" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Button className="nav-button" onClick={() => {
                                window.location.href = "/";
                            }}>CURRENT</Button>
                        </div>
                        <img src="/CLUB FEZ NEW.png" alt="" className="pointer" />
                        <div className="nbmr" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Button className="nav-button" onClick={() => {
                                window.location.href = "/events";
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
                            }} src="/PARTY_INVITE.png" alt="" />
                        </div>
                    </div>
                    <div className="split-right">
                        <SmallCentered id="welcome">
                            <h2>Dear Club Fezers,</h2>
                            <span>We can’t wait to see you at Club Fez’s "Mystical Ritual”  Saturday (Oct 12) at 9PM.</span><span>Here’s a quick update from a week-out with important information for you.</span>
                        </SmallCentered>
                        <SmallCentered id="details">
                            <span><b className="faq-question">ARRIVALS</b></span>
                            <span>Optimal time for arrivals is between 8:45 and 10PM. If you’re planning to come later, please email (xxxxxxxxx) so we can give your name to the gate for late arrivals.</span>
                            <br />

                            <span><b className="faq-question">RIDESHARE and PARKING</b></span>
                            <span>Ride-sharing is encouraged as always. Use 6310 Tompkins Way as your destination address and drop off when you get close to our cul-de-sac. For adventurous ride-sharers, sign up for the “Waymo” app, which now offers driverless taxi service. All-electric Jaguars, just saying. For those parking, Jefferson Boulevard usually has a lot of nighttime spots around Hetzler Road. We’ll have a shuttle running up Hetzler Road starting at 8:45PM from Jefferson Blvd. Look for the van making rounds at the entrance to Baldwin Hills Scenic Overlook State Park. The shuttle will run till Midnight. Please use crosswalks when crossing Jefferson Blvd.</span>
                            <br />

                            <span><b className="faq-question">WEATHER</b></span>
                            <span>Culver City forecast for the event is in the low 60°’s at night, so bring something warm. The party is mostly outdoors with adjoining indoor spaces. We’ll have fire cauldrons and aerial heat lamps in the courtyard.</span>
                            <br />

                            <span><b className="faq-question">SHOES</b></span>
                            <span>Avoid shoes that have issues with outside surfaces (gravel, DG) and that like our dance floor. Chris will be wearing sneakers.</span>
                            <br />

                            <span><b className="faq-question">DRESS CODE</b></span>
                            <span>Our costume suggestion is "wild, enchanted beauty," so how you want to interpret that is up to you. Could be something out of *A Midsummer Night’s Dream* or something you might wear to a bohemian-themed wedding. Check the FAQ on clubfez.com home page for a link to a costume inspiration page (on FB).</span>
                            <br />

                            <span><b className="faq-question">COAT CHECK</b></span>
                            <span>Coat check will be open until 10PM, at which point it will switch to self-serve. We aren’t responsible for valuables, so keep those with you.</span>
                            <br />

                            <span><b className="faq-question">ALL-VOLUNTEER PARTY</b></span>
                            <span>Club Fez is an all-volunteer (well, almost) event, so please do your part. Take care of each other and the space, pick up and clean up when you can see it would improve the vibe, and use the recycle, compost, or trash bins.</span>
                            <br />

                            <span><b className="faq-question">USHERS ARE YOUR FRIENDS</b></span>
                            <span>Ushers and Volunteers are wearing gold ribbons and/or boutonnières. Please follow their guidance and look to them if you have concerns, questions, or can help. (Please don’t ask Chris and Wendy.) The interior of the house opens at 9PM. Your program will have a map with locations of restrooms.</span>
                            <br />

                            <span><b className="faq-question">RESIDENTIAL NEIGHBORHOOD</b></span>
                            <span>We share our cul-de-sac with our neighbors. Please be mindful of our neighbors and after 10PM keep voices down while on Thompkins Way.</span>
                            <br />

                            <span><b className="faq-question">PHOTOGRAPHY</b></span>
                            <span>You are welcome to take photos, but please don’t post to public social media without permission. We want to create a safe space for everyone.</span>
                            <br />

                            <span><b className="faq-question">BAR</b></span>
                            <span>Yes. Bring your own cup as always (especially for those of you who’ve been here before).</span>
                            <br />

                            <span><b className="faq-question">SWIMMING/JACUZZI</b></span>
                            <span>Yes. Bring your own towel. The pool plaster can be rough, so you might consider water sandals if you’ll be in for a long time. There is no lifeguard, so please be careful. Please, no diving or jumping unless you are very familiar with the pool.</span>
                            <br />

                            <span><b className="faq-question">DANCING</b></span>
                            <span>Yes. The Club Fez dance floor returns.</span>
                            <br />

                            <span><b className="faq-question">MUNCHIES</b></span>
                            <span>Rumors of grilled cheese.</span>
                            <br />

                            <span><b className="faq-question">DESSERT</b></span>
                            <span>Rumors of cupcakes.</span>
                            <br />

                            <span><b className="faq-question">SUNRISE WALK TO THE OVERLOOK</b></span>
                            <span>It’s been known to happen.</span>
                            <br />

                            <span><b className="faq-question">LAST WORDS</b></span>
                            <span>Respect the venue and each other, party wisely, and thank you for celebrating with us!</span>
                            <br />

                            <span><b className="faq-question" style={{color:'#ff5858'}}>xox Wendy and Chris</b></span>
                            <br />
                        </SmallCentered>
                        <SmallCentered id="costumes">
                            <h2>Costume Ideas</h2>
                            <span>Click through this gallery to inspire you on the theme of enchanting, elegant, and wild beauty.</span>
                            <Gap height={20} />
                            <div className="cosume-ideas-images">
                                {images.map((image, idx) => (
                                    <div onClick={()=>{
                                        setLbOpen(idx);
                                    }} className="idea-image" style={{backgroundImage:`url("/idea${image}.jpg")`}}></div>
                                ))}
                            </div>
                        </SmallCentered> 
                    </div>
                </div>
            </CssVarsProvider>
        </>
    );
}
