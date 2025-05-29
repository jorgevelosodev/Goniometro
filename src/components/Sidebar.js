import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase"; // importe o supabase
import "../../public/assets/css/demo.css";

export default function Sidebar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [medicoNome, setMedicoNome] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(userData);

    // Se o usuário for paciente, buscar o medico_id na tabela paciente
    if (userData && userData.nivelacesso === "paciente" && userData.id) {
      fetchMedicoDoPaciente(userData.id);
    }
  }, []);

  // Primeiro busca medico_id na tabela paciente pelo paciente.id
  async function fetchMedicoDoPaciente(paciente_id) {
    const { data: pacienteData, error: pacienteError } = await supabase
      .from("pacientes")
      .select("medico_id")
      .eq("id", paciente_id)
      .single();

    if (pacienteError) {
      console.error("Erro ao buscar paciente:", pacienteError);
      setMedicoNome(null);
      return;
    }

    if (pacienteData && pacienteData.medico_id) {
      fetchMedicoNome(pacienteData.medico_id);
    } else {
      setMedicoNome(null);
    }
  }

  // Depois busca nome do medico na tabela usuarios pelo medico_id
  async function fetchMedicoNome(medico_id) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("nome")
      .eq("id", medico_id)
      .single();

    if (error) {
      console.error("Erro ao buscar médico:", error);
      setMedicoNome(null);
    } else {
      setMedicoNome(data.nome);
    }
  }

  const isActive = (path) => (router.pathname === path ? "menu-item active" : "menu-item");

  if (!usuario) return null;

  return (
    <aside className="layout-menu menu-vertical menu bg-menu-theme" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      <div>
        <div className="app-brand demo">
          <Link href="/dashboard" className="app-brand-link">
            <span className="app-brand-text demo menu-text fw-bolder ms-2">Goe</span>
          </Link>
        </div>

        <ul className="menu-inner py-1">
          <li className={isActive(usuario.nivelacesso === "admin" ? "/admin-dashboard" : "/dashboard")}>
            <Link
              href={usuario.nivelacesso === "admin" ? "/admin-dashboard" : "/dashboard"}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-dashboard"></i>
              <div>Dashboard</div>
            </Link>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Menu</span>
          </li>

          {/* Médicos */}
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

          {/* Pacientes */}
          {usuario.nivelacesso === "paciente" && (
            <li className={isActive("/user/myMedicines")}>
              <Link href="/user/myMedicines" className="menu-link">
                <i className="menu-icon tf-icons bx bx-plus-medical"></i>
                <div>Minhas Medições</div>
              </Link>
            </li>
          )}

          {/* Admin */}
          {usuario.nivelacesso === "admin" && (
            <>
              <li className={isActive("/admin/registerMedico")}>
                <Link href="/admin/registerMedico" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-user-plus"></i>
                  <div>Criar Médico</div>
                </Link>
              </li>
              <li className={isActive("/admin/listAllUser")}>
                <Link href="/admin/listAllUser" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-group"></i>
                  <div>Lista de Todos usuários</div>
                </Link>
              </li>
              {/* 
              <li className={isActive("/admin/reports")}>
                <Link href="/admin/reports" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-bar-chart"></i>
                  <div>Relatórios</div>
                </Link>
              </li>
              */}
            </>
          )}
        </ul>
      </div>

      {/* Rodapé da sidebar: mostrar médico vinculado, só se for paciente */}
      {usuario.nivelacesso === "paciente" && medicoNome && (
        <div className="medico-vinculado" style={{ padding: "1rem", borderTop: "1px solid #ccc", fontSize: "0.9rem", color: "#555" }}>
          Médico vinculado: <strong>{medicoNome}</strong>
        </div>
      )}
    </aside>
  );
}
