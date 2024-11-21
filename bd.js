//bd.js
import pkg from "pg";
const { Pool } = pkg;

//bd.js
async function connecto() { // depois mudar o nome da função pra não confundir com o método connet do pool
    const pool = new Pool({
      connectionString: process.env.URL_BD,
    });
    return pool.connect();
  }
  //bd.js
async function selectUsuarios() {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuario");
    return res.rows;
  }
  export { selectUsuarios };