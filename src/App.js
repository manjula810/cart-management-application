import { useState, useEffect } from "react";

export default function App() {
  const [cart, setcart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  async function getProducts() {
    const res = await fetch("https://cart-management-application.onrender.com/api/products");
    const data = await res.json();
    setProducts(data);
  }
  async function getCartItems() {
    const res = await fetch("https://cart-management-application.onrender.com/api/carts");
    const data = await res.json();
    setcart(data);
  }
  useEffect(() => {
    getProducts();
    getCartItems();
  }, []);

  async function sendToCart(product) {
    const exists = cart.some((item) => item.product?._id === product._id);

    if (exists) {
      alert("You've already added this item into cart!");
      return;
    }

    const res = await fetch("https://cart-management-application.onrender.com/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product._id,
        quantity: 1,
      }),
    });

    const data = await res.json();

    setcart((prev) => [...prev, data]);
  }

  async function removeItem(itemId) {
    const res = await fetch(`https://cart-management-application.onrender.com/api/carts/${itemId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setcart((prev) => prev.filter((item) => item._id !== data._id));
  }

  async function UpdateQuantity(itemId, newQuantity) {
    const res = await fetch(`https://cart-management-application.onrender.com/api/carts/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    });
    const data = await res.json();
    setcart((prev) =>
      prev.map((item) =>
        item._id === data._id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }
  async function handlingOrderBtn() {
      const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const platformFee = 20;
  const res = await fetch("https://cart-management-application.onrender.com/api/carts", {
    method: "DELETE"
  });

  const data = await res.json();

  if (res.ok) {
    alert(`You've ordered items for ${total + platformFee}🛍️`);
    setcart([]);
    console.log(data);
  }
}
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchVal.toLowerCase()),
  );

  return (
    <div>
      <Navbar cart={cart} searchVal={searchVal} setSearchVal={setSearchVal} />
      <LandingPage />
      
          <Men sendToCart={sendToCart} products={filteredProducts}  searchVal={searchVal} />
          <Women sendToCart={sendToCart} products={filteredProducts} searchVal={searchVal} />
       
      <Cart
        cart={cart}
      
        UpdateQuantity={UpdateQuantity}
        removeItem={removeItem} handlingOrderBtn={handlingOrderBtn}
      />
    </div>
  );
}

function Navbar({ cart, searchVal, setSearchVal }) {
  return (
    <nav>
      <h2 className="head">Outlets</h2>
      <div className="searchbox">
        <input
          type="text"
          placeholder="search,product"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <p>
        <a href="#men-sec">Men</a>
      </p>
      <p>
        <a href="#woman-sec">Women</a>
      </p>

      <div>
        <a href="#cart-sec" className="cart-sec">
          <div className="item-count">{cart.length}</div>
          <i className="fa-solid fa-cart-shopping"></i>
        </a>
      </div>
    </nav>
  );
}

function LandingPage() {
  return (
    <section>
      <div className="video-cont">
        <h2 className="text1">Outlets sale on live! </h2>
        <p className="text2">Let them talking</p>
        <video autoPlay muted loop>
          <source
            src="./Untitled video - Made with Clipchamp.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}

function Men({ sendToCart, products,searchVal }) {
  return (
    <section className="men-section cloth-sec" id="men-sec">
      <h1 className="section-name">Men</h1>
     {searchVal.trim() && products.length === 0 ? (
  <h2 className="error-text">No products found ⛔</h2>
) : (
   <div className="outer-box">
        {products
          .filter((item) => item.category === "men")
          .map((i) => (
            <div className="box-cont" key={i._id}>
              <img src={i.imgPath} alt={i._id} />

              <div className="description" key={i}>
                <p className="product-name">{i.name}</p>
                {/* <button
                className="wishlist"
                onClick={() => onWishlist(i.id)}
              >
                {wishlist.includes(i.id)?(
                  <i class="fa-solid fa-heart" style={{ color: "#f00068" }}></i>
                ) : (
                  <i class="fa-regular fa-heart wishlist"></i>
                )}
              </button> */}
              </div>

              <p className="price">&#8377;{i.price}</p>
              <button className="cart-btn" onClick={() => sendToCart(i)}>
                Add to Cart <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          ))}
      </div>
)}
     
    </section>
  );
}

function Women({ sendToCart, products, searchVal }) {
  return (
    <section className="woman-section cloth-sec" id="woman-sec">
      <h1 className="section-name">Women</h1>

      {searchVal.trim() && products.length === 0 ? (
        <h2 className="error-text">No products found ⛔</h2>
      ) : (
        <div className="outer-box">
          {products
            .filter((item) => item.category === "women")
            .map((i) => (
              <div className="box-cont" key={i._id}>
                <img src={i.imgPath} alt={i._id} />

                <div className="description">
                  <p className="product-name">{i.name}</p>
                </div>

                <p className="price">₹{i.price}</p>

                <button
                  className="cart-btn"
                  onClick={() => sendToCart(i)}
                >
                  Add to Cart
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

function Cart({ cart,handlingOrderBtn, UpdateQuantity, removeItem }) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const platformFee = 20;



  return (
    <>
      <h1 className="section-name">Your Cart</h1>

      <section className="cart-section" id="cart-sec">
        {cart.length > 0 ? (
          <>
            <div className="cartouter-box">
              {cart.map((item) => (
                <div className="cart-cont" key={item._id}>
                  <div className="cart-info">
                    <img
                      src={item.product.imgPath}
                      alt={item.product.name}
                      className="cartItem-img"
                    />

                    <div className="qty-btncont">
                      <button
                        className="dec-qty-btn qbtn"
                        onClick={() =>
                          UpdateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <button className="qty-btn">{item.quantity}</button>

                      <button
                        className="inc-qty-btn qbtn"
                        onClick={() =>
                          UpdateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-desc">
                    <div className="description">
                      <p className="product-name">{item.product.name}</p>

                      <p className="random-txt">
                        Every item in your wardrobe has a point value.
                      </p>

                      <p className="price">
                        ₹{item.product.price * item.quantity}
                      </p>

                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="orderbtn-cont">
                <button className="order-btn" onClick={handlingOrderBtn}>
                  PLACE ORDER
                </button>
              </div>
            </div>

            <div className="priceInfo-cont">
              <h3>PRICE DETAILS</h3>
              <hr />

              <table>
                <tbody>
                  <tr>
                    <td>Price ({cart.length} items)</td>
                    <td>₹{total}</td>
                  </tr>

                  <tr>
                    <td>Platform fee</td>
                    <td>₹{platformFee}</td>
                  </tr>
                </tbody>
              </table>

              <hr />

              <div>
                <h3>TOTAL AMOUNT</h3>
                <p>₹{platformFee + total}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="emptymsg-cont">
            <h4>Your Cart is Empty! 🛒⛱️</h4>
          </div>
        )}
      </section>
    </>
  );
}
