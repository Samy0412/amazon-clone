import React, { forwardRef } from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = forwardRef(
  ({ id, image, title, price, rating, hideButton, hideStock }, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
      //Remove the item from the basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        item: {
          id: id,
        },
      });
    };
    return (
      <div ref={ref} className="checkoutProduct">
        <img className="checkoutProduct__image" src={image} alt="" />
        <div className="checkoutProduct__info">
          <div className="checkoutProduct__info__header">
            <div className="checkoutProduct__title">
              <p>{title}</p>
              {!hideStock && <small>In stock</small>}
            </div>
            <div className="checkoutProduct__price">
              <p>
                <small>$</small>
                <strong>{price}</strong>
              </p>
            </div>
          </div>

          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from basket</button>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
