const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body);
});

module.exports = router;