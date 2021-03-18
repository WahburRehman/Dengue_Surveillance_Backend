const keys = require('../keys');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(keys.sendGridKey);

exports.sendMail = (to, msg) => {
    const mail = {
        to: to,
        from: 'fypakount@gmail.com', // Change to your verified sender
        subject: 'Dengue Surveillance And Data Collection System',
        text: '??',
        html: msg,
    }
    sgMail
        .send(mail)
        .then(() => {
            console.log('Email Sent Successfully!!');
        })
        .catch(error => {
            console.log(error);
        })
}