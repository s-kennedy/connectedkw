import { useEffect } from "react"
import { useRouter } from 'next/router';
import AOS from 'aos';

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

  return <Component {...pageProps} />
}

export default MyApp
