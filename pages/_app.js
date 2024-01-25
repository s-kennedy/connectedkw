import { useEffect } from "react"
import { useRouter } from 'next/router';
import AOS from 'aos';
import PlausibleProvider from 'next-plausible'
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
const jackerton = localFont({ src: '../fonts/Jackerton-Regular.otf', variable: "--font-jackerton" })

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
    <div className={`${jackerton.variable}`}>
      <PlausibleProvider domain="unboringkw.com">
        <Component {...pageProps} />
      </PlausibleProvider>
      <Analytics />
    </div>
  );
}

export default MyApp
