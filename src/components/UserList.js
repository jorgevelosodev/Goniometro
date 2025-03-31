import Link from "next/link";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function UserList() {
  const [pacientes, setPacientes] = useState([]);
  const [medicoId, setMedicoId] = useState(null);

  useEffect(() => {
    async function fetchPacientes() {
      // Evita erro no SSR
      if (typeof window === "undefined") return;

      try {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioLogado && usuarioLogado.nivelacesso === "medico") {
          setMedicoId(usuarioLogado.id);

          // Buscar pacientes vinculados ao médico logado
          const { data, error } = await supabase
            .from("pacientes")
            .select("*")
            .eq("medico_id", usuarioLogado.id);

          if (error) {
            console.error("Erro ao buscar pacientes:", error);
          } else {
            setPacientes(data);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar usuário logado:", error);
      }
    }

    fetchPacientes();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      // Exclui primeiro da tabela "usuarios"
      const { error: userError } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id);
  
      if (userError) {
        console.error("Erro ao excluir usuário:", userError);
        toast.error("Erro ao excluir usuário. Tente novamente.");
        return;
      }
  
      // Agora exclui da tabela "pacientes"
      const { error: patientError } = await supabase
        .from("pacientes")
        .delete()
        .eq("id", id);
  
      if (patientError) {
        console.error("Erro ao excluir paciente:", patientError);
        toast.error("Erro ao excluir paciente. Tente novamente.");
      } else {
        setPacientes((prevPacientes) =>
          prevPacientes.filter((paciente) => paciente.id !== id)
        );
        toast.success("Paciente excluídos com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir. Tente novamente.");
    }
  };
  

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }} href="#">
                  <i className="bx bx-bell me-1"></i> Lista de Pacientes
                </a>
              </li>
            </ul>
            <div className="card">
              <h5 className="card-header">Pacientes Vinculados</h5>
              <div className="table-responsive">
                <table className="table table-striped table-borderless border-bottom">
                  <thead>
                    <tr>
                      <th className="text-nowrap text-center">Nome</th>
                      <th className="text-nowrap text-center">Telefone</th>
                      <th className="text-nowrap text-center">Idade</th>
                      <th className="text-nowrap text-center">Ações</th>
                      <th className="text-nowrap text-center">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.length > 0 ? (
                      pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                          <td className="text-center">{paciente.nome}</td>
                          <td className="text-center">{paciente.telefone || "Não informado"}</td>
                          <td className="text-center">{paciente.idade || "N/A"}</td>
                          <td className="text-center">
                            <Link href={`/doctor/patient/${paciente.id}`}>
                              <button className="btn btn-sm btn-primary">Ver Detalhes</button>
                            </Link>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteUser(paciente.id)}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          Nenhum paciente vinculado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-backdrop fade"></div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
