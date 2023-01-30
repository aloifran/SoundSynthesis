import * as Tone from "tone";
import { useState } from "react";
import { Slider, Switch, Button, ButtonGroup, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface OscProps {
    // Refs to control values of each
    oscillatorRef: React.MutableRefObject<Tone.Oscillator>;
    filterRef?: React.MutableRefObject<Tone.Filter>;
    lfoRef?: React.MutableRefObject<Tone.LFO>;
    showPartials?: boolean;
    showFrequency?: boolean;
    showVolume?: boolean;
    showTypes?: boolean;
}

export function Oscillator(props: OscProps) {
    // useRef to change values and don't trigger a re-render
    const osc = props.oscillatorRef.current;

    let filt: React.MutableRefObject<Tone.Filter>;
    //! this is run each time a re-render happens. It should only run once
    if (props.filterRef) {
        filt = props.filterRef;
        osc.chain(filt.current); // for now call chain as filter is only chainable 'effect'

        console.log("FILTER connected | type:", filt.current.type);
    }

    let lfo: React.MutableRefObject<Tone.LFO>;
    if (props.lfoRef) {
        lfo = props.lfoRef;

        console.log("LFO connected | type:", lfo.current.type);
    }

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

    // set a number for optional cases cause this happens before initialization
    const [lfoFreqSlider, setLfoFreqSlider] = useState<number>(1);
    const [filterFreqSlider, setFilterFreqSlider] = useState<number>(440);
    // const [filterQSlider, setFilterQSlider] = useState<number>(40);

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

    const updateFilterFreq = (e: Event, value: number) => {
        filt.current.frequency.value = value;
        setFilterFreqSlider(value);
    };

    const updateLfoFreq = (e: Event, value: number) => {
        lfo.current.frequency.value = value;
        setLfoFreqSlider(value);
    };

    // const updateFilterQ = (e: Event, value: number) => {
    //     filt.current.Q.value = value;
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
        <>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
            >
                <p>Off</p>
                <Switch onChange={toggle} />
                <p>On</p>
            </Stack>

            {/* OSC CONTROLS */}
            {props.showTypes && (
                <>
                    <p>
                        <strong>Waveform</strong>
                    </p>
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
                    <p>
                        <strong>Frequency</strong> {oscFreqSlider} Hz
                    </p>

                    <Slider
                        id="slider"
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
                    <p>
                        <strong>Amplitude</strong> {oscVolSlider} Hz
                    </p>

                    <Slider
                        id="slider"
                        min={-50}
                        max={10}
                        onChange={(e, value) =>
                            changeOscVol(e, value as number)
                        }
                        value={oscVolSlider}
                    />
                </>
            )}
            {props.showPartials && (
                <>
                    <p>
                        <strong>Harmonics</strong>
                    </p>
                    <Button variant="outlined" onClick={removePartial}>
                        <RemoveIcon />
                    </Button>
                    <Button variant="outlined" onClick={addPartial}>
                        <AddIcon />
                    </Button>
                    <p>
                        <strong>Amount</strong> {partialsCount}
                    </p>
                </>
            )}

            {/* FILTER CONTROLS */}
            {props.filterRef && (
                <>
                    <p>
                        <strong>Filter frequency</strong> {filterFreqSlider} Hz
                    </p>
                    <Slider
                        id="slider"
                        min={0}
                        max={10000}
                        step={10}
                        value={filterFreqSlider}
                        onChange={(e, value) =>
                            updateFilterFreq(e, value as number)
                        }
                    />
                    {/* <p>Filter Quality: {filterQSlider} Hz</p>
                    <Slider
                        id="slider"
                        min={0}
                        max={100}
                        value={filterQSlider}
                        onChange={(e, value) =>
                            updateFilterQ(e, value as number)
                        }
                    /> */}
                </>
            )}

            {/* LFO CONTROLS */}
            {props.lfoRef && (
                <>
                    <p>
                        <strong>LFO frequency</strong> {lfoFreqSlider} Hz
                    </p>
                    <Slider
                        id="slider"
                        min={0.1}
                        max={10}
                        value={lfoFreqSlider}
                        onChange={(e, value) =>
                            updateLfoFreq(e, value as number)
                        }
                    />
                </>
            )}
        </>
    );
}
