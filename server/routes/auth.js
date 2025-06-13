const db = require('../conn');
const bcrypt = require('bcrypt'); // se as senhas forem armazenadas com hash
const { expiracao } = require("./func/gerarExpiracao")

exports.usuarios_listar = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM users');

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

exports.auth = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user = ?', [user]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuário ou Senha incorreto!' });
        }

        const senhaCorreta = await bcrypt.compare(password, rows[0].password);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }
        console.log(expiracao)
        res.json({
            message: 'Login realizado com sucesso',
            user: rows[0].user,
            id: rows[0].id,
            exp: expiracao
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro: Entre em contato com desenvolvedor' });
    }
};

exports.register = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    try {
        const [existingUsers] = await db.query('SELECT id FROM users WHERE user = ?', [user]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'Usuário já existe' }); // 409 = conflito
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (user, password) VALUES (?, ?)',
            [user, hashedPassword]
        );

        res.status(201).json({ message: 'Usuário registrado com sucesso', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro: Entre em contato com desenvolvedor' });
    }
};

exports.usuarios_delete = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    try {
        const [result] = await db.query('DELETE FROM users WHERE id=?', [id]);

        res.status(201).json({ message: 'Usuario deletado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro: Entre em contato com desenvolvedor' });
    }
};

exports.usuarios_atualizar = async (req, res) => {
    const { user, password, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id são obrigatório' });
    }

    if (!password) {
        try {
            const [result] = await db.query('UPDATE users SET user=? WHERE id=?', [user, id]);

            res.status(201).json({ message: 'Usuário Atualizado com sucesso', id: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro: Entre em contato com desenvolvedor' });
        }

        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.query('UPDATE users SET user=?, password=? WHERE id=?', [user, hashedPassword, id]);

        res.status(201).json({ message: 'Usuário Atualizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro: Entre em contato com desenvolvedor' });
    }
};