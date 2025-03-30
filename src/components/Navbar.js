import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
      <div className="navbar-nav-left d-flex align-items-center" style={{ marginLeft: "auto" }}>
        <span className="username" style={{ marginRight: "10px" }}>Luchazes do Nascimento</span>
        
        {/* Avatar clicável */}
        <div className="avatar avatar-online" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: "pointer" }}>
          <Image src="/assets/img/avatars/1.png" alt="User" width={40} height={40} className="rounded-circle" />
          {/* Dropdown */}
        <li className={`nav-item navbar-dropdown dropdown-user dropdown ${isDropdownOpen ? "show" : ""}`} style={{ position: "relative",  }}>
          <ul className="dropdown-menu dropdown-menu-end" style={{ display: isDropdownOpen ? "block" : "none", position: "absolute", right: 0, top:0.5 }}>
            <li>
              <a className="dropdown-item" href="#">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar avatar-online">
                      <Image src="/assets/img/avatars/1.png" alt="User" width={40} height={40} className="rounded-circle" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <span className="fw-semibold d-block">John Doe</span>
                  </div>
                </div>
              </a>
            </li>
            <li><div className="dropdown-divider"></div></li>
            <li>
              <a className="dropdown-item" href="/profile">
                <i className="bx bx-user me-2"></i>
                <span className="align-middle">Meu Perfil</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/login">
                <i className="bx bx-power-off me-2"></i>
                <span className="align-middle">Log Out</span>
              </a>
            </li>
          </ul>
        </li>
        </div>
      </div>
    </nav>
  );
}
