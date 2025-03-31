import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function DetailsPatient() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID do paciente da URL
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Garante que há um ID antes de buscar os dados

    async function fetchPaciente() {
      setLoading(true);
      const { data, error } = await supabase
        .from("pacientes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar paciente:", error);
      } else {
        setPaciente(data);
      }
      setLoading(false);
    }

    fetchPaciente();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Carregando...</p>;
  }

  if (!paciente) {
    return <p className="text-center text-danger fw-bold mt-4">Paciente não encontrado.</p>;
  }

  return (
    <div className="container mt-4">
      <ul className="nav nav-pills flex-column flex-md-row mb-3">
        <li className="nav-item">
          <a className="nav-link active" style={{ cursor: "default" }} href="#">
            <i className="bx bx-user me-1"></i> Paciente: {paciente.nome}
          </a>
        </li>
      </ul>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0" style={{ color: "#fff" }}>Detalhes do Paciente</h5>
        </div>
        <div className="card-body">
          <p style={{ marginTop: "15px" }}><strong>Nome:</strong> {paciente.nome}</p>
          <p><strong>Idade:</strong> {paciente.idade} anos</p>
          <p><strong>Histórico Médico:</strong> {paciente.historico || "Não informado"}</p>
          <p><strong>Telefone:</strong> {paciente.telefone || "Não informado"}</p>
          <p>
  <strong>Sexo:</strong>{" "}
  {paciente.sexo === "male" ? "Masculino" : paciente.sexo === "female" ? "Feminino" : "Não informado"}
</p>
          <p><strong>Email:</strong> {paciente.email || "Não informado"}</p>
        </div>
      </div>
    </div>
  );
}
