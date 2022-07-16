import "@/styles/global.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "src/theme/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
