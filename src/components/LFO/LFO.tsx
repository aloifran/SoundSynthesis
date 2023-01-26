import * as Tone from "tone";

//* An oscillator with an LFO

export function LFO() {
    const lfo = new Tone.LFO("240", 400, 4000);

    const toggle = () => {
        lfo.state === "stopped" ? lfo.start() : lfo.stop();
    };

    return (
        <div>
            <button onClick={toggle}>ON/OFF</button>
        </div>
    );
}
