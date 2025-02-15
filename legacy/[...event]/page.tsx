'use client';
import Image from "next/image";
import { Accordion, AccordionDetails, AccordionSummary, Button, CssVarsProvider, ThemeProvider } from "@mui/joy";
import { useState, ReactNode, useMemo, useEffect } from "react";
import Link from "next/link";
import { CoordinateRegion, Marker, Map } from "mapkit-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useRouter } from "next/navigation";
import Navbar from "@/app/utils/Navbar";
import events from "@/app/utils/eventData";

// define window as any
declare let Math: any;
declare let window: any;

interface DriveImage {
    id: string;
    name: string;
    url: string;
}
interface EventResponse {
    images: DriveImage[];
    eventData: {
        driveId: string;
        name: string;
        description: string;
        poster: string;
    };
}

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

export default function Home({ params }: { params: { event: string } }) {
    const [event, setEvent] = useState<EventResponse | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images?event=' + params.event);
                const data = await res.json();
                setEvent(data);
            } catch (error: any) {
                console.error('Error fetching images:', error.message);
            }
        };

        fetchImages();
    }, []);

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
        Math.easeInOutQuad = function (t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    }, []);

    const [indexlb, setIndexlb] = useState(-1);
    return (
        <>
            <Lightbox
                open={indexlb >= 0}
                close={() => setIndexlb(-1)}
                index={indexlb}
                slides={event ? [...event.images.map((image, index) => { return { src: image.url, alt: image.name }; })] : []}
            />
            <CssVarsProvider defaultMode="light">
                <Navbar/>
                {event ? <>
                    <div className="split">
                        <div className="split-left">
                            <div className="presents" style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: 'calc(10% + 20px)'
                            }}>
                                <img style={{
                                    width: '50%'
                                }} src={event.eventData.poster} alt="" />
                            </div>
                        </div>
                        <div className="split-right">
                            <SmallCentered id="about">
                                <h2>{event.eventData.name}</h2>
                                <span>{event.eventData.description}</span>
                            </SmallCentered>
                            <Gap height={20} />
                            <SmallCentered id="images">
                                <h2>Photo Gallery</h2>
                                <Gap height={20} />
                                <div className="cosume-ideas-images">
                                    {event.images.map((image, index) => {
                                        return <div onClick={()=>{
                                            setIndexlb(index);
                                        }} className="idea-image" style={{backgroundImage:`url("${image.url}")`}}></div>
                                    })}
                                </div>
                            </SmallCentered> 
                        </div>
                    </div>
                </> : <>
                    <div style={{width:'100%',height:'220px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <img src="/spinner.svg" width={200} height={200} alt="" />
                    </div>
                </>}
            </CssVarsProvider>
        </>
    );
}
