import { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import withAuth from "../utils/withAuth"; // Importando o HOC

function Dashboard() {
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(userData);
    
    if (userData) {
      setTipoUsuario(userData.nivelacesso);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />

          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-13 mb-4 order-0">
                    <div className="card">
                      <div className="d-flex align-items-end row" style={{ height: "164px" }}>
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Seja Bem-vindo {usuario?.nome || "Usuário"}!</h5>
                            <p className="mb-4">Olá, seja bem-vindo!</p>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center">
                          <Image src="/assets/img/illustrations/man-with-laptop-light.png" width={170} height={140} alt="Illustration" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-12 order-2 mb-4">
                    <div className="card">
                      <div className="row row-bordered g-0" style={{ marginTop: "40px" }}>
                        <div className="row">
                          {/* Opções comuns para médicos e pacientes */}
                          <div className="col-md-4">
                            <div className="card text-center">
                              <div className="card-body">
                                <h5 className="card-title">Minhas Medições</h5>
                                <p className="card-text">Veja o histórico de medições.</p>
                                <Link href="/user/myMedicines" className="btn btn-primary">Acessar</Link>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card text-center">
                              <div className="card-body">
                                <h5 className="card-title">Nova Medição</h5>
                                <p className="card-text">Registre uma nova medição.</p>
                                <Link href="/conection" className="btn btn-primary">Medir</Link>
                              </div>
                            </div>
                          </div>

                          {/* Opções exclusivas para Médicos */}
                          {tipoUsuario && tipoUsuario === "medico" && (
                            <div className="col-md-4">
                              <div className="card text-center">
                                <div className="card-body">
                                  <h5 className="card-title">Pacientes</h5>
                                  <p className="card-text">Gerencie seus pacientes.</p>
                                  <Link href="/doctor/userList" className="btn btn-primary">Acessar</Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="text-center" style={{ marginRight: "45%", marginTop: "2%", paddingBottom: "4%" }}>
                          {isClient ? <div id="growthChart"></div> : <p>Carregando...</p>}
                          <div className="fw-semibold pt-3 mb-2">A sua limitação funcional está a 78%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default withAuth(Dashboard);
