import { useEffect } from "react"
import { useRouter } from 'next/router';
import localFont from 'next/font/local';
import AOS from 'aos';
import PlausibleProvider from 'next-plausible'
const jackerton = localFont({ src: '../fonts/Jackerton-Regular.otf', variable: "--font-jackerton" })

import 'aos/dist/aos.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 200,
    });
  });

  return (
    <div className={`${jackerton.variable}`}>
      <PlausibleProvider domain="unboringkw.com">
        <Component {...pageProps} />
      </PlausibleProvider>
    </div>
  );
}

export default MyApp
