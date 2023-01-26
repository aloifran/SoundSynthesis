import * as Tone from "tone";
import { useState, useEffect } from "react";
import { Slider, Switch, FormControlLabel, Button } from "@mui/material";

interface OscProps {
    // an oscillator ref passed as a prop from App
    oscillatorRef: React.MutableRefObject<Tone.Oscillator>;
    type: Tone.ToneOscillatorType;
    showPartials?: boolean;
    showFrequency?: boolean;
}

export function Oscillator(props: OscProps) {
    const osc = props.oscillatorRef.current;
    osc.type = props.type;

    const [frequency, setFrequency] = useState<number>(440);
    const [partialsCount, setPartialsCount] = useState<number>(0);
    // const [amplitude, setAmplitude] = useState<number>(0.5);

    useEffect(() => {
        // Set values from state to osc ref
        osc.partialCount = partialsCount;
        osc.frequency.value = frequency;
    }, [partialsCount, frequency]);

    const toggle = () => {
        osc.state === "stopped" ? osc.start() : osc.stop();
        console.log(osc.state);
    };

    // const setOscAmp = (e: Event, value: number) => {
    //     setAmplitude(value);
    //     // how to change amplitude?
    //     // osc.frequency.value = frequency;
    // };

    const addPartial = () => {
        if (partialsCount >= 0 && partialsCount < 10) {
            setPartialsCount(partialsCount + 1);
            console.log("ADD PARTIAL");
        }
    };

    const removePartial = () => {
        if (partialsCount > 0) {
            setPartialsCount(partialsCount - 1);
            console.log("REMOVE PARTIAL");
        }
    };

    return (
        <div>
            <FormControlLabel
                label="ON/OFF"
                labelPlacement="start"
                control={<Switch onChange={toggle} />}
            />

            {props.showFrequency && (
                <>
                    <p>Frequency: {frequency} Hz</p>
                    <Slider
                        size="small"
                        min={100}
                        max={1000}
                        value={frequency}
                        onChange={(e, value) => setFrequency(value as number)}
                    />
                </>
            )}

            {props.showPartials && (
                <>
                    <p>Partials/Harmonics</p>
                    <Button onClick={removePartial}>-</Button>
                    <Button onClick={addPartial}>+</Button>
                    {/* <p>Partials count: {osc.partialCount}</p> */}
                    <p>Partials count: {partialsCount}</p>

                    {/* <p>Amplitude:</p>
                    <Slider
                        size="small"
                        min={0}
                        max={1}
                        step={0.01}
                        value={amplitude}
                        onChange={(e, value) => setOscAmp(e, value as number)}
                    /> */}
                </>
            )}
        </div>
    );
}
