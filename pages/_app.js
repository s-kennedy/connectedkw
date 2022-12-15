import { useEffect } from "react"
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import AOS from 'aos';

import 'aos/dist/aos.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('ZSPHFIOF', {
      includedDomains: ['www.unboringkw.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 200,
    });
  });

  return <Component {...pageProps} />
}

export default MyApp
