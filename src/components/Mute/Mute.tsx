import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import * as Tone from "tone";
import { useState } from "react";

export function Mute() {
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const toggleSound = () => {
        setIsMuted(!isMuted);
        Tone.Destination.mute = !isMuted;
    };

    return (
        <div id="mute">
            {isMuted ? (
                <VolumeOffIcon onClick={toggleSound} />
            ) : (
                <VolumeUpIcon onClick={toggleSound} />
            )}
        </div>
    );
}
