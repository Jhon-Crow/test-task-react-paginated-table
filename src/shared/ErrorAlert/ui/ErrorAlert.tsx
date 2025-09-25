import {Alert} from "@mui/material";

export const ErrorAlert = ({text}: {text: string | null}) => {
    if (!text) return null;
    return (
        <Alert
            sx={{
                position: "fixed",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: "calc(100% - 32px)",
                width: "100%",
                zIndex: 9999,
            }}
        severity="error">{text}</Alert>
    );
};