const uuid = require('uuid');
const fs = require('fs');
const dbPath = 'src/database.json';
const strDB = fs.readFileSync(dbPath, 'utf-8');
const database = JSON.parse(strDB);


const create = (req, res) => {
    const { cliId, nombreDog, edad, raza } = req.body;

    console.log({ nombreDog, edad, raza  })
  
    if (!cliId || !nombreDog || !edad || !raza) {
      return res.json({ error: 'debes rellenar todos los campos!' });
    }
  
    const newDog = {
      id: uuid.v4(),
      cliId,
      nombreDog,
      edad,
      raza,
    };
  
    database.dogs.push(newDog);
  
    fs.writeFile(dbPath, JSON.stringify(database), (err) => {
      if (err) {
        console.log('Hubo un error en la BD');
      }
    });
  
    res.json(newDog);
  };
  
  const list = (req, res) => {
    res.json(database.dogs);
  }

// const list = (req, res) => {
//   const cliId = req.params.id;
//   let dogs = [];
//   for (let i = 0; i < database.dogs.length; i++) {
//     if (database.dogs[i].cliId === cliId) {
//        dogs.push(database.dogs[i]);
//     }
//   }
//     res.json(dogs);
//   }

const get = (req, res) => {
    const dogId = req.params.id;
  
    let dog = null;
    for (let i = 0; i < database.dogs.length; i++) {
      if (database.dogs[i].id === dogId) {
        dog = database.dogs[i];
        break;
      }
    }
    res.send({ dog });
  }

const update= (req, res) => {
    const dogId = req.params.id;
  
    let dog = null;
    for (let i = 0; i < database.dogs.length; i++) {
      if (database.dogs[i].id === dogId) {
        dog = database.dogs[i];
        dog.cliId = req.body.cliId;
        dog.nombreDog = req.body.nombreDog;
        dog.edad = req.body.edad;
        dog.raza = req.body.raza;
        fs.writeFile(dbPath, JSON.stringify(database), (err) => {
          if (err) {
            console.log('Hubo un error en la BD');
          }
        });
        break;
      }
    }
    res.json({ dog });
  }

const remove = (req, res) => {
    const dogId = req.params.id;
    let index = -1;
    for (let i = 0; i < database.dogs.length; i++) {
      if (database.dogs[i].id === dogId) {
        index = i;
        break;
      }
    }
    console.log(index);
    if (index > -1) {
      database.dogs.splice(index, 1);
      fs.writeFile(dbPath, JSON.stringify(database), (err) => {
        if (err) {
          console.log('Hubo un error en la BD');
        }
      });
    }
  
    res.json(database.dogs);
  }


module.exports = {
    create,
    list,
    get,
    update,
    remove,
}