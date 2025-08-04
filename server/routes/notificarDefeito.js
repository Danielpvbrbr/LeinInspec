const db = require('../conn');

exports.defeito_listar = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM defeito');

        if (rows.length === 0) {
            return res.status(200).json({ message: 'Nenhum defeito encontrado', data: [] });
        }

        return res.status(200).json({ message: 'Success', data: rows });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro no banco de dados', data: [] });
    }
};


exports.defeito_register = async (req, res) => {
    const { descricao, dataCreate, veiculo, placa, responsavel } = req.body;

    if (!descricao || descricao.trim() === '') {
        return res.status(400).json({ error: 'Descrição é obrigatória' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO defeito (descricao, dataCreate, veiculo, placa, responsavel)
             VALUES (?, ?, ?, ?, ?)`,
            [descricao, dataCreate, veiculo, placa, responsavel]
        );

        return res.status(201).json({
            message: 'Defeito registrado com sucesso',
            id: result.insertId
        });
    } catch (err) {
        console.error('Erro ao registrar defeito:', err);
        return res.status(500).json({ error: 'Erro ao registrar defeito' });
    }
};



exports.defeito_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM defeito WHERE id=?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Defeito não encontrado' });
        }

        return res.status(200).json({ message: 'Defeito deletado com sucesso' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao deletar defeito' });
    }
};


exports.defeito_atualizar = async (req, res) => {
    const { descricao, veiculo, placa, responsavel, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' });
    }

    try {
        const [result] = await db.query(
            `UPDATE defeito SET descricao=?, veiculo=?, placa=?, responsavel=? WHERE id=?`,
            [descricao, veiculo, placa, responsavel, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Defeito não encontrado para atualizar' });
        }

        return res.status(200).json({ message: 'Defeito atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar defeito' });
    }
};
