import '@/styles/globals.css';

import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();

    Promise.all([
      // Importação de scripts
      import('../../public/assets/vendor/bootstrap/js/bootstrap.bundle.min.js'),
  

      // Importação de estilos CSS
      import('../../public/assets/vendor/bootstrap-icons/bootstrap-icons.css'),
      import('../../public/assets/vendor/aos/aos.css'),
      import('../../public/assets/vendor/fontawesome-free/css/all.min.css'),
      import('../../public/assets/vendor/glightbox/css/glightbox.min.css'),
      import('../../public/assets/vendor/swiper/swiper-bundle.min.css'),
      import('../../public/assets/vendor/css/pages/page-auth.css'),
      import('../../public/assets/vendor/css/theme-default.css'),
      import('../../public/assets/vendor/css/core.css'),
      import("../../public/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css")
    ])
    .then(() => console.log('Todos os arquivos carregados com sucesso!'))
    .catch(err => console.error('Erro ao carregar arquivos:', err));
  }, []);

  <ToastContainer position="top-right" autoClose={3000} />
  return <Component {...pageProps} />;
}
