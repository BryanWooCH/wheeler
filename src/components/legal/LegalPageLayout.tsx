import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";

type LegalPageLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="md">
          <Stack spacing={2.5}>
            <Typography variant="h4" component="h1" fontWeight={700}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {children}
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Stack>
  );
};

export default LegalPageLayout;
