import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'
import { calcTotalPrice } from '../../utils/calcTotalPtice'

export type CartItemType = {
    count?: number
    id: number
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
}
type CartState = {
    totalPrice: number
    items: CartItemType[]
}

const { items, totalPrice } = getCartFromLocalStorage()
// закончил на вынесении типов в отдельный файл
const initialState: CartState = {
    totalPrice,
    items
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find((obj: CartItemType) => obj.id === action.payload.id)
            if (findItem && findItem.count !== undefined) findItem.count++;
            else state.items.push({ ...action.payload, count: 1 });
            //  УБРАТЬ any
            // убрал any в sum и добавил строку с else
            state.totalPrice = calcTotalPrice(state.items)
        },
        pluseItem(state, action: PayloadAction<number>) {
            console.log(state.totalPrice)
            const pizzaObj = state.items.find(obj => obj.id === action.payload)
            if (pizzaObj && pizzaObj.count) {
                pizzaObj.count++
            }
            // state.totalPrice = state.totalPrice + action.payload
        },
        minusItem(state, action: PayloadAction<number>) {
            const pizzaObj = state.items.find(obj => obj.id === action.payload)
            if (pizzaObj && pizzaObj.count) {
                pizzaObj.count--
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    },
});

export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(pizza => pizza.id === id)

export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, clearItems, pluseItem, minusItem } = cartSlice.actions

export default cartSlice.reducer