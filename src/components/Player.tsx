import { useEffect } from "react";
import * as Tone from "tone";
import { Container } from "@mui/material";
import { Controls } from "./Controls";
import { Visualizer } from "./Visualizer";
import { useConstant } from "../hooks";

interface PlayerProps {
    oscillatorType?: Tone.ToneOscillatorType;
    showFilter?: boolean;
    filterType?: BiquadFilterType;
    showLFO?: boolean;
    showEnvelope?: boolean;
    showPartials?: boolean;
    showVolume?: boolean;
    showTypes?: boolean;
    hideFrequency?: boolean;
}

export function Player(props: PlayerProps) {
    // Oscillator
    const oscRef = useConstant(() => {
        const osc = new Tone.Oscillator(376, props.oscillatorType);
        osc.volume.value = -12;
        return osc;
    });

    // Filter
    const filtRef = useConstant(
        () => new Tone.Filter(500, props.filterType, -96)
    );

    // LFO
    // define what the LFO affects at the moment of initialization or later? to set the min/max values according to the source affected
    const lfoRef = useConstant(() => new Tone.LFO(1, 0, 100));

    // Envelope
    const envRef = useConstant(
        () =>
            new Tone.AmplitudeEnvelope({
                attack: 0.7,
                decay: 0.5,
                sustain: 0.5,
                release: 1.5,
            })
    );

    useEffect(() => {
        // Master output level (global; set once on mount).
        Tone.Destination.volume.value = -10;

        // Release the audio nodes when the Player unmounts.
        return () => {
            oscRef.current.dispose();
            filtRef.current.dispose();
            lfoRef.current.dispose();
            envRef.current.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                <Visualizer
                    oscillator={oscRef}
                    envelope={envRef}
                    waveform={props.oscillatorType}
                    adsr={props.showEnvelope}
                />
                <Controls
                    oscillator={oscRef}
                    filter={filtRef}
                    envelope={envRef}
                    LFO={lfoRef}
                    showFilter={props.showFilter || false}
                    showEnvelope={props.showEnvelope || false}
                    showLFO={props.showLFO || false}
                    showPartials={props.showPartials || false}
                    showVolume={props.showVolume || false}
                    showTypes={props.showTypes || false}
                    hideFrequency={props.hideFrequency ? false : true}
                />
            </Container>
        </>
    );
}
