import * as React from "react";
import { Box, Button, Modal, Paper, Stack, Typography } from "@mui/material";
import {
  breakerPinOrbitSx,
  breakerPinSx,
  celebrationEffectsLayerSx,
  celebrationOverlaySx,
  centerSpinButtonSx,
  closeButtonSx,
  confettiPieceSx,
  type ConfettiPiece,
  fireworkBurstContainerSx,
  fireworkCoreSx,
  fireworkRaysSx,
  fireworkRingSx,
  type FireworkBurst,
  type ResponsiveSize,
  topFlapperArmSx,
  topFlapperTipSx,
  topFlapperWrapSx,
  wheelAreaSx,
  wheelFrameSx,
  wheelLabelContainerSx,
  wheelLabelTextSx,
  wheelPaperSx,
  wheelStackSx,
  WheelFrame,
  winnerDescriptionSx,
  winnerModalPaperSx,
  winnerTitleSx,
} from "./Wheel-style";

type WheelProps = {
  items: string[];
  onResult?: (value: string, index: number) => void;
  contentSize?: ResponsiveSize;
};

const Wheel: React.FC<WheelProps> = ({ items, onResult, contentSize }) => {
  const values = items.length > 0 ? items : ["Add options"];
  const resolvedContentSize: ResponsiveSize = contentSize ?? {
    xs: 320,
    sm: 360,
    md: 420,
  };
  const scaledContentSize: ResponsiveSize = React.useMemo(
    () => ({
      xs: resolvedContentSize.xs * 1.2,
      sm: resolvedContentSize.sm ? resolvedContentSize.sm * 1.2 : undefined,
      md: resolvedContentSize.md ? resolvedContentSize.md * 1.2 : undefined,
      lg: resolvedContentSize.lg ? resolvedContentSize.lg * 1.2 : undefined,
      xl: resolvedContentSize.xl ? resolvedContentSize.xl * 1.2 : undefined,
    }),
    [resolvedContentSize],
  );
  const segmentAngle = 360 / values.length;
  const [rotation, setRotation] = React.useState(0);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [celebrationOpen, setCelebrationOpen] = React.useState(false);
  const [flapperAngle, setFlapperAngle] = React.useState(0);
  const breakerPinCount = React.useMemo(
    () => Math.max(values.length * 2, 24),
    [values.length],
  );
  const wheelFrameRef = React.useRef<HTMLDivElement | null>(null);
  const lastPinBucketRef = React.useRef<number | null>(null);
  const rafIdRef = React.useRef<number | null>(null);
  const kickTimeoutRef = React.useRef<number | null>(null);
  const lastKickAtRef = React.useRef(0);
  const lastWheelAngleRef = React.useRef<number | null>(null);
  const wheelSpeedRef = React.useRef(0);

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
      setCelebrationOpen(true);
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

  const handleCloseCelebration = React.useCallback(() => {
    setCelebrationOpen(false);
  }, []);

  const triggerFlapperKick = React.useCallback(() => {
    const now = performance.now();
    if (now - lastKickAtRef.current < 72) {
      return;
    }
    lastKickAtRef.current = now;

    const speed = wheelSpeedRef.current;
    const intensity = Math.max(0.35, Math.min(speed / 2.6, 1));
    const kickAngle = -(5 + 5 * intensity);
    const settleMs = 120 + (1 - intensity) * 40;

    if (kickTimeoutRef.current !== null) {
      window.clearTimeout(kickTimeoutRef.current);
    }

    setFlapperAngle(kickAngle);
    kickTimeoutRef.current = window.setTimeout(() => {
      setFlapperAngle(0);
      kickTimeoutRef.current = null;
    }, settleMs);
  }, []);

  React.useEffect(() => {
    if (!isSpinning) {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (kickTimeoutRef.current !== null) {
        window.clearTimeout(kickTimeoutRef.current);
        kickTimeoutRef.current = null;
      }
      lastPinBucketRef.current = null;
      lastWheelAngleRef.current = null;
      wheelSpeedRef.current = 0;
      setFlapperAngle(0);
      return;
    }

    const pinStep = 360 / breakerPinCount;

    const getWheelAngle = () => {
      const element = wheelFrameRef.current;
      if (!element) {
        return 0;
      }

      const transform = window.getComputedStyle(element).transform;
      if (!transform || transform === "none") {
        return 0;
      }

      const matrixMatch = transform.match(/matrix\(([^)]+)\)/);
      if (matrixMatch) {
        const values = matrixMatch[1].split(",").map(Number);
        const angle = Math.atan2(values[1], values[0]) * (180 / Math.PI);
        return (angle + 360) % 360;
      }

      const matrix3dMatch = transform.match(/matrix3d\(([^)]+)\)/);
      if (matrix3dMatch) {
        const values = matrix3dMatch[1].split(",").map(Number);
        const angle = Math.atan2(values[1], values[0]) * (180 / Math.PI);
        return (angle + 360) % 360;
      }

      return 0;
    };

    const loop = () => {
      const currentAngle = getWheelAngle();
      if (lastWheelAngleRef.current !== null) {
        let delta = currentAngle - lastWheelAngleRef.current;
        if (delta > 180) {
          delta -= 360;
        } else if (delta < -180) {
          delta += 360;
        }
        wheelSpeedRef.current = Math.abs(delta);
      }
      lastWheelAngleRef.current = currentAngle;

      const pointerRelativeAngle = (360 - currentAngle + 0.0001) % 360;
      const currentBucket = Math.floor(pointerRelativeAngle / pinStep);

      if (
        lastPinBucketRef.current !== null &&
        currentBucket !== lastPinBucketRef.current
      ) {
        triggerFlapperKick();
      }

      lastPinBucketRef.current = currentBucket;
      rafIdRef.current = window.requestAnimationFrame(loop);
    };

    rafIdRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (kickTimeoutRef.current !== null) {
        window.clearTimeout(kickTimeoutRef.current);
        kickTimeoutRef.current = null;
      }
      lastWheelAngleRef.current = null;
      wheelSpeedRef.current = 0;
    };
  }, [breakerPinCount, isSpinning, triggerFlapperKick]);

  const confettiPieces: ConfettiPiece[] = React.useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        size: 6 + Math.random() * 10,
        duration: 2.6 + Math.random() * 1.8,
        delay: Math.random() * 0.32,
        rotate: Math.random() * 360,
        color: ["#f6d365", "#fda085", "#a8edea", "#d4fc79", "#fbc2eb"][
          index % 5
        ],
      })),
    [],
  );

  const fireworkBursts: FireworkBurst[] = React.useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const color = ["#ffd166", "#ff8fab", "#90e0ef", "#caffbf", "#ffc6ff"][
          index % 5
        ];

        return {
          id: index,
          left: `${12 + Math.random() * 76}%`,
          top: `${12 + Math.random() * 56}%`,
          delay: Math.random() * 0.9,
          duration: 1.2 + Math.random() * 0.45,
          color,
          rays: `0 -48px 0 0 ${color}, 34px -34px 0 0 ${color}, 48px 0 0 0 ${color}, 34px 34px 0 0 ${color}, 0 48px 0 0 ${color}, -34px 34px 0 0 ${color}, -48px 0 0 0 ${color}, -34px -34px 0 0 ${color}`,
        };
      }),
    [],
  );

  return (
    <Paper elevation={0} sx={wheelPaperSx}>
      <Stack spacing={2.5} alignItems="center" sx={wheelStackSx}>
        <Box sx={wheelAreaSx(scaledContentSize)}>
          <Box sx={topFlapperWrapSx}>
            <Box sx={topFlapperArmSx(flapperAngle)}>
              <Box sx={topFlapperTipSx} />
            </Box>
          </Box>
          <WheelFrame
            ref={wheelFrameRef}
            onTransitionEnd={handleSpinEnd}
            sx={wheelFrameSx(
              scaledContentSize,
              wheelBackground,
              rotation,
              isSpinning,
            )}
          >
            {Array.from({ length: breakerPinCount }, (_, index) => {
              const angle = (index * 360) / breakerPinCount;
              return (
                <Box key={`breaker-pin-${index}`} sx={breakerPinOrbitSx(angle)}>
                  <Box sx={breakerPinSx} />
                </Box>
              );
            })}

            {values.map((item, index) => {
              const angle = index * segmentAngle + segmentAngle / 2;
              return (
                <Box key={`${item}-${index}`} sx={wheelLabelContainerSx(angle)}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={wheelLabelTextSx}
                  >
                    {item}
                  </Typography>
                </Box>
              );
            })}
          </WheelFrame>

          <Button
            variant="contained"
            onClick={spin}
            disabled={isSpinning || values.length === 0}
            sx={centerSpinButtonSx}
          >
            {isSpinning ? "Spinning" : "Spin"}
          </Button>
        </Box>
      </Stack>

      <Modal
        open={celebrationOpen}
        onClose={handleCloseCelebration}
        aria-labelledby="winner-title"
        aria-describedby="winner-description"
      >
        <Box sx={celebrationOverlaySx}>
          <Box sx={celebrationEffectsLayerSx}>
            {confettiPieces.map((piece) => (
              <Box key={piece.id} sx={confettiPieceSx(piece)} />
            ))}

            {fireworkBursts.map((burst) => (
              <Box key={burst.id} sx={fireworkBurstContainerSx(burst)}>
                <Box sx={fireworkCoreSx(burst)} />
                <Box sx={fireworkRingSx(burst)} />
                <Box sx={fireworkRaysSx(burst)} />
              </Box>
            ))}
          </Box>

          <Paper elevation={0} sx={winnerModalPaperSx}>
            <Typography
              id="winner-description"
              variant="h5"
              sx={winnerDescriptionSx}
            >
              🎉 Winner!
            </Typography>
            <Typography id="winner-title" variant="h1" sx={winnerTitleSx}>
              {selectedValue}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleCloseCelebration}
              sx={closeButtonSx}
            >
              Close
            </Button>
          </Paper>
        </Box>
      </Modal>
    </Paper>
  );
};

export default Wheel;
