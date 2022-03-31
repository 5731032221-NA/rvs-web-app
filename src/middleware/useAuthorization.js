import { useState } from "react";

export default function useAuthorization() {
  const getAuthorization = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [authorization, setAuthorization] = useState(getAuthorization());
  const saveAuthorization = (tokenString) => {
    const userToken = tokenString;
    // console.log("userToken", userToken)
    if (userToken != null) {
      setAuthorization(userToken);
    }
  };
  return {
    setAuthorization: saveAuthorization,
    authorization,
  };
}
