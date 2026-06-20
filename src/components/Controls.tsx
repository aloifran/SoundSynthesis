import { useState, useEffect } from "react";
import * as Tone from "tone";
import { Slider, Switch, Button, ButtonGroup, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ADSR } from "./ADSR";
import { useConstant } from "../hooks";

interface ControlsProps {
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
    showFrequency?: boolean;
}

export function Controls(props: ControlsProps) {
    const osc = props.oscillator.current;
    const env = props.envelope.current;
    const fltr = props.filter.current;
    const lfo = props.LFO.current;

    // The envelope is driven by its own dedicated oscillator
    const envOscRef = useConstant(() => new Tone.Oscillator(100, "square10"));
    const envOsc = envOscRef.current;

    // Wire the audio graph once on mount
    useEffect(() => {
        osc.toDestination();
        env.toDestination();
        envOsc.connect(env);
        if (props.showFilter) {
            osc.chain(fltr); // filter is the only chainable 'effect' for now
        }

        return () => {
            envOsc.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useState to re-render some vars
    const [oscFreq, setOscFreq] = useState<number>(
        osc.frequency.value as number
    );
    const [oscVol, setOscVol] = useState<number>(osc.volume.value as number);
    const [partialsCount, setPartialsCount] = useState<number>(
        osc.partialCount
    );
    const [attack, setAttack] = useState<number>(env.attack as number);
    const [decay, setDecay] = useState<number>(env.decay as number);
    const [sustain, setSustain] = useState<number>(env.sustain as number);
    const [release, setRelease] = useState<number>(env.release as number);
    const [lfoFreq, setLfoFreq] = useState<number>(1);
    const [filterFreq, setFilterFreq] = useState<number>(440);

    const toggle = async () => {
        await Tone.start();
        osc.state === "stopped" ? osc.start() : osc.stop();
    };

    const triggerAttack = async () => {
        await Tone.start();
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
            {props.showFrequency && (
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
                </>
            )}

            {/* ENVELOPE */}
            {props.showEnvelope && (
                <>
                    <ADSR envelope={props.envelope} />
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
