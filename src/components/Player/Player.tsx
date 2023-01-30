import * as Tone from "tone";
import { useRef } from "react";
import { Container } from "@mui/material";
import { Oscillator } from "../Oscillator/Oscillator";
import { Visualizer } from "../Visualizer/Visualizer";

//* This comp creates the source and visualizer

interface PlayerProps {
    oscillatorType?: Tone.ToneOscillatorType;
    showFilter?: boolean;
    filterType?: BiquadFilterType;
    showLFO?: boolean;
    showFrequency?: boolean;
    showPartials?: boolean;
    showVolume?: boolean;
    showTypes?: boolean;
}

export function Player(props: PlayerProps) {
    Tone.Destination.volume.value = -12;

    // Oscillator
    const osc = new Tone.Oscillator(376, props.oscillatorType).toDestination();
    osc.volume.value = -12;
    const oscRef = useRef<Tone.Oscillator>(osc);

    // Filter
    const filt = new Tone.Filter(500, props.filterType, -96).toDestination();
    const filtRef = useRef<Tone.Filter>(filt);

    // LFO
    //! define what the LFO affects at the moment of initialization or later? to set the min/max values according to the source affected
    const lfo = new Tone.LFO(1, 0, 100);
    const lfoRef = useRef<Tone.LFO>(lfo);

    return (
        <>
            <Container maxWidth="sm">
                <Visualizer
                    sourceRef={oscRef}
                    waveform={props.oscillatorType}
                />
                <Oscillator
                    oscillatorRef={oscRef}
                    filterRef={props.showFilter ? filtRef : undefined}
                    lfoRef={props.showLFO ? lfoRef : undefined}
                    showPartials={props.showPartials || false}
                    showFrequency={props.showFrequency || true}
                    showVolume={props.showVolume || false}
                    showTypes={props.showTypes || false}
                />
            </Container>
        </>
    );
}
