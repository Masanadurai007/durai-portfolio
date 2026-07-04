import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Works from "./components/Works";
import Experience from "./components/Experience";
// import Writing from "./components/Writing";
import Contact from "./components/Contact";
import ChatAgent from "./components/ChatAgent";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackgroundTexture from "./components/BackgroundTexture";
// import { PROFILE } from "./data/content";

function App() {
  return (
    <div className="min-h-screen bg-void-950 text-ink-300 relative">
      <BackgroundTexture />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Works />
        <Experience />
        {/* <Writing /> */}
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatAgent />
    </div>
  );
}

export default App;
