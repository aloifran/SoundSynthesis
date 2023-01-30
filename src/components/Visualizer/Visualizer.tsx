import * as Tone from "tone";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { Container } from "@mui/material";

//* This component takes waveform data from a sound source and visualizes it

interface VisualizerProps {
    sourceRef: React.MutableRefObject<Tone.Oscillator>;
    waveform?: Tone.ToneOscillatorType;
}

export function Visualizer(props: VisualizerProps) {
    const source = props.sourceRef.current;
    let analyser: Tone.Analyser;

    // canvas logic using ReactP5Wrapper
    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(536, 386);

            // Create an analyser node that makes a waveform and connect to source to get data
            // for FFT
            // analyser = new Tone.Analyser("fft", 4096);
            analyser = new Tone.Analyser("waveform", 128);
            source.connect(analyser);
        };

        p5.draw = () => {
            // Ensure everything is loaded first
            if (!source || !analyser) return;

            const dim = Math.min(p5.width, p5.height);

            p5.background(25, 45, 72);
            p5.strokeWeight(dim * 0.01);
            p5.stroke(213, 232, 253);
            p5.noFill();
            const values = analyser.getValue();

            p5.beginShape();
            for (let i = 0; i < values.length; i++) {
                const amplitude = values[i];
                const x = p5.map(i, 0, values.length - 1, 0, p5.width);

                // for FFT
                // const offset = p5.map(amplitude, -100, -30, 0, 1);
                // const y = p5.height - offset * p5.height;

                const y = p5.height / 2 + +amplitude * p5.height;
                p5.vertex(x, y);
            }
            p5.endShape();
        };
    };

    return (
        <Container id="visualizer-img-container">
            {props.waveform && <img src={props.waveform + ".jpg"} />}
            <ReactP5Wrapper sketch={sketch} />
        </Container>
    );
}
