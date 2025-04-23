import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Medicines() {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      const usarioLogado = JSON.parse(localStorage.getItem("usuario"));

      if (!usarioLogado || !usarioLogado.id) {
        console.error("Usuário não encontrado no localStorage");
        return;
      }

      const { data, error } = await supabase
        .from("pacientes")
        .select("*")
        .eq("id", usarioLogado.id)
        .single();

      if (error) {
        console.error("Erro ao buscar dados do paciente:", error);
      } else {
        setPaciente(data);
      }

      setLoading(false);
    };

    fetchPaciente();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Carregando informações...</p>;
  }

  if (!paciente) {
    return <p className="text-center text-danger fw-bold mt-4">Usuário não encontrado.</p>;
  }

  return (
    <div className="container mt-4">
      <ul className="nav nav-pills flex-column flex-md-row mb-3">
        <li className="nav-item">
          <a className="nav-link active" style={{ cursor: "default" }} href="#">
            <i className="bx bx-user me-1"></i> Meus Resultados
          </a>
        </li>
      </ul>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 text-white" >Dados recolhidos</h5>
        </div>
        <div className="card-body" style={{ paddingTop: "20px" }}>
          <p><strong>Nome:</strong> {paciente.nome}</p>
          <p><strong>Telefone:</strong> {paciente.telefone || "Não informado"}</p>
          <p><strong>Idade:</strong> {paciente.idade} anos</p>
          <p><strong>Sexo:</strong> {paciente.sexo === "male" ? "Masculino" : paciente.sexo === "female" ? "Feminino" : "Não informado"}</p>
          <p><strong>Histórico:</strong> {paciente.historico || "Não informado"}</p>
          <p><strong>Email:</strong> {paciente.email || "Não informado"}</p>
          <p><strong>Percentual:</strong> {paciente.percentual}°</p>
          <p><strong>Data de medição:</strong> {paciente.data_desconexao || "Não informada"}</p>
          <p><strong>Hora de medição:</strong> {paciente.hora_desconexao || "Não informada"}</p>
        </div>
      </div>
    </div>
  );
}
