import Image from "next/image";

import Head from 'next/head';
import Hero from '../app/components/Hero';
import HowItWorks from '../app/components/HowItWorks';
import Categories from '../app/components/Categories';
import Testimonials from '../app/components/Testimonials';
import Footer from '../app/components/Footer';
import FeaturesSection from "./components/Features";
import CallToActionSection from "./components/CTA";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Advantage Match</title>
        <meta name="description" content="Connect with professional consultants on-demand" />
      </Head>
      <main>
        <Navbar />
        <Hero />
        <FeaturesSection/>
        <HowItWorks />
        <Testimonials />
        <CallToActionSection/>
      </main>
      <Footer />
    </>
  );
}

