import * as Tone from "tone";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { Container } from "@mui/material";

interface ADSRProps {
    envelope: React.MutableRefObject<Tone.AmplitudeEnvelope>;
}

export function ADSR({ envelope }: ADSRProps) {
    const env = envelope.current;

    let total: number;
    let current: number;
    let attack: number = env.attack as number;
    let decay: number = env.decay as number;
    let sustain: number = env.sustain as number;
    let release: number = env.release as number;

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
            p.createCanvas(500, 310);
            p.background(225);

            // graphAxis
            p.push();
            p.strokeWeight(4);
            p.line(60, 25, 60, 250);
            p.line(60, 250, 480, 250);
            drawArrowhead(490, 250, Math.PI / 2, 7);
            drawArrowhead(60, 15, 0, 7);

            // Max Amplitude dashed Line
            p.stroke("grey");
            p.strokeWeight(1);
            p.drawingContext.setLineDash([2, 2]);
            p.line(48, 44, 480, 44);
            p.pop();

            // Amp max
            p.strokeWeight(0);
            p.textFont("serif");
            p.textStyle("italic");
            p.textSize(16);
            p.fill("grey");
            p.text("Amp", 12, 48);
            p.textSize(12);
            p.text("max", 36, 58);

            // Amplitude (vertical)
            p.push();
            p.translate(-95, 240);
            p.rotate(-p.PI / 2);
            p.textSize(22);
            p.textStyle("bold");
            p.text("Amplitude", 50, 145);
            p.pop();

            // 0
            p.push();
            p.fill("black");
            p.textStyle("bold italic");
            p.textSize(30);
            p.text("0", 32, 274);

            // t
            p.text("t", 484, 273);
            p.pop();

            // key pressed
            p.strokeWeight(3);
            p.line(60, 268, 60, 260);
            drawArrowhead(60, 252, 0, 4);
            p.strokeWeight(0);
            p.fill("black");
            p.textStyle("italic");
            p.textSize(12);
            p.textAlign("center");
            p.text("key", 59, 278);
            p.text("pressed", 59, 290);
        };

        p.draw = () => {
            p.strokeWeight(6);
            p.stroke("lightgrey");

            // reset variables
            total = attack + decay + release;
            current = 60;

            // Attack
            let attackX = (attack / total) * 300 + current;
            let attackY = 50;
            p.line(60, 250, attackX, attackY);
            current += (attack / total) * 300;

            // Decay
            p.line(
                attackX,
                attackY,
                (decay / total) * 300 + current,
                250 - sustain * 200
            );
            let decayX = (decay / total) * 300 + current;
            let decayY = 250 - sustain * 200;
            current += (decay / total) * 300;

            // Sustain
            let sustainX = current + 100;
            let sustainY = 250 - sustain * 200;
            p.line(decayX, decayY, sustainX, sustainY);
            current += 100;

            // Release
            p.line(sustainX, sustainY, (release / total) * 300 + current, 250);
            current += (release / total) * 300;

            // Vertical lines
            // RELEASE
            p.strokeWeight(4);
            p.textSize(20);
            p.textStyle("italic");
            p.textAlign("center");

            // vertical release
            if (release != 0) {
                p.stroke("purple");
                p.line(current, 247, current, 25);

                // horizontal release
                if (release / total > 0.1) {
                    p.line(
                        current - 10,
                        30,
                        current - (release / total) * 300 + 10,
                        30
                    );
                    current -= (release / total) * 300;
                    drawArrowhead(
                        current + (release / total) * 300 - 4,
                        30,
                        p.PI / 2,
                        8
                    );

                    // R
                    if (release / total > 0.16) {
                        p.strokeWeight(0);
                        p.push();
                        p.fill("purple");
                        p.text("R", current + (release / total) * 150 - 2, 26);
                        p.pop();
                    }
                } else {
                    p.stroke("black");
                    current -= (release / total) * 300;
                }
            }

            // key released arrow
            p.strokeWeight(3);
            p.stroke("black");
            p.line(current, 268, current, 260);
            drawArrowhead(current, 252, 0, 4);
            // text
            p.strokeWeight(0);
            p.push();
            p.textSize(12);
            p.text("key", current, 278);
            p.text("released", current, 290);
            p.pop();

            // SUSTAIN LINES
            // vertical sustain black
            p.strokeWeight(4);
            p.line(current, 250, current, 25);

            if (sustain != 0.01) {
                p.stroke("blue");
                // vertical sustain
                if (sustain > 0.1) {
                    p.line(
                        current - 50,
                        247,
                        current - 50,
                        260 - sustain * 200
                    );
                }
                // horizontal sustain
                p.line(
                    current - 10,
                    250 - sustain * 200,
                    current - 90,
                    250 - sustain * 200
                );
                current -= 100;
                if (sustain > 0.1) {
                    drawArrowhead(current + 50, 254 - sustain * 200, 0, 8);
                    // S
                    p.strokeWeight(0);
                    p.push();
                    p.fill("blue");
                    p.text("S", current + 40, 264 - sustain * 100);
                    p.pop();
                }
            } else {
                p.stroke("black");
                current -= 100;
            }

            // DECAY LINES
            // vertical decay
            if (decay != 0) {
                p.stroke("#f60");
                p.strokeWeight(4);
                p.line(current, 247, current, 25);

                // horizontal decay
                if (decay / total > 0.1) {
                    p.line(
                        current - 10,
                        30,
                        current - (decay / total) * 300 + 10,
                        30
                    );
                    current -= (decay / total) * 300;
                    drawArrowhead(
                        current + (decay / total) * 300 - 4,
                        30,
                        Math.PI / 2,
                        8
                    );
                    // D
                    if (decay / total > 0.16) {
                        p.strokeWeight(0);
                        p.push();
                        p.fill("#f60");
                        p.text("D", current + (decay / total) * 150 - 2, 26);
                        p.pop();
                    }
                } else {
                    current -= (decay / total) * 300;
                }
            }

            // ATTACK LINES
            if (attack != 0) {
                // vertical attack
                p.stroke("green");
                p.strokeWeight(4);
                p.line(current, 247, current, 25);

                // horizontal attack
                if (attack / total > 0.1) {
                    p.line(
                        current - 10,
                        30,
                        current - (attack / total) * 300 + 10,
                        30
                    );
                    current -= (attack / total) * 300;
                    drawArrowhead(
                        current + (attack / total) * 300 - 4,
                        30,
                        Math.PI / 2,
                        8
                    );
                    // A
                    if (attack / total > 0.16) {
                        p.strokeWeight(0);
                        p.push();
                        p.fill("green");
                        p.text("A", current + (attack / total) * 150 - 2, 26);
                        p.pop();
                    }
                } else {
                    current -= (attack / total) * 300;
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
