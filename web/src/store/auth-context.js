import React, { useState } from "react";

const AuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
  onLogin: (data) => {},
  onLogout: () => {},
  hasStorage: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const loginHandler = (data, token) => {
    if (data) {
      setIsLoggedIn(true);
      setUser(data.user);
      sessionStorage.setItem("token", data.token || token);
    }
  };

  const checkStorage = () => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  };

  const context = {
    user: user,
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    hasStorage: checkStorage,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
