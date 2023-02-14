import * as Tone from "tone";
import { useState, useRef } from "react";
import { Slider, Switch, Button, ButtonGroup, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ADSR } from "../ADSR/ADSR";

interface ControlsProps {
    // Refs to control values
    oscillator: React.MutableRefObject<Tone.Oscillator>;
    filter: React.MutableRefObject<Tone.Filter>;
    envelope: React.MutableRefObject<Tone.AmplitudeEnvelope>;
    LFO: React.MutableRefObject<Tone.LFO>;
    showPartials?: boolean;
    showVolume?: boolean;
    showFilter?: boolean;
    showEnvelope?: boolean;
    showLFO?: boolean;
    showTypes?: boolean;
    hideFrequency?: boolean;
}

export function Controls(props: ControlsProps) {
    // Oscillator
    const osc = props.oscillator.current.toDestination();

    // Envelope (has its own oscillator)
    const env = props.envelope.current.toDestination();
    const envOsc = new Tone.Oscillator(100, "square10").connect(env);
    const envRef = useRef<Tone.AmplitudeEnvelope>(env);

    // Filter
    const fltr = props.filter.current;
    if (props.showFilter) {
        osc.chain(fltr); // for now call chain as filter is only chainable 'effect'
    }

    // LFO
    const lfo = props.LFO.current;

    // useState to re-render some vars
    const [oscFreq, setOscFreq] = useState<number>(
        osc.frequency.value as number
    );
    const [oscVol, setOscVol] = useState<number>(osc.volume.value as number);
    const [partialsCount, setPartialsCount] = useState<number>(
        osc.partialCount
    );
    const [partials, setPartials] = useState<Array<number>>([]);

    const [attack, setAttack] = useState<number>(env.attack as number);
    const [decay, setDecay] = useState<number>(env.decay as number);
    const [sustain, setSustain] = useState<number>(env.sustain as number);
    const [release, setRelease] = useState<number>(env.release as number);

    const [lfoFreq, setLfoFreq] = useState<number>(1);
    const [filterFreq, setFilterFreq] = useState<number>(440);
    // const [filterQSlider, setFilterQSlider] = useState<number>(40);

    const toggle = () => {
        osc.state === "stopped" ? osc.start() : osc.stop();
    };

    const triggerAttack = () => {
        if (envOsc.state === "stopped") {
            envOsc.start();
        }
        env.triggerAttack();
    };

    const triggerRelease = () => {
        env.triggerRelease();
    };

    const changeOscFreq = (e: Event, value: number) => {
        osc.frequency.value = value;
        setOscFreq(value);
    };

    const changeOscVol = (e: Event, value: number) => {
        osc.volume.value = value;
        setOscVol(value);
    };

    const changeOscType = (type: Tone.ToneOscillatorType) => {
        partialsCount === 0
            ? (osc.type = type)
            : (osc.type = (type + partialsCount) as Tone.ToneOscillatorType);
    };

    const changeFilterFreq = (e: Event, value: number) => {
        fltr.frequency.value = value;
        setFilterFreq(value);
    };

    const changeAttack = (e: Event, value: number) => {
        env.attack = value;
        setAttack(value);
    };
    const changeDecay = (e: Event, value: number) => {
        env.decay = value;
        setDecay(value);
    };
    const changeSustain = (e: Event, value: number) => {
        env.sustain = value;
        setSustain(value);
    };
    const changeRelease = (e: Event, value: number) => {
        env.release = value;
        setRelease(value);
    };

    const changeLfoFreq = (e: Event, value: number) => {
        lfo.frequency.value = value;
        setLfoFreq(value);
    };

    // const updateFilterQ = (e: Event, value: number) => {
    //     filt.current.Q.value = value;
    //     setFilterQSlider(value);
    // };

    const getEven = (): number => {
        const n = Math.floor(Math.random() * 20);
        return n % 2 === 0 && n != 0 ? n : getEven();
    };

    const getOdd = (): number => {
        const n = Math.floor(Math.random() * 20);
        return n % 2 === 1 && n != 0 ? n : getOdd();
    };

    // when working, unite them
    const addEvenPartial = () => {
        if (osc.partialCount >= 0 && osc.partialCount < 32) {
            const partialN = getEven();
            osc.partials = [...partials, partialN];
            setPartials([...partials, partialN]);
            console.log(osc.partials, osc.partialCount);
            // show even partials count
        }
    };

    const addOddPartial = () => {
        if (osc.partialCount >= 0 && osc.partialCount < 32) {
            const partialN = getOdd();
            setPartials([...partials, partialN]);
            osc.partials = [...partials, partialN];
            console.log(osc.partials, osc.partialCount);
        }
        // show odd partials count
    };

    const addPartial = () => {
        if (osc.partialCount >= 0 && osc.partialCount < 32) {
            osc.partialCount++;
            setPartialsCount(osc.partialCount);
            console.log(osc.partials, osc.partialCount);
        }
    };

    const removePartial = () => {
        if (osc.partialCount > 0) {
            osc.partialCount--;
            setPartialsCount(osc.partialCount);
            console.log(osc.partials, osc.partialCount);
        }
    };

    return (
        <>
            {props.showEnvelope ? (
                <p>
                    <Button
                        variant="outlined"
                        color="warning"
                        onMouseDown={triggerAttack}
                        onMouseUp={triggerRelease}
                        onMouseLeave={triggerRelease}
                    >
                        Play
                    </Button>
                </p>
            ) : (
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
            )}

            {/* OSCILLATOR */}
            {props.hideFrequency && (
                <>
                    <span>
                        <strong>Frequency</strong> {oscFreq} Hz
                    </span>

                    <Slider
                        id="slider"
                        size="small"
                        min={15}
                        max={1500}
                        onChange={(e, value) =>
                            changeOscFreq(e, value as number)
                        }
                        value={oscFreq}
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
                        <strong>Amplitude</strong> {oscVol} Hz
                    </span>

                    <Slider
                        id="slider"
                        size="small"
                        min={-50}
                        max={10}
                        onChange={(e, value) =>
                            changeOscVol(e, value as number)
                        }
                        value={oscVol}
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

                    <Button variant="outlined" onClick={addEvenPartial}>
                        even
                    </Button>
                    <Button variant="outlined" onClick={addOddPartial}>
                        odd
                    </Button>
                </>
            )}

            {/* FILTER */}
            {props.showFilter && (
                <>
                    <p>
                        <strong>Filter frequency</strong> {filterFreq} Hz
                    </p>
                    <Slider
                        id="slider"
                        size="small"
                        min={0}
                        max={10000}
                        step={10}
                        value={filterFreq}
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
            {props.showEnvelope && (
                <>
                    <ADSR envelope={envRef} />
                    <Stack
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <span>Attack {attack}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0.01}
                            max={2}
                            step={0.01}
                            onChange={(e, value) =>
                                changeAttack(e, value as number)
                            }
                            value={attack}
                        />
                        <span>Decay {decay}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0.01}
                            max={2}
                            step={0.01}
                            onChange={(e, value) =>
                                changeDecay(e, value as number)
                            }
                            value={decay}
                        />
                        <span>Sustain {sustain}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0.01}
                            max={1}
                            step={0.01}
                            onChange={(e, value) =>
                                changeSustain(e, value as number)
                            }
                            value={sustain}
                        />
                        <span>Release {release}</span>
                        <Slider
                            size="small"
                            id="slider"
                            min={0.01}
                            max={3}
                            step={0.01}
                            onChange={(e, value) =>
                                changeRelease(e, value as number)
                            }
                            value={release}
                        />
                    </Stack>
                </>
            )}

            {/* LFO */}
            {props.showLFO && (
                <>
                    <p>
                        <strong>LFO frequency</strong> {lfoFreq} Hz
                    </p>
                    <Slider
                        id="slider"
                        size="small"
                        min={0.1}
                        max={10}
                        value={lfoFreq}
                        onChange={(e, value) =>
                            changeLfoFreq(e, value as number)
                        }
                    />
                </>
            )}
        </>
    );
}
