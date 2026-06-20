import { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { Container } from "@mui/material";
import { useIsVisibleRef } from "../hooks";

//* This component takes waveform data from a sound source and visualizes it

interface VisualizerProps {
    oscillator: React.MutableRefObject<Tone.Oscillator>;
    envelope: React.MutableRefObject<Tone.AmplitudeEnvelope>;
    waveform?: Tone.ToneOscillatorType;
    adsr?: boolean;
}

export function Visualizer({
    oscillator,
    envelope,
    waveform,
    adsr,
}: VisualizerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const visibleRef = useIsVisibleRef(containerRef);
    const analyserRef = useRef<Tone.Analyser | null>(null);

    // Dispose the analyser (and its connection to the source) on unmount
    useEffect(() => {
        return () => {
            analyserRef.current?.dispose();
        };
    }, []);

    // Memoized so the canvas isn't recreated on re-render
    const sketch = useCallback<Sketch>(
        (p5) => {
            let source: Tone.Oscillator | Tone.AmplitudeEnvelope;
            let analyser: Tone.Analyser;

            p5.setup = () => {
                p5.createCanvas(492, 333);

                // FFT or Waveform
                if (adsr) {
                    analyser = new Tone.Analyser("fft", 4096);
                    source = envelope.current;
                } else {
                    analyser = new Tone.Analyser("waveform", 128);
                    source = oscillator.current;
                }
                source.connect(analyser);
                analyserRef.current = analyser;
            };

            // Canvas loop
            p5.draw = () => {
                if (!source || !analyser) return;
                // Skip analysis + drawing while scrolled off screen.
                if (!visibleRef.current) return;

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
                    if (adsr) {
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
        },
        [adsr, oscillator, envelope, visibleRef]
    );

    return (
        <Container ref={containerRef} id="visualizer-img-container">
            {waveform && <img src={waveform + ".jpg"} />}
            <ReactP5Wrapper sketch={sketch} />
        </Container>
    );
}
