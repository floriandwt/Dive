import "@/styles/globals.css";
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

const BDO = localFont({
  src: [
    {
      path: "../../public/fonts/BDOGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BDOGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/BDOGrotesk-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/BDOGrotesk-Black.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bdo",
});

const InterFont = Inter({
  weights: [400, 500, 600, 700],
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={InterFont.className}>
      <Component {...pageProps} />
    </div>
  );
}
