const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../keys')


const verify = (actor) => {
    const role = mongoose.model(actor);
    return function (req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.send({ error: "You Must Be Logged In!!" });
        }
        const getToken = authorization.replace("Bearer ", "");
        jwt.verify(getToken, jwtKey, async (error, payload) => {
            if (error) {
                return res.send({ error: "Not A Valid User!!" });
            }
            const { userId } = payload;
            const user = await role.findById(userId);
            req.user = user;
            next();
        });
    }
}

module.exports = verify;