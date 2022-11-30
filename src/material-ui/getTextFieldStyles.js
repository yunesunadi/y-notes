const getTextFieldStyles = (matches, matchesMd, outlined) => {
    let width;

    if (outlined) {
        width = matches
            ? `calc(100vw - 27px)`
            : matchesMd
            ? `calc(100vw - 246px)`
            : 550;
    } else {
        width = "100%";
    }

    return {
        width,
        "& input, & input::placeholder": {
            fontSize: outlined ? "text" : "title",
            fontWeight: outlined ? undefined : "fontWeightMedium",
        },
        "& input": {
            padding:
                matches && outlined ? "11.5px" : !outlined ? "0px" : "auto",
        },
        "& .MuiInputBase-root": {
            marginBottom: !outlined ? "10px" : "auto",
        },
        "& textarea, & textarea::placeholder, & label": {
            fontSize: "text",
        },
    };
};

export default getTextFieldStyles;
