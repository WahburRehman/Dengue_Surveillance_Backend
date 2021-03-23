const mongoose = require('mongoose');
const hospital = mongoose.model('hospital');

exports.addHospital = async (req, res, next) => {
    console.log(req)
    try {
        const addHospital = new hospital({
            name: req.body.name.toUpperCase(),
            email: req.body.email.toUpperCase(),
            city: req.body.city,
            address: req.body.address,
            contactNo: req.body.contactNo,
            status: req.body.status.toUpperCase()
        });

        await addHospital
            .save()
            .then(result => {
                console.log(result)
                res.status(200).json({ message: 'Hospital Added Successfully!!' })
            }).catch(error => {
                // res.status(500).json({ Error: error })
                if (error.name === 'MongoError' && error.code === 11000) {
                    return res.json({ error: 'Hospital Already Exist' });
                }
            });
    } catch (error) {
        res.status(500).json({ Error: error });
    }
};

exports.fetchAllHospitals = (req, res, next) => {

    try {
        hospital.find({}, (error, data) => {
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
};

exports.findRecord = (req, res, next) => {
    console.log(req.body.name);
    try {
        hospital.findOne({ name: req.body.name.toUpperCase() }, (error, data) => {
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
    console.log(req.body.name);
    try {
        hospital.deleteOne({ name: req.body.name.toUpperCase() }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
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