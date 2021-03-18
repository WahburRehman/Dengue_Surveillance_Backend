const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { jwtKey } = require('../keys');



// router.post('/signUp', async (req, res) => {
//     const { userName, password } = req.body;
//     try {
//         const newHealthWorker = new healthWorker({ userName, password });
//         await newHealthWorker.save();
//         const token = jwt.sign({ userId: newHealthWorker._id }, jwtKey);
//         res.send({ token });
//     } catch (error) {
//         res.send(error.message);
//     }
// });

router.post('/signIn', async (req, res) => {
    const { userName, password, actor } = req.body;


    console.log(req.body);
    console.log(password);
    console.log(actor);
    const role = mongoose.model(actor);
    if (!userName || !password) {
        return res.send({ error: "Must Provide UserName & Password!!" });
    }
    const user = await role.findOne({ userName });
    if (!user) {
        return res.send({ error: "Enter Valid UserName or Password!!" });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtKey);
        res.send({ token });
    } catch (error) {
        return res.send({ error: "Enter Valid UserName or Password!!" });
    }
});

module.exports = router;