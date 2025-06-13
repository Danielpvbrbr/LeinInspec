const db = require('../conn');

exports.grupo_listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM grupo_check');

        if (rows.length === 0) {
            return res.status(201).json({ error: 'Dados não encontrado', data: [] });
        }
        //console.log(rows)
        res.json({ message: 'Success', data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no banco de dados', data: [] });
    }
};

exports.grupo_register = async (req, res) => {
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).json({ error: 'Nome são obrigatório' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO grupo_check (descricao) VALUES (?)', [descricao]
        );

        res.status(201).json({ message: 'Grupo registrado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar grupo' });
    }
};

exports.grupo_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM grupo_check WHERE id=?', [id]);

        res.status(201).json({ message: 'Grupo deletado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar grupo' });
    }
};

exports.grupo_atualizar = async (req, res) => {
    const { descricao, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Descrição são obrigatório' });
    }

    try {
        const [result] = await db.query('UPDATE grupo_check SET descricao=? WHERE id=?', [descricao, id]);

        res.status(201).json({ message: 'Grupo Atualizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao Atualizar Grupo' });
    }
};