import * as Tone from "tone";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { Container } from "@mui/material";

//* This component takes waveform data from a sound source and visualizes it

interface VisualizerProps {
    oscillator: React.MutableRefObject<Tone.Oscillator>;
    envelope: React.MutableRefObject<Tone.AmplitudeEnvelope>;
    waveform?: Tone.ToneOscillatorType;
    adsr?: boolean;
}

export function Visualizer(props: VisualizerProps) {
    let source: Tone.Oscillator | Tone.AmplitudeEnvelope;
    let analyser: Tone.Analyser;

    // P5 wrapper
    const sketch: Sketch = (p5) => {
        // P5 canvas setup
        p5.setup = () => {
            // size equal to the example image
            p5.createCanvas(492, 333);

            // Create an analyser node that makes a waveform and connect to source to get data
            // FFT or Waveform
            if (props.adsr) {
                analyser = new Tone.Analyser("fft", 4096);
                source = props.envelope.current;
            } else {
                analyser = new Tone.Analyser("waveform", 128);
                source = props.oscillator.current;
            }
            source.connect(analyser);
        };

        // P5 canvas loop
        p5.draw = () => {
            // Ensure everything is loaded
            if (!source || !analyser) return;

            const dim = Math.min(p5.width, p5.height);
            p5.background(25, 45, 72);
            p5.strokeWeight(dim * 0.01);

            //TODO: implement color for each waveform type, when oscillator playground is ready
            // switch (props.waveform) {
            //     case "sine":
            //         p5.stroke("red");
            //         break;
            //     case "sawtooth":
            //         p5.stroke("yellow");
            //         break;
            //     case "triangle":
            //         p5.stroke("green");
            //         break;
            //     case "square":
            //         p5.stroke("blue");
            //         break;
            //     default:
            //         p5.stroke(213, 232, 253);
            // }

            p5.stroke(213, 232, 253);
            p5.noFill();
            const values = analyser.getValue();

            p5.beginShape();
            for (let i = 0; i < values.length; i++) {
                const amplitude = values[i];
                const x = p5.map(i, 0, values.length - 1, 0, p5.width);
                let y = 0;

                // FFT
                if (props.adsr) {
                    const offset = p5.map(amplitude, -100, 0, 0, 1);
                    y = p5.height - offset * p5.height;
                }
                // Waveform
                else {
                    y = p5.height / 2 + +amplitude * p5.height;
                }
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
