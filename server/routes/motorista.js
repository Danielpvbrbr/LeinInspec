const db = require('../conn');

exports.listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM motoristas');

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

exports.motor_register = async (req, res) => {
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).json({ error: 'Nome são obrigatório' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO motoristas (descricao) VALUES (?)', [descricao]
        );

        res.status(201).json({ message: 'Motorista registrado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar motorista' });
    }
};

exports.motor_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM motoristas WHERE id=?', [id]);

        res.status(201).json({ message: 'Motorista deletado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar motorista' });
    }
};

exports.motor_atualizar = async (req, res) => {
    const { descricao, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Descrição são obrigatório' });
    }

    try {
        const [result] = await db.query('UPDATE motoristas SET descricao=? WHERE id=?', [descricao, id]);

        res.status(201).json({ message: 'Motorista Atualizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao Atualizar motorista' });
    }
};