import * as Tone from "tone";
import { useState } from "react";
import { Slider, Switch, Button, ButtonGroup, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ControlsProps {
    // Refs to control values
    oscillator: React.MutableRefObject<Tone.Oscillator>;
    filter?: React.MutableRefObject<Tone.Filter>;
    envelope?: React.MutableRefObject<Tone.Envelope>;
    LFO?: React.MutableRefObject<Tone.LFO>;

    showPartials?: boolean;
    showFrequency?: boolean;
    showVolume?: boolean;
    showTypes?: boolean;
}

export function Controls(props: ControlsProps) {
    // Oscillator
    const osc = props.oscillator.current;

    // Filter
    let fltr: React.MutableRefObject<Tone.Filter>;
    if (props.filter) {
        fltr = props.filter;
        osc.chain(fltr.current); // for now call chain as filter is only chainable 'effect'
    }

    // Envelope
    let env: React.MutableRefObject<Tone.Envelope>;
    if (props.envelope) {
        env = props.envelope;
    }

    // LFO
    let lfo: React.MutableRefObject<Tone.LFO>;
    if (props.LFO) {
        lfo = props.LFO;
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

    const [attackSlider, setAttackSlider] = useState<number>(0.1);
    const [decaySlider, setDecaySlider] = useState<number>(0.2);
    const [sustainSlider, setSustainSlider] = useState<number>(0.3);
    const [releaseSlider, setReleaseSlider] = useState<number>(0.4);

    const [lfoFreqSlider, setLfoFreqSlider] = useState<number>(1);
    const [filterFreqSlider, setFilterFreqSlider] = useState<number>(440);
    // const [filterQSlider, setFilterQSlider] = useState<number>(40);

    const toggle = () => {
        osc.state === "stopped" ? osc.start() : osc.stop();
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

    const changeFilterFreq = (e: Event, value: number) => {
        fltr.current.frequency.value = value;
        setFilterFreqSlider(value);
    };

    const changeAttack = (e: Event, value: number) => {
        env.current.attack = value;
        setAttackSlider(value);
    };
    const changeDecay = (e: Event, value: number) => {
        env.current.decay = value;
        setDecaySlider(value);
    };
    const changeSustain = (e: Event, value: number) => {
        env.current.sustain = value;
        setSustainSlider(value);
    };
    const changeRelease = (e: Event, value: number) => {
        env.current.release = value;
        setReleaseSlider(value);
    };

    const changeLfoFreq = (e: Event, value: number) => {
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

            {/* OSCILLATOR */}
            {props.showFrequency && (
                <>
                    <span>
                        <strong>Frequency</strong> {oscFreqSlider} Hz
                    </span>

                    <Slider
                        id="slider"
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
            {props.showTypes && (
                <>
                    <span>
                        <strong>Waveform</strong>
                    </span>
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
            {props.showVolume && (
                <>
                    <span>
                        <strong>Amplitude</strong> {oscVolSlider} Hz
                    </span>

                    <Slider
                        id="slider"
                        size="small"
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
                        <strong>Harmonics</strong> {partialsCount}
                    </p>
                    <Button variant="outlined" onClick={removePartial}>
                        <RemoveIcon />
                    </Button>
                    <Button variant="outlined" onClick={addPartial}>
                        <AddIcon />
                    </Button>
                </>
            )}

            {/* FILTER */}
            {props.filter && (
                <>
                    <p>
                        <strong>Filter frequency</strong> {filterFreqSlider} Hz
                    </p>
                    <Slider
                        id="slider"
                        size="small"
                        min={0}
                        max={10000}
                        step={10}
                        value={filterFreqSlider}
                        onChange={(e, value) =>
                            changeFilterFreq(e, value as number)
                        }
                    />
                    {/* <p>Filter Quality: {filterQSlider} Hz</p>
                    <Slider
                        id="slider"
                        size="small"
                        min={0}
                        max={100}
                        value={filterQSlider}
                        onChange={(e, value) =>
                            updateFilterQ(e, value as number)
                        }
                    /> */}
                </>
            )}

            {/* ENVELOPE */}
            {props.envelope && (
                <>
                    <Stack
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <span>Attack {attackSlider}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0}
                            max={2}
                            step={0.1}
                            onChange={(e, value) =>
                                changeAttack(e, value as number)
                            }
                            value={attackSlider}
                        />
                        <span>Decay {decaySlider}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0}
                            max={2}
                            step={0.1}
                            onChange={(e, value) =>
                                changeDecay(e, value as number)
                            }
                            value={decaySlider}
                        />
                        <span>Sustain {sustainSlider}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e, value) =>
                                changeSustain(e, value as number)
                            }
                            value={sustainSlider}
                        />
                        <span>Release {releaseSlider}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0}
                            max={5}
                            step={0.1}
                            onChange={(e, value) =>
                                changeRelease(e, value as number)
                            }
                            value={releaseSlider}
                        />
                    </Stack>
                </>
            )}

            {/* LFO */}
            {props.LFO && (
                <>
                    <p>
                        <strong>LFO frequency</strong> {lfoFreqSlider} Hz
                    </p>
                    <Slider
                        id="slider"
                        size="small"
                        min={0.1}
                        max={10}
                        value={lfoFreqSlider}
                        onChange={(e, value) =>
                            changeLfoFreq(e, value as number)
                        }
                    />
                </>
            )}
        </>
    );
}
