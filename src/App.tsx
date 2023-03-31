import { Container, Divider } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { Mute } from "./components/Mute";
import { Footer } from "./components/Footer";

function App() {
    return (
        <>
            <Mute />
            <HashLink id="arrowTop" smooth to={"/#top"}>
                <ArrowUpwardIcon />
            </HashLink>

            <Header />

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
                        <br />
                        <Link
                            className="link-small"
                            target="_blank"
                            to="https://en.wikibooks.org/wiki/Sound_Synthesis_Theory/Oscillators_and_Wavetables"
                        >
                            Read more
                        </Link>
                    </p>
                </Container>
            </Container>

            <Divider id="divider" />

            <Container id="waveforms">
                <HashLink smooth to={"/#waveforms"}>
                    <h2>Waveforms</h2>
                </HashLink>

                <Container className="text">
                    <p>
                        A waveform is a visual representation of a continuous
                        tone.
                    </p>

                    <h3>Sine</h3>
                    {/* <p>
                        The sine wave can be considered the fundamental building
                        block of sound. Represents the pure tone of a single
                        frequency, which is called the fundamental.
                        <br />
                        All other sounds are composed of sine waves that occur
                        simultaneously at multiple frequencies, various
                        amplitudes and phases.
                    </p> */}
                    <Player oscillatorType="sine" />
                </Container>

                <Container className="text">
                    <h3>Sawtooth</h3>
                    {/* <p>The sawtooth wave </p> */}
                    <Player oscillatorType="sawtooth" />
                </Container>

                <Container className="text">
                    <h3>Triangle</h3>
                    {/* <p>The triangle wave </p> */}
                    <Player oscillatorType="triangle" />
                </Container>

                <Container className="text">
                    <h3>Square</h3>
                    {/* <p>The square wave </p> */}
                    <Player oscillatorType="square" />
                </Container>
            </Container>

            <Divider id="divider" />

            <Container id="amplitude">
                <HashLink smooth to={"/#amplitude"}>
                    <h2>Amplitude</h2>
                </HashLink>
                <Container className="text">
                    <p>It's the volume, or the strength of the waveform.</p>
                    <Player showVolume />
                </Container>
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
                        <br />
                        These vibrations are quieter than the original sound
                        (the fundamental frequency) and always in the shape of
                        sine waves, no matter the waveform that produced the
                        sound.
                        <br />
                        Changing the amount or volume of harmonics will change
                        the timbre of the sound.
                    </p>
                    <Player showPartials showTypes />
                </Container>
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
                        <br />
                        The most common type of envelope generator has four
                        stages:
                    </p>

                    <h4>Attack </h4>
                    <span>
                        The time taken for initial run-up of level from nil to
                        peak, beginning when the key is pressed.
                    </span>

                    <h5>Decay </h5>
                    <span>
                        The time taken for the subsequent run down from the
                        attack level to the designated sustain level.
                    </span>

                    <h5>Sustain</h5>
                    <span>
                        The level during the main sequence of the sound's
                        duration, until the key is released.
                    </span>

                    <h5>Release</h5>
                    <span>
                        The time taken for the level to decay from the sustain
                        level to zero after the key is released
                    </span>
                    <br />
                    <Link
                        className="link-small"
                        target="_blank"
                        to="https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope"
                    >
                        Read more
                    </Link>
                    <Player showEnvelope hideFrequency />
                </Container>
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
            <Footer />
        </>
    );
}

export default App;
