const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Hello from client get all reousces API");
});


router.get('/:id', (req, res) => {
    res.send("Hello from client " + req.params.id + " reousces API ");
});


router.post('/', (req, res) => {
    //req.body
    res.sendStatus(204);
});

router.put('/:id', (req, res) => {
    //req.body
    res.send("Hello from client update " + req.params.id + " reousces API ");
});

router.delete('/:id', (req, res) => {
    //req.body
    res.send("Hello from client delete " + req.params.id + " reousces API ");
});

module.exports = router;
