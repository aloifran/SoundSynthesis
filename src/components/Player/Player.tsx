import * as Tone from "tone";
import { useState, useEffect, useRef } from "react";
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
}

export function Player(props: PlayerProps) {
    const osc = new Tone.Oscillator(440, props.oscillatorType).toDestination();
    const oscRef = useRef<Tone.Oscillator>(osc);
    osc.volume.value = -20;

    // filter is connected to the osc, so no need for a new component, the osc will be sent
    //! how to change filter props when it's connected to osc?
    const filt = new Tone.Filter(1000, props.filterType).toDestination();
    const oscFiltRef = useRef<Tone.Oscillator>(osc.connect(filt));
    const filtRef = useRef<Tone.Filter>(filt);

    const [filter, setFilter] = useState<boolean>(false);
    const [showFrequency, setShowFrequency] = useState<boolean>(true);
    const [showPartials, setShowPartials] = useState<boolean>(false);
    const [showVolume, setShowVolume] = useState<boolean>(false);

    // set default values to props cause they are optional.
    // If provided use the values from props, else use the default values
    useEffect(() => {
        if (props.filter) {
            setFilter(true);
        }
        if (props.showFrequency === false) {
            setShowFrequency(false);
        }
        if (props.showPartials) {
            setShowPartials(true);
        }
        if (props.showVolume) {
            setShowVolume(true);
        }
    }, []);

    return (
        <>
            {props.filter ? (
                // osc with filter
                <Container maxWidth="sm">
                    <Visualizer sourceRef={oscFiltRef} />
                    <Oscillator
                        oscillatorRef={oscFiltRef}
                        // filterRef={filtRef}
                        showFrequency={showFrequency}
                    />
                </Container>
            ) : (
                // basic osc
                <Container maxWidth="sm">
                    <Visualizer sourceRef={oscRef} />
                    <Oscillator
                        oscillatorRef={oscRef}
                        showPartials={showPartials}
                        showFrequency={showFrequency}
                        showVolume={showVolume}
                    />
                </Container>
            )}
        </>
    );
}
