import * as React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import styled from "styled-components";

type ResponsiveSize = {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type WheelProps = {
  items: string[];
  onResult?: (value: string, index: number) => void;
  contentSize?: ResponsiveSize;
};

const WheelFrame = styled(Box)`
  position: relative;
  width: min(420px, 80vw);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 0;
  overflow: hidden;
`;

const Pointer = styled(Box)`
  position: absolute;
  left: 50%;
  top: -2px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 24px solid #111;
  z-index: 2;
`;

const CenterDot = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #111;
  z-index: 2;
`;

const Wheel: React.FC<WheelProps> = ({ items, onResult, contentSize }) => {
  const values = items.length > 0 ? items : ["Add options"];
  const resolvedContentSize: ResponsiveSize = contentSize ?? {
    xs: 320,
    sm: 360,
    md: 420,
  };
  const segmentAngle = 360 / values.length;
  const [rotation, setRotation] = React.useState(0);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const colors = React.useMemo(() => {
    const count = values.length;

    return values.map((_, index) => {
      const hue = (index * 360) / count;
      return `hsl(${hue} 70% 84%)`;
    });
  }, [values]);

  const wheelBackground = React.useMemo(() => {
    const slices = values.map((_, index) => {
      const start = index * segmentAngle;
      const end = (index + 1) * segmentAngle;
      return `${colors[index]} ${start}deg ${end}deg`;
    });

    return `conic-gradient(${slices.join(",")})`;
  }, [colors, segmentAngle, values]);

  const finalizeSpin = React.useCallback(
    (finalRotation: number) => {
      const normalized = ((finalRotation % 360) + 360) % 360;
      const pointerAngle = (360 - normalized + 0.0001) % 360;
      const index = Math.floor(pointerAngle / segmentAngle) % values.length;
      const pickedValue = values[index];

      setSelectedValue(pickedValue);
      onResult?.(pickedValue, index);
    },
    [onResult, segmentAngle, values],
  );

  const spin = React.useCallback(() => {
    if (isSpinning || values.length === 0) {
      return;
    }

    setIsSpinning(true);
    const extraRotation = 5 * 360 + Math.floor(Math.random() * 360);
    const nextRotation = rotation + extraRotation;
    setRotation(nextRotation);
  }, [isSpinning, rotation, values.length]);

  const handleSpinEnd = React.useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "transform" || !isSpinning) {
        return;
      }

      finalizeSpin(rotation);
      setIsSpinning(false);
    },
    [finalizeSpin, isSpinning, rotation],
  );

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
      <Stack spacing={2.5} alignItems="center" sx={{ height: "100%" }}>
        <Typography variant="h6" component="h2" fontWeight={700}>
          Wheel
        </Typography>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: resolvedContentSize,
            minHeight: resolvedContentSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 1,
          }}
        >
          <Pointer />
          <WheelFrame
            onTransitionEnd={handleSpinEnd}
            sx={{
              width: resolvedContentSize,
              height: resolvedContentSize,
              maxWidth: "100%",
              backgroundImage: wheelBackground,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 3.6s cubic-bezier(0.12, 0.86, 0.25, 1)"
                : "none",
            }}
          >
            {values.map((item, index) => {
              const angle = index * segmentAngle + segmentAngle / 2;
              return (
                <Box
                  key={`${item}-${index}`}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `rotate(${angle}deg) translate(0, -150%)`,
                    transformOrigin: "0 0",
                    px: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: -96,
                      lineHeight: 1.2,
                      display: "inline-block",
                      transform: "translate(0, -50%) rotate(-90deg)",
                      transformOrigin: "0 50%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              );
            })}
            <CenterDot />
          </WheelFrame>
        </Box>

        <Button
          variant="contained"
          onClick={spin}
          disabled={isSpinning || values.length === 0}
          sx={{ borderRadius: 999, textTransform: "none", px: 3 }}
        >
          {isSpinning ? "Spinning..." : "Spin"}
        </Button>

        <Typography variant="body2" color="text.secondary">
          {selectedValue
            ? `Selected: ${selectedValue}`
            : "Spin the wheel to pick one option"}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Wheel;
