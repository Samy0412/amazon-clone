import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import CurrencyFormat from "react-currency-format";
import { getTotal } from "./reducer";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/CCMP/newstorefront/YACC-desktop-nonprime-banner2.jpg"
          alt=""
        />
        <div>
          <div className="checkout__header">
            <h2 className="checkout__title">Shopping Basket</h2>
            <small>Price</small>
          </div>

          <div style={{ position: "relative" }}>
            <FlipMove enterAnimation="fade" leaveAnimation="fade" typeName="ul">
              {basket.map((item) => (
                <CheckoutProduct
                  key={1}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={0}
                />
              ))}
            </FlipMove>
          </div>
          <div className="checkout__subtotal">
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p>
                    Subtotal ({basket.length}{" "}
                    {basket.length === 1 ? "item" : "items"}):
                    <strong>{value}</strong>
                  </p>
                </>
              )}
              decimalScale={2}
              value={getTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
