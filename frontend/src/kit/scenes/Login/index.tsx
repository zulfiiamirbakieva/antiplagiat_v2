import React, { useState } from "react";
import "./index.css";
import {useAuth} from "../../../hooks/use-auth";

function Login() {

  const auth = useAuth()

  const [isAuth, setIsAuth] = useState<boolean>(true);


  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');



  const login = async () => {
    await auth.signIn(email, password)
  };

  const register = async () => {
      await auth.signUp(name, lastName, email, password)
  };

  return (
    <div className="dws-wrapper">
      <div className="dws-form shadow-lg">
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
            <input className="input" type="email" placeholder="Введите e-mail" onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
            <button
              className="btn auth"
              type="button"
              onClick={login}
            >
              Войти
            </button>
          </form>
        )}

        {!isAuth && (
          <form className="tab-form del">
            <input className="input" type="text" placeholder="Введите имя" onChange={(e) => setName(e.target.value)} />
            <input className="input" type="text" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)} />
            <input className="input" type="email" placeholder="Введите e-mail" onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
            <button
              className="btn register"
              type="button"
              onClick={register}
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
