import { loadStripe } from '@stripe/stripe-js';

const displayStripePaymentWall = async( isSignUpStep = false ) => {

        const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)
        const url = `${"http://localhost:3350/api/v1/create-checkout-session/" + isSignUpStep}`;
        const token = localStorage.getItem("token");
        
        console.log("env datas",process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const option = {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
        }
    
        const response = await fetch(url,option);
        const data = await response.json();
    
        const stripe = await stripePromise;
    
        stripe?.redirectToCheckout({sessionId: data.id});
}

export default displayStripePaymentWall