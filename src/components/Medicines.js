import React, { useState, useEffect } from "react";

export default function Medicines() {
  const [medicoes, setMedicoes] = useState([]);

  useEffect(() => {

    setMedicoes([
      { id: 1, data: "2024-03-30", angulo: "78°", historico: "Lesão no joelho" },
      { id: 2, data: "2024-03-28", angulo: "68°", historico: "Lesão no joelho" }
    ]);
  }, []);

  return (
    <div className="container">
      <ul className="nav nav-pills flex-column flex-md-row mb-3" style={{marginTop:"30px"}}>
      <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }} href="#">
                  <i className="bx bx-bell me-1"></i> Minhas Medições
                </a>
              </li>
      </ul>
      <ul className="list-group">
        {medicoes.map((medicao) => (
          <li key={medicao.id} className="list-group-item">
            <strong>{medicao.historico}:</strong>  {medicao.angulo} - {medicao.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
