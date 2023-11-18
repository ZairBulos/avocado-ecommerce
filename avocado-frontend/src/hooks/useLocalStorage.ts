export const useLocalStorage = () => {
  
  const getItemFromLS = (key: string) => {
    return localStorage.getItem(key);
  };

  const setItemToLS = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const removeItemFromLS = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    getItemFromLS,
    setItemToLS,
    removeItemFromLS,
  };
};
