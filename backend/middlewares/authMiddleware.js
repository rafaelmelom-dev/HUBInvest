import jwt from "jsonwebtoken";
import { DB } from "../repositorio.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_KEY;

export const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ erro: "Acesso negado." });

    const db = new DB();

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ erro: "Token inválido." });
        const user = db.consultarUsuario({ id_usuario: decoded.id });

        if (!user.ativo)
            return res.status(403).json({ erro: "Usuario foi desativado" });

        req.usuarioId = decoded.id;
        req.usuarioPerfil = decoded.tipo_perfil;
        req.usuarioNome = decoded.nome;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    if (req.usuarioPerfil !== "admin") {
        return res
            .status(403)
            .json({ erro: "Acesso restrito para administradores." });
    }
    next();
};
