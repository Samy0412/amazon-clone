import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
    history.push("/");
  };

  return (
    <div className="nav">
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
          />
        </Link>
        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
          {/* Logo */}
        </div>

        <div className="header__nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">
                Hello {user ? user.displayName : "Guest"}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign out" : "Sign in"}
              </span>
            </div>
          </Link>
          <Link to="./orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="under__header">
          {user && 
          <div className="under__header__left">
          <div>
          <LocationOnIcon />
          </div>
          <div>
            <small>Deliver to {user?.displayName}</small>
            <p>Los Angeles, 90015</p>
          </div>
          </div>
          }
        <div>
          <ul className="under__header__middle">
            {user && 
             <li>{user?.displayName}'s store</li>
            }
            <li>Best sellers</li>
            <li>Deals store</li>
            <li>Electronics</li>
            <li>Gift ideas</li>
            <li>Coupons</li>
            <li>New releases</li>
          </ul>
        </div>
        <div className="under__header__right">
          <p>Shop your university needs</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
