import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Metadados */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Ícones (Corrigido o caminho) */}
        <link rel="icon" href="/assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.4/css/boxicons.min.css" />

        {/* Scripts Helpers */}
        <script src="/assets/vendor/js/helpers.js" defer></script>
        <script src="/assets/js/config.js" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Scripts de vendors */}
        <script src="/assets/vendor/libs/jquery/jquery.js" defer></script>
        <script src="/assets/vendor/libs/popper/popper.js" defer></script>
        <script src="/assets/vendor/js/bootstrap.js" defer></script>
        <script src="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js" defer></script>
        <script src="/assets/vendor/js/menu.js" defer></script>
        <script src="/assets/vendor/aos/aos.js" defer></script>
        <script src="/assets/vendor/glightbox/js/glightbox.min.js" defer></script>
        <script src="/assets/vendor/purecounter/purecounter_vanilla.js" defer></script>
        <script src="/assets/vendor/swiper/swiper-bundle.min.js" defer></script>
        <script src="/assets/js/main.js" defer></script>
        <script src="/assets/vendor/libs/apex-charts/apexcharts.js" defer></script>
        <script src="../assets/js/dashboards-analytics.js" defer></script>
      </body>
    </Html>
  );
}
