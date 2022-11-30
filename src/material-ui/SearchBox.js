import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";

export default function SearchBox({ searchValue, setSearchValue }) {
    const matches = useBreakpointsDown();

    return (
        <TextField
            InputProps={{
                startAdornment: !matches && (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: searchValue && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="clear value"
                            onClick={() => setSearchValue("")}
                            color="primary"
                            sx={{ p: 0 }}
                            disableRipple
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
                style: {
                    fontSize: matches ? 14 : 15,
                },
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            variant="outlined"
            placeholder="Search Notes"
            sx={{
                position: matches ? "absolute" : undefined,
                background: matches ? "background.main" : undefined,
                width: `calc(100% - 75px)`,
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                },
                "& .MuiOutlinedInput-input": {
                    padding: matches ? "6.5px 0px 6.5px 13px" : "13px 0",
                },
                "& input::placeholder": {
                    fontSize: matches ? 14 : 15,
                    textAlign: "center",
                },
            }}
            autoComplete="off"
        />
    );
}
