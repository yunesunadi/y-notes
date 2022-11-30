import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useBreakpointsDown } from "../material-ui/custom_hooks/useBreakpoints";
import { Link } from "react-router-dom";

export default function NotFound() {
    const matches = useBreakpointsDown();

    return (
        <Box textAlign="center" mt={3}>
            <Typography
                component="h2"
                variant={matches ? "h6" : "h5"}
                color="secondary"
                mb={matches ? 1.5 : 3}
            >
                404 | Page Not Found
            </Typography>
            <Link to="/">
                <Typography
                    component="span"
                    fontSize="text"
                    color="secondary"
                    sx={{ textDecoration: "underline" }}
                >
                    Go to Home
                </Typography>
            </Link>
        </Box>
    );
}
