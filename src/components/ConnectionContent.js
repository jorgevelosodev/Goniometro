import { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../public/assets/css/demo.css";
import "../../public/assets/vendor/fonts/boxicons.css";

const ConnectionContent = () => {
  const [isClient, setIsClient] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Função para alternar conexão
  const toggleConnection = () => {
    if (isConnected) {
      toast.error("Goniômetro desconectado", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        transition: Slide, // Adiciona animação de slide
      });
    } else {
      toast.success("Goniômetro conectado", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        transition: Slide, // Adiciona animação de slide
      });
    }
    
    setIsConnected(!isConnected);
  };

  return (
    <div className="content-wrapper">
      {/* Toast Container com progress bar */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss={false} 
        draggable 
        pauseOnHover={false} 
        transition={Slide} 
      />

      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }} href="#">
                  <i className="menu-icon tf-icons bx bx-cube-alt"></i> Conexão
                </a>
              </li>
            </ul>
            <div className="row">
              <div className="col-md-16 col-12 mb-md-0 mb-4">
                <div className="card" style={{ height: "650px !important" }}>
                  <div className="card-body">
                    {/* Connections */}
                    <div className="mb-3">
                      <div className="flex-shrink-0">
                        {isClient ? <div id="growthChart" style={{ marginTop: "120px" }}></div> : <p>Carregando...</p>}
                        <div className="text-center fw-semibold pt-3 mb-2">
                          A sua limitação funcional é 78%
                        </div>
                        <div className="text-center fw-semibold pt-3 mb-2" style={{ marginLeft: "43%" }}>
                          <ul className="nav nav-pills flex-column flex-md-row mb-3">
                            <li className="nav-item">
                              <button 
                                className={`btn ${isConnected ? "btn-danger" : "nav-link active"}`} 
                                onClick={toggleConnection}
                              >
                                {isConnected ? "Desconectar" : "Conectar"}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* /Connections */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* / Content */}
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default ConnectionContent;
