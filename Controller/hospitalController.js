const mongoose = require('mongoose');
const hospital = mongoose.model('hospital');

exports.addHospital = async (req, res, next) => {
    console.log(req.body)
    try {
        const addHospital = new hospital({
            name: req.body.name.toUpperCase(),
            email: req.body.email.toUpperCase(),
            city: req.body.city,
            address: req.body.address,
            contactNo: req.body.contactNo,
            status: req.body.status.toUpperCase(),
            joiningDate: req.body.joiningDate
        });

        await addHospital
            .save()
            .then(result => {
                console.log(result)
                res.status(200).json({ message: 'Hospital Added Successfully!!' })
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    return res.json({ error: 'Hospital Already Exist' });
                }
                console.log(error);
                return res.json({ error: 'error' });
            });
    } catch (error) {
        res.status(500).json({ Error: error });
    }
};

exports.fetchAllHospitals = (req, res, next) => {
    if (req.body.fetch === 'name') {
        try {
            console.log('fetch: ', req.body.fetch)
            hospital.find({}, { name: 1, _id: 0 }, (error, data) => {
                if (error) {
                    console.log(error);
                    return res.json({ error: error });
                }
                else {
                    if (data.length === 0) {
                        console.log('data length', data.length);
                        res.send(data);
                    }
                    else {
                        console.log(data);
                        res.send(data);
                    }
                }
            }).catch(error => {
                console.log(error);
                res.send(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    else {
        try {
            hospital.find({}).sort({ _id: -1 })
                .then(result => {
                    if (result.length === 0) {
                        console.log('data length', result.length);
                        res.send({ message: 'hospitals not found!!' });
                    }
                    else {
                        console.log(result);
                        res.send(result);
                    }
                }).catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'error' });
                });
        } catch (error) {
            console.log(error);
        }
    }
};

exports.fetchAllhospitalsNames = (req, res, next) => {
    try {
        hospital.find({}, { name: 1, _id: 0 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'Hospitals not found!!' });
                }
                else {
                    console.log(result);
                    res.send(result);
                }
            }).catch(error => {
                console.log(error)
                res.status(400).json({ error: 'error' });
            });
    } catch (error) {
        console.log(error);
    }
}

exports.findRecord = (req, res, next) => {
    console.log(req.query.id);
    try {
        hospital.findOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(data)
                res.send(data);
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
};

exports.deleteRecord = (req, res, next) => {
    console.log(req.query.id);
    try {
        hospital.deleteOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else {
                console.log(data)
                res.json({ message: 'record deleted Successfully' });
            }
        }).catch(error => {
            console.log(error);
            res.json({ error: error });
        })
    } catch (error) {
        console.log(error);
    }
};


exports.updateRecord = (req, res, next) => {
    console.log('req body: ', req.body);
    //$2b$10$6eyvlsBvbu/OypBb95mKs.62k38pnrAe/Hb8AyHyDqgP2gXKVqcky
    //$2b$10$3szsLk5CZ6/7NGrakoP/Ye9GXTAq/oqK1mBUz12E6W2JxR9OzCrYa
    // console.log(req.body);
    try {
        hospital.findOne({ _id: req.body.id })
            .then(user => {
                user.name = req.body.name;
                user.email = req.body.email;
                user.contactNo = req.body.contactNo;
                user.city = req.body.city;
                user.address = req.body.address;
                user.status = req.body.status;
                user.joiningDate = req.body.joiningDate;
                user
                    .save()
                    .then(result => {
                        console.log('result: ', result)
                        res.status(200).json({ message: 'Data Updated Successfully!!' });
                    }).catch(error => {
                        console.log(error);
                        res.status(400).json({ error: 'Data Could Not Be Updated!!' });
                    })
            }).catch(error => {
                console.log(error);
                res.status(400).json({ error: error });
            })
    } catch (error) {
        console.log(error);
    }
};

