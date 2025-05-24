import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import('../../public/assets/css/main.css')
import('../../public/assets/css/demo.css')

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Garante que está no cliente
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null; // Evita o erro de hidratação

  return (
    <>
      <Head>
        <title>Home - GoE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/img/favicon.png" />
      </Head>

      {/* Se estiver carregando, exibe o preloader */}
      {loading ? (
        <div id="preloader"></div>
      ) : (
        <>
          <Header />
          <main>
            <Hero />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
