import * as React from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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

  const optionLines = React.useMemo(
    () =>
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    [value],
  );

  const handleShuffle = React.useCallback(() => {
    if (optionLines.length < 2) {
      return;
    }

    const shuffled = [...optionLines];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ];
    }

    onChange(shuffled.join("\n"));
  }, [onChange, optionLines]);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="h2" fontWeight={700}>
            Options
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={handleShuffle}
            disabled={optionLines.length < 2}
            sx={{ textTransform: "none", borderRadius: 999 }}
          >
            Shuffle
          </Button>
        </Box>
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
