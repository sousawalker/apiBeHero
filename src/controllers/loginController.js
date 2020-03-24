const connection = require('../database/connection');

module.exports = {
  async loginOng(request, response) {
    const { id } = request.body;
  
    const login = await connection('ongs').select('name').where({ id: id }).first();

    if (!login) {
      return response.status(400).json({ error: "Unable to log in with this ID." })
    }

    return response.json(login);
  }
};