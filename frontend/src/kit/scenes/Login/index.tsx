import React, { useState } from "react";
import "./index.css";
import { Button, Jumbotron } from "react-bootstrap";

function Login() {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  const sendPromises = () => {
    //fetch()
  };
  return (
    <div className="dws-wrapper">
      <div className="dws-form">
        <label
          className={`tab ${isAuth ? "active" : ""}`}
          title="Вкладка 1"
          onClick={() => setIsAuth(true)}
        >
          Авторизация
        </label>
        <label
          className={`tab ${!isAuth ? "active" : ""}`}
          title="Вкладка 2"
          onClick={() => setIsAuth(false)}
        >
          Регистрация
        </label>

        {isAuth && (
          <form className="tab-form">
            <input className="input" type="email" placeholder="Введите e-mail" />
            <input className="input" type="password" placeholder="Введите пароль" />
            <button
              className="btn auth"
              type="button"
              onClick={sendPromises}
            >
              Войти
            </button>
          </form>
        )}

        {!isAuth && (
          <form className="tab-form del">
            <input className="input" type="text" placeholder="Введите имя" />
            <input className="input" type="text" placeholder="Введите фамилию" />
            <input className="input" type="password" placeholder="Введите пароль" />
            <input className="input" type="email" placeholder="Введите e-mail" />
            <input className="input" type="password" placeholder="Введите пароль" />
            <button
              className="btn register"
              type="button"
              onClick={sendPromises}
            >
              Регистрация
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
