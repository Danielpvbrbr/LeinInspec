const db = require('../conn');

exports.abastecimento_listar = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM abastecimento');

        if (rows.length === 0) {
            return res.status(200).json({ message: 'Nenhum abastecimento encontrado', data: [] });
        }

        return res.status(200).json({ message: 'Success', data: rows });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro no banco de dados', data: [] });
    }
};

exports.abastecimento_register = async (req, res) => {
    const { veiculo, placa, usuario, fotoBomba, fotoHodometro, litros, precoFinal, precoLitro, kmAtual } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO abastecimento (fotoBomba, fotoHodometro, kmAtual, litros, placa, precoFinal, precoLitro, usuario, veiculo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [fotoBomba, fotoHodometro, kmAtual, litros, placa, precoFinal, precoLitro, usuario, veiculo]
        );

        return res.status(201).json({
            message: 'Abastecimento registrado com sucesso',
            id: result.insertId
        });
    } catch (err) {
        console.error('Erro ao registrar defeito:', err);
        return res.status(500).json({ error: 'Erro ao registrar defeito' });
    }
};

