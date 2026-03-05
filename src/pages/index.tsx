import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Box, Container, Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Wheel from "../components/Wheel";
import WheelInput from "../components/WheelInput";

const defaultOptions = ["Pizza", "Burger", "Sushi", "Pasta", "Taco", "Salad"];
const panelContentSize = { xs: 300, sm: 340, md: 420, lg: 460 };

const IndexPage: React.FC<PageProps> = () => {
  const [optionsText, setOptionsText] = React.useState(
    defaultOptions.join("\n"),
  );
  const [lastPicked, setLastPicked] = React.useState<string | null>(null);

  const options = React.useMemo(() => {
    return optionsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [optionsText]);

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Typography variant="h4" component="h2" fontWeight={700}>
              Spin & Pick
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Add options and spin the wheel.
            </Typography>
            {lastPicked && (
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                Last picked: {lastPicked}
              </Typography>
            )}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
              alignItems: "stretch",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <Wheel
                items={options}
                onResult={(value) => setLastPicked(value)}
                contentSize={panelContentSize}
              />
            </Box>
            <Box sx={{ height: "100%" }}>
              <WheelInput
                value={optionsText}
                onChange={setOptionsText}
                contentSize={panelContentSize}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Stack>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Spin & Pick</title>;
