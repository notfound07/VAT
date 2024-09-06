import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // console.log(`Retrieved item for key "${key}":`, item); // Debug log
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving item for key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // console.log(`Saved item for key "${key}":`, valueToStore); // Debug log
    } catch (error) {
      console.error(`Error saving item for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
