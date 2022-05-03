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

app.post('/test', (req, res) => {
  console.log(req.body);
  console.log(Object.values(req.body))

  res.json({
    msg: 'Conexion exitosa con POST a test',
    data: req.body
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
