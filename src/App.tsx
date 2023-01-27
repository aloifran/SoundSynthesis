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

                <p>Types of waveforms:</p>
                <h3>Sine</h3>
                <img src="sine_wave.jpg" />
                <Player oscillatorType="sine" />

                <h3>Triangle</h3>
                <img src="triangle_wave.jpg" />
                <Player oscillatorType="triangle" />

                <h3>Sawtooth</h3>
                <img src="saw_wave.jpg" />
                <Player oscillatorType="sawtooth" />

                <h3>Square</h3>
                <img src="square_wave.jpg" />
                <Player oscillatorType="square" />

                <h2>Harmonics</h2>
                <p>
                    Harmonics are vibrations that make soundwaves different from
                    one another. The timbre.
                </p>
                <Player showPartials />

                <h2>Filter</h2>
                <p>
                    A filter reshapes the harmonic content that comes from the
                    oscillator. It shapes the timbre/color of a tone by removing
                    or changing harmonics from it.
                </p>
                <p>Types of filters:</p>
                <h3>Low pass</h3>
                <p>
                    The low pass filter removes high frequencies. Makes the
                    sound darker and warmer
                </p>
                {/* <Player filter filterType="highpass" showFrequency={false} /> */}
                <h3>High pass</h3>
                <p>
                    The high pass filter removes low frequencies. Makes the
                    sound brighter and more brilliant
                </p>
                {/* <Player filter filterType="bandpass" showFrequency={false} /> */}
                <h3>Band pass</h3>
                <p>
                    The band pass filter is a combination of high and low
                    filters. Makes the sound punchy.
                </p>
                {/* <Player filter filterType="bandpass" /> */}

                <h2>Amplitude</h2>
                <p>It's the volume</p>

                <h2>Envelope</h2>
                <h3>ADSR</h3>
                <p>Attack Decay Sustain Release</p>

                <h2>LFO</h2>
                <p>Low Frequency Oscillator</p>
            </div>
        </>
    );
}

export default App;
