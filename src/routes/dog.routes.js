const { Router } = require('express');
const controller = require ("../controller")

const router = Router();



//CRUD => CREATE [post]
router.post('/dog/create', controller.dog.create)
//CRUD => READ [get]
router.get('/dog/list', controller.dog.list);

router.get('/dog/get/:id', controller.dog.get);

//CRUD => UPDATE [put/patch]
router.put('/dog/update/:id', controller.dog.update);

//CRUD => DELETE [delete]
router.delete('/dog/delete/:id', controller.dog.remove);

module.exports = router;
