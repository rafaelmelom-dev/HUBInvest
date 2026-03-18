// src/components/PortfolioChart.jsx
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

export default function PortfolioChart({ resumo }) {
    const investido = resumo?.totalInvestido || 0;
    const atual = resumo?.patrimonioAtual || 0;
    const positivo = atual >= investido;

    // Interpolação simples: 6 pontos do investido até o atual
    const step = (atual - investido) / 5;
    const pontosGrafico = [0, 1, 2, 3, 4, 5].map(i => investido + step * i);

    // Labels dos últimos 6 meses
    const nomesMeses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const mesAtual = new Date().getMonth();
    const labelsDinamicas = [];
    for (let i = 5; i >= 0; i--) {
        let index = mesAtual - i;
        if (index < 0) index += 12;
        labelsDinamicas.push(nomesMeses[index]);
    }

    // Verde para retorno positivo, vermelho para negativo
    const corLinha = positivo ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)";
    const corFundo = positivo ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)";

    const data = {
        labels: labelsDinamicas,
        datasets: [
            {
                label: "Valor da Carteira (R$)",
                data: pontosGrafico,
                borderColor: corLinha,
                backgroundColor: corFundo,
                pointBackgroundColor: corLinha,
                pointBorderColor: corLinha,
                pointRadius: 3,
                pointHoverRadius: 5,
                tension: 0.4,
                fill: true,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: positivo ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
                    boxWidth: 12,
                    font: { size: 12 },
                },
            },
            title: {
                display: true,
                text: "Evolução últimos 6 meses",
                color: "#9ca3af",
                font: { size: 12, weight: "normal" },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || "";
                        if (label) label += ": ";
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: (value) =>
                        new Intl.NumberFormat("pt-BR", {
                            notation: "compact",
                            style: "currency",
                            currency: "BRL",
                        }).format(value),
                    color: "#9ca3af",
                    font: { size: 11 },
                },
                grid: { color: "rgba(156, 163, 175, 0.1)" },
            },
            x: {
                ticks: { color: "#9ca3af", font: { size: 11 } },
                grid: { display: false },
            },
        },
    };

    return (
        <div className="h-64 w-full">
            <Line options={options} data={data} />
        </div>
    );
}