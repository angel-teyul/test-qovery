const mysql = require('mysql');

// configuracion de conexion
var db_config = {
  host: 'b4eusahobgh1o5xjpk1m-mysql.services.clever-cloud.com',
  user: 'usfashqffgtcrhcp',
  password: '7zJ3gEdFLI4jwMLs9AfV',
  database: 'b4eusahobgh1o5xjpk1m',
  port: '3306'
};

// crear variable de conexion
var connection = mysql.createPool(db_config);

// establecer una nueva conexion
connection.getConnection(function(err){
  if(err) {
      console.log("\n\t *** No se puede establecer la conexion con la base de datos. ***");

      connection = reconnect(connection);
  }else {
      console.log("\n\t *** Nueva conexion establecida con la base de datos. ***")
  }
});

// funcion para reconectar a la base de datoss
function reconnect(connection){
  console.log("\n Nueva conexion en proceso...");

  // crear nueva conexion
  connection = mysql.createPool(db_config);

  // intentar reconectar
  connection.getConnection(function(err){
      if(err) {
          // intentar conectarse cada 2 segundos
          setTimeout(reconnect(connection), 2000);
      }else {
          console.log("\n\t *** Nuevo conexion establecida con la base de datos. ***")
          return connection;
      }
  });
}


// escuchar errores
connection.on('error', function(err) {

  // el servidor cierra la conexion
  if(err.code === "PROTOCOL_CONNECTION_LOST"){    
      console.log("/!\\ No se puede establecer la conexion con la base de datos. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
      console.log("/!\\ No se puede establecer la conexion con la base de datos. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      console.log("/!\\ No se puede establecer la conexion con la base de datos. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

  else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
      console.log("/!\\ No se puede establecer la conexion con la base de datos. /!\\ ("+err.code+")");
  }

  else{
      console.log("/!\\ No se puede establecer la conexion con la base de datos. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

});


// exportar conexion
module.exports = connection;
