import { Button } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function Navbar({ }: {}) {
    const router = useRouter();
    return (
        <nav>
            <div className="center-horizontal">
                <div className="nbml" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button className="nav-button" onClick={() => {
                        router.push('/current');
                    }}>CURRENT</Button>
                </div>
                <img src="/CLUB FEZ NEW.png" alt="" className="pointer" onClick={() => {
                        router.push('/');
                    }} />
                <div className="nbmr" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button className="nav-button" onClick={() => {
                        router.push('/events');
                    }}>PAST</Button>
                </div>
            </div>
        </nav>
    )
}