const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../keys')


const verifyAdminToken = (actor) => {
    return function (req, res, next) {
        console.log('verify token')
        const admin = mongoose.model('admin');
        const { authorization } = req.headers;
        if (!authorization) {
            return res.send({ error: "You Must Be Logged In!!" });
        }
        const getToken = authorization.replace("Bearer ", "");
        jwt.verify(getToken, jwtKey, async (error, payload) => {
            if (error) {
                console.log('token error: ', error);
                return res.send({ error: "you Are Not A Valid User!!" });
            }
            console.log('token verify payload: ', payload);
            const { userId } = payload;
            const user = await admin.findById(userId);
            req.user = user;
            next();
        });
    }
}

module.exports = verifyAdminToken;