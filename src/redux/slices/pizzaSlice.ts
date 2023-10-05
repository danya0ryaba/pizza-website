import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'

export enum Status {
    LOADING = 'loading',
    SUCCES = 'succes',
    ERROR = 'error'
}
export type Pizza = {
    count?: number
    id: number,
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number,
    category: number
    rating: number
}
export type PizzaSliceStateType = {
    items: Pizza[]
    status: Status
}
type ParamsType = {
    order: string
    sortBy: string
    categoty: string
    search: string
    currentPage: number
}



export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async (params: ParamsType) => {
        const { order, sortBy, categoty, search, currentPage } = params
        const { data } = await axios.get<Pizza[]>(`https://64bf5ea45ee688b6250d538d.mockapi.io/items?page=${currentPage}&limit=4&${categoty}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState: PizzaSliceStateType = {
    items: [],
    status: Status.LOADING
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<PizzaSliceStateType>) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload
                state.status = Status.SUCCES
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    }
});

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer