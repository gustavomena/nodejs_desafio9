const { Client } = require("pg");

//connection object
const config = {
  user: "postgres",
  host: "localhost",
  database: "music",
  password: "postgres",
  port: 5432,
};
const data = process.argv.slice(2); //path to node (command line arguments)
const client = new Client(config);
client.connect();

async function _insert() {
  const res = await client.query(
    `insert into estudiante(nombre, rut, curso, nivel) values('${data[1]}', '${data[2]}','${data[3]}', '${data[4]}') RETURNING *; `
  );
  console.log(`Estudiante "${data[1]}" agregado con éxito`);
  client.end();
}

async function _selectByRut() {
  const res = await client.query(
    `SELECT * FROM estudiante WHERE rut='${data[2]}'`
  );
  console.log(`El estudiante con rut: ${data[2]} es:`, res.rows);
  client.end();
}
async function _selectAll() {
  const res = await client.query("SELECT * FROM estudiante");
  console.log("Registro de estudiantes: ", res.rows);
  client.end();
}
async function _update() {
  const res = await client.query(
    `UPDATE estudiante SET nombre='${data[1]}' WHERE curso='cello' RETURNING *;`
  );
  console.log("registro modificado del estudiante: ", res.rows[0]);
  client.end();
}
async function _delete() {
  const res = await client.query(
    `DELETE FROM estudiante where nombre='${data[1]}'`
  );
  console.log(`registro del estudiante con nombre '${data[1]}' borrado `);
}

switch (data[0]) {
  case "select-by-rut":
    _selectByRut();
    break;
  case "select-all":
    _selectAll();
    break;
  case "update":
    _update();
    break;
  case "delete":
    _delete();
    break;
  case "insert":
    _insert();
    break;
  default:
    break;
}
