import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import { getTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import moment from "moment";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [succeeded, setSuceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  //Post request to stripe each time the basket changes, to get a clientSecret
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunits (cents)
        url: `/payments/create?total=${getTotal(basket) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>>", clientSecret);
  //Processing the payment
  const handleSubmit = async (event) => {
    event.preventDefault();
    setprocessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSuceeded(true);
        setError(null);
        setprocessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    //Listen for changes in the CardElements
    //and display any errors as the customer types
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__header">
        <h2 className="payment__title">Review you order</h2>
        <br></br>
        <p className="payment__notice">
          By placing your order, you agree to FAKE AMAZON CLONE's{" "}
          <span> privacy notice</span> and
          <span> conditions of use.</span>
        </p>
      </div>
      <div className="payment__body">
        <div className="payment__left">
          <div className="payment__address">
            <div className="payment__shipping">
              <div className="payment__shipping__title">
                <strong>Shipping address</strong>
                <span> Change</span>
              </div>
              <div className="payment__shipping__address">
                <p>{user?.displayName}</p>
                <p>123 React lane</p>
                <p>Los Angeles, CA</p>
                <p>90015, USA</p>
              </div>
            </div>
            <div className="payment__billing">
              <div className="payment__shipping__title">
                <strong>Billing address</strong>
                <span> Change</span>
              </div>
              <div className="payment__shipping__address">
                <p>{user?.displayName}</p>
                <p>123 React lane</p>
                <p>Los Angeles, CA</p>
                <p>90015, USA</p>
              </div>
            </div>
          </div>
          <div className="payment__items">
            {basket.length ? (
              <p className="delivery__date">
                Delivery date :{" "}
                {moment(Date.now() + 259200000).format("MMMM D. YYYY")}
              </p>
            ) : (
              ""
            )}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
                hideButton
              />
            ))}
          </div>
        </div>

        <div className="payment__right">
          <strong className="payment__shipping__title">Payment method</strong>
          <div className="payment__details">
            {/* stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <button disabled={processing || disabled || succeeded}>
                <span>
                  {processing ? <p>Processing</p> : "Place your order"}{" "}
                </span>
              </button>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
          <div className="payment__priceContainer">
            <strong className="payment__shipping__title">Order summary</strong>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="payment__shipping__address">Items:</p>
                  </td>
                  <td className="price">
                    <CurrencyFormat
                      className="payment__items__price"
                      renderText={(value) => (
                        <p className="payment__shipping__address">{value}</p>
                      )}
                      decimalScale={2}
                      value={getTotal(basket)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="payment__shipping__address">
                      Shipping & Handling:
                    </p>
                  </td>
                  <td className="price">
                    <p className="payment__shipping__address">
                      {getTotal(basket) === 0 ? "$0" : "$4.03"}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 className="payment__total">Order Total</h3>
                  </td>
                  <td className="price">
                    <CurrencyFormat
                      renderText={(value) => (
                        <h3 className="payment__total">{value}</h3>
                      )}
                      decimalScale={2}
                      value={getTotal(basket) && getTotal(basket) + 4.03}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
