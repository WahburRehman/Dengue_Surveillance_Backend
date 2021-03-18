const mongoose = require('mongoose');
const hospital = mongoose.model('hospital');

exports.addHospital = async (req, res, next) => {
    console.log(req)
    try {
        const addHospital = new hospital({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            address: req.body.address,
            contactNo: req.body.contactNo,
            status: req.body.status
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