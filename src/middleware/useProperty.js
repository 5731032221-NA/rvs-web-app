import { useState } from "react";

export default function useProperty() {
  const [property, setProperty] = useState(null);
  // const getProperty = () => {
  //     // const tokenString = sessionStorage.getItem('token');
  //     // const userToken = JSON.parse(tokenString);
  //     return property;
  // };
  const saveProperty = (propertyString) => {
    // console.log("propertyString", propertyString)
    setProperty(propertyString);
  };
  return {
    setProperty: saveProperty,
    property,
  };
}
