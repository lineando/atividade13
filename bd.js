import pkg from "pg";
//bd.js
export { selectUsuarios, selectUsuario, insertUsuario, deleteUsuario };
const { Pool } = pkg;


async function connect() {
    const pool = new Pool({
      connectionString: process.env.URL_BD, /*arquivoqualquer.env.URL_BD*/
    });
    return pool.connect();
  }

  async function selectUsuarios() {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuario");
    return res.rows;
  }

  async function selectUsuario(id) {
    const client = await connect();
    const query = "SELECT * FROM usuario WHERE id = $1";
    const usuario = [id];
    const res = await client.query(query, usuario);
    client.release();
    return res.rows;  
}

  async function insertUsuario(data) {
    const client = await connect();
    const query = "INSERT INTO usuario (nome,senha,email) VALUES ($1,$2,$3) ";
    const usuario = [data.nome, data.senha, data.email];
    await client.query(query, usuario);
    client.release();
  }
  
async function deleteUsuario(id) {
  const client = await connect();
  const query = "DELETE FROM usuario WHERE id = $1";
  await client.query(query, [id]);
  client.release();
}
