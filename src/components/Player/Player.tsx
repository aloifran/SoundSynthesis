import * as Tone from "tone";
import { useRef } from "react";
import { Container } from "@mui/material";
import { Oscillator } from "../Oscillator/Oscillator";
import { Visualizer } from "../Visualizer/Visualizer";

//* This comp creates the source and visualizer

interface PlayerProps {
    oscillatorType?: Tone.ToneOscillatorType;
    filter?: boolean;
    filterType?: BiquadFilterType;
    showFrequency?: boolean;
    showPartials?: boolean;
    showVolume?: boolean;
    showTypes?: boolean;
}

export function Player(props: PlayerProps) {
    Tone.Destination.volume.value = -15;
    const osc = new Tone.Oscillator(440, props.oscillatorType).toDestination();
    osc.volume.value = -8;
    const oscRef = useRef<Tone.Oscillator>(osc);

    // filter is connected to the osc, so no need for a new component, the osc will be sent
    const filt = new Tone.Filter(1000, props.filterType).toDestination();
    const oscFiltRef = useRef<Tone.Oscillator>(osc.connect(filt));
    const filtRef = useRef<Tone.Filter>(filt);

    return (
        <>
            {props.filter ? (
                // osc with filter
                <Container maxWidth="sm">
                    <Visualizer sourceRef={oscFiltRef} />
                    <Oscillator
                        oscillatorRef={oscFiltRef}
                        // filterRef={filtRef}
                        showFrequency={props.showFrequency || true}
                    />
                </Container>
            ) : (
                // basic osc
                <Container maxWidth="sm">
                    <Visualizer
                        sourceRef={oscRef}
                        waveform={props.oscillatorType}
                    />
                    <Oscillator
                        oscillatorRef={oscRef}
                        showPartials={props.showPartials || false}
                        showFrequency={props.showFrequency || true}
                        showVolume={props.showVolume || false}
                        showTypes={props.showTypes || false}
                    />
                </Container>
            )}
        </>
    );
}
