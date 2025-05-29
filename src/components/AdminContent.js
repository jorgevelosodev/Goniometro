import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileContentAdmin() {
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    foto: "",
  });

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      setUserId(usuario.id);
      fetchUserData(usuario.id);
    }
  }, []);

  const fetchUserData = async (id) => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("nome, email, foto")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Erro ao carregar dados do usuário.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      nome: data.nome,
      email: data.email,
      foto: data.foto || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `profile_pictures/${userId}.${fileExt}`;

    const { error } = await supabase.storage
      .from("imagens")
      .upload(filePath, file, { upsert: true });

    if (error) {
      toast.error("Erro ao enviar imagem.");
      setUploading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("usuarios")
      .update({ foto: filePath })
      .eq("id", userId);

    if (!updateError) {
      toast.success("Imagem atualizada com sucesso!");
      setFormData((prev) => ({ ...prev, foto: filePath }));
      const updatedUser = { ...JSON.parse(localStorage.getItem("usuario")), foto: filePath };
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
    } else {
      toast.error("Erro ao atualizar imagem.");
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }


    const updates = {
      nome: formData.nome,
      email: formData.email,
    };

    if (formData.senha) {
          const hashedPassword = await bcrypt.hash(formData.senha, 10);
          updates.senha = hashedPassword;
     }

    const { error } = await supabase
      .from("usuarios")
      .update(updates)
      .eq("id", userId);

    if (error) {
      toast.error("Erro ao atualizar perfil.");
    } else {
      toast.success("Perfil atualizado com sucesso!");
      const updatedUser = {
        ...JSON.parse(localStorage.getItem("usuario")),
        nome: formData.nome,
        email: formData.email,
      };
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
    }
  };

  const fotoUrl = formData.foto
    ? supabase.storage.from("imagens").getPublicUrl(formData.foto).data.publicUrl
    : "../assets/img/avatars/foto-padrao.jpg";

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card mb-4">
          <h5 className="card-header">Editar Perfil do Administrador</h5>
          <div className="card-body">
            <div className="d-flex align-items-start gap-4 mb-4">
              <img
                src={fotoUrl}
                alt="avatar"
                className="d-block rounded"
                height="100"
                width="100"
              />
              <div>
                <label htmlFor="upload" className="btn btn-primary mb-2">
                  Carregar nova foto
                  <input
                    type="file"
                    id="upload"
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-muted mb-0">JPG ou PNG. Máx: 800KB</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Nome</label>
                  <input
                    className="form-control"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">E-mail</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Nova Senha</label>
                  <input
                    className="form-control"
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Confirmar Nova Senha</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
