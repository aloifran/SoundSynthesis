import * as Tone from "tone";
import { useRef } from "react";
import { Container } from "@mui/material";
import { Oscillator } from "../Oscillator/Oscillator";

//* This comp has: oscillator and visualizer
//* Oscillator is the only sound source, so it's created here

interface PlayerProps {
    type: Tone.ToneOscillatorType;
    partials?: boolean;
}

export function Player(props: PlayerProps) {
    const osc = useRef<Tone.Oscillator>(new Tone.Oscillator().toDestination());

    return (
        <Container maxWidth="sm">
            {/* waveform visuals here */}
            <Oscillator
                oscillatorRef={osc}
                type={props.type}
                partials={props.partials}
            />
        </Container>
    );
}
