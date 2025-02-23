import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deleveryFee = 10;
  return (
    <ShopContext.Provider value={{ products, currency, deleveryFee }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
