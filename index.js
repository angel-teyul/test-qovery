const express = require('express');
const cors = require('cors');

const app = express()

// codificacion de datos
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// establecer puerto
const PORT = 3000;

// permitir acceso a la api
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.body);

  res.json({
    message: 'Conexion exitosa con GET a home!'
  })
})

app.get('/test', (req, res) => {
  console.log(req.body);

  res.json({
    message: 'Conexion exitosa con GET a test!'
  })
})

app.post('/testpost', (req, res) => {
  console.log(req.body);
  console.log('values:', Object.values(req.body))

  const values = Object.values(req.body)
  var sql = 'insert into tbtest (code, test) values(?,?)';

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }

    res.json({
      mensaje: 'agregado!',
      data
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
