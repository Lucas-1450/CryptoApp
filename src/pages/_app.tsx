import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar/Navbar";
import Provider from "@/context/Provider";
import Footer from "@/components/Footer/Footer";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
      <Head>
          <title>Display Crypto</title>
          <link rel="icon" type="image/png" href="/logo_display.png" />
      </Head>
      <Provider>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </Provider>
    </div>
  );
}
