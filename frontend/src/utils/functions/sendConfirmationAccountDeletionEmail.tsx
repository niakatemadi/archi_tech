import emailjs from "emailjs-com";

const sendConfirmationAccountDeletionEmail = (customerInfo: any) => {
 
    const templateParams = {
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        customer_firstName: customerInfo.firstName,
        customer_files: customerInfo.numberOfFiles,
        customer_folders: customerInfo.numberOfFolders
    }
    
    emailjs.send(`${process.env.REACT_APP_EMAILJS_FIRST_SERVICE}`, `${process.env.REACT_APP_EMAILJS_CONFIRMATION_ACCOUNT_DELETION_TEMPLATE}`,templateParams, 'Dx3PbDbEX2fS5XUhp')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendConfirmationAccountDeletionEmail;