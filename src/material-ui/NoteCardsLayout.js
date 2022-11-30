import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LabelTwoToneIcon from "@mui/icons-material/LabelTwoTone";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";

export default function NoteCardsLayout({ children, labelId }) {
    const matches = useBreakpointsDown();
    const labels = JSON.parse(localStorage.getItem("labels")) || [];
    const filteredLabelName =
        labelId !== "all" && labels.find((label) => label.id === labelId).name;
    const desktopOpen = JSON.parse(localStorage.getItem("desktopOpen"));

    return (
        <>
            {filteredLabelName && (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    ml={1}
                    mr={matches ? -1 : 1}
                    mb={1}
                >
                    <Stack direction="row" spacing={0.7} alignItems="center">
                        <Box
                            sx={{
                                width: matches ? 3 : 5,
                                height: matches ? 18 : 25,
                                backgroundColor: "primary.main",
                            }}
                        ></Box>
                        <Typography fontSize="title" color="secondary">
                            Filtered by
                        </Typography>
                    </Stack>

                    <Chip
                        label={
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                            >
                                <LabelTwoToneIcon
                                    fontSize={matches ? "small" : "medium"}
                                    color="primary"
                                />
                                <Typography
                                    fontSize="filterText"
                                    color="secondary"
                                >
                                    {filteredLabelName}
                                </Typography>
                            </Stack>
                        }
                        sx={{ height: matches ? 27 : undefined }}
                        size={matches ? "small" : "medium"}
                    />
                </Stack>
            )}
            <Masonry
                columns={{
                    xsm: 2,
                    sm: desktopOpen ? 1 : 2,
                    smd: desktopOpen ? 2 : 3,
                    md: desktopOpen ? 3 : 4,
                    lg: desktopOpen ? 4 : 5,
                }}
                spacing={2}
                sx={{ m: 0 }}
            >
                {children}
            </Masonry>
        </>
    );
}
