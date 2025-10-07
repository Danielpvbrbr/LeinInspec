const db = require('../conn');

exports.senNotificacao = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM checkout');

        if (rows.length === 0) {
            return res.status(500).json({ error: 'Dados não encontrado', data: [] });
        }

        const data = placasAtrasadas(rows);

        return res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ data: [] });
    }
};

function placasAtrasadas(registros) {
    const agora = new Date();
    const ultimos = {};

    for (const { veiculo, placa, dataHora } of registros) {
        const d = new Date(dataHora);
        if (!ultimos[placa] || d > ultimos[placa].data) {
            ultimos[placa] = { veiculo, data: d };
        }
    }

    return Object.entries(ultimos)
        .filter(([_, { data }]) => (agora - data) / 86400000 > 7)
        .map(([placa, { veiculo, data }]) => ({
            placa,
            veiculo,
            ultimaData: data
        }));
}

