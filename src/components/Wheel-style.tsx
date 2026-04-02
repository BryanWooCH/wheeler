import { Box } from "@mui/material";
import styled from "styled-components";

export type ResponsiveSize = {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

export type ConfettiPiece = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: string;
};

export type FireworkBurst = {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  color: string;
  rays: string;
};

export const WheelFrame = styled(Box)`
  position: relative;
  width: min(420px, 80vw);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 0;
  overflow: hidden;
`;

export const Pointer = styled(Box)`
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

export const topFlapperWrapSx = {
  position: "absolute",
  left: "50%",
  top: -18,
  transform: "translateX(-50%)",
  width: 44,
  height: 54,
  pointerEvents: "none",
  zIndex: 6,
};

export const topFlapperArmSx = (flapperAngle: number) => ({
  position: "absolute",
  left: "50%",
  top: 0,
  width: 7,
  height: 30,
  borderRadius: 999,
  bgcolor: "#991b1b",
  transformOrigin: "50% 4px",
  transform: `translateX(-50%) rotate(${flapperAngle}deg)`,
  boxShadow: "0 2px 4px rgba(0,0,0,0.32)",
  transition: "transform 190ms cubic-bezier(0.16, 0.8, 0.22, 1)",
});

export const topFlapperTipSx = {
  position: "absolute",
  left: "50%",
  top: 24,
  transform: "translateX(-50%)",
  width: 14,
  height: 12,
  background: "#dc2626",
  clipPath: "polygon(50% 100%, 0 0, 100% 0)",
  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.28))",
};

export const breakerPinOrbitSx = (angle: number) => ({
  position: "absolute",
  inset: 0,
  transform: `rotate(${angle}deg)`,
  transformOrigin: "center",
  pointerEvents: "none",
  zIndex: 3,
});

export const breakerPinSx = {
  position: "absolute",
  left: "50%",
  top: 2,
  transform: "translateX(-50%)",
  width: 11,
  height: 11,
  borderRadius: "50%",
  bgcolor: "#d4a72c",
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.35) inset, 0 1px 1px rgba(0,0,0,0.28)",
};

export const wheelPaperSx = {
  p: 3,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 3,
  height: "100%",
};

export const wheelStackSx = { height: "100%" };

export const wheelAreaSx = (scaledContentSize: ResponsiveSize) => ({
  flex: 1,
  position: "relative",
  width: "100%",
  height: scaledContentSize,
  minHeight: scaledContentSize,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pt: 1,
});

export const wheelFrameSx = (
  scaledContentSize: ResponsiveSize,
  wheelBackground: string,
  rotation: number,
  isSpinning: boolean,
) => ({
  width: scaledContentSize,
  height: "auto",
  aspectRatio: "1 / 1",
  maxWidth: "100%",
  backgroundImage: wheelBackground,
  transform: `rotate(${rotation}deg)`,
  transition: isSpinning
    ? "transform 3.6s cubic-bezier(0.12, 0.86, 0.25, 1)"
    : "none",
});

export const wheelLabelContainerSx = (angle: number) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: `rotate(${angle}deg) translate(0, -150%)`,
  transformOrigin: "0 0",
  px: 0.5,
});

export const wheelLabelTextSx = {
  position: "absolute",
  left: 0,
  top: -96,
  fontSize: { xs: "1.03rem", sm: "1.15rem" },
  lineHeight: 1.2,
  display: "inline-block",
  transform: "translate(0, -50%) rotate(-90deg)",
  transformOrigin: "0 50%",
  whiteSpace: "nowrap",
};

export const centerSpinButtonSx = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 100,
  height: 100,
  borderRadius: "50%",
  textTransform: "none",
  zIndex: 4,
  fontWeight: 700,
};

export const celebrationOverlaySx = {
  minHeight: "100vh",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 2,
  bgcolor: "rgba(0, 0, 0, 0.42)",
};

export const celebrationEffectsLayerSx = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
  zIndex: 1,
  "@keyframes confettiFall": {
    "0%": { transform: "translate3d(0, -48vh, 0)", opacity: 0 },
    "3%": { opacity: 1 },
    "100%": {
      transform: "translate3d(0, 140vh, 0)",
      opacity: 0.75,
    },
  },
  "@keyframes confettiSpin": {
    "0%": { rotate: "0deg" },
    "100%": { rotate: "20deg" },
  },
  "@keyframes fireworkCore": {
    "0%": {
      transform: "translate(-50%, -50%) scale(0.3)",
      opacity: 0,
    },
    "12%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 1,
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(4.8)",
      opacity: 0,
    },
  },
  "@keyframes fireworkRing": {
    "0%": {
      transform: "translate(-50%, -50%) scale(0.2)",
      opacity: 0,
    },
    "20%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 0.95,
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(7.2)",
      opacity: 0,
    },
  },
  "@keyframes fireworkRays": {
    "0%": {
      transform: "translate(-50%, -50%) scale(0.2)",
      opacity: 0,
    },
    "20%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 1,
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(1.7)",
      opacity: 0,
    },
  },
};

export const confettiPieceSx = (piece: ConfettiPiece) => ({
  position: "absolute",
  top: "-12vh",
  left: piece.left,
  width: piece.size,
  height: piece.size * 0.6,
  bgcolor: piece.color,
  borderRadius: "2px",
  transform: `rotate(${piece.rotate}deg)`,
  animation: `confettiFall ${piece.duration}s linear ${piece.delay}s infinite, confettiSpin ${piece.duration * 0.6}s ease-in-out ${piece.delay}s infinite`,
});

export const fireworkBurstContainerSx = (burst: FireworkBurst) => ({
  position: "absolute",
  left: burst.left,
  top: burst.top,
  width: 0,
  height: 0,
});

export const fireworkCoreSx = (burst: FireworkBurst) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 14,
  height: 14,
  borderRadius: "50%",
  bgcolor: burst.color,
  animation: `fireworkCore ${burst.duration}s ease-out ${burst.delay}s infinite`,
});

export const fireworkRingSx = (burst: FireworkBurst) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 22,
  height: 22,
  borderRadius: "50%",
  border: "3px solid",
  borderColor: burst.color,
  animation: `fireworkRing ${burst.duration}s ease-out ${burst.delay}s infinite`,
});

export const fireworkRaysSx = (burst: FireworkBurst) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 8,
  height: 8,
  borderRadius: "50%",
  bgcolor: burst.color,
  boxShadow: burst.rays,
  animation: `fireworkRays ${burst.duration}s ease-out ${burst.delay}s infinite`,
});

export const winnerModalPaperSx = {
  width: "min(620px, 90vw)",
  minHeight: "min(420px, 70vh)",
  border: "4px solid",
  borderColor: "#e6e18f",
  borderRadius: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  px: 3,
  py: 4,
  textAlign: "center",
  position: "relative",
  zIndex: 2,
};

export const winnerTitleSx = {
  fontSize: { xs: 56, sm: 88 },
  fontWeight: 800,
  lineHeight: 1,
};

export const winnerDescriptionSx = { fontWeight: 500 };

export const closeButtonSx = {
  mt: 3,
  borderRadius: 999,
  px: 3,
  textTransform: "none",
};
