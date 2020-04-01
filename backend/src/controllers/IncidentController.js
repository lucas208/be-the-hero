const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        /**
         * Lógica de paginação(5 registros por pág)
         */
        const { page = 1 } = request.query;

        /**
         * Contador pegando apenas o primeiro elemento do array
         */
        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        /**
         * O contador é retornado no cabeçalho da resposta
         */
        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        /**
         * Primeira chave do array será armazenada na variável
         * [ id ]
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        } 
        
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};