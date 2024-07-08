import { useEffect } from "react"
import { useRouter } from 'next/router';
import AOS from 'aos';
import PlausibleProvider from 'next-plausible'
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
const slackey = localFont({ src: '../fonts/Slackey/Slackey-Regular.ttf', variable: "--font-slackey" })

import 'aos/dist/aos.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 300,
    });
  });

  return (
    <div className={`${slackey.variable}`}>
      <PlausibleProvider domain="connectedkw.com">
        <Component {...pageProps} />
      </PlausibleProvider>
      <Analytics />
    </div>
  );
}

export default MyApp
