import React from 'react'
import cartEmpty from '../../assets/cartEmpty.png'
import { NavLink } from 'react-router-dom'
import style from './cartEmpty.module.scss'

export const CartEmpty: React.FC = () => {
    return <div className="cart cart--empty">
        <h2 >Корзина пустая <span>😕</span></h2>
        <p>
            Вероятней всего, вы не заказывали ещё пиццу.<br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmpty} alt="Empty cart" />
        <NavLink to="/" className="button button--black">
            <span>Вернуться назад</span>
        </NavLink>
    </div>
}
