const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'banco'
});

// conexion.connect( (err) => {
//   if (err) {
//     console.log('Error de conexion', err);
//     return err;
//   }

//   console.log('Conexion completada');
// })

module.exports = conexion;
