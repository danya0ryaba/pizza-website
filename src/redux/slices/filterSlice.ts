import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// {
//     "id": 2,
//     "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
//     "title": "Цыпленок барбекю",
//     "types": [
//         0
//     ],
//     "sizes": [
//         26,
//         40
//     ],
//     "price": 295,
//     "category": 1,
//     "rating": 4
// }

export type ListItemType = {
    name: string
    sortPropperty: string
}
export type FilterSliceType = {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: ListItemType
}

const initialState: FilterSliceType = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortPropperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSortChange(state, action: PayloadAction<ListItemType>) {
            state.sort = action.payload
        },
        setCurrenPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceType>) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId)
                state.currentPage = Number(action.payload.currentPage)
                state.sort = action.payload.sort
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortPropperty: 'rating'
                };
            }

        }
    }
})

export const selectSort = (state: RootState) => state.filter.sort

export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSortChange, setCurrenPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer