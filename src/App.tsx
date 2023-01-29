import "./App.css";
import { Player } from "./components/Player/Player";

function App() {
    return (
        <>
            <nav>
                <h1>Sound Synthesis</h1>
                <p>
                    The process of creating sounds using synthesizers is called
                    synthesis.
                </p>
            </nav>

            <div>
                <h2>Oscillator</h2>
                <p>
                    It's the essential part of a synthesizer. It's what produces
                    sound, it generates a waveform.
                </p>
                <p>
                    A waveform is a visual representation of a continuous tone
                    that you can hear.
                </p>
                <h3>Types of waveforms:</h3>

                <h3>Sine</h3>
                <Player oscillatorType="sine" />

                <h3>Triangle</h3>
                <Player oscillatorType="triangle" />

                <h3>Sawtooth</h3>
                <Player oscillatorType="sawtooth" />

                <h3>Square</h3>
                <Player oscillatorType="square" />

                <h2>Harmonics</h2>
                <p>
                    Harmonics are vibrations that make soundwaves different from
                    one another. The timbre/colour of a tone.
                </p>
                <p>
                    These vibrations are quieter than the original sound (the
                    fundamental frequency) and always in the shape of sinewaves,
                    no matter the waveform that produced the sound.
                </p>
                <p>
                    Changing the amount or volume of harmonics will change the
                    timbre of the sound.
                </p>
                <Player showPartials showTypes />

                <h2>Filter</h2>
                <p>
                    A filter reshapes the harmonic content that comes from the
                    oscillator. It shapes the timbre/color of a tone by blocking
                    some frequencies in the waveform and letting others pass,
                    and changing harmonics from it.
                </p>

                <p>Types of filters:</p>
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

                <h2>Amplitude</h2>
                <p>It's the volume</p>
                <Player showVolume />

                <h2>Envelope</h2>
                <h3>ADSR</h3>
                <p>Attack Decay Sustain Release</p>

                <h2>LFO</h2>
                <p>Low Frequency Oscillator</p>
                <p>
                    It's a very low-pitched oscillator (usually below 20Hz, out
                    of the range of human listening) whose waveforms create
                    slow-voltage-based changes or "modulations" in certain
                    parameters of the sound source.
                </p>
                <p>
                    The LFO signal automatically oscillates the values of the
                    parameter we choose. Its controls modify how the automation
                    behaves.
                </p>
                {/* <Player showTypes lfo /> */}
            </div>
        </>
    );
}

export default App;
