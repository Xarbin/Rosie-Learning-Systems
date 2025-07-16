import '../styles/globals.css';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }) {
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
