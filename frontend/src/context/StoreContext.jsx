import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

  // ✅ Safe add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    try {
      if (token) {
        await axios.post(`${url}/api/cart/add`, { itemId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Failed to sync addToCart:", error);
    }
  };

  // ✅ Safe remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    try {
      if (token) {
        await axios.post(`${url}/api/cart/remove`, { itemId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Failed to sync removeFromCart:", error);
    }
  };

  // ✅ Total cart calculation with safety check
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // ✅ Load cart from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // ✅ Initial data loading
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
