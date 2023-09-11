import emailjs from "emailjs-com";

const sendConfirmationSignUpEmail = (name: string, email: string) => {

    const templateParams = {name, email}
    
    emailjs.send(`${process.env.REACT_APP_EMAILJS_FIRST_SERVICE}`, `${process.env.REACT_APP_EMAILJS_CONFIRMATION_SIGNUP_TEMPLATE}`,templateParams, 'Dx3PbDbEX2fS5XUhp')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendConfirmationSignUpEmail;