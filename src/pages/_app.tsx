import type { AppProps } from "next/app";

import "../style.css";
import "../App.css";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
