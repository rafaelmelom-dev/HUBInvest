import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class DB {
    constructor() {
        this.db = new Database("hub_investimentos.db");

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                email TEXT UNIQUE,
                senha TEXT,
                tipo_perfil TEXT,
                ativo INTEGER DEFAULT 1
        );`);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS transacoes (
                id_transacao INTEGER PRIMARY KEY AUTOINCREMENT,
                id_usuario INTEGER,
                ticker_ativo TEXT,
                tipo_operacao TEXT,
                quantidade REAL,
                preco_pago REAL,
                data TEXT,
                FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
        );`);

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminSenha = process.env.ADMIN_PASSWORD;

        const hash = bcrypt.hashSync(adminSenha, 10);

        const insertAdmin = this.db.prepare(`
            INSERT INTO usuarios (nome, email, senha, tipo_perfil)
            SELECT 'Admin', ?, ?, 'admin'
            WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email = ?)
          `);

        const info = insertAdmin.run(adminEmail, hash, adminEmail);

        if (info.changes > 0) {
            console.log("Administrador padrão criado com sucesso!");
        } else {
            console.log("Banco de dados pronto. Admin já existente.");
        }
    }

    // USUARIO

    criarUsuario({ nome, email, senha, tipo_perfil = "comum" }) {
        if (!nome) return null;
        if (!email) return null;
        if (!senha) return null;

        try {
            const insert = this.db.prepare(
                "INSERT INTO usuarios (nome, email, senha, tipo_perfil) VALUES (@nome, @email, @senha, @tipo_perfil);",
            );
            const info = insert.run({ nome, email, senha, tipo_perfil });

            if (info.changes > 0) {
                console.log("Objeto criado no banco de dados!");
                const id_usuario = info.lastInsertRowid;

                return {
                    id_usuario,
                    nome,
                    email,
                    senha,
                    tipo_perfil,
                    ativo: 1,
                };
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    consultarUsuarios() {
        const select = this.db.prepare("SELECT * FROM usuarios;");

        try {
            const usuarios = select.all();

            console.log("Objetos coletados do banco de dados");

            return usuarios;
        } catch (err) {
            return null;
        }
    }

    consultarUsuario({ id_usuario }) {
        const select = this.db.prepare(
            "SELECT * FROM usuarios WHERE id_usuario = ?;",
        );

        try {
            const usuario = select.get(id_usuario);

            console.log("Objeto coletado do banco de dados");

            return usuario;
        } catch (err) {
            return null;
        }
    }

    consultarUsuarioPorEmail({ email }) {
        const select = this.db.prepare(
            "SELECT * FROM usuarios WHERE email = ?;",
        );

        try {
            const usuario = select.get(email);

            console.log("Objeto coletado do banco de dados");

            return usuario;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    atualizarUsuario({ id_usuario, nome, email, senha, tipo_perfil, ativo }) {
        const update = this.db.prepare(
            "UPDATE usuarios SET nome = @nome, email = @email, senha = @senha, tipo_perfil = @tipo_perfil, ativo = @ativo WHERE id_usuario = @id_usuario;",
        );

        nome = nome ?? this.consultarUsuario({ id_usuario }).nome;
        email = email ?? this.consultarUsuario({ id_usuario }).email;
        senha = senha ?? this.consultarUsuario({ id_usuario }).senha;
        tipo_perfil =
            tipo_perfil ?? this.consultarUsuario({ id_usuario }).tipo_perfil;
        ativo = ativo ?? this.consultarUsuario({ id_usuario }).ativo;

        try {
            update.run({
                id_usuario,
                nome,
                email,
                senha,
                tipo_perfil,
                ativo,
            });

            console.log("Objeto atualizado com sucesso");

            return { id_usuario, nome, email, senha, tipo_perfil, ativo };
        } catch (err) {
            return null;
        }
    }

    deletarUsuario({ id_usuario }) {
        if (!id_usuario) return null;

        try {
            const del = this.db.prepare(
                "DELETE FROM usuarios WHERE id_usuario = ?;",
            );
            const info = del.run(id_usuario);

            if (info.changes > 0) {
                console.log("Objeto deletado da base de dados");
            }
        } catch (err) {
            return null;
        }
    }

    desativarUsuario({ id_usuario }) {
        if (!id_usuario) return null;

        try {
            const update = this.db.prepare(
                "UPDATE usuarios SET ativo = 0 WHERE id_usuario = ?;",
            );
            const info = update.run(id_usuario);

            if (info.changes > 0) {
                console.log("Usuário desativado com sucesso");
                return { id_usuario };
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    reativarUsuario({ id_usuario }) {
        if (!id_usuario) return null;

        try {
            const update = this.db.prepare(
                "UPDATE usuarios SET ativo = 1 WHERE id_usuario = ?;",
            );
            const info = update.run(id_usuario);

            if (info.changes > 0) {
                console.log("Usuário reativado com sucesso");
                return { id_usuario };
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    // TRANSACOES

    criarTransacao({
        id_usuario,
        ticker_ativo,
        tipo_operacao,
        quantidade,
        preco_pago,
        data,
    }) {
        if (!id_usuario) return null;
        if (!ticker_ativo) return null;
        if (!tipo_operacao) return null;
        if (!quantidade) return null;
        if (!preco_pago) return null;
        if (!data) return null;

        const insert = this.db.prepare(
            "INSERT INTO transacoes (id_usuario, ticker_ativo, tipo_operacao, quantidade, preco_pago, data) VALUES (@id_usuario, @ticker_ativo, @tipo_operacao, @quantidade, @preco_pago, @data);",
        );

        try {
            const info = insert.run({
                id_usuario,
                ticker_ativo,
                tipo_operacao,
                quantidade,
                preco_pago,
                data,
            });

            if (info.changes > 0) {
                console.log("Transação criada com sucesso");
                const id_transacao = info.lastInsertRowid;

                return {
                    id_transacao,
                    id_usuario,
                    ticker_ativo,
                    tipo_operacao,
                    quantidade,
                    preco_pago,
                    data,
                };
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    consultarTransacoes() {
        const select = this.db.prepare("SELECT * FROM transacoes;");

        try {
            const transacoes = select.all();

            console.log("Transações coletados do banco de dados");

            return transacoes;
        } catch (err) {
            return null;
        }

        return null;
    }

    consultarTransacao({ id_transacao }) {
        const select = this.db.prepare(
            "SELECT * FROM transacoes WHERE id_transacao = ?;",
        );

        try {
            const transacao = select.get(id_transacao);

            console.log("Transação coletada do banco de dados");

            return transacao;
        } catch (err) {
            return null;
        }

        return null;
    }

    consultarTransacoesUsuario({ id_usuario }) {
        const select = this.db.prepare(
            "SELECT * FROM transacoes WHERE id_usuario = ?;",
        );

        try {
            const transacoes = select.all(id_usuario);

            console.log("Transações coletadas do banco de dados");

            return transacoes;
        } catch (err) {
            return null;
        }

        return null;
    }

    atualizarTransacao({
        id_transacao,
        ticker_ativo,
        tipo_operacao,
        quantidade,
        preco_pago,
        data,
    }) {
        const update = this.db.prepare(
            "UPDATE transacoes SET ticker_ativo = ?, tipo_operacao = ?, quantidade = ?, preco_pago = ?, data = ? WHERE id_transacao = ?;",
        );

        try {
            const info = update.run(
                ticker_ativo,
                tipo_operacao,
                quantidade,
                preco_pago,
                data,
                id_transacao,
            );

            if (info.changes > 0) {
                console.log("Transação atualizada com sucesso");
                return this.consultarTransacao({ id_transacao });
            }
        } catch (err) {
            console.log(err);
            return null;
        }

        return null;
    }

    deletarTransacao({ id_transacao }) {
        if (!id_transacao) return null;

        const deleteTransacao = this.db.prepare(
            "DELETE FROM transacoes WHERE id_transacao = ?;",
        );

        try {
            const info = deleteTransacao.run(id_transacao);

            if (info.changes > 0) {
                console.log("Transação deletada com sucesso");
                return { id_transacao };
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    close() {
        this.db.close();
    }
}
