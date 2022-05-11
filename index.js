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
  const CodigoPersona = req.body.CodigoPersona;
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

    var sqlNewData = 'select CodigoPersona, TipoPersona, Estado, Identificacion, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, FechaNacimiento, Telefono, Direccion, CorreoElectronico, Contrasena from tbpersona PE inner join tbtipopersona TP on PE.CodigoTipoPersona = TP.CodigoTipoPersona inner join tbestado ES on PE.CodigoEstado = ES.CodigoEstado where CodigoPersona = ?';

    db.query(sqlNewData, CodigoPersona, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          confirmation: false,
          msg: "Datos actualizados no retornados",
          sqlmsg: err.sqlMessage,
          error: err.sql
        })
        return err;
      }

      if (data[0] != undefined) {
        datos = data[0]

        datos.confirmation = true;

        console.log(datos)
        res.json(datos)
      } else {
        res.json(null)
      }
    })
  })
})

app.post('/eliminar_usuario', (req, res) => {
  const values = Object.values(req.body)
  const CodigoPersona = req.body.CodigoPersona
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

    var sqlNewData = 'select CodigoPersona, TipoPersona, Estado, Identificacion, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, FechaNacimiento, Telefono, Direccion, CorreoElectronico, Contrasena from tbpersona PE inner join tbtipopersona TP on PE.CodigoTipoPersona = TP.CodigoTipoPersona inner join tbestado ES on PE.CodigoEstado = ES.CodigoEstado where CodigoPersona = ?';

    db.query(sqlNewData, CodigoPersona, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          confirmation: false,
          msg: "Datos actualizados no retornados",
          sqlmsg: err.sqlMessage,
          error: err.sql
        })
        return err;
      }

      if (data[0] != undefined) {
        datos = data[0]
        res.json(datos)
      } else {
        res.json(null)
      }
    })
  })
})

app.get('/obtener_codigo_usuario', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'select * from tbpersona where CorreoElectronico=?';

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
      res.json(data[0])
    } else {
      res.json(null)
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
      datos = data[0]
      res.json(datos)
    } else {
      res.json(null)
    }
  })
})

// QUERYS_CREDITOS

app.post('/solicitud', (req, res) => {
  const values = [req.body.CodigoPersona, req.body.FechaSolicitud, req.body.MontoInicial, req.body.PlazoPago, 2]

  var sql = 'insert into tbsolicitud (CodigoPersona, FechaSolicitud, MontoInicial, PlazoPago, CodigoEstado) values(?,?,?,?,?)';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Solicitud no completada",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    var mes = parseInt(`${req.body.FechaSolicitud}`.substr(6, 1)) + 1;
    var left = `${req.body.FechaSolicitud}`.substr(0, 6);
    var right = `${req.body.FechaSolicitud}`.substr(7, 3)
    var nuevaFecha = `${left}${mes}${right}`;

    const newData = {
      CodigoPersona: req.body.CodigoPersona,
      CodigoEstado: 2,
      FechaApertura: req.body.FechaSolicitud,
      PlazoPago: req.body.PlazoPago,
      MontoInicial: req.body.MontoInicial,
      Interes: 0.07,
      MontoMora: 0,
      FechaPago: nuevaFecha
    }

    const newValues = Object.values(newData)

    var sqlNewData = 'insert into tbcredito (CodigoPersona, CodigoEstado, FechaApertura, PlazoPago, MontoInicial, Interes, MontoMora, FechaPago) values(?,?,?,?,?,?,?,?)';

    db.query(sqlNewData, newValues, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          confirmation: false,
          msg: "Credito no registrado",
          sqlmsg: err.sqlMessage,
          error: err.sql
        })
        return err;
      }

      res.json({
        confirmation: true,
        msg: 'Solicitud de credito registrada con exito!'
      })
    })
  })
})

app.post('/eliminar_credito', (req, res) => {
  const values = Object.values(req.body)
  var datetime = new Date();
  let myDate = (datetime.getFullYear()) + "-" + ("0" + (datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + (datetime.getDate())).slice(-2);

  var sql = `update tbcredito set CodigoEstado=9, FechaCierre="${myDate}" where CodigoCredito=?`;

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Credito no eliminado",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    res.json({
      confirmation: true,
      msg: 'Credito eliminado con exito!'
    })
  })
})


app.get('/obtener_creditos', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'select CodigoCredito, Estado, FechaApertura, FechaCierre, PlazoPago, MontoInicial, Interes, MontoMora, FechaPago from tbcredito CR inner join tbestado ES on CR.CodigoEstado = ES.CodigoEstado where CodigoPersona=?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Error al buscar creditos",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    if (data[0] != undefined) {
      res.json(data)
    } else {
      res.json(null)
    }
  })
})

app.get('/historial_crediticio', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'select * from tbhistorialcrediticio where CodigoCredito=?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Error al buscar creditos",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    if (data[0] != undefined) {
      res.json(data)
    } else {
      res.json(null)
    }
  })
})

app.get('/solicitudes_ingresadas', (req, res) => {
  const values = Object.values(req.body)
  var sql = 'select CodigoSolicitud, FechaSolicitud, MontoInicial, PlazoPago, Estado from tbsolicitud SO inner join tbestado ES on SO.CodigoEstado = ES.CodigoEstado where CodigoPersona=?';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Error al buscar solicitudes",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    if (data[0] != undefined) {
      res.json(data)
    } else {
      res.json(null)
    }
  })
})


app.post('/pagar_credito', (req, res) => {
  const values = Object.values(req.body);
  const UsuarioIngresa = req.body.UsuarioIngresa;
  const CodigoCredito = req.body.CodigoCredito;
  const Mora = req.body.Mora;

  var sql = 'insert into tbhistorialcrediticio (CodigoCredito, Monto, Mora, FechaPago, UsuarioIngresa) values (?,?,?,?,?)';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        confirmation: false,
        msg: "Error al pagar credito",
        sqlmsg: err.sqlMessage,
        error: err.sql
      })
      return err;
    }

    const newValues = [Mora, CodigoCredito]

    var sqlUpdate = `update tbcredito set MontoMora=MontoMora-? where CodigoCredito=?`;

    db.query(sqlUpdate, newValues, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          confirmation: false,
          msg: "Error al actualizar mora",
          sqlmsg: err.sqlMessage,
          error: err.sql
        })
        return err;
      }

      var newSql = 'select CodigoCredito, Estado, FechaApertura, FechaCierre, PlazoPago, MontoInicial, Interes, MontoMora, FechaPago from tbcredito CR inner join tbestado ES on CR.CodigoEstado = ES.CodigoEstado where CodigoPersona=?';

      db.query(newSql, UsuarioIngresa, (err, data) => {
        if (err) {
          console.log(err);
          res.json({
            confirmation: false,
            msg: "Error al buscar creditos",
            sqlmsg: err.sqlMessage,
            error: err.sql
          })
          return err;
        }

        if (data[0] != undefined) {
          res.json(data)
        } else {
          res.json(null)
        }
      })
    })

  })
})


// Servidor a la escucha

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
