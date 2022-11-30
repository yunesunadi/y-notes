import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";
import { Link } from "react-router-dom";

export default function Logo({ mobileOpen }) {
    const matches = useBreakpointsDown();

    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <Box
                sx={{
                    cursor: "pointer",
                    display: "inline-flex",
                }}
                alignItems="center"
                columnGap={matches ? 0.5 : 1}
                mt={matches ? 0.3 : 1}
                ml={mobileOpen ? 1.7 : undefined}
            >
                <NoteAltTwoToneIcon
                    color="primary"
                    fontSize={matches ? "medium" : "large"}
                />
                <Typography
                    variant={matches ? "h6" : "h5"}
                    width={100}
                    component="h1"
                    color="secondary"
                >
                    Y Notes
                </Typography>
            </Box>
        </Link>
    );
}
