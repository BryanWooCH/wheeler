import * as React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { changelogEntries } from "../../data/changelog";

const ChangelogContent: React.FC = () => {
  return (
    <>
      {changelogEntries.map((entry, index) => (
        <Box key={`${entry.version}-${entry.date}`}>
          {index > 0 && <Divider sx={{ mb: 2.5 }} />}
          <Stack spacing={1}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.5, sm: 1.5 }}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Typography variant="h6" component="h2" fontWeight={700}>
                {entry.version}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {entry.date}
              </Typography>
            </Stack>

            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {entry.items.map((item) => (
                <Typography
                  key={item}
                  component="li"
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 0.75 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Box>
      ))}
    </>
  );
};

export default ChangelogContent;
