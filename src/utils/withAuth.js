import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify"; // Biblioteca para os toasts

export default function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("usuario"));

      if (!userData || !userData.nivelacesso) {
        toast.warn("Você precisa fazer login primeiro!"); // Exibir alerta
        router.replace("/login"); // Redirecionar para a página de login
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
