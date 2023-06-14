import "@/styles/globals.css";
import localFont from 'next/font/local'

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

export default function App({ Component, pageProps }) {
  return (
    <div className={BDO.className}>
      <Component {...pageProps} />
    </div>
  );
}
