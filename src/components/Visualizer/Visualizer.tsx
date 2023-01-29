import * as Tone from "tone";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { Container } from "@mui/material";

//* This component takes waveform data from a sound source and visualizes it

interface VisualizerProps {
    sourceRef: React.MutableRefObject<Tone.Oscillator>; // an oscillator ref as source
    waveform?: Tone.ToneOscillatorType;
}

export function Visualizer(props: VisualizerProps) {
    const source = props.sourceRef.current;
    let analyser: Tone.Analyser;

    // canvas logic using ReactP5Wrapper, that wraps setup and draw
    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(536, 386);

            // Create an analyser node that makes a waveform and connect to source to get data
            analyser = new Tone.Analyser("waveform", 128);
            source.connect(analyser);
        };

        // Render loop that draws shapes with p5
        p5.draw = () => {
            // Ensure everything is loaded first
            if (!source || !analyser) return;

            const dim = Math.min(p5.width, p5.height);

            p5.background(25, 45, 72);
            p5.strokeWeight(dim * 0.008);
            p5.stroke(213, 232, 253);
            p5.noFill();

            const values = analyser.getValue();

            p5.beginShape();
            for (let i = 0; i < values.length; i++) {
                const amplitude = values[i];
                const x = p5.map(i, 0, values.length - 1, 0, p5.width);
                const y = p5.height / 2 + +amplitude * p5.height;
                // Place vertex
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
