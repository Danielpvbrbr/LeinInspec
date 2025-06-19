const db = require('../conn');

exports.veiculo_listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM veiculos');

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

exports.veiculo_register = async (req, res) => {
    const { descricao, foto, placa } = req.body;

    if (!descricao) {
        return res.status(400).json({ error: 'Nome são obrigatório' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO veiculos (descricao, foto, placa) VALUES (?,?,?)', [descricao, foto, placa]
        );

        res.status(201).json({ message: 'Veiculo registrado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar veiculo' });
    }
};

exports.veiculo_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM veiculos WHERE id=?', [id]);

        res.status(201).json({ message: 'Veiculo deletado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar veiculo' });
    }
};

exports.veiculo_atualizar = async (req, res) => {
    const { descricao, placa, foto, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Descrição são obrigatório' });
    }

    try {
        const [result] = await db.query('UPDATE veiculos SET descricao=?, foto=?, placa=? WHERE id=?', [descricao, foto, placa, id]);

        res.status(201).json({ message: 'Veiculo Atualizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao Atualizar veiculo' });
    }
};