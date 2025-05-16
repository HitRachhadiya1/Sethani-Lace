import { createContext, useState, useEffect } from "react";
import { api } from "../utils/api";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 10;

  // Products state
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        // Convert array to object with _id as key
        const productsObj = response.products.reduce((acc, product) => {
          // Only include products that are available for sale for non-admin users
          if (product.availableForSale) {
            acc[product._id] = {
              ...product,
              id: product._id, // Add id field for compatibility
              image: product.image[0], // Use first image
              forSale: true, // Add forSale field for compatibility
            };
          }
          return acc;
        }, {});
        setProducts(productsObj);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

    if (!product.availableForSale) {
      alert("Sorry, this product is not available for sale.");
      return;
    }

    setCart((prevCart) => {
      // Check if product is already in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === productId || item._id === productId
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
            _id: productId, // Add _id field to match what the backend expects
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
        loading,
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
