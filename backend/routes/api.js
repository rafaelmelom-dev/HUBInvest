import express from "express";
const router = express.Router();

import authController from "../controllers/authController.js";
import transacaoController from "../controllers/transacaoController.js";
import adminController from "../controllers/adminController.js";
import { verificarToken, isAdmin } from "../middlewares/authMiddleware.js";

// Rotas Públicas
router.post("/registrar", authController.registrar);
router.post("/login", authController.login);

// Rotas do Usuário Comum
router.post("/transacoes", verificarToken, transacaoController.criar);
router.get("/transacoes", verificarToken, transacaoController.listar);
router.put("/transacoes/:id", verificarToken, transacaoController.atualizar);
router.delete("/transacoes/:id", verificarToken, transacaoController.deletar);
router.get("/dashboard", verificarToken, transacaoController.obterDashboard);

router.put("/usuarios/atualizar", verificarToken, authController.atualizar);

// Rotas do Admin
router.get(
    "/admin/usuarios",
    verificarToken,
    isAdmin,
    adminController.listarUsuarios,
);

router.put(
    "/admin/usuarios/:id/desativar",
    verificarToken,
    isAdmin,
    adminController.desativarUsuario,
);

router.put(
    "/admin/usuarios/:id/reativar",
    verificarToken,
    isAdmin,
    adminController.reativarUsuario,
);

export default router;
