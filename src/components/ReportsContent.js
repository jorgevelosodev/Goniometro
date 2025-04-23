import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReportsContent = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const medicoLogado = JSON.parse(localStorage.getItem("usuario"));

      if (!medicoLogado?.id) return;

      try {
        const { data, error } = await supabase
  .from("pacientes")
  .select("id, nome, data_desconexao, hora_desconexao, historico, idade, percentual")
  .eq("medico_id", medicoLogado.id)
  .not("percentual", "is", null);

        if (error) throw error;

        setPacientes(data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const gerarPDF = (paciente) => {
    const medico = JSON.parse(localStorage.getItem("usuario"));
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
    doc.text(medico?.nome || "Médico não identificado", larguraPagina / 2, doc.lastAutoTable.finalY + 68, { align: "center" });

    doc.save(`Relatorio_${paciente.nome}.pdf`);
  };

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }}>
                  <i className="bx bx-bell me-1"></i> Relatórios
                </a>
              </li>
            </ul>
            <div className="card">
              <h5 className="card-header">Relatórios Disponíveis</h5>
              <div className="table-responsive">
                <table className="table table-striped table-borderless border-bottom">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th className="text-center">Data</th>
                      <th className="text-center">Hora</th>
                      <th className="text-center">Ângulo</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center">
                          Nenhum relatório encontrado.
                        </td>
                      </tr>
                    ) : (
                      pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                          <td>{paciente.nome}</td>
                          <td className="text-center">{paciente.data_desconexao || "—"}</td>
                          <td className="text-center">{paciente.hora_desconexao || "—"}</td>
                          <td className="text-center">{paciente.percentual ?? "—"}º</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => gerarPDF(paciente)}
                            >
                              Baixar PDF
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;
