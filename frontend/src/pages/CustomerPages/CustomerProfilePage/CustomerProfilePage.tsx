import React, { useContext } from 'react'
import "./CustomerProfilePage.scss"
import useFetch from '../../../utils/hooks/useFetch';
import { UserContext } from '../../../utils/contexts/userContext';
import sendConfirmationAccountDeletionEmail from '../../../utils/functions/sendConfirmationAccountDeletionEmail';
import deleteUserAccount from '../../../utils/functions/deleteUserAccount';
const CustomerProfilePage = () => {

    const {user, setUser} = useContext(UserContext);

    async function DeleteAccount(userId: string){

        const userDeleted = await deleteUserAccount(user._id);

        console.log("user deleted", userDeleted);

        sendConfirmationAccountDeletionEmail(userDeleted);
    }

  return (
    <div className='CustomerProfileSection'>
        <div className='DeleteAccountButton' onClick={() => DeleteAccount(user._id)}><p>Supprimer mon compte</p></div>
    </div>
  )
}

export default CustomerProfilePage