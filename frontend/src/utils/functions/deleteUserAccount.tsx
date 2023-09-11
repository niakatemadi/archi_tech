import React from 'react'
import sendConfirmationAccountDeletionEmail from './sendConfirmationAccountDeletionEmail';

type deleteUserAccountProps = {
  userId: string,
  navigate : any
}

const deleteUserAccount = async({userId, navigate} : deleteUserAccountProps) => {

    const token = localStorage.getItem("token");

    const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
    }

    const url = `http://localhost:3350/api/v1/users/${userId}`;
    
    const response = await fetch(url, options);
    const userDeleted = await response.json();

    if(userDeleted) {
      sendConfirmationAccountDeletionEmail(userDeleted);

      navigate("/", { state : "userAccountDeleted"});
    }

    return userDeleted;
}

export default deleteUserAccount