import Head from "next/head";
import Link from "next/link";
import { useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "../../utils/withAuth";

function RegisterPatient() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    idade: "",
    sexo: "",
    historico: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handlePasswordToggle = (field) => {
    if (field === "senha") setShowPassword((prev) => !prev);
    else if (field === "confirmarSenha") setShowConfirmPassword((prev) => !prev);
  };

  const handleRegister = async () => {
    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    const medicoLogado = JSON.parse(localStorage.getItem("usuario"));
    const medicoId = medicoLogado?.id;

    if (!medicoId || medicoLogado.nivelacesso !== "medico") {
      toast.error("Apenas médicos podem cadastrar pacientes!");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.senha, 10);

      const { data: usuarioData, error: usuarioError } = await supabase
        .from("usuarios")
        .insert([
          {
            nome: formData.nome,
            telefone: formData.telefone,
            email: formData.email,
            senha: hashedPassword,
            nivelacesso: "paciente",
          },
        ])
        .select("id");

      if (usuarioError) {
        console.error("Erro ao inserir na tabela usuarios:", usuarioError);

        if (usuarioError.code === "23505") {
          toast.error("Erro: Este email já está cadastrado!");
        } else {
          toast.error("Erro ao cadastrar paciente!");
        }
        return;
      }

      if (!usuarioData || usuarioData.length === 0 || !usuarioData[0]?.id) {
        toast.error("Erro ao cadastrar paciente! Não foi possível obter o ID do usuário.");
        return;
      }

      const pacienteId = usuarioData[0]?.id;

      // Garantindo que o valor de sexo seja "male" ou "female"
      const sexoFormatado = formData.sexo === "male" ? "male" : "female";

      console.log("Inserindo na tabela pacientes...");
      const { error: pacienteError } = await supabase.from("pacientes").insert([
        {
          id: pacienteId,
          nome: formData.nome,
          telefone: formData.telefone,
          idade: formData.idade,
          sexo: sexoFormatado,
          email: formData.email,
          historico: formData.historico,
          medico_id: medicoId,
        },
      ]);

      if (pacienteError) {
        console.error("Erro ao inserir na tabela pacientes:", pacienteError);
        toast.error("Erro ao cadastrar paciente na tabela de pacientes!");
        return;
      }

      toast.success("Paciente cadastrado com sucesso!");
      setFormData({
        nome: "",
        telefone: "",
        idade: "",
        sexo: "",
        historico: "",
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

  return (
    <>
      <Head>
        <title>Cadastro de Paciente</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      {/* Container do Toast */}
      <ToastContainer />

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <Link href="/dashboard">
                    <span className="demo text-body fw-bolder">Cadastrar Paciente</span>
                  </Link>
                </div>

                <form className="mb-3" onSubmit={handleSubmit}>
                  {[
                    { label: "Nome completo", name: "nome", type: "text", placeholder: "Insira o seu nome completo" },
                    { label: "Telefone", name: "telefone", type: "tel", placeholder: "+244 9XX-XXX-XXX" },
                    { label: "Idade", name: "idade", type: "number", placeholder: "Insira a sua idade" },
                    { label: "Email", name: "email", type: "email", placeholder: "Insira o seu email" },
                  ].map(({ label, name, type, placeholder }) => (
                    <div key={name} className="mb-3">
                      <label htmlFor={name} className="form-label">{label}</label>
                      <input type={type} className="form-control" name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} required />
                    </div>
                  ))}

                  <div className="mb-3">
                    <label className="form-label">Sexo</label>
                    {["male", "female"].map((sexo) => (
                      <div className="form-check" key={sexo}>
                        <input className="form-check-input" type="radio" name="sexo" value={sexo} checked={formData.sexo === sexo} onChange={handleChange} required />
                        <label className="form-check-label">{sexo === "male" ? "Masculino" : "Feminino"}</label>
                      </div>
                    ))}
                  </div>

                  <div className="mb-3">
                    <textarea className="form-control" name="historico" value={formData.historico} onChange={handleChange} rows="5" placeholder="Histórico Médico" required></textarea>
                  </div>

                  {["senha", "confirmarSenha"].map((field) => (
                    <div className="mb-3 form-password-toggle" key={field}>
                      <label className="form-label">{field === "senha" ? "Senha" : "Confirmar Senha"}</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={field === "senha" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")}
                          name={field}
                          className="form-control"
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
                        />
                        <span className="input-group-text cursor-pointer" onClick={() => handlePasswordToggle(field)}>
                          <i className={field === "senha" ? (showPassword ? "bx bx-show" : "bx bx-hide") : (showConfirmPassword ? "bx bx-show" : "bx bx-hide")}></i>
                        </span>
                      </div>
                    </div>
                  ))}

                  <button type="submit" className="btn btn-primary d-grid w-100">
                    Registrar Paciente
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

export default withAuth(RegisterPatient)
