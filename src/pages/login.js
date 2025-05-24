import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import bcrypt from "bcryptjs"; // Importando bcryptjs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Buscar o usuário pelo email
    const { data, error } = await supabase
      .from("usuarios") // Certifique-se de que este é o nome correto da tabela
      .select("*") // Buscar TODOS os dados do usuário
      .eq("email", email)
      .single();

      //console.log("Usuário buscado:", data);
      //console.log("Erro (se houver):", error);
  
    if (error || !data) {
      toast.error("Email ou senha incorretos!", { position: "top-right" });
      return;
    }
  
    // Comparar a senha fornecida com a senha armazenada
    const senhaCorreta = await bcrypt.compare(password, data.senha);
    
    if (!senhaCorreta) {
      toast.error("Email ou senha incorretos!", { position: "top-right" });
      return;
    }
  
    // Se a senha for correta
    toast.success("Login bem-sucedido!", { position: "top-right" });
  
    // Remover a senha antes de salvar no localStorage
    const { ...dadosUsuario } = data;
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
  
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Login - GoE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ToastContainer />

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <Link href="/dashboard">
                    <span className="app-brand-text demo text-body fw-bolder">
                      GoE
                    </span>
                  </Link>
                </div>

                <h4 className="mb-2">Bem-vindo ao GoE!</h4>

                <form id="formAuthentication" className="mb-3" onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Insira teu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">Senha</label>
                      <Link href="/forgot-password">
                        <small>Esqueceu a senha?</small>
                      </Link>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={showPassword ? "bx bx-show" : "bx bx-hide"}></i>
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
