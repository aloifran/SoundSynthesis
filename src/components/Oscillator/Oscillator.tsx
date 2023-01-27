import * as Tone from "tone";
import { useState, useEffect, useRef } from "react";
import { Slider, Switch, FormControlLabel, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface OscProps {
    // an oscillator ref passed as a prop from App
    oscillatorRef: React.MutableRefObject<Tone.Oscillator>;
    filterType?: BiquadFilterType;
    showPartials?: boolean;
    showFrequency?: boolean;
}

export function Oscillator(props: OscProps) {
    // useRef to track values instead of useState, so they don't trigger a re-render
    const osc = props.oscillatorRef.current;
    let oscFrequency = useRef(440).current;
    let oscPartialsCount = useRef(0).current;
    // const filt = new Tone.Filter("1000", props.filterType).toDestination();
    // osc.connect(filt);

    console.log("RENDER", "PARTIALS:", oscPartialsCount);

    //! State is only used to trigger a re-render for the comps that need re render, like slider and count
    //! Why it works for slider and not for partials count?
    const [sliderFreq, setSliderFreq] = useState<number>(oscFrequency);
    const [partialsCount, setPartialsCount] = useState<number>(0);
    // const [filterFreq, setFilterFreq] = useState<number>(1000);

    const toggle = () => {
        osc.state === "stopped" ? osc.start() : osc.stop();
        console.log("state:", osc.state, "| freq:", osc.frequency.value);
    };

    const updateOscFreq = (e: Event, value: number) => {
        oscFrequency = value;
        osc.frequency.value = oscFrequency;
        setSliderFreq(oscFrequency);
    };

    const addPartial = () => {
        if (osc.partialCount >= 0 && osc.partialCount < 10) {
            osc.partialCount++;
            setPartialsCount(osc.partialCount);
            console.log("ADDED PARTIAL TO OSC");
        }
    };

    const removePartial = () => {
        if (osc.partialCount > 0) {
            osc.partialCount--;
            setPartialsCount(osc.partialCount);
            console.log("REMOVED PARTIAL FROM OSC");
        }
    };

    return (
        <div>
            <FormControlLabel
                label="ON/OFF"
                labelPlacement="start"
                control={<Switch onChange={toggle} />}
            />

            {/* OSC FREQUENCY */}
            {props.showFrequency && (
                <>
                    <p>Frequency: {sliderFreq} Hz</p>
                    <Slider
                        size="small"
                        min={15}
                        max={1500}
                        onChange={(e, value) =>
                            updateOscFreq(e, value as number)
                        }
                        value={sliderFreq}
                    />
                </>
            )}

            {/* FILTER FREQUENCY */}
            {/* {props.filterType && (
                <>
                    <p>Filter frequency: {filterFreq} Hz</p>
                    <Slider
                        size="small"
                        min={0}
                        max={2000}
                        value={filterFreq}
                        onChange={(e, value) => setFilterFreq(value as number)}
                    />
                </>
            )} */}

            {props.showPartials && (
                <>
                    <p>Partials/Harmonics</p>
                    <Button variant="outlined" onClick={removePartial}>
                        <RemoveIcon />
                    </Button>
                    <Button variant="outlined" onClick={addPartial}>
                        <AddIcon />
                    </Button>
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
