import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ListAllUser() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("todos");

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const { data, error } = await supabase.from("usuarios").select("*");

        if (error) {
          console.error("Erro ao buscar usuários:", error);
          toast.error("Erro ao carregar usuários.");
        } else {
          const apenasPacientesOuMedicos = data.filter(
            (u) => u.nivelacesso === "medico" || u.nivelacesso === "paciente"
          );
          setUsuarios(apenasPacientesOuMedicos);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        toast.error("Erro inesperado ao carregar usuários.");
      }
    }

    fetchUsuarios();
  }, []);

  const handleDeleteUsuario = async (id) => {
  try {

    const { error: errorPaciente } = await supabase
      .from("pacientes")
      .delete()
      .eq("id", id); 

    if (errorPaciente) {
      console.error("Erro ao excluir paciente:", errorPaciente);
      toast.error("Erro ao excluir paciente.");
      return;
    }

    const { error: errorUsuario } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id);

    if (errorUsuario) {
      console.error("Erro ao excluir usuário:", errorUsuario);
      toast.error("Erro ao excluir usuário. Tente novamente.");
      return;
    }

    setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    toast.success("Usuário excluído com sucesso!");
  } catch (err) {
    console.error("Erro inesperado ao excluir:", err);
    toast.error("Erro inesperado ao excluir.");
  }
};


  const confirmarExclusao = (usuario) => {
    MySwal.fire({
      title: "Tem certeza?",
      text: `Deseja remover o usuário "${usuario.nome}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUsuario(usuario.id);
      }
    });
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nomeMatch = usuario.nome?.toLowerCase().includes(filtroNome.toLowerCase());
    const nivelMatch = filtroNivel === "todos" || usuario.nivelacesso === filtroNivel;
    return nomeMatch && nivelMatch;
  });

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }} href="#">
                  <i className="bx bx-user me-1"></i> Lista de Usuários
                </a>
              </li>
            </ul>

            <div className="card p-3">
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filtrar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    style={{ cursor: "pointer" }}
                    value={filtroNivel}
                    onChange={(e) => setFiltroNivel(e.target.value)}
                  >
                    <option value="todos">Todos os níveis</option>
                    <option value="medico">Médico</option>
                    <option value="paciente">Paciente</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-striped table-borderless border-bottom">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Nome</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Nível de Acesso</th>
                      <th className="text-center">Data de Criação</th>
                      <th className="text-center">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosFiltrados.length > 0 ? (
                      usuariosFiltrados.map((usuario, index) => (
                        <tr key={usuario.id}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{usuario.nome || "Sem nome"}</td>
                          <td className="text-center">{usuario.email || "Sem email"}</td>
                          <td className="text-center">
                            {usuario.nivelacesso === "medico" ? "Médico" : "Paciente"}
                          </td>
                          <td className="text-center">
                            {usuario.created_at ? formatarData(usuario.created_at) : "N/A"}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => confirmarExclusao(usuario)}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          Nenhum usuário encontrado.
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
