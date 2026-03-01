import * as React from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

type ResponsiveSize = {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type WheelInputProps = {
  value: string;
  onChange: (value: string) => void;
  contentSize?: ResponsiveSize;
};

const WheelInput: React.FC<WheelInputProps> = ({
  value,
  onChange,
  contentSize,
}) => {
  const resolvedContentSize: ResponsiveSize = contentSize ?? {
    xs: 320,
    sm: 360,
    md: 420,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Typography variant="h6" component="h2" fontWeight={700}>
          Options
        </Typography>
        <Box
          sx={{
            flex: 1,
            height: resolvedContentSize,
            minHeight: resolvedContentSize,
            display: "flex",
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={10}
            placeholder={"One option per line\nApple\nBanana\nOrange"}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            helperText="Enter one value per line"
            sx={{
              height: "100%",
              display: "flex",
              "& .MuiInputBase-root": {
                height: "100%",
                alignItems: "flex-start",
              },
              "& .MuiInputBase-inputMultiline": {
                height: "100% !important",
                overflow: "auto !important",
              },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default WheelInput;
