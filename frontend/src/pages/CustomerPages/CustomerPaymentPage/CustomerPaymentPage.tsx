import React, { useContext, useEffect, useState } from 'react'
import "./CustomerPaymentPage.scss"
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '../../../utils/contexts/userContext';
import PaymentCardComponent from '../../../components/PaymentCardComponent/PaymentCardComponent';
import addStorageAfterPayment from '../../../utils/functions/addStorageAfterPayment';
import sendPurchasedConfirmation from '../../../utils/functions/sendPurchasedConfirmation';
import displayStripePaymentWall from '../../../utils/functions/displayStripePaymentWall';

const CustomerPaymentPage = () => {

    const {user, setUser} = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [isPurchaseSucceed, setIsPurchaseSucceed] = useState<boolean>();

    useEffect( () => {
      // Check to see if this is a redirect back from Checkout
      const searchParams = new URLSearchParams(window.location.search);
  
      if (searchParams.get("success")) {
        setIsPurchaseSucceed(true);
        
        setMessage("Achat réussi! Vous receverez une confirmation dans votre boite électronique.");
        
        const userFromLocalStorage = JSON.parse(localStorage.getItem("currentUser")!);
        const userId = userFromLocalStorage._id;
        const userFirstName = userFromLocalStorage.firstName;
        const userEmail = userFromLocalStorage.email;
        
        sendPurchasedConfirmation(userFirstName, userEmail);
        
        addStorageAfterPayment(userId).then((userUpdated) => {setUser(userUpdated); localStorage.setItem("currentUser",JSON.stringify(userUpdated));console.log(userUpdated)});
       
    }
    
    if (searchParams.get("canceled")) {
        setIsPurchaseSucceed(false);

        setMessage("Achat Annulé -- Votre achat n'a pas pu etre traité.");
      }
    }, []);
    
  return (
    <div className='CustomerPaymentPageBloc'>
      <div className='CustomerPaymentPageBloc__blocTitle'>
        <h2 className='CustomerPaymentPage__title'>Payments</h2>
      </div>
      <div className='CustomerPaymentPageBloc__blocPayments'>
        <h1 className={ isPurchaseSucceed ? "purchaseSucceed" : "purchaseCanceled"}>{ message }</h1>
        <PaymentCardComponent clickOnPurchaseButton={() => displayStripePaymentWall()} />
      </div>
    </div>
  )
}

export default CustomerPaymentPage