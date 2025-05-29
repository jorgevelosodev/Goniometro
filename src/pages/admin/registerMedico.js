import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "../../utils/withAuth";

function RegisterMedico() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(user);
  }, []);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleRegister = async () => {
    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.senha, 10);

      const { error } = await supabase.from("usuarios").insert([
        {
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
          senha: hashedPassword,
          nivelacesso: "medico",
        },
      ]);

      if (error) {
        console.error("Erro ao cadastrar médico:", error);
        toast.error("Erro ao cadastrar médico!");
        return;
      }

      toast.success("Médico cadastrado com sucesso!");
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
      });
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Ocorreu um erro inesperado!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  if (usuario?.nivelacesso !== "admin") {
    return <p>Você não tem permissão para acessar esta página.</p>;
  }

  return (
    <>
      <Head>
        <title>Cadastro de Médico</title>
      </Head>
      <ToastContainer />

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <Link href="/dashboard">
                    <span className="demo text-body fw-bolder">Cadastrar Médico</span>
                  </Link>
                </div>

                <form className="mb-3" onSubmit={handleSubmit}>
                  {["nome", "telefone", "email"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                  {["senha", "confirmarSenha"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label className="form-label">{field === "senha" ? "Senha" : "Confirmar Senha"}</label>
                      <input
                        type="password"
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                  <button type="submit" className="btn btn-primary d-grid w-100">
                    Registrar Médico
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(RegisterMedico);
