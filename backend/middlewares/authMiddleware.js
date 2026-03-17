import jwt from "jsonwebtoken";
const SECRET = "SECRETISSIMA";

export const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ erro: "Acesso negado." });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ erro: "Token inválido." });
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
