import BackgroundOverlay from "./BackgroundOverlay";
import ChatWithAI from "./ChatWithAI";



export default function Home() {
    return (
        <>
            <div className="relative">

                <ChatWithAI />
                <BackgroundOverlay/>
            </div>
        </>
    );
}