import { DB } from "../repositorio.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "SECRETISSIMA";

const db = new DB();

const registrar = async (req, res) => {
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);

    const usuario = db.criarUsuario({ nome, email, senha: hash });
    console.log(usuario);

    res.status(201).json({
        mensagem: "Usuário criado!",
        id: usuario.id_usuario,
    });
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    const usuario = db.consultarUsuarioPorEmail({ email });
    if (!usuario)
        return res.status(401).json({ erro: "Usuário não encontrado." });
    if (usuario.ativo === 0)
        return res.status(403).json({ erro: "Conta desativada." });

    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) return res.status(401).json({ erro: "Senha incorreta." });

    const token = jwt.sign(
        {
            id: usuario.id_usuario,
            tipo_perfil: usuario.tipo_perfil,
            nome: usuario.nome,
        },
        SECRET,
        { expiresIn: "8h" },
    );

    res.json({ token, tipo_perfil: usuario.tipo_perfil, nome: usuario.nome });
};

const atualizar = async (req, res) => {
    const id_usuario = req.usuarioId;
    console.log(id_usuario);
    const { nome } = req.body;

    const usuario = db.consultarUsuario({ id_usuario });
    if (!usuario)
        return res.status(404).json({ erro: "Usuário não encontrado." });

    db.atualizarUsuario({ id_usuario, nome });
    return res.status(200).json({ mensagem: "Usuário atualizado!" });
};

export default { registrar, login, atualizar };
