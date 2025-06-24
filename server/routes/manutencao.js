const db = require('../conn');

exports.manute_listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM manutencao');

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

exports.manute_register = async (req, res) => {
    const { descricao, oficina, garantiaDate, dataCreate, veiculo, placa, servicesArray } = req.body;

    if (!descricao) {
        return res.status(400).json({ error: 'Nome são obrigatório' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO manutencao (descricao, oficina, garantiaDate, dataCreate, veiculo, placa, servicesArray) VALUES (?,?,?,?,?,?,?)',
            [descricao, oficina, garantiaDate, dataCreate, veiculo, placa, servicesArray]
        );

        res.status(201).json({ message: 'Manutencão registrado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar Manutencão' });
    }
};

exports.manute_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM manutencao WHERE id=?', [id]);

        res.status(201).json({ message: 'Manutencão deletado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar Manutencão' });
    }
};

exports.manute_atualizar = async (req, res) => {
    const { descricao, oficina, garantiaDate, veiculo, placa, servicesArray, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Descrição são obrigatório' });
    }

    try {
        const [result] = await db.query('UPDATE manutencao SET descricao=?, oficina=?, garantiaDate=?, veiculo=?, placa=?, servicesArray=? WHERE id=?',
            [descricao, oficina, garantiaDate, veiculo, placa, servicesArray, id]);

        res.status(201).json({ message: 'Manutencão Atualizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao Atualizar Manutencão' });
    }
};