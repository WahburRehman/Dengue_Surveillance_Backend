const mongoose = require('mongoose');
const dispensary = mongoose.model('dispensary');

exports.addDispensary = (req, res, next) => {

    try {
        const addDispensary = new dispensary({
            name: req.body.name.toUpperCase(),
            email: req.body.email.toUpperCase(),
            city: req.body.city,
            address: req.body.address,
            contactNo: req.body.contactNo,
            status: req.body.status.toUpperCase()
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
                res.json({ error: error });
            });
    } catch (error) {
        res.status(500).json({ Error: error });
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
    console.log(req.body.name);
    try {
        dispensary.findOne({ name: req.body.name.toUpperCase() }, (error, data) => {
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
        dispensary.deleteOne({ name: req.body.name.toUpperCase() }, (error, data) => {
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
