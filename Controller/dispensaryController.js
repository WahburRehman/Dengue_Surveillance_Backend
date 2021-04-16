const mongoose = require('mongoose');
const dispensary = mongoose.model('dispensary');

exports.addDispensary = (req, res, next) => {
    console.log(req.body);
    try {
        const addDispensary = new dispensary({
            name: req.body.name.toUpperCase(),
            email: req.body.email.toUpperCase(),
            city: req.body.city,
            address: req.body.address,
            contactNo: req.body.contactNo,
            status: req.body.status.toUpperCase(),
            joiningDate: req.body.joiningDate
        });

        addDispensary
            .save()
            .then(result => {
                console.log(result);
                res.status(200).json({ message: 'Dispensary Added Successfully!!' });
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    return res.json({ error: 'dispensary Already Exist' });
                }
                console.log(error);
                res.json({ error: 'error' });
            });
    } catch (error) {
        res.status(500).json({ Error: 'error' });
    }
};


exports.fetchAllDispensaries = (req, res, next) => {

    try {
        dispensary.find({}, (error, data) => {
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

exports.findRecord = (req, res, next) => {
    console.log(req.body.id);
    try {
        dispensary.findOne({ _id: req.body.id }, (error, data) => {
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
    console.log(req.body.id);
    try {
        dispensary.deleteOne({ _id: req.body.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else {
                console.log(data)
                res.json({ message: 'record deleted Successfully' });
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
};

exports.updateRecord = (req, res, next) => {
    console.log(req.body.id);
    //$2b$10$6eyvlsBvbu/OypBb95mKs.62k38pnrAe/Hb8AyHyDqgP2gXKVqcky
    //$2b$10$3szsLk5CZ6/7NGrakoP/Ye9GXTAq/oqK1mBUz12E6W2JxR9OzCrYa
    // console.log(req.body);
    try {
        dispensary.findOne({ _id: req.body.id })
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

