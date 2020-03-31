const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/**
 *Rota / Recurso
 *Rota: Conjunto completo
 *Recursos: Recurso acessado (entidade do banco)
*/

/**
 * Métodos HTTP:
 * GET: Buscar/listar info do backend
 * POST: Criar info no backend
 * PUT: Alterar uma info no backend
 * DELET: Deletar uma info no backend
 */

 /**
  * Tipos de parâmetros
  * 
  * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
  * Route Params: Parâmetros utilizados para identificar recursos
  * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
  */

  /**
   * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB, etc
   */

   /**
    * Driver: SELECT * FROM users
    * Query Builder: table('user').select('*').where()
    */

