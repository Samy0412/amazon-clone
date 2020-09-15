import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            key="12321345"
            id="12321345"
            title="American Dirt (Oprah's Book Club): A Novel Paperback – Jan. 21 2020"
            price={19.37}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/51Cj8es7jmL._SX329_BO1,204,203,200_.jpg"
            }
            rating={5}
          />
          <Product
            key="495069378"
            id="495069378"
            title="Crock-Pot 6Qt Programmable Slow Cooker, Stainless Steel, Black - SCVP600SS-033"
            price={64.97}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/81nnHU6nQNL._AC_SL1500_.jpg"
            }
            rating={4}
          />
        </div>
        <div className="home__row">
          <Product
            key="499599960"
            id="499599960"
            title=" TETON Sports LEEF Lightweight Mummy Sleeping Bag; Great for Hiking, Backpacking and Camping; Free Compression Sack"
            price={119.95}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/71QnaY-SYOL._AC_SL1500_.jpg"
            }
            rating={4}
          />
          <Product
            key="127483720"
            id="127483720"
            title="Echo Dot (3rd gen) - Smart speaker with Alexa - Charcoal"
            price={39.0}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/419SVFEiGcL._AC_.jpg"
            }
            rating={4}
          />
          <Product
            key="457283909"
            id="457283909"
            title="Logitech K360 Wireless Keyboard, Black, English (920-004088)"
            price={34.95}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/81M0vmC%2BjLL._AC_SL1500_.jpg"
            }
            rating={3}
          />
        </div>
        <div className="home__row">
          <Product
            key="56273891"
            id="56273891"
            title="Acer R240HY bidx 23.8-Inch IPS HDMI DVI VGA (1920 x 1080) Widescreen Display"
            price={194.95}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/91K9SyGiyzL._AC_SL1500_.jpg"
            }
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
