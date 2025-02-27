import { useEffect } from "react";
import AOS from "aos";
import Navbar from "../components/organisms/Navbar";
import MainBanner from "../components/organisms/MainBanner";
import TransactionStep from "../components/organisms/TransactionStep";
import FeaturedGame from "../components/organisms/FeaturedGames";
import Reached from "../components/organisms/Reached";
import Story from "../components/organisms/Story";
import Footer from "../components/organisms/Footer";
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      {/* <!-- Navbar --> */}
      <Head>
        <title>Store GG by Dharma Wiguna</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
      </Head>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
