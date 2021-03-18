const mongoose = require('mongoose');
const dispensary = mongoose.model('dispensary');

exports.addDispensary = (req, res, next) => {

    try {
        const addDispensary = new dispensary({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            address: req.body.address,
            contactNo: req.body.contactNo,
            status: req.body.status
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