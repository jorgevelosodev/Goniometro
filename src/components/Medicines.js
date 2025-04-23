import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function Medicines() {
  const [paciente, setPaciente] = useState(null);
  const [medico, setMedico] = useState(null);
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
        .single()


      if (error) {
        console.error("Erro ao buscar dados do paciente:", error);
      } else {
        setPaciente(data);
      }

      setLoading(false);
    };

    fetchPaciente();
  }, []);

  const gerarPDF = async (paciente) => {

    const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", paciente.medico_id)
    .single();

    if (error) {
      console.error("Erro ao buscar dados do medico:", error);
    } else {
      setMedico(data);
    }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
  
      const larguraPagina = doc.internal.pageSize.getWidth();
  
      // Título
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("RELATÓRIO DO PACIENTE", larguraPagina / 2, 40, { align: "center" });
  
      // Tabela com dados do paciente
      doc.setTextColor("#000");
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: 50,
        styles: {
          font: "helvetica",
          fontSize: 12,
          halign: "center",
        },
        headStyles: {
          fillColor: "#f3e5f5",
          textColor: "#6A1B9A",
          fontStyle: "bold",
        },
        columnStyles: {
          0: { halign: "left" },
          1: { halign: "right" },
        },
        body: [
          ["Paciente", paciente.nome],
          ["Histórico Médico", paciente.historico || "—"],
          ["Idade", paciente.idade || "—"],
          ["Data", paciente.data_desconexao || "—"],
          ["Hora", paciente.hora_desconexao || "—"],
        ],
        theme: "grid",
        margin: { left: 30, right: 30 },
      });
  
      // Texto de limitação funcional
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("A limitação funcional é de:", larguraPagina / 2, doc.lastAutoTable.finalY + 20, { align: "center" });
  
      doc.setFontSize(20);
      doc.text(`${paciente.percentual ?? 0}º`, larguraPagina / 2, doc.lastAutoTable.finalY + 33, { align: "center" });
  
      // Assinatura
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#000");
      doc.setFontSize(12);
      doc.text("Atendido por:", larguraPagina / 2, doc.lastAutoTable.finalY + 60, { align: "center" });
  
      doc.setFont("helvetica", "bold");
      doc.text(data.nome || "Médico não identificado", larguraPagina / 2, doc.lastAutoTable.finalY + 68, { align: "center" });
  
      doc.save(`Relatorio_${paciente.nome}.pdf`);
    };

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
          <button
                className="btn btn-sm btn-primary"
                style={{float: "right"}}
                onClick={() => gerarPDF(paciente)}
              >
              Baixar PDF
          </button>
          <p><strong>Nome:</strong> {paciente.nome}</p>
          <p><strong>Telefone:</strong> {paciente.telefone || "Não informado"}</p>
          <p><strong>Idade:</strong> {paciente.idade} anos</p>
          <p><strong>Sexo:</strong> {paciente.sexo === "male" ? "Masculino" : paciente.sexo === "female" ? "Feminino" : "Não informado"}</p>
          <p><strong>Histórico:</strong> {paciente.historico || "Não informado"}</p>
          <p><strong>Email:</strong> {paciente.email || "Não informado"}</p>
          <p><strong>Ângulo:</strong> {paciente.percentual}°</p>
          <p><strong>Data de medição:</strong> {paciente.data_desconexao || "Não informada"}</p>
          <p><strong>Hora de medição:</strong> {paciente.hora_desconexao || "Não informada"}</p>
        </div>
      </div>
    </div>
  );
}
