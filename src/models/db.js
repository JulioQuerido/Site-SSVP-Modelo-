const path = require('path');
const fs = require('fs');
const knex = require('knex');
require('dotenv').config();

const isPostgres = Boolean(process.env.DATABASE_URL);

let knexConfig;

if (isPostgres) {
  knexConfig = {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 5 },
  };
} else {
  if (process.env.VERCEL) {
    throw new Error(
      'DATABASE_URL não definida. No Vercel o filesystem é somente leitura e efêmero, ' +
        'então o SQLite não funciona — configure um Postgres (ex: Neon, via aba Storage do ' +
        'projeto) e defina DATABASE_URL nas variáveis de ambiente antes de fazer deploy.'
    );
  }

  const dbPath = process.env.DATABASE_PATH || './data/ssvp_portal.db';
  const resolvedPath = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);

  const dataDir = path.dirname(resolvedPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  knexConfig = {
    client: 'better-sqlite3',
    connection: {
      filename: resolvedPath,
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.pragma('foreign_keys = ON');
        done(null, conn);
      },
    },
  };
}

const db = knex(knexConfig);

db.isPostgres = isPostgres;

db.yearWhereRaw = (column) =>
  isPostgres ? 'EXTRACT(YEAR FROM ??)::text = ?' : "strftime('%Y', ??) = ?";

// knex's .insert() only returns the new id by default on SQLite/MySQL;
// on Postgres it requires an explicit .returning('id') and resolves to
// an array of row objects instead of raw values. Use together:
//   const rows = await db('t').insert({...}).returning('id');
//   const id = db.extractInsertId(rows);
db.extractInsertId = (result) => {
  const first = result[0];
  return first && typeof first === 'object' ? first.id : first;
};

module.exports = db;
