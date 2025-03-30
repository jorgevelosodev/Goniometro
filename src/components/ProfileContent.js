import { useState } from "react";

export default function ProfileContent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    organization: "ThemeSelection",
    phoneNumber: "",
    address: "",
    state: "",
    zipCode: "",
    country: "",
    language: "",
    timeZones: "",
    currency: "",
    accountDeactivation: false
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Formulário enviado!");
  };

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
                    src={selectedFile ? URL.createObjectURL(selectedFile) : "../assets/img/avatars/1.png"}
                    alt="user-avatar"
                    className="d-block rounded"
                    height="100"
                    width="100"
                    id="uploadedAvatar"
                  />
                  <div className="button-wrapper">
                    <label htmlFor="upload" className="btn btn-primary me-2 mb-4">
                      <span className="d-none d-sm-block">Carregar nova foto</span>
                      <i className="bx bx-upload d-block d-sm-none"></i>
                      <input type="file" id="upload" className="account-file-input" hidden accept="image/png, image/jpeg" onChange={handleFileChange} />
                    </label>
                    <button type="button" className="btn btn-outline-secondary account-image-reset mb-4" onClick={() => setSelectedFile(null)}>
                      <i className="bx bx-reset d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Resetar</span>
                    </button>
                    <p className="text-muted mb-0">JPG, GIF ou PNG permitidos. Tamanho máximo de 800K</p>
                  </div>
                </div>
              </div>

              <hr className="my-0" />
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input className="form-control" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} autoFocus />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input className="form-control" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="email" className="form-label">E-mail</label>
                      <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="organization" className="form-label">Organization</label>
                      <input className="form-control" type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                      <input className="form-control" type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="202 555 0111" />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="country" className="form-label">Country</label>
                      <select id="country" name="country" className="form-select" value={formData.country} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Brazil">Brazil</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
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
                <form>
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
      <div className="content-backdrop fade"></div>
    </div>
  );
}
