const db = require('../conn');

exports.checkout_listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM checkout');

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

exports.checkout_register = async (req, res) => {
    const { condutor, placa, veiculo, observacao, listCheckout, usuario, dataHora } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO checkout (condutor, placa, veiculo, observacao, listCheckout, usuario, dataHora) VALUES (?,?,?,?,?,?,?)',
            [condutor, placa, veiculo, observacao, listCheckout, usuario, dataHora]
        );

        res.status(201).json({ message: 'Checkout realizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar checkout' });
    }
};

