import * as Tone from "tone";
import { useState } from "react";
import {
    Slider,
    Switch,
    FormControlLabel,
    Button,
    ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface OscProps {
    oscillatorRef: React.MutableRefObject<Tone.Oscillator>; // an oscillator ref
    // should be optional, but I have to solve the problem when it's not sent
    // filterRef: React.MutableRefObject<Tone.Filter>; // a filter ref
    showPartials?: boolean;
    showFrequency?: boolean;
    showVolume?: boolean;
    showTypes?: boolean;
}

export function Oscillator(props: OscProps) {
    // useRef to track osc values so updates don't trigger a re-render
    const osc = props.oscillatorRef.current;
    // const filt = props.filterRef.current;

    // let filt: React.MutableRefObject<Tone.Filter>;
    // if (props.filterRef) {
    // }

    // useState to trigger a re-render for the comps that need it
    const [oscFreqSlider, setOscFreqSlider] = useState<number>(
        osc.frequency.value as number
    );
    const [oscVolSlider, setOscVolSlider] = useState<number>(
        osc.volume.value as number
    );
    const [partialsCount, setPartialsCount] = useState<number>(
        osc.partialCount
    );
    // const [filterFreqSlider, setFilterFreqSlider] = useState<number>(
    //     filt.frequency.value as number
    // );
    // const [filterQSlider, setFilterQSlider] = useState<number>(
    //     filt.Q.value as number
    // );

    const toggle = () => {
        osc.state === "stopped" ? osc.start() : osc.stop();
        console.log(
            "type:",
            osc.type,
            "| state:",
            osc.state,
            "| freq:",
            osc.frequency.value,
            "| vol:",
            osc.volume.value,
            "| partials:",
            osc.partialCount
        );
    };

    const changeOscFreq = (e: Event, value: number) => {
        osc.frequency.value = value;
        setOscFreqSlider(value);
    };

    const changeOscVol = (e: Event, value: number) => {
        osc.volume.value = value;
        setOscVolSlider(value);
    };

    const changeOscType = (type: Tone.ToneOscillatorType) => {
        partialsCount === 0
            ? (osc.type = type)
            : (osc.type = (type + partialsCount) as Tone.ToneOscillatorType);
    };

    // const updateFilterFreq = (e: Event, value: number) => {
    //     filt.frequency.value = value;
    //     setFilterFreqSlider(value);
    // };

    // const updateFilterQ = (e: Event, value: number) => {
    //     filt.Q.value = value;
    //     setFilterQSlider(value);
    // };

    const addPartial = () => {
        if (osc.partialCount >= 0 && osc.partialCount < 32) {
            osc.partialCount++;
            setPartialsCount(osc.partialCount);
        }
    };

    const removePartial = () => {
        if (osc.partialCount > 0) {
            osc.partialCount--;
            setPartialsCount(osc.partialCount);
        }
    };

    return (
        <div>
            <FormControlLabel
                label="ON/OFF"
                labelPlacement="start"
                control={<Switch onChange={toggle} />}
            />

            {/* OSC PROPS */}
            {props.showTypes && (
                <>
                    <p>Waveform:</p>
                    <ButtonGroup variant="text">
                        <Button onClick={() => changeOscType("sine")}>
                            Sine
                        </Button>
                        <Button onClick={() => changeOscType("triangle")}>
                            Triangle
                        </Button>
                        <Button onClick={() => changeOscType("sawtooth")}>
                            Sawtooth
                        </Button>
                        <Button onClick={() => changeOscType("square")}>
                            Square
                        </Button>
                    </ButtonGroup>
                </>
            )}
            {props.showFrequency && (
                <>
                    <p>Frequency: {oscFreqSlider} Hz</p>
                    <Slider
                        size="small"
                        min={15}
                        max={1500}
                        onChange={(e, value) =>
                            changeOscFreq(e, value as number)
                        }
                        value={oscFreqSlider}
                    />
                </>
            )}
            {props.showVolume && (
                <>
                    <p>Amplitude: {oscVolSlider} Hz</p>
                    <Slider
                        size="small"
                        min={-50}
                        max={20}
                        onChange={(e, value) =>
                            changeOscVol(e, value as number)
                        }
                        value={oscVolSlider}
                    />
                </>
            )}

            {/* FILTER PROPS */}
            {/* {props.filterRef && (
                <>
                    <p>Filter frequency: {filterFreqSlider} Hz</p>
                    <Slider
                        size="small"
                        min={0}
                        max={2000}
                        value={filterFreqSlider}
                        onChange={(e, value) =>
                            updateFilterFreq(e, value as number)
                        }
                    />
                    <p>Filter Quality: {filterQSlider} Hz</p>
                    <Slider
                        size="small"
                        min={0}
                        max={100}
                        value={filterQSlider}
                        onChange={(e, value) =>
                            updateFilterQ(e, value as number)
                        }
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
