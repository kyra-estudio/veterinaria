const { Router } = require('express');
const controller = require ("../controller")

const router = Router();



//CRUD => CREATE [post]
router.post('/client/create', controller.cli.create)
//CRUD => READ [get]
router.get('/client/list', controller.cli.list);

router.get('/client/get/:id', controller.cli.get);

//CRUD => UPDATE [put/patch]
router.put('/client/update/:id', controller.cli.update);

//CRUD => DELETE [delete]
router.delete('/client/delete/:id', controller.cli.remove);

module.exports = router;
