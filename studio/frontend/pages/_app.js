import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const errorHandler = (event) => {
      if (typeof event?.message === 'string' && event.message.includes('MetaMask')) {
        event.preventDefault();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }
      }
    };

    const rejectionHandler = (event) => {
      const reason = event?.reason;
      const message = typeof reason === 'string' ? reason : reason?.message;
      if (typeof message === 'string' && message.includes('MetaMask')) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Rosie AI</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
