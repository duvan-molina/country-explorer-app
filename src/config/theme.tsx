import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: `-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
    button: `sans-serif, Arial, Helvetica`,
  },
});

export default theme;
