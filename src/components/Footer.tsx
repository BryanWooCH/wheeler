import * as React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ borderTop: "1px solid", borderColor: "divider", py: 2.5, mt: 6 }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body2" color="text.secondary">
            Built with Gatsby, MUI, and styled-components
          </Typography>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Link href="/privacy-policy" underline="hover" variant="body2">
            Privacy Policy
          </Link>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Link href="/changelog" underline="hover" variant="body2">
            Changelog
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
