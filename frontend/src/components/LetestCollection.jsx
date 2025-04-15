import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const LetestCollection = () => {
  const { products } = useContext(ShopContext);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LETEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-bse text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi
          nostrum incidunt animi.
        </p>
      </div>
    </div>
  );
};

export default LetestCollection;
