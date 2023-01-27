import * as Tone from "tone";
import { useState, useEffect, useRef } from "react";
import { Container } from "@mui/material";
import { Oscillator } from "../Oscillator/Oscillator";

//* This comp creates the source and visualizer

interface PlayerProps {
    oscillatorType?: Tone.ToneOscillatorType;
    filter?: boolean;
    filterType?: BiquadFilterType;
    showFrequency?: boolean;
    showPartials?: boolean;
}

export function Player(props: PlayerProps) {
    const osc = new Tone.Oscillator(
        "440",
        props.oscillatorType
    ).toDestination();
    const oscRef = useRef<Tone.Oscillator>(osc);

    // filter is connected to the osc, so no need for a new component, the osc will be sent
    //! how to change filter props when it's connected to osc?
    const filt = new Tone.Filter().toDestination();
    const oscFiltRef = useRef<Tone.Oscillator>(osc.connect(filt));

    const [filterType, setFilterType] = useState<BiquadFilterType>("allpass");
    const [filter, setFilter] = useState<boolean>(false);
    const [showFrequency, setShowFrequency] = useState<boolean>(true);
    const [showPartials, setShowPartials] = useState<boolean>(false);

    // set default values to props cause they are optional.
    // If provided use the values from props, else use the default values
    useEffect(() => {
        if (props.filter) {
            setFilter(true);
        }
        if (props.filterType) {
            setFilterType(props.filterType);
        }
        if (props.showFrequency === false) {
            setShowFrequency(false);
        }
        if (props.showPartials) {
            setShowPartials(true);
        }
    }, []);

    return (
        <>
            {props.filter ? (
                // osc with filter
                <Container maxWidth="sm">
                    {/* waveform visuals here */}
                    <Oscillator
                        oscillatorRef={oscRef}
                        filterType={filterType}
                        showFrequency={showFrequency}
                    />
                </Container>
            ) : (
                // basic osc
                <Container maxWidth="sm">
                    {/* waveform visuals here */}
                    <Oscillator
                        oscillatorRef={oscRef}
                        showPartials={showPartials}
                        showFrequency={showFrequency}
                    />
                </Container>
            )}
        </>
    );
}
