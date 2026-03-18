import { DB } from "../repositorio.js";

const db = new DB();

const criar = async (req, res) => {
    const { ticker_ativo, tipo_operacao, quantidade, preco_pago, data } =
        req.body;
    const tickerLimpo = ticker_ativo.toLowerCase().trim();
    const id_usuario = req.usuarioId; // Vem do JWT!

    const map = await carregarMapaMoedas();
    const idCoinGecko = map[tickerLimpo];

    if (!idCoinGecko) {
        return res.status(400).json({
            erro: `A moeda '${ticker_ativo}' não existe na CoinGecko. Verifique a sigla.`,
        });
    }

    const transacao = db.criarTransacao({
        id_usuario,
        ticker_ativo,
        tipo_operacao,
        quantidade,
        preco_pago,
        data,
    });

    if (!transacao) {
        res.status(500).json({ erro: "Erro ao criar uma transação" });
    }

    res.status(201).json(transacao);
};

const listar = (req, res) => {
    const id_usuario = req.usuarioId; // Vem do JWT!

    const transacoes = db.consultarTransacoesUsuario({ id_usuario });

    if (!transacoes) {
        res.status(500).json({ erro: "Erro ao consultar transações" });
    }

    res.json(transacoes);
};

const atualizar = (req, res) => {
    const { ticker_ativo, tipo_operacao, quantidade, preco_pago, data } =
        req.body;
    const id_transacao = req.params.id;
    const id_usuario = req.usuarioId; // Vem do JWT!

    const transacao = db.consultarTransacao({ id_transacao });

    if (!transacao || transacao.id_usuario !== id_usuario) {
        return res
            .status(500)
            .json({ erro: "Erro ao atualizar uma transação" });
    }

    const transacaoAtualizada = db.atualizarTransacao({
        id_transacao,
        ticker_ativo,
        tipo_operacao,
        quantidade,
        preco_pago,
        data,
    });

    if (!transacaoAtualizada) {
        return res
            .status(500)
            .json({ erro: "Erro ao atualizar uma transação" });
    }

    return res.status(200).json(transacaoAtualizada);
};

const deletar = (req, res) => {
    const id_transacao = req.params.id;
    const id_usuario = req.usuarioId; // Vem do JWT!

    const transacao = db.consultarTransacao({ id_transacao });

    if (!transacao || transacao.id_usuario !== id_usuario) {
        return res.status(500).json({ erro: "Erro ao deletar uma transação" });
    }

    db.deletarTransacao({ id_transacao });

    return res.status(200).json(transacao);
};

let mapCache = null;

const carregarMapaMoedas = async () => {
    if (mapCache) return mapCache;

    const coins = await fetch(
        "https://api.coingecko.com/api/v3/coins/list",
    ).then((r) => r.json());

    const map = {};
    const idsPrioritarios = [
        "bitcoin",
        "ethereum",
        "solana",
        "binancecoin",
        "tether",
    ];
    coins.forEach((c) => {
        const simbolo = c.symbol.toLowerCase();

        if (!map[simbolo] || idsPrioritarios.includes(c.id)) {
            map[c.symbol.toLowerCase()] = c.id;
        }
    });

    mapCache = map;
    return mapCache;
};

const obterDashboard = async (req, res) => {
    const id_usuario = req.usuarioId;

    try {
        const transacoes = db.consultarTransacoesUsuario({ id_usuario });

        let totalInvestido = 0;
        let totalVendido = 0;
        const quantidadeAtivos = {};

        for (const t of transacoes) {
            const ticker = t.ticker_ativo.toLowerCase();
            const valorDaOperacao = t.preco_pago;

            quantidadeAtivos[ticker] = quantidadeAtivos[ticker] || 0;

            if (t.tipo_operacao === "compra") {
                totalInvestido += valorDaOperacao;
                quantidadeAtivos[ticker] += t.quantidade;
            } else if (t.tipo_operacao === "venda") {
                totalVendido += valorDaOperacao;
                quantidadeAtivos[ticker] -= t.quantidade;
            }
        }

        let patrimonioAtual = 0;

        const tickersParaBuscar = Object.keys(quantidadeAtivos).filter(
            (t) => quantidadeAtivos[t] > 0,
        );

        if (tickersParaBuscar.length > 0) {
            const map = await carregarMapaMoedas();

            const idsMoedas = tickersParaBuscar
                .map((ticker) => map[ticker] || ticker)
                .join(",");

            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${idsMoedas}&vs_currencies=brl`,
            );
            const precos = await response.json();

            for (const ticker of tickersParaBuscar) {
                const idCoin = map[ticker] || ticker;
                const precoDeHoje = precos[idCoin]?.brl || 0;
                patrimonioAtual += quantidadeAtivos[ticker] * precoDeHoje;
            }
        }

        const saldo = totalInvestido - totalVendido;
        const lucroPrejuizo = totalVendido - totalInvestido;
        const percentualRetorno =
            totalInvestido > 0
                ? ((lucroPrejuizo / totalInvestido) * 100).toFixed(2)
                : 0;

        res.json({
            totalInvestido,
            totalVendido,
            saldo,
            patrimonioAtual,
            lucroPrejuizo,
            percentualRetorno: Number(percentualRetorno),
        });
    } catch (error) {
        console.error("Erro no dashboard:", error);
        res.status(500).json({ erro: "Erro ao calcular dashboard." });
    }
};

export default { criar, listar, atualizar, deletar, obterDashboard };
