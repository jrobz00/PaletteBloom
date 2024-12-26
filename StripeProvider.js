import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_live_51QYYH7L4aPeguOFLuzb87ZjL9anAwfCuP1rastkNt7Fy7AudNvH1vPGZzVHuGVekdAK7pN71Nft0Lq3VeMthKeg700Q2OMUNiq');

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeProvider;
