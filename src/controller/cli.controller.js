const uuid = require('uuid');
const fs = require('fs');
const dbPath = 'src/database.json';
const strDB = fs.readFileSync(dbPath, 'utf-8');
const database = JSON.parse(strDB);

const create = (req, res) => {
  const { dni, nombre, apellidos } = req.body;

  console.log({ dni, nombre, apellidos });

  if (!dni || !nombre || !apellidos) {
    return res.json({ error: 'debes rellenar todos los campos!' });
  }

  const newCli = {
    id: uuid.v4(),
    dni,
    nombre,
    apellidos,
  };

  database.clients.push(newCli);

  fs.writeFile(dbPath, JSON.stringify(database), (err) => {
    if (err) {
      console.log('Hubo un error en la BD');
    }
  });

  res.json(newCli);
};

const list = (req, res) => {

  let clients = [];


  for (let i = 0; i < database.clients.length; i++) {
      let dogs = [];
      for (let j = 0; j < database.dogs.length; j++) {
        if (database.dogs[j].cliId === database.clients[i].id) {
          dogs.push(database.dogs[j]);
        }
      }
      let clientAndDogs = {
        id: database.clients[i].id,
        dni: database.clients[i].dni,
        nombre: database.clients[i].nombre,
        apellidos: database.clients[i].apellidos,
        perros: dogs,
      };
      clients.push(clientAndDogs);
  }
  res.json({ clients });
};

const get = (req, res) => {
  const cliId = req.params.id;

  let cli = null;
  for (let i = 0; i < database.clients.length; i++) {
    if (database.clients[i].id === cliId) {
      cli = database.clients[i];
      break;
    }
  }
  let dogs = [];
  for (let i = 0; i < database.dogs.length; i++) {
    if (database.dogs[i].cliId === cliId) {
      dogs.push(database.dogs[i]);
    }
  }
  const clientAndDogs = {
    id: cli.id,
    dni: cli.dni,
    nombre: cli.nombre,
    apellidos: cli.apellidos,
    perros: dogs,
  };
  res.json({ clientAndDogs });
};

const update = (req, res) => {
  const cliId = req.params.id;

  let cli = null;
  for (let i = 0; i < database.clients.length; i++) {
    if (database.clients[i].id === cliId) {
      cli = database.clients[i];
      cli.dni = req.body.dni;
      cli.nombre = req.body.nombre;
      cli.apellidos = req.body.apellidos;
      fs.writeFile(dbPath, JSON.stringify(database), (err) => {
        if (err) {
          console.log('Hubo un error en la BD');
        }
      });
      break;
    }
  }
  res.json({ cli });
};

const remove = (req, res) => {
  const cliId = req.params.id;
  let index = -1;
  let removeDogs = [];

  for (let i = 0; i < database.dogs.length; i++) {
    if (database.dogs[i].cliId === cliId) {
      removeDogs.push(i);
    }
  }

  let indexDog = -1;
  for (let i = 0; i < removeDogs.length; i++) {
    indexDog = removeDogs[i] - i;
    database.dogs.splice(indexDog, 1);
  }

  for (let i = 0; i < database.clients.length; i++) {
    if (database.clients[i].id === cliId) {
      index = i;
      break;
    }
  }
  console.log(index);
  if (index > -1) {
    database.clients.splice(index, 1);
    fs.writeFile(dbPath, JSON.stringify(database), (err) => {
      if (err) {
        console.log('Hubo un error en la BD');
      }
    });
  }

  res.json(database.clients);
};

module.exports = {
  create,
  list,
  get,
  update,
  remove,
};
