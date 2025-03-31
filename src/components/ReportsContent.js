import React, { useState } from "react";

const ReportsContent = () => {
  // Estado para armazenar os relatórios
  const [reports, setReports] = useState([
    { id: 1, name: "Jorge Veloso", date: "2025-03-30", time: "14:30", angulo: "78°", link: "/reports/financeiro.pdf" },
    { id: 2, name: "Luchazes", date: "2025-03-28", time: "10:15", angulo: "72°", link: "/reports/vendas.pdf" },
    { id: 3, name: "Pedro", date: "2025-03-27", time: "09:45", angulo: "70°", link: "/reports/clientes.pdf" },
  ]);

  // Função para deletar um relatório pelo ID
  const handleDeleteReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  return (
    <div className="content-wrapper">
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }} href="#">
                  <i className="bx bx-bell me-1"></i> Relatórios
                </a>
              </li>
            </ul>
            <div className="card">
              {/* Título */}
              <h5 className="card-header">Relatórios Disponíveis</h5>

              {/* Tabela de Relatórios */}
              <div className="table-responsive">
                <table className="table table-striped table-borderless border-bottom">
                  <thead>
                    <tr>
                      <th className="text-nowrap">Paciente</th>
                      <th className="text-nowrap text-center">Data</th>
                      <th className="text-nowrap text-center">Hora</th>
                      <th className="text-nowrap text-center">Angulo</th>
                      <th className="text-nowrap text-center">Baixar</th>
                      <th className="text-nowrap text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.name}</td>
                        <td className="text-center">{report.date}</td>
                        <td className="text-center">{report.time}</td>
                        <td className="text-center">{report.angulo}</td>
                        <td className="text-center">
                          <a href={report.link} download className="btn btn-sm btn-primary">
                            Baixar pdf
                          </a>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteReport(report.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          Nenhum relatório disponível.
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
      {/* /Content */}
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default ReportsContent;
