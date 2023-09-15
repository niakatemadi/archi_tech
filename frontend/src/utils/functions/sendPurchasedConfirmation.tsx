import emailjs from "emailjs-com";

const sendPurchasedConfirmation = (firstName: string, email: string) => {

    const templateParams = {firstName, email}
    
    emailjs.send(`${process.env.REACT_APP_EMAILJS_SECOND_SERVICE}`,`${process.env.REACT_APP_EMAILJS_PURCHASE_TEMPLATE}`,templateParams,"iRTLaSw8IcBCYIKBz")
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendPurchasedConfirmation;