const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'b4eusahobgh1o5xjpk1m-mysql.services.clever-cloud.com',
  user: 'usfashqffgtcrhcp',
  password: '7zJ3gEdFLI4jwMLs9AfV',
  database: 'b4eusahobgh1o5xjpk1m',
  port: '3306'
});

conexion.connect( (err) => {
  if (err) {
    console.log('Error de conexion', err);
    return err;
  }

  console.log('Conexion a base de datos remota completada');
})

module.exports = conexion;
