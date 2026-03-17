import { DB } from "../repositorio.js";

const db = new DB();

const listarUsuarios = (req, res) => {
    const usuarios = db.consultarUsuarios();

    res.status(200).json(usuarios);
};

const desativarUsuario = (req, res) => {
    const { id } = req.params;

    if (id == req.usuarioId) {
        res.status(400).json({
            mensagem: "Não é possível desativar o usuário atual.",
        });
        return;
    }

    if (db.desativarUsuario({ id_usuario: id })) {
        res.json({ mensagem: "Usuário desativado com sucesso." });
    }
};

const reativarUsuario = (req, res) => {
    const { id } = req.params;

    if (id == req.usuarioId) {
        res.status(400).json({
            mensagem: "Não é possível reativar o usuário atual.",
        });
        return;
    }

    if (db.reativarUsuario({ id_usuario: id })) {
        res.json({ mensagem: "Usuário reativado com sucesso." });
    }
};

export default { listarUsuarios, desativarUsuario, reativarUsuario };
