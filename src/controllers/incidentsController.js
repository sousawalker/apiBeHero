const connection = require('../database/connection');

module.exports = {
  async listIncidents(request, response) {
    const { pag = 1 } = request.query;

    const { ong_id } = request.params;

    let incidents = [];

    let total = 0;

    if (ong_id) {
      total = await connection('incidents').count('*').where({ ong_id: ong_id }).first();

      incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.state'])
      .where({ ong_id: ong_id })
      .offset((pag - 1) * 5)
      .limit(5);
    } else {
      total = await connection('incidents').count('*').first();

      incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.state'])
      .offset((pag - 1) * 5)
      .limit(5);
    }

    response.header('X-Total-Count', total['count(*)']);

    return response.json(incidents);
  },

  async addIncident(request, response) {
    const { title, description, value } = request.body;

    const ong_id = request.headers.ong_id;
  
    const [id] = await connection('incidents').insert({ title, description, value, ong_id });
  
    return response.json({ id });
  },

  async deleteIncident(request, response) {
    const { id } = request.params;

    const ong_id = request.headers.ong_id;

    await connection('incidents').where({ id: id, ong_id: ong_id }).delete();
    
    return response.status(204).send();
  },
};