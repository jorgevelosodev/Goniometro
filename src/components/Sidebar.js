import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../../public/assets/css/demo.css";

export default function Sidebar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(userData);
  }, []);

  // Função para verificar se a rota está ativa
  const isActive = (path) => router.pathname === path ? "menu-item active" : "menu-item";

  if (!usuario) return null; // Se não houver usuário, não exibe nada

  return (
    <aside className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <Link href="/dashboard" className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Goe</span>
        </Link>
      </div>

      <ul className="menu-inner py-1">
        <li className={isActive("/dashboard")}>
          <Link href="/dashboard" className="menu-link">
            <i className="menu-icon tf-icons bx bxs-dashboard"></i>
            <div>Dashboard</div>
          </Link>
        </li>

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Menu</span>
        </li>

      {/* Opções para médicos */}
      {usuario.nivelacesso === "medico" && (
          <>
        <li className={isActive("/conection")}>
          <Link href="/conection" className="menu-link">
            <i className="menu-icon tf-icons bx bx-cube-alt"></i>
            <div>Medir</div>
          </Link>
        </li>


            <li className={isActive("/doctor/reports")}>
              <Link href="/doctor/reports" className="menu-link">
                <i className="menu-icon tf-icons bx bx-bell me-1"></i>
                <div>Relatórios</div>
              </Link>
            </li>
            <li className={isActive("/doctor/registerPatient")}>
              <Link href="/doctor/registerPatient" className="menu-link">
                <i className="menu-icon tf-icons bx bx-user-plus me-1"></i>
                <div>Cadastrar Pacientes</div>
              </Link>
            </li>
            <li className={isActive("/doctor/userList")}>
              <Link href="/doctor/userList" className="menu-link">
                <i className="menu-icon tf-icons bx bxs-user-detail"></i>
                <div>Lista de Usuários</div>
              </Link>
            </li>
          </>
        )}

        {/* Opções para pacientes */}
        {usuario.nivelacesso === "paciente" && (
          <li className={isActive("/user/myMedicines")}>
            <Link href="/user/myMedicines" className="menu-link">
              <i className="menu-icon tf-icons bx bx-plus-medical"></i>
              <div>Minhas Medições</div>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
