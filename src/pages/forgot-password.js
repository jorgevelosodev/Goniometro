// pages/auth/forgot-password.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { sendResetPasswordEmail } from "../lib/email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    if (error || !data) {
      toast.error("Email não encontrado!");
      return;
    }

    const resetLink = `${window.location.origin}/reset-password?userId=${data.id}`;

    try {
      await sendResetPasswordEmail(email, resetLink);
      toast.success("Link de redefinição enviado! Verifique seu e-mail.");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar o e-mail. Tente novamente.");
    }
  };

  return (
    <>
      <Head><title>Esqueci a senha - GoE</title></Head>
      <ToastContainer />
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <Link href="/">
                    <span className="app-brand-text demo text-body fw-bolder">GoE</span>
                  </Link>
                </div>

                <h4 className="mb-2">Esqueceu sua senha?</h4>
                <p className="mb-4">Digite seu e-mail para redefinir a senha</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary d-grid w-100">
                    Enviar link de redefinição
                  </button>
                </form>

                <p className="text-center mt-3">
                  <Link href="/">Voltar para login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
