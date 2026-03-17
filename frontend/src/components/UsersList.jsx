import { useState, useEffect } from "react";

export default function UsersList() {
    const [users, setUsers] = useState([]);

    const handleDesativar = async (id) => {
        const response = await fetch(
            `http://localhost:3000/api/admin/usuarios/${id}/desativar`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );

        if (response.ok) {
            fetchUsers();
            alert("Usuário desativado com sucesso!");
        }
    };

    const handleReativar = async (id) => {
        const response = await fetch(
            `http://localhost:3000/api/admin/usuarios/${id}/reativar`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );

        if (response.ok) {
            fetchUsers();
            alert("Usuário reativado com sucesso!");
        }
    };

    const fetchUsers = async () => {
        const response = await fetch(
            "http://localhost:3000/api/admin/usuarios",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );

        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const classes = {
        ativo: "text-gray-900 dark:text-white",
        inativo: "text-gray-600 dark:text-gray-300",
    };

    return (
        // ADICIONADO: dark:bg-slate-800 dark:border-slate-700
        <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
                <h3 className="font-bold text-gray-700 dark:text-white mb-4 text-lg">
                    Usuários
                </h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        {/* Cabeçalho Escuro no Dark Mode */}
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-4 py-3">Nome</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Tipo</th>
                                <th className="px-4 py-3">Ativo</th>
                                <th className="px-4 py-3 text-center">
                                    Desativar
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Reativar
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            {users.map((u) => (
                                <tr
                                    key={u.id_usuario}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <td
                                        className={`px-4 py-3 ${u.ativo == 1 ? classes.ativo : classes.inativo}`}
                                    >
                                        {u.nome}
                                    </td>
                                    <td
                                        className={`px-4 py-3 ${u.ativo == 1 ? classes.ativo : classes.inativo}`}
                                    >
                                        {u.email}
                                    </td>

                                    <td
                                        className={`px-4 py-3 ${u.ativo == 1 ? classes.ativo : classes.inativo}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {u.tipo_perfil}
                                        </div>
                                    </td>

                                    <td
                                        className={`px-4 py-3 ${u.ativo == 1 ? classes.ativo : classes.inativo}`}
                                    >
                                        {(u?.ativo ?? 0) == 1 ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => {
                                                handleDesativar(u.id_usuario);
                                            }}
                                            className="text-blue-600 dark:text-blue-400"
                                        >
                                            Desativar
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => {
                                                handleReativar(u.id_usuario);
                                            }}
                                            className="text-red-600 dark:text-red-400"
                                        >
                                            Reativar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <p className="text-center text-gray-400 py-4">
                            Nenhum usuário encontrado.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
