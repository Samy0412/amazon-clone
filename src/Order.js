import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

function Order({ order }) {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="order">
      <div className="order__header">
        <div className="order__info">
          <div className="order__placed">
            <small>ORDER PLACED</small>
            <br />
            <p>
              {moment.unix(order.data.created).format("MMMM D, YYYY - h:mma")}
            </p>
          </div>
          <div className="order__total">
            <small>TOTAL</small>
            <CurrencyFormat
              renderText={(value) => <p>{value}</p>}
              decimalScale={2}
              value={order.data.amount / 100}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
          <div className="order__shipping">
            <small>SHIP TO</small>
            <p>{user?.displayName}</p>
          </div>
        </div>

        <div className="order__id">
          <small>ORDER # {order.id}</small>
        </div>
      </div>
      <div className="order__body">
        {order.data.basket?.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            rating={0}
            hideButton
            hideStock
          />
        ))}
      </div>
    </div>
  );
}

export default Order;
