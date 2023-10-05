import { CartItemType } from "../redux/slices/cartSlice"

export const calcTotalPrice = (items: CartItemType[]) => {

    return items.reduce((sum: number, item: CartItemType) => {
        return item.price * (item.count as number) + sum
    }, 0)

}