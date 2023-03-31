import { Link } from "react-router-dom";
import { Container, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export function Footer() {
    return (
        <Container fixed id="footer">
            <div>2023 Francisco Aloi</div>
            <div>
                <Link
                    className="icon"
                    target="_blank"
                    to="https://github.com/aloifran/SoundSynthesis"
                >
                    <GitHubIcon />
                </Link>
            </div>
        </Container>
    );
}
