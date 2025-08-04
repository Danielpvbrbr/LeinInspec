const db = require('../conn');

exports.defeito_listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM defeito');

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

exports.defeito_register = async (req, res) => {
    const { descricao, dataCreate, veiculo, placa, responsavel } = req.body;

    if (!descricao) {
        return res.status(400).json({ error: 'Nome são obrigatório' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO defeito (descricao, dataCreate, veiculo, placa, responsavel) VALUES (?,?,?,?,?)',
            [descricao, dataCreate, veiculo, placa, responsavel]
        );

        res.status(201).json({ message: 'Defeito registrado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar Defeito' });
    }
};

exports.defeito_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM defeito WHERE id=?', [id]);

        res.status(201).json({ message: 'Defeito deletado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar Defeito' });
    }
};

exports.defeito_atualizar = async (req, res) => {
    const { descricao, veiculo, placa, responsavel, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Descrição são obrigatório' });
    }

    try {
        const [result] = await db.query('UPDATE defeito SET descricao=?, veiculo=?, placa=?, responsavel=? WHERE id=?',
            [descricao, veiculo, placa, responsavel, id]);

        res.status(201).json({ message: 'Defeito Atualizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao Atualizar Defeito' });
    }
};