import express from "express"


const router = express.Router();

router.get('/', function (req, res) {
    res.json({msg: 'get response'})
});

router.post('/', function(req, res) {
    res.json({msg: 'post response'})
});

router.route('/')
    .get((req, res) => {
        res.json({msg: 'get response'})
    })
    .post((req, res) => {
        res.json({msg: 'post response'})
    })

export default router;