import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileContent() {
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fotoPath, setFotoPath] = useState(""); // Novo state para guardar o path da imagem

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    foto: "",
    idade: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      setUserId(usuario.id);
      fetchUserData(usuario.id);
    }
  }, []);

  const fetchUserData = async (id) => {
    // Primeira consulta para pegar dados do usuário
    const { data: usuarioData, error: usuarioError } = await supabase
      .from("usuarios")
      .select("nome, email, foto, telefone")
      .eq("id", id)
      .single();
  
    if (usuarioError) {
      toast.error("Erro ao carregar dados do usuário.");
      console.error(usuarioError);
      return;
    }
  
    // Segunda consulta para pegar a idade do paciente
    const { data: pacienteData, error: pacienteError } = await supabase
      .from("pacientes")
      .select("idade")
      .eq("id", id)
      .single();
  
    if (pacienteError) {
      toast.error("Erro ao carregar dados do paciente.");
      console.error(pacienteError);
      return;
    }
  
    // Atualiza o estado com os dados de ambos
    setFormData((prev) => ({
      ...prev,
      name: usuarioData.nome || "",
      email: usuarioData.email || "",
      phoneNumber: usuarioData.telefone || "",
      foto: usuarioData.foto || "",
      idade: pacienteData?.idade || "", // Adiciona a idade do paciente
    }));
  
    setFotoPath(usuarioData.foto || "");
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    const hashedPassword = await bcrypt.hash(formData.senha, 10);

    const { error: pacienteError } = await supabase
      .from("pacientes")
      .update({
        nome: formData.name,
        email: formData.email,
        telefone: formData.phoneNumber,
        idade: formData.idade,
      })
      .eq("id", userId);

    if (pacienteError) {
      toast.error("Erro ao atualizar dados do paciente.");
      return;
    }

    const { error: usuarioError } = await supabase
      .from("usuarios")
      .update({
        nome: formData.name,
        email: formData.email,
        telefone: formData.phoneNumber,
        senha: hashedPassword,
        foto: fotoPath,
      })
      .eq("id", userId);

    if (usuarioError) {
      toast.error("Erro ao atualizar dados do usuário.");
      return;
    }

    toast.success("Informações atualizadas com sucesso!");
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("usuario")),
      nome: formData.name,
      email: formData.email,
      telefone: formData.phoneNumber,
      foto: fotoPath,
    };
    localStorage.setItem("usuario", JSON.stringify(updatedUser));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !userId) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `profile_pictures/${userId}.${fileExt}`;

    const { error } = await supabase.storage
      .from("imagens")
      .upload(filePath, file, { upsert: true });

    if (error) {
      toast.error("Erro ao enviar imagem.");
      console.error(error);
      setUploading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("usuarios")
      .update({ foto: filePath })
      .eq("id", userId);

    if (updateError) {
      toast.error("Erro ao atualizar imagem.");
      console.error(updateError);
    } else {
      toast.success("Imagem atualizada com sucesso!");
      setFormData((prev) => ({ ...prev, foto: filePath }));
      setFotoPath(filePath);
    }

    const updatedUser = { ...JSON.parse(localStorage.getItem("usuario")), foto: filePath };
    localStorage.setItem("usuario", JSON.stringify(updatedUser));

    setUploading(false);
  };

  const fotoUrl = useMemo(() => {
    return formData.foto
      ? supabase.storage.from("imagens").getPublicUrl(formData.foto).data.publicUrl
      : "/assets/img/avatars/foto-padrao.jpg";
  }, [formData.foto]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <span className="nav-link active" style={{ cursor: "default" }}>
                  <i className="bx bx-user me-1"></i> Meu Perfil
                </span>
              </li>
            </ul>

            <div className="card mb-4">
              <h5 className="card-header">Detalhes do Perfil</h5>

              <div className="card-body">
                <div className="d-flex align-items-start align-items-sm-center gap-4">
                  <img
                    src={fotoUrl}
                    alt="doctor-avatar"
                    className="d-block rounded"
                    height="100"
                    width="100"
                  />
                  <div className="button-wrapper">
                    <label htmlFor="upload" className="btn btn-primary me-2 mb-4">
                      <span className="d-none d-sm-block">Carregar nova foto</span>
                      <i className="bx bx-upload d-block d-sm-none"></i>
                      <input
                        type="file"
                        id="upload"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-muted mb-0">JPG, GIF ou PNG permitidos. Tamanho máximo de 800K</p>
                  </div>
                </div>
              </div>

              <hr className="my-0" />
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="name" className="form-label">Nome completo</label>
                      <input className="form-control" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="email" className="form-label">E-mail</label>
                      <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">Telefone</label>
                      <input className="form-control" type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+244 9XXXXXXXX" />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="idade" className="form-label">Idade</label>
                      <input className="form-control" type="number" id="idade" name="idade" value={formData.idade} onChange={handleChange} placeholder="18" />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="password">Senha</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <span
                          className="input-group-text"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className={showPassword ? "bx bx-show" : "bx bx-hide"}></i>
                        </span>
                      </div>
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="confirm-password">Confirmar Senha</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirm-password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <span
                          className="input-group-text"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className={showConfirmPassword ? "bx bx-show" : "bx bx-hide"}></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button type="submit" className="btn btn-primary me-2">Salvar alterações</button>
                    <button type="reset" className="btn btn-outline-secondary">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-backdrop fade"></div>
      <ToastContainer />
    </div>
  );
}
