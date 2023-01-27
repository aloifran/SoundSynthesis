import * as Tone from "tone";
import { useState, useEffect } from "react";
import { Slider, Switch, FormControlLabel, Button } from "@mui/material";

interface FiltProps {
    filterRef: React.MutableRefObject<Tone.Filter>;
    type: BiquadFilterType;
}

export function Filter(props: FiltProps) {
    const filt = props.filterRef.current;

    const [frequency, setFrequency] = useState<number>(1500);

    // const toggle = () => {

    //     filt.state === "stopped" ? filt.start() : filt.stop();
    //     console.log(filt.state);
    // };

    return (
        <>
            {/* <FormControlLabel
                label="ON/OFF"
                labelPlacement="start"
                control={<Switch onChange={toggle} />}
            /> */}

            <>
                <p>Frequency: {frequency} Hz</p>
                <Slider
                    size="small"
                    min={0}
                    max={2000}
                    value={frequency}
                    onChange={(e, value) => setFrequency(value as number)}
                />
            </>
        </>
    );
}
