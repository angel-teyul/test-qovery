const express = require('express');
const cors = require('cors');
const db = require('./config/conexion');

const app = express()

// codificacion de datos
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// establecer puerto
const PORT = 3000;

// permitir acceso a la api
app.use(cors());

// test API funcionando

app.get('/', (req, res) => {
  console.log(req.body);

  res.json({
    msg: 'Conexion exitosa con GET a API'
  })
})

// QUERYS_PERSONAS

app.post('/insertar_usuario', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'insert into tbpersona (CodigoTipoPersona, CodigoEstado, Identificacion, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, FechaNacimiento, Telefono, Direccion, CorreoElectronico, Contrasena) values(?,?,?,?,?,?,?,?,?,?,?,?)';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Usuario no agregado",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    res.json({
      confirmation: true,
      msg: 'Usuario agregado con exito!'
    })
  })
})

app.post('/actualizar_usuario', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'update tbpersona set CodigoTipoPersona=?, CodigoEstado=?, Identificacion=?, PrimerNombre=?, SegundoNombre=?, PrimerApellido=?, SegundoApellido=?, FechaNacimiento=?, Telefono=?, Direccion=?, CorreoElectronico=?, Contrasena=? where CodigoPersona=?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Datos no actualizados",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    res.json({
      confirmation: true,
      msg: 'Datos actualizados con exito!'
    })
  })
})

app.post('/eliminar_usuario', (req, res) => {
  console.log(req.body)
  const values = Object.values(req.body)
  var sql = 'update tbpersona set CodigoEstado=9 where CodigoPersona=?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Usuario no eliminado",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    res.json({
      confirmation: true,
      msg: 'Usuario eliminado con exito!'
    })
  })
})

app.get('/obtener_codigo_usuario', (req, res) => {
  console.log(req.body)
  const values = Object.values(req.body)
  var sql = 'select CodigoPersona from tbpersona where CorreoElectronico=?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Error al buscar usuario",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    if (data[0] != undefined) {
      res.json({
        confirmation: true,
        msg: 'Usuario encontrado con exito!',
        CodigoPersona: data[0].CodigoPersona
      })
    } else {
      res.json({
        confirmation: false,
        msg: 'Usuario no encontrado'
      })
    }
  })
})


// LOGIN

app.post('/login', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'select CodigoPersona, TipoPersona, Estado, Identificacion, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, FechaNacimiento, Telefono, Direccion, CorreoElectronico, Contrasena from tbpersona PE inner join tbtipopersona TP on PE.CodigoTipoPersona = TP.CodigoTipoPersona inner join tbestado ES on PE.CodigoEstado = ES.CodigoEstado where CorreoElectronico = ? and Contrasena = ?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Error en login",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    if (data[0] != undefined) {
      res.json({
        confirmation: true,
        msg: 'Login completado!',
        datos: data[0]
      })
    } else {
      res.json({
        confirmation: false,
        msg: 'Datos incorrectos o usuario no existente'
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
