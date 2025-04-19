import { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 10;

  // Initialize cart state
  const [cart, setCart] = useState(() => {
    // Check if cart exists in localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculated values
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Update localStorage when cart changes and recalculate totals
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const total = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const quantity = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    setCartTotal(total);
    setCartQuantity(quantity);
  }, [cart]);

  // Add to cart function
  const addToCart = (productId, quantity = 1) => {
    const product = products[productId];

    if (!product) return;

    if (product.stock < 1) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    setCart((prevCart) => {
      // Check if product is already in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex !== -1) {
        // Product exists in cart, update quantity
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;

        // Check if requested quantity is available
        if (newQuantity > product.stock) {
          alert(`Sorry, only ${product.stock} items available in stock.`);
          newCart[existingItemIndex].quantity = product.stock;
        } else {
          newCart[existingItemIndex].quantity = newQuantity;
        }

        return newCart;
      } else {
        // Product not in cart, add new item
        return [
          ...prevCart,
          {
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: Math.min(quantity, product.stock),
            stock: product.stock,
          },
        ];
      }
    });
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, quantity) => {
    const product = products[productId];

    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > product.stock) {
      alert(`Sorry, only ${product.stock} items available in stock.`);
      quantity = product.stock;
    }

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        deliveryFee,
        cart,
        cartTotal,
        cartQuantity,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
