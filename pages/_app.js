import { useEffect } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 200,
    });
  });

  return <Component {...pageProps} />
}

export default MyApp
