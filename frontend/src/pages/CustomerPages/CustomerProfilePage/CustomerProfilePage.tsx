import React, { useContext, useEffect, useState } from 'react'
import "./CustomerProfilePage.scss"
import useFetch from '../../../utils/hooks/useFetch';
import { UserContext } from '../../../utils/contexts/userContext';
import sendConfirmationAccountDeletionEmail from '../../../utils/functions/sendConfirmationAccountDeletionEmail';
import deleteUserAccount from '../../../utils/functions/deleteUserAccount';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
const CustomerProfilePage = () => {

  const location = useLocation();

    const {user, setUser} = useContext(UserContext);
    const stripePromise = loadStripe("pk_test_51NjToNBdjD7XjhkGiAnTKFhAu9PewLdhRoKWW1ok1fHmMAZkiQkAEiUxW61GtiDXHsJLgpeOa7DVDQsqrAFDQ1j000VL2esCZw")

    async function DeleteAccount(userId: string){

        const userDeleted = await deleteUserAccount(user._id);

        console.log("user deleted", userDeleted);

        sendConfirmationAccountDeletionEmail(userDeleted);
    }

    const [message, setMessage] = useState("");

    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      console.log(window.location.search);
    const searchParams = new URLSearchParams(window.location.search);
    const paymentIntentId = searchParams.get('payment_intent');
    localStorage.setItem("stripeinfo",JSON.stringify(paymentIntentId));
    localStorage.setItem("stripee",JSON.stringify(searchParams));
    const success = searchParams.get('success');
    const amountTotal = searchParams.get('amount_total');
    
    localStorage.setItem("success",JSON.stringify(success));
    localStorage.setItem("amount total",JSON.stringify(amountTotal));
    console.log("success",success)
    console.log("amount total",amountTotal)

      console.log("query",searchParams)
  
      if (searchParams.get("success")) {
        console.log("suuuuuuuuuuuccccced");
        setMessage("Order placed! You will receive an email confirmation.");
        
      }
  
      if (searchParams.get("canceled")) {
        console.log("caaaaanceled")
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);


    console.log("messsssssage",message)
    const PaymentPage = async(userId:string) => {
        const url = "http://localhost:3350/api/v1/create-checkout-session";
        const token = localStorage.getItem("token");
        
        const option = {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
        }

        const response = await fetch(url,option);
        const data = await response.json();

        console.log("response payment", data.url);
        const stripe = await stripePromise;

        stripe?.redirectToCheckout({sessionId: data.id});
    }



  return (
    <div className='CustomerProfileSection'>
        <p>{ message }</p>
        <div className='DeleteAccountButton' onClick={() => DeleteAccount(user._id)}><p>Supprimer mon compte</p></div>
        
            <div className='Acheter' onClick={() => PaymentPage(user._id)}>Acheter</div>
            <form action="/create-checkout-session" method='POST'>
                <button type='submit'> Acheter</button>
            </form>
    </div>
  )
}

export default CustomerProfilePage