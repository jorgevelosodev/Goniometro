import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(userData);
  
    if (userData?.foto) {
      const { data } = supabase.storage.from("imagens").getPublicUrl(userData.foto);
      setFotoUrl(data?.publicUrl);
    }

    const syncUserFoto = () => {
      const userData = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(userData);
      if (userData?.foto) {
        const { data } = supabase.storage.from("imagens").getPublicUrl(userData.foto);
        setFotoUrl(data?.publicUrl);
      }
    };
  
    syncUserFoto();
  
    window.addEventListener("storage", syncUserFoto);
  
    return () => {
      window.removeEventListener("storage", syncUserFoto);
    };

  }, []);


  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
      <div className="navbar-nav-left d-flex align-items-center" style={{ marginLeft: "auto" }}>
        <span className="username" style={{ marginRight: "10px" }}>
          {usuario?.nome || "Usuário"}
        </span>

        {/* Avatar clicável */}
        <div className="avatar avatar-online" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: "pointer" }}>
        <img
          src={fotoUrl || "../assets/img/avatars/foto-padrao.jpg"}
          alt="User"
          width={40}
          height={40}
          className="rounded-circle"
          />

          {/* Dropdown */}
          <li className={`nav-item navbar-dropdown dropdown-user dropdown ${isDropdownOpen ? "show" : "none"}`} style={{ position: "relative" }}>
            <ul className="dropdown-menu dropdown-menu-end" style={{ display: isDropdownOpen ? "block" : "none", position: "absolute", right: 0, top: 0.5 }}>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                      <img
          src={fotoUrl || "../assets/img/avatars/foto-padrao.jpg"}
          alt="User"
          width={40}
          height={40}
          className="rounded-circle"
          />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">
                        {usuario?.nome || "Usuário"}
                      </span>
                    </div>
                  </div>
                </a>
              </li>

              <li><div className="dropdown-divider"></div></li>

              {usuario?.nivelacesso === "paciente" && (
                <li>
                  <a className="dropdown-item" href="/user/profile">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">Meu Perfil</span>
                  </a>
                </li>
              )}

              {usuario?.nivelacesso === "medico" && (
                <li>
                  <a className="dropdown-item" href="/doctor/profileMedical">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">Meu Perfil</span>
                  </a>
                </li>
              )}

              {usuario?.nivelacesso === "admin" && (
  <li>
    <a className="dropdown-item" href="/admin/profileAdmin">
      <i className="bx bx-user me-2"></i>
      <span className="align-middle">Meu Perfil</span>
    </a>
  </li>
)}

              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </button>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </nav>
  );
}
