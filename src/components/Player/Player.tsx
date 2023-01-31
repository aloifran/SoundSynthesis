import * as Tone from "tone";
import { useRef } from "react";
import { Container } from "@mui/material";
import { Controls } from "../Controls/Controls";
import { Visualizer } from "../Visualizer/Visualizer";

//* This comp creates the source and visualizer

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
    Tone.Destination.volume.value = -10;

    // Oscillator
    const osc = new Tone.Oscillator(376, props.oscillatorType);
    osc.volume.value = -12;
    const oscRef = useRef<Tone.Oscillator>(osc);

    // Filter
    const filt = new Tone.Filter(500, props.filterType, -96);
    const filtRef = useRef<Tone.Filter>(filt);

    // LFO
    //! define what the LFO affects at the moment of initialization or later? to set the min/max values according to the source affected
    const lfo = new Tone.LFO(1, 0, 100);
    const lfoRef = useRef<Tone.LFO>(lfo);

    // Envelope
    const env = new Tone.AmplitudeEnvelope({
        attack: 1.2,
        decay: 0.2,
        sustain: 0.3,
        release: 1,
    });
    const envRef = useRef<Tone.AmplitudeEnvelope>(env);

    return (
        <>
            <Container maxWidth="sm">
                <Visualizer
                    sourceRefOsc={oscRef}
                    sourceRefEnv={envRef}
                    waveform={props.oscillatorType}
                    adsr={props.showEnvelope}
                />
                <Controls
                    oscillator={oscRef}
                    filter={props.showFilter ? filtRef : undefined}
                    envelope={props.showEnvelope ? envRef : undefined}
                    LFO={props.showLFO ? lfoRef : undefined}
                    showPartials={props.showPartials || false}
                    showVolume={props.showVolume || false}
                    showTypes={props.showTypes || false}
                    hideFrequency={props.hideFrequency ? false : true}
                />
            </Container>
        </>
    );
}
