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
        attack: 0.7,
        decay: 0.5,
        sustain: 0.5,
        release: 1.5,
    });
    const envRef = useRef<Tone.AmplitudeEnvelope>(env);

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
