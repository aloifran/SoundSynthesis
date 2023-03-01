import "./App.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Player } from "./components/Player/Player";
import { Mute } from "./components/Mute/Mute";
import { Container, Divider, List, ListItem } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GitHubIcon from "@mui/icons-material/GitHub";

function App() {
    return (
        <>
            <Mute />
            <HashLink id="arrowTop" smooth to={"/#top"}>
                <ArrowUpwardIcon />
            </HashLink>
            <nav>
                <h1>What's Sound Synthesis?</h1>
                <p>
                    It's the process of generating sound using electronic
                    instruments called synthesizers.{" "}
                    <Link
                        className="link-small"
                        target="_blank"
                        to="https://en.wikibooks.org/wiki/Sound_Synthesis_Theory/Introduction"
                    >
                        Read more
                    </Link>
                </p>
                <p>The following topics are covered in this site:</p>

                <List sx={{ display: "flex" }}>
                    <ListItem id="li">
                        <HashLink smooth to={"/#oscillator"}>
                            Oscillator
                        </HashLink>
                    </ListItem>
                    <ListItem id="li">
                        <HashLink smooth to={"/#amplitude"}>
                            Amplitude
                        </HashLink>
                    </ListItem>
                    <ListItem id="li">
                        <HashLink smooth to={"/#harmonics"}>
                            Harmonics
                        </HashLink>
                    </ListItem>
                    <ListItem id="li">
                        <HashLink smooth to={"/#filter"}>
                            Filter
                        </HashLink>
                    </ListItem>
                    <ListItem id="li">
                        <HashLink smooth to={"/#envelope"}>
                            Envelope
                        </HashLink>
                    </ListItem>
                    <ListItem id="li">
                        <HashLink smooth to={"/#lfo"}>
                            LFO
                        </HashLink>
                    </ListItem>
                </List>
            </nav>

            <Divider id="divider-top" />

            <Container id="oscillator">
                <HashLink smooth to={"/#oscillator"}>
                    <h2>The Oscillator</h2>
                </HashLink>

                <Container className="text">
                    <p>
                        The essential part of a synthesizer is an oscillator
                        because it's the only sound source. It generates an
                        electrical signal by rapidly changing voltages in a
                        circuit. Those "oscillations" repeat at recurring
                        intervals and generate a <strong>waveform</strong>.
                    </p>
                    <p>
                        A waveform is a visual representation of a continuous
                        tone.{" "}
                        <Link
                            className="link-small"
                            target="_blank"
                            to="https://en.wikibooks.org/wiki/Sound_Synthesis_Theory/Oscillators_and_Wavetables"
                        >
                            Read more
                        </Link>
                    </p>
                    <h4>Type of waveforms:</h4>
                </Container>

                <h3>Sine</h3>
                <Container className="text">
                    <p>
                        The sine wave can be considered the fundamental building
                        block of sound. Represents the pure tone of a single
                        frequency, which is called the fundamental.
                    </p>
                </Container>
                <Player oscillatorType="sine" />

                <h3>Sawtooth</h3>
                <Player oscillatorType="sawtooth" />

                <h3>Triangle</h3>
                <Player oscillatorType="triangle" />

                <h3>Square</h3>
                <Player oscillatorType="square" />
            </Container>

            <Divider id="divider" />

            <Container id="amplitude">
                <HashLink smooth to={"/#amplitude"}>
                    <h2>Amplitude</h2>
                </HashLink>
                <p>It's the volume</p>
                <Player showVolume />
            </Container>

            <Divider id="divider" />

            <Container id="harmonics">
                <HashLink smooth to={"/#harmonics"}>
                    <h2>Harmonics</h2>
                </HashLink>
                <Container className="text">
                    <p>
                        Harmonics are vibrations that make soundwaves different
                        from one another. The timbre of a tone.
                    </p>
                    <p>
                        These vibrations are quieter than the original sound
                        (the fundamental frequency) and always in the shape of
                        sine waves, no matter the waveform that produced the
                        sound.
                    </p>
                    <p>
                        Changing the amount or volume of harmonics will change
                        the timbre of the sound.
                    </p>
                </Container>
                <Player showPartials showTypes />
            </Container>

            <Divider id="divider" />

            <Container id="filter">
                <HashLink smooth to={"/#filter"}>
                    <h2>Filter</h2>
                </HashLink>

                <Container className="text">
                    <p>
                        A filter reshapes the harmonic content that comes from
                        the oscillator. It shapes the timbre/color of a tone by
                        blocking some frequencies in the waveform and letting
                        others pass, and changing harmonics from it.
                    </p>
                </Container>

                <h4>Types of filters:</h4>

                <h3>Low pass</h3>
                <p>
                    The low pass filter removes high frequencies. Makes the
                    sound darker and warmer.
                </p>
                <Player
                    showFilter
                    filterType="lowpass"
                    showPartials
                    showTypes
                />

                <h3>High pass</h3>
                <p>
                    The high pass filter removes low frequencies. Makes the
                    sound brighter and brilliant.
                </p>
                <Player
                    showFilter
                    filterType="highpass"
                    showPartials
                    showTypes
                />

                <h3>Band pass</h3>
                <p>
                    The band pass filter is a combination of high and low
                    filters. Makes the sound punchy.
                </p>
                <Player
                    showFilter
                    filterType="bandpass"
                    showPartials
                    showTypes
                />
            </Container>

            <Divider id="divider" />

            <Container fixed id="envelope">
                <HashLink smooth to={"/#envelope"}>
                    <h2>Envelope</h2>
                </HashLink>
                <Container className="text">
                    <p>
                        Envelopes control how sounds change over time. <br />
                        <strong>Envelope generators</strong> allow users to
                        control the different stages of a sound.
                    </p>
                    <p>
                        The most common type of envelope generator has four
                        stages:
                    </p>
                    <h4>Attack</h4>
                    <p>
                        The time taken for initial run-up of level from nil to
                        peak, beginning when the key is pressed.
                    </p>
                    <h4>Decay</h4>
                    <p>
                        The time taken for the subsequent run down from the
                        attack level to the designated sustain level.
                    </p>
                    <h4>Sustain</h4>
                    <p>
                        The level during the main sequence of the sound's
                        duration, until the key is released.
                    </p>
                    <h4>Release</h4>
                    <p>
                        The time taken for the level to decay from the sustain
                        level to zero after the key is released
                    </p>
                    <Link
                        className="link-small"
                        target="_blank"
                        to="https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope"
                    >
                        Read more
                    </Link>
                </Container>

                <Player showEnvelope hideFrequency />
            </Container>

            <Divider id="divider" />

            <Container fixed id="lfo">
                <HashLink smooth to={"/#lfo"}>
                    <h2>LFO</h2>
                </HashLink>
                <p>Low Frequency Oscillator</p>
                <Container className="text">
                    <p>
                        It's a very low-pitched oscillator (usually below 20Hz,
                        out of the range of human listening) whose waveforms
                        create slow-voltage-based changes or "modulations" in
                        certain parameters of the sound source.
                    </p>
                    <p>
                        The LFO signal automatically oscillates the values of
                        the parameter we choose. Its controls modify how the
                        automation behaves.
                    </p>
                </Container>
                {/* <Player showTypes lfo /> */}
            </Container>

            <Divider id="divider" />
            <Container fixed id="footer">
                <p>
                    2023 Francisco Aloi Deheza{" "}
                    <Link
                        target="_blank"
                        to="https://github.com/aloifran/SoundSynthesis"
                    >
                        <GitHubIcon />
                    </Link>
                </p>
            </Container>
        </>
    );
}

export default App;
