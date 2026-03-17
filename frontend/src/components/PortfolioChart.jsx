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

// RECEBENDO A PROP 'resumo' QUE VEM DO BACKEND
export default function PortfolioChart({ resumo }) {
    const investido = resumo?.totalInvestido || 0;
    const atual = resumo?.patrimonioAtual || 0;

    // TRUQUE DO MVP: Interpolação simples para criar 6 pontos no gráfico
    // Começa no 'investido' e termina no 'atual'
    const step = (atual - investido) / 5;
    const pontosGrafico = [
        investido,
        investido + step * 1,
        investido + step * 2,
        investido + step * 3,
        investido + step * 4,
        atual,
    ];

    // Gera as labels dinamicamente baseadas no mês atual
    const nomesMeses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ];
    const mesAtual = new Date().getMonth();
    const labelsDinamicas = [];

    for (let i = 5; i >= 0; i--) {
        let index = mesAtual - i;
        if (index < 0) index += 12;
        labelsDinamicas.push(nomesMeses[index]);
    }

    // Cor muda dinamicamente: Verde se lucrando, Indigo se no prejuízo ou zero
    const corLinha =
        atual >= investido ? "rgb(34, 197, 94)" : "rgb(79, 70, 229)";
    const corFundo =
        atual >= investido
            ? "rgba(34, 197, 94, 0.2)"
            : "rgba(79, 70, 229, 0.2)";

    const data = {
        labels: labelsDinamicas,
        datasets: [
            {
                label: "Valor da Carteira (R$)",
                data: pontosGrafico,
                borderColor: corLinha,
                backgroundColor: corFundo,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ajuda a não espremer o gráfico
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Evolução últimos 6 meses" },
            tooltip: {
                callbacks: {
                    label: function (context) {
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
            y: { beginAtZero: false }, // Deixa false para o gráfico focar na variação real
        },
    };

    return (
        <div className="h-64 w-full">
            <Line options={options} data={data} />
        </div>
    );
}
