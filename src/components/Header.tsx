import { HashLink } from "react-router-hash-link";
import { List, ListItem } from "@mui/material";

export function Header() {
    return (
        <>
            <h1>What is Sound Synthesis?</h1>
            <p>
                It is the process of generating, shaping and manipulating sound
                using electronic instruments called synthesizers.
                <br />
                Synthesizers produce an analog or digital representation of
                sound, which the user may design.
                {/* <Link
                        className="link-small"
                        target="_blank"
                        to="https://en.wikibooks.org/wiki/Sound_Synthesis_Theory/Introduction"
                    >
                        Read more
                    </Link> */}
            </p>

            <List sx={{ display: "flex" }}>
                <ListItem id="li">
                    <HashLink smooth to={"/#oscillator"}>
                        Oscillator
                    </HashLink>
                </ListItem>
                <ListItem id="li">
                    <HashLink smooth to={"/#waveforms"}>
                        Waveforms
                    </HashLink>
                </ListItem>
                <ListItem id="li">
                    <HashLink smooth to={"/#amplitude"}>
                        Amplitude
                    </HashLink>
                </ListItem>
                <ListItem id="li">
                    <HashLink smooth to={"/#harmonics"}>
                        Harmonics
                    </HashLink>
                </ListItem>
                <ListItem id="li">
                    <HashLink smooth to={"/#filter"}>
                        Filter
                    </HashLink>
                </ListItem>
                <ListItem id="li">
                    <HashLink smooth to={"/#envelope"}>
                        Envelope
                    </HashLink>
                </ListItem>
                <ListItem id="li">
                    <HashLink smooth to={"/#lfo"}>
                        LFO
                    </HashLink>
                </ListItem>
            </List>
        </>
    );
}
