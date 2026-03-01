import * as React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Typography variant="h6" component="h1" fontWeight={700}>
            Picker Wheel
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
