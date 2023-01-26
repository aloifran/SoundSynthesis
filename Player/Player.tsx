import * as Tone from "tone";
import { useRef } from "react";
import { Container } from "@mui/material";
import { Oscillator } from "../src/components/Oscillator/Oscillator";

//* This comp has: oscillator, controls, visualizer
//* Oscillator is the only sound source, so it's created here

interface PlayerProps {
    type: Tone.ToneOscillatorType;
}

export function Player(props: PlayerProps) {
    const osc = useRef<Tone.Oscillator>(new Tone.Oscillator().toDestination());

    return (
        <Container maxWidth="sm">
            <Oscillator type={props.type} oscillatorRef={osc} />
        </Container>
    );
}
