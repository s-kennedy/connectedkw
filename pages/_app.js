import { useEffect } from "react"
import { useRouter } from 'next/router';
import AOS from 'aos';
import { Analytics } from '@vercel/analytics/react';


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
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp
