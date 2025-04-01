import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Registra os elementos do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ConnectionContent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [percentual, setPercentual] = useState(0);
  const [bluetoothDevice, setBluetoothDevice] = useState(null);
  const [bluetoothCharacteristic, setBluetoothCharacteristic] = useState(null);

  useEffect(() => {
    if (isConnected && bluetoothCharacteristic) {
      bluetoothCharacteristic.startNotifications()
        .then(() => {
          console.log("Notificações ativadas!");
          bluetoothCharacteristic.addEventListener("characteristicvaluechanged", handleDataReceived);
        })
        .catch(error => console.error("Erro ao ativar notificações:", error));
    }
  }, [isConnected, bluetoothCharacteristic]);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["0000ffe0-0000-1000-8000-00805f9b34fb"], // UUID do serviço do ESP32
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("0000ffe0-0000-1000-8000-00805f9b34fb");
      const characteristic = await service.getCharacteristic("0000ffe1-0000-1000-8000-00805f9b34fb");

      characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", handleDataReceived);

      setBluetoothDevice(device);
      setBluetoothCharacteristic(characteristic);
      setIsConnected(true);

      toast.success("Goniômetro conectado", { position: "top-right", autoClose: 3000, transition: Slide });

      device.addEventListener("gattserverdisconnected", handleDisconnection);
    } catch (error) {
      console.error("Erro ao conectar:", error);
      toast.error("Erro ao conectar ao Goniômetro", { position: "top-right", autoClose: 3000, transition: Slide });
    }
  };

  const disconnectBluetooth = () => {
    if (bluetoothDevice && bluetoothDevice.gatt.connected) {
      bluetoothDevice.gatt.disconnect();
      setIsConnected(false);
      setBluetoothDevice(null);
      setBluetoothCharacteristic(null);
      toast.error("Goniômetro desconectado", { position: "top-right", autoClose: 3000, transition: Slide });
    }
  };

  const handleDataReceived = (event) => {
    const value = event.target.value;
    const decoder = new TextDecoder("utf-8");
    const decodedValue = decoder.decode(value).trim(); // Remove espaços extras

    console.log("Valor recebido:", decodedValue); // Debug no Console

    const percentualRecebido = parseFloat(decodedValue);

    if (!isNaN(percentualRecebido)) {
      setPercentual(percentualRecebido);
    }
  };

  const handleDisconnection = () => {
    console.log("Dispositivo desconectado!");
    setIsConnected(false);
    setBluetoothDevice(null);
    setBluetoothCharacteristic(null);
    toast.error("Goniômetro desconectado inesperadamente", { position: "top-right", autoClose: 3000, transition: Slide });
  };

  const data = {
    datasets: [
      {
        data: [percentual, 100 - percentual],
        backgroundColor: ["#00cfe8", "#f1f1f1"],
      },
    ],
  };

  return (
    <div className="content-wrapper">
      <ToastContainer position="top-right" autoClose={3000} transition={Slide} />
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills mb-3">
              <li className="nav-item">
                <a className="nav-link active"><i className="bx bx-cube-alt"></i> Conexão</a>
              </li>
            </ul>
            <div className="card">
              <div className="card-body text-center">
                <Doughnut data={data} />
                <div className="fw-semibold pt-3">
                  A sua limitação funcional é {percentual}%
                </div>
                <button
                  className={`btn ${isConnected ? "btn-danger" : "btn-primary"} mt-3`}
                  onClick={isConnected ? disconnectBluetooth : connectBluetooth}
                >
                  {isConnected ? "Desconectar" : "Conectar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ConnectionContent;