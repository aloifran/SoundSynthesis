import * as Tone from "tone";
import { useState, useEffect, useRef } from "react";
import { Container } from "@mui/material";
import { Oscillator } from "../Oscillator/Oscillator";

//* This comp has: oscillator and visualizer
//* Oscillator is the only sound source, so it's created here

interface PlayerProps {
    type?: Tone.ToneOscillatorType;
    showFrequency?: boolean;
    showPartials?: boolean;
}

export function Player(props: PlayerProps) {
    const osc = useRef<Tone.Oscillator>(new Tone.Oscillator().toDestination());

    const [type, setType] = useState<Tone.ToneOscillatorType>("sine");
    const [showFrequency, setShowFrequency] = useState<boolean>(true);
    const [showPartials, setShowPartials] = useState<boolean>(false);

    // set default values to props cause they are optional.
    // If not provided use the default values, if provided use the values from props
    useEffect(() => {
        if (props.type) {
            setType(props.type);
        }

        if (props.showFrequency === false) {
            setShowFrequency(false);
        }

        if (props.showPartials) {
            setShowPartials(true);
        }
    });

    return (
        <Container maxWidth="sm">
            {/* waveform visuals here */}
            <Oscillator
                oscillatorRef={osc}
                type={type}
                showPartials={showPartials}
                showFrequency={showFrequency}
            />
        </Container>
    );
}
