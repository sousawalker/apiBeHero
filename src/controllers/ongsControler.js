const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
  async addOng(request, response) {
    const id = crypto.randomBytes(16).toString('HEX');
  
    const { name, email, whatsapp, city, state } = request.body;
  
    await connection('ongs').select('*').where('email', email).then(async (rows) => {
      if (rows.length > 0) {
        return response.status(401).json({ error: "There is an account with that email." });
      } else {
        await connection('ongs').insert({ id, name, email, whatsapp, city, state });
  
        return response.json({ id });
      }
    }).catch(function(ex) {
      return response.send(ex);
    });
  }
};