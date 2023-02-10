import * as Tone from "tone";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { Container } from "@mui/material";

interface ADSRProps {
    // Refs to control values
    // envelope: React.MutableRefObject<Tone.AmplitudeEnvelope>;
    attack: React.MutableRefObject<number>;
    decay: React.MutableRefObject<number>;
    sustain: React.MutableRefObject<number>;
    release: React.MutableRefObject<number>;
}

export function ADSR(props: ADSRProps) {
    // envelope control values
    let total;
    let current;
    let env = {
        attack: props.attack.current,
        decay: props.decay.current,
        sustain: props.sustain.current,
        release: props.release.current,
    };

    console.log("env", env);

    const sketch: Sketch = (p) => {
        function drawArrowhead(
            x: number,
            y: number,
            radians: number,
            size: number
        ) {
            p.push();
            p.stroke("black");
            p.strokeWeight(2);
            p.translate(x, y);
            p.rotate(radians);
            p.fill("black");
            p.triangle(0, 0, size, size * 1.7, -size, size * 1.7);
            p.pop();
        }

        p.setup = () => {
            p.createCanvas(500, 350);
            p.background(225);

            // graphAxis
            p.strokeWeight(3);
            p.line(60, 25, 60, 250);
            p.line(60, 250, 480, 250);
            drawArrowhead(490, 250, Math.PI / 2, 7);
            drawArrowhead(60, 15, 0, 7);

            // Max Amplitude dashed Line
            p.stroke("black");
            p.strokeWeight(1);
            p.push();
            p.drawingContext.setLineDash([2, 2]);
            p.line(48, 44, 480, 44);
            p.pop();

            // Amp max
            p.strokeWeight(0);
            p.textFont("serif");
            p.textSize(16);
            p.fill(15);
            p.text("Amp", 12, 48);
            p.textSize(12);
            p.text("max", 36, 56);

            // Amplitude (vertical)
            p.push();
            p.translate(-95, 240);
            p.textSize(22);
            p.rotate(-p.PI / 2);
            p.text("Amplitude", 50, 145);
            p.pop();

            // 0
            p.textSize(22);
            p.text("0", 32, 274);

            // t
            p.text("t", 484, 273);

            // key pressed
            p.strokeWeight(3);
            p.line(60, 268, 60, 260);
            drawArrowhead(60, 252, 0, 5);
            p.strokeWeight(0);
            p.textSize(12);
            p.textAlign("center");
            p.text("key", 59, 278);
            p.text("pressed", 59, 290);
        };

        p.draw = () => {
            p.strokeWeight(6);
            p.stroke("lightgrey");

            // reset variables
            total =
                props.attack.current +
                props.decay.current +
                props.release.current;
            current = 60;

            // Attack
            p.line(60, 250, (props.attack.current / total) * 300 + current, 50);
            //TODO: save end positions, is there a better way?
            let attackX = (props.attack.current / total) * 300 + current;
            let attackY = 50;
            current += (props.attack.current / total) * 300;

            // Decay
            p.line(
                attackX,
                attackY,
                (props.decay.current / total) * 300 + current,
                250 - props.sustain.current * 200
            );
            let decayX = (props.decay.current / total) * 300 + current;
            let decayY = 250 - props.sustain.current * 200;
            current += (props.decay.current / total) * 300;

            // Sustain
            p.line(
                decayX,
                decayY,
                current + 100,
                250 - props.sustain.current * 200
            );
            let sustX = current + 100;
            let sustY = 250 - props.sustain.current * 200;
            current += 100;

            // Release
            p.line(
                sustX,
                sustY,
                (props.release.current / total) * 300 + current,
                250
            );
            current += (props.release.current / total) * 300;

            // Vertical separation lines
            // RELEASE
            p.strokeWeight(4);

            if (props.release.current != 0) {
                // vertical release
                p.stroke("purple");
                p.line(current, 247, current, 25);

                if (props.release.current / total > 0.1) {
                    // horizontal release
                    current -= (props.release.current / total) * 300;
                    p.line(current + 10, 30, current + 110, 30);
                    drawArrowhead(
                        current + (props.release.current / total) * 300 - 4,
                        30,
                        Math.PI / 2,
                        8
                    );
                }

                if (props.release.current / total > 0.16) {
                    // R
                    p.strokeWeight(0);
                    p.textSize(20);
                    p.push();
                    p.textStyle("italic");
                    p.fill("purple");
                    p.text(
                        "R",
                        current + (props.release.current / total) * 150 - 2,
                        26
                    );
                    p.pop();
                } else {
                    current -= (props.release.current / total) * 300;
                }
            }

            // key released
            p.strokeWeight(3);
            p.stroke("black");
            p.line(current, 268, current, 260);
            drawArrowhead(current, 252, 0, 5);

            p.strokeWeight(0);
            p.textSize(12);
            p.textAlign("center");
            p.text("key", current, 278);
            p.text("released", current, 290);

            // SUSTAIN LINES
            // vertical sustain black
            p.strokeWeight(4);
            p.line(current, 250, current, 25);

            if (props.sustain.current != 0) {
                if (props.sustain.current > 0.1) {
                    // vertical sustain blue
                    p.stroke("blue");
                    p.line(
                        current - 50,
                        247,
                        current - 50,
                        260 - props.sustain.current * 200
                    );
                }

                // horizontal sustain blue
                current -= 100;
                p.line(
                    current + 90,
                    250 - props.sustain.current * 200,
                    current + 10,
                    250 - props.sustain.current * 200
                );
                if (props.sustain.current > 0.1) {
                    drawArrowhead(
                        current + 50,
                        254 - props.sustain.current * 200,
                        0,
                        8
                    );
                    // S
                    p.strokeWeight(0);
                    p.textSize(20);
                    p.push();
                    p.textStyle("italic");
                    p.fill("blue");
                    p.text(
                        "S",
                        current + 40,
                        264 - props.sustain.current * 100
                    );
                    p.pop();
                } else {
                    current -= 100;
                }

                // DECAY LINES
                if (props.decay.current != 0) {
                    // vertical decay
                    p.stroke("#f60");
                    p.strokeWeight(4);
                    p.line(current, 247, current, 25);

                    if (props.decay.current / total > 0.1) {
                        // horizontal decay
                        current -= (props.decay.current / total) * 300;
                        p.line(current + 70, 30, current + 10, 30);
                        drawArrowhead(
                            current + (props.decay.current / total) * 300 - 4,
                            30,
                            Math.PI / 2,
                            8
                        );

                        if (props.decay.current / total > 0.16) {
                            // D
                            p.strokeWeight(0);
                            p.push();
                            p.fill("#f60");
                            p.textStyle("italic");
                            p.text(
                                "D",
                                current +
                                    (props.decay.current / total) * 150 -
                                    2,
                                26
                            );
                            p.pop();
                        }
                    } else {
                        current -= (props.decay.current / total) * 300;
                    }
                }

                // ATTACK LINES
                if (props.attack.current != 0) {
                    // vertical attack
                    p.stroke("green");
                    p.strokeWeight(4);
                    p.line(current, 247, current, 25);

                    if (props.attack.current / total > 0.1) {
                        // horizontal attack
                        current -= (props.attack.current / total) * 300;
                        p.line(current + 70, 30, current + 10, 30);
                        drawArrowhead(
                            current + (props.attack.current / total) * 300 - 4,
                            30,
                            Math.PI / 2,
                            8
                        );

                        if (props.attack.current / total > 0.16) {
                            // A
                            p.strokeWeight(0);
                            p.push();
                            p.fill("green");
                            p.textStyle("italic");
                            p.text(
                                "A",
                                current +
                                    (props.attack.current / total) * 150 -
                                    2,
                                26
                            );
                            p.pop();
                        }
                    } else {
                        current -= (props.attack.current / total) * 300;
                    }
                }
            }
        };
    };

    return (
        <Container>
            <ReactP5Wrapper sketch={sketch} />
        </Container>
    );
}
