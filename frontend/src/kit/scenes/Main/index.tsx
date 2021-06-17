import React from 'react';
import './index.css'

function Main() {
    return (
        <div className="main_content">
            <div className="main_wrapper">
                <div><h1>Добро пожаловать в систему проверки алгоритма на уникальность "Antiplagiat!"</h1></div>
                <div><h2>Выберите одну из опций нашей программы:</h2></div>
                <div className="button_wrapper">
                    <div className="button_wrapper__left">
                        <a
                            href={'/editor'}
                            className="btn register"
                            type="button"
                        >
                            Проверка кода
                        </a>
                    </div>
                    <div className="button_wrapper__right">
                        <a
                            href={'editor/split'}
                            className="btn register"
                            type="button"
                        >
                            Сравнение кода
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;