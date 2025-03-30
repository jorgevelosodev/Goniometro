import { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Image from "next/image";
import('../../public/assets/css/demo.css')
import("../../public/assets/vendor/fonts/boxicons.css");

export default function Dashboard() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
                            <h5 className="card-title text-primary">Seja Bem-vindo John</h5>
                            <p className="mb-4">Olá seja Bem-vindo</p>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center">
                          <Image src="/assets/img/illustrations/man-with-laptop-light.png" width={170} height={140} alt="Illustration" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-12 order-2 mb-4" >
                    <div className="card">
                      <div className="row row-bordered g-0">
                        <div className="col-md-8" style={{ height: "570px !important" }}>
                          <h5 className="card-header m-0 me-2 pb-3">Relatório Anual</h5>
                      
      {isClient ? <div id="totalRevenueChart" className="px-2"></div> : <p>Carregando...</p>}
  
                        </div>
                        <div className="col-md-4">
                          <div className="card-body">
                            <div className="text-center" style={{ marginTop: "90px !important" }}>
                              <div className="dropdown">
                                <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button">
                                  2025
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="#">2025</a>
                                  <a className="dropdown-item" href="#">2024</a>
                                  <a className="dropdown-item" href="#">2023</a>
                                </div>
                              </div>
                            </div>
                          </div>
                         
      {isClient ? <div id="growthChart"></div> : <p>Carregando...</p>}

                          <div className="text-center fw-semibold pt-3 mb-2">A sua limitação funcional está a 78%</div>
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
