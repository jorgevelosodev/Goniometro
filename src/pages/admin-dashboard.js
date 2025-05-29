import { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";
import withAuth from "../utils/withAuth";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function AdminDashboard() {
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [usuariosHoje, setUsuariosHoje] = useState(0);
  const [usuariosMes, setUsuariosMes] = useState(0);
  const [usuariosSemana, setUsuariosSemana] = useState(0);
  const [mediaDiaria, setMediaDiaria] = useState(0);
  const [medicosAtivos, setMedicosAtivos] = useState(0);

  const [graficoLinha, setGraficoLinha] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(userData);

    fetchMedicos();
    fetchPacientes();
    calcularEstatisticas();
  }, []);

  const fetchMedicos = async () => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("nivelacesso", "medico");

    if (!error) setMedicos(data || []);
  };

  const fetchPacientes = async () => {
    const { data, error } = await supabase.from("pacientes").select("*");
    if (!error) setPacientes(data || []);
  };

  const calcularEstatisticas = async () => {
    const hoje = new Date();
    const inicioHoje = new Date(hoje.setHours(0, 0, 0, 0)).toISOString();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString();
    const seteDiasAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const trintaDiasAtras = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [usuariosHojeData, pacientesHojeData] = await Promise.all([
      supabase.from("usuarios").select("id").gte("created_at", inicioHoje),
      supabase.from("pacientes").select("id").gte("created_at", inicioHoje),
    ]);
    setUsuariosHoje((usuariosHojeData.data?.length || 0) + (pacientesHojeData.data?.length || 0));

    const [usuariosMesData, pacientesMesData] = await Promise.all([
      supabase.from("usuarios").select("id").gte("created_at", inicioMes),
      supabase.from("pacientes").select("id").gte("created_at", inicioMes),
    ]);
    setUsuariosMes((usuariosMesData.data?.length || 0) + (pacientesMesData.data?.length || 0));

    const [usuariosSemanaData, pacientesSemanaData] = await Promise.all([
      supabase.from("usuarios").select("created_at").gte("created_at", seteDiasAtras),
      supabase.from("pacientes").select("created_at").gte("created_at", seteDiasAtras),
    ]);
    setUsuariosSemana(
      (usuariosSemanaData.data?.length || 0) + (pacientesSemanaData.data?.length || 0)
    );

    const [usuarios30d, pacientes30d] = await Promise.all([
      supabase.from("usuarios").select("created_at").gte("created_at", trintaDiasAtras),
      supabase.from("pacientes").select("created_at").gte("created_at", trintaDiasAtras),
    ]);

    const allDates = [...(usuarios30d.data || []), ...(pacientes30d.data || [])];

    const porDia = {};
    for (let i = 0; i < 30; i++) {
      const dia = new Date(Date.now() - i * 86400000);
      const chave = dia.toISOString().split("T")[0];
      porDia[chave] = 0;
    }

    allDates.forEach(item => {
      const dia = item.created_at.split("T")[0];
      if (porDia[dia] !== undefined) porDia[dia]++;
    });

    const labels = Object.keys(porDia).reverse();
    const data = Object.values(porDia).reverse();
    setMediaDiaria(Math.round(data.reduce((a, b) => a + b, 0) / 30));
    setGraficoLinha({
      labels,
      datasets: [
        {
          label: "Novos usuários por dia",
          data,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54,162,235,0.2)",
          fill: true,
        },
      ],
    });

    const { data: medicosUltimos30d } = await supabase
  .from("usuarios")
  .select("id")
  .eq("nivelacesso", "medico")
  .gte("created_at", trintaDiasAtras);

    setMedicosAtivos(medicosUltimos30d?.length || 0);
  };

  if (usuario?.nivelacesso !== "admin") {
    return <p>Você não tem permissão para acessar esta página.</p>;
  }

  const totalUsuarios = medicos.length + pacientes.length;

  const chartData = {
    labels: ["Médicos", "Pacientes"],
    datasets: [
      {
        label: "Distribuição de usuários",
        data: [medicos.length, pacientes.length],
        backgroundColor: ["#696cff", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="mb-4">Bem-vindo, Administrador {usuario?.nome || "Usuário"}!</h4>

                <div className="row mb-4">
                  <KpiCard title="Total de Usuários" value={totalUsuarios} />
                  <KpiCard title="Criados Hoje" value={usuariosHoje} />
                  <KpiCard title="Criados Este Mês" value={usuariosMes} />
                  <KpiCard title="Criados na Semana" value={usuariosSemana} />
                  <KpiCard title="Média diária (30d)" value={mediaDiaria} />
                  <KpiCard title="Médicos Ativos (30d)" value={medicosAtivos} />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">Distribuição</div>
                      <div className="card-body">
                        <Doughnut data={chartData} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">Usuários por Dia</div>
                      <div className="card-body">
                        <Line data={graficoLinha} />
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

function KpiCard({ title, value }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text display-6">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard);
