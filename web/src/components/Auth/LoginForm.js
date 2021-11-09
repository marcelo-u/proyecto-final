import React, { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { apiLogin } from "../../utils/api";

const classes = require("./LoginForm.module.css");

const LoginForm = () => {
  const [prefix, setPrefix] = useState(null);
  const [prefixList, setPrefixList] = useState([]);

  useEffect(() => {
    const loadPrefix = async () => {
      const data = await apiLogin.prefix();
      setPrefixList(data.prefix);
    };
    loadPrefix();
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    const form = {
      username: emailInpuRef.current.value,
      password: passwordInputRef.current.value,
    };
    const data = await apiLogin.login(form);
    authCtx.onLogin(data);
  };
  const authCtx = useContext(AuthContext);
  const [isLoginFormActive, setIsLoginFormActive] = useState(true);

  const emailInpuRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();

  const registerHandler = async (event) => {
    event.preventDefault();
    const form = {
      email: emailInpuRef.current.value,
      password: passwordInputRef.current.value,
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      address: addressInputRef.current.value,
      phone: prefix + phoneInputRef.current.value,
    };
    const data = await apiLogin.register(form);
    if (data) {
      alert(data);
    }
  };
  const switchFormHandler = (event) => {
    event.preventDefault();
    setIsLoginFormActive(!isLoginFormActive);
  };

  const onClick = () => {
    const e = document.getElementById("prefixDdl");
    setPrefix("+" + e.value);
  };

  return (
    <React.Fragment>
      <section className={classes.auth}>
        <h1>{isLoginFormActive ? "Inicio" : "Registro"}</h1>
        <form onSubmit={isLoginFormActive ? loginHandler : registerHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInpuRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          {!isLoginFormActive && (
            <div className={classes.control}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" required ref={nameInputRef} />
            </div>
          )}
          {!isLoginFormActive && (
            <div className={classes.control}>
              <label htmlFor="age">Edad</label>
              <input
                type="number"
                id="age"
                min={18}
                required
                ref={ageInputRef}
              />
            </div>
          )}
          {!isLoginFormActive && (
            <div className={classes.control}>
              <label htmlFor="address">Direccion</label>
              <input type="text" id="address" required ref={addressInputRef} />
            </div>
          )}
          {!isLoginFormActive && (
            <div className={classes.control}>
              <label>Prefijo</label>
              <select id={"prefixDdl"} onChange={onClick}>
                <option disabled selected>
                  Select
                </option>
                {prefixList.map((elem) => (
                  <option
                    key={`key--${elem[0]}`}
                    value={elem[2]}
                  >{`${elem[0]} (+${elem[2]})`}</option>
                ))}
              </select>

              <div id={"second"} className={classes.control}>
                <input
                  type="tel"
                  id="phone"
                  placeholder={"telefono"}
                  required
                  ref={phoneInputRef}
                />
              </div>
            </div>
          )}

          <div className={classes.actions}>
            <button>Aceptar</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchFormHandler}
            >
              {isLoginFormActive
                ? "¿No tenés usuario? click acá"
                : "¿Ya tenés cuenta? click acá"}
            </button>
          </div>
        </form>
        <div>{authCtx.user && <p>{authCtx.user.email}</p>}</div>
      </section>
      )
    </React.Fragment>
  );
};

export default LoginForm;
