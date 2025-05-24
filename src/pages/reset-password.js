import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
  const validateUser = async () => {
    const { userId } = router.query;

    if (!userId) return; // aguarde o router.isReady

    const { data, error } = await supabase
      .from("usuarios")
      .select("id")
      .eq("id", userId)
      .single();

    if (error || !data) {
      toast.error("Link inválido ou expirado.");
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setUserId(userId);
      setLoading(false);
    }
  };

  if (router.isReady) {
    validateUser();
  }
}, [router.isReady, router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
      .from("usuarios")
      .update({ senha: hashedPassword })
      .eq("id", userId);

    if (error) {
      toast.error("Erro ao redefinir a senha.");
    } else {
      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <>
      <Head><title>Redefinir senha - GoE</title></Head>
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

                <h4 className="mb-2">Redefina sua senha</h4>
                <p className="mb-4">Digite a nova senha para sua conta</p>

                {loading ? (
                  <p className="text-center">Verificando link...</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">Nova senha</label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirmar nova senha</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirme a nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-success d-grid w-100">
                      Redefinir senha
                    </button>
                  </form>
                )}

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
