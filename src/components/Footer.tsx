import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ borderTop: "1px solid", borderColor: "divider", py: 2.5, mt: 6 }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          Built with Gatsby, MUI, and styled-components
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
