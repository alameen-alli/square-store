import {
  ApplePay,
  GooglePay,
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";
import styles from "../styles/Home.module.css";

export default function Checkout() {
  return (
    <div className={styles.container}>
      <PaymentForm
        applicationId="sandbox-sq0idb-sRNqzQHou2IvQHiuOfyd0Q"
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          const response = await fetch("/api/pay", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              sourceId: token.token,
            }),
          });
          console.log(await response.json());
        }}
        locationId="XXXXXXXXXX"
        createPaymentRequest={() => ({
          countryCode: "US",
          currencyCode: "USD",
          total: {
            amount: "1.00",
            label: "Total",
          },
        })}
      >
        <ApplePay />
        <GooglePay />
        <CreditCard />
      </PaymentForm>
    </div>
  );
}
