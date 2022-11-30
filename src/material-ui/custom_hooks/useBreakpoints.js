import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useBreakpointsUp() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    return matches;
}

export function useBreakpointsMdDown() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return matches;
}

export function useBreakpointsDown() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    return matches;
}
