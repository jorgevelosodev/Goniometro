import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsMedical() {
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    especialidade: "",
    telefone: "",
    clinicAddress: "",
    foto: "",
    accountDeactivation: false,
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
      .select("nome, email, especialidade, telefone, clinicAddress, foto")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Erro ao carregar dados do usuário.");
      console.error(error);
      return;
    }

    setFormData(data);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
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
    }

    const updatedUser = { ...JSON.parse(localStorage.getItem("usuario")), foto: filePath };
    localStorage.setItem("usuario", JSON.stringify(updatedUser));

    setUploading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from("usuarios")
      .update({
        nome: formData.nome,
        email: formData.email,
        especialidade: formData.especialidade,
        telefone: formData.telefone,
        clinicAddress: formData.clinicAddress,
      })
      .eq("id", userId);

    if (error) {
      toast.error("Erro ao atualizar perfil.");
      console.error(error);
    } else {
      toast.success("Perfil atualizado com sucesso!");
      const updatedUser = {
        ...JSON.parse(localStorage.getItem("usuario")),
        nome: formData.nome,
        email: formData.email,
        especialidade: formData.especialidade,
        telefone: formData.telefone,
        clinicAddress: formData.clinicAddress,
      };
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
    }
  };

  const handleDeactivateAccount = (event) => {
      event.preventDefault();
      if (!formData.accountDeactivation) {
        toast.error("Você deve marcar o checkbox para confirmar a desativação.");
        return;
      }
      toast.warning("Conta desativada com sucesso!");
    };

  const fotoUrl = formData.foto
    ? supabase.storage.from("imagens").getPublicUrl(formData.foto).data.publicUrl
    : "../assets/img/avatars/1.png";

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <span className="nav-link active">
                  <i className="bx bx-user me-1"></i> Meu Perfil Médico
                </span>
              </li>
            </ul>

            <div className="card mb-4">
              <h5 className="card-header">Detalhes do Perfil Médico</h5>

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
                      <input
                        type="file"
                        id="upload"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-muted mb-0">JPG ou PNG. Tamanho máximo: 800KB</p>
                  </div>
                </div>
              </div>

              <hr className="my-0" />

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {[
                      { label: "Nome", name: "nome", type: "text", value: formData.nome },
                      { label: "E-mail", name: "email", type: "email", value: formData.email },
                      { label: "Especialidade", name: "especialidade", type: "text", value: formData.especialidade },
                      { label: "Telefone", name: "telefone", type: "text", value: formData.telefone },
                      { label: "Endereço da Clínica", name: "clinicAddress", type: "text", value: formData.clinicAddress },
                    ].map(({ label, name, type, value }) => (
                      <div className="mb-3 col-md-6" key={name}>
                        <label htmlFor={name} className="form-label">{label}</label>
                        <input
                          className="form-control"
                          type={type}
                          id={name}
                          name={name}
                          value={value || ""}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <button type="submit" className="btn btn-primary me-2">Salvar alterações</button>
                    <button type="reset" className="btn btn-outline-secondary">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <h5 className="card-header">Excluir conta</h5>
              <div className="card-body">
                <div className="mb-3 col-12 mb-0">
                  <div className="alert alert-warning">
                    <h6 className="alert-heading fw-bold mb-1">Tem certeza de que deseja excluir sua conta?</h6>
                    <p className="mb-0">Depois que você excluir sua conta, não há como voltar atrás. Por favor, tenha certeza.</p>
                  </div>
                </div>
                <form onSubmit={handleDeactivateAccount}>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="accountActivation" name="accountDeactivation" checked={formData.accountDeactivation} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="accountActivation">
                      Confirmo a desativação da minha conta
                    </label>
                  </div>
                  <button type="submit" className="btn btn-danger deactivate-account">Desativar conta</button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
