const User = require('../models/User');

/**
 * index   -> Método que retorna uma listagem de sessões
 * show    -> Método que retorna uma única sessão
 * store   -> Método que cria uma sessão
 * update  -> Método que altera uma sessão
 * destroy -> Método que (remove/deleta) uma sessão
 */

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};