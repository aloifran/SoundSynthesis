import * as Tone from "tone";
import { useState, useEffect } from "react";
import {
    Container,
    Box,
    Slider,
    Switch,
    FormControlLabel,
} from "@mui/material";

interface OscProps {
    type: Tone.ToneOscillatorType;
    //! an oscillator ref passed as a prop from App
    oscillatorRef: React.MutableRefObject<Tone.Oscillator>;
}

export function Oscillator(props: OscProps) {
    const osc = props.oscillatorRef.current;
    const [frequency, setFrequency] = useState<number>(440);
    // const [detune, setDetune] = useState<Tone.Signal<"cents">>();

    const toggle = () => {
        osc.state === "stopped" ? osc.start() : osc.stop();
        console.log(osc.state);
    };

    // set values to the ref passed accoring to slider
    const updateOsc = (e: Event, value: number) => {
        setFrequency(value);
        osc.frequency.value = frequency;
    };

    return (
        <div>
            <FormControlLabel
                label="ON/OFF"
                labelPlacement="start"
                control={<Switch onChange={toggle} />}
            />

            {/* <Slider value={detune} onChange={setValues} /> */}
            <p>Frequency: {frequency} Hz</p>
            <Slider
                size="small"
                min={100}
                max={1000}
                value={frequency}
                onChange={(e, value) => updateOsc(e, value as number)}
            />
        </div>
    );
}
