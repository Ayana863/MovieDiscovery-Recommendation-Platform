import { createSlice } from "@reduxjs/toolkit";
const savedFav = JSON.parse(localStorage.getItem("favorites")) || []

export const favSlice = createSlice({
    name: "Favorites",
    initialState: {
        value: savedFav
    },
    reducers: {
        AddToFav: (state, action) => {
            const exist = state.value.find(item => item.id === action.payload.id)
            if (!exist) {
                state.value.unshift(action.payload)
            }
            // save to localstorage
            localStorage.setItem("favorites", JSON.stringify(state.value))
        },
        RemoveFromFavorites: (state, action) => {
            state.value = state.value.filter(
                movie => movie.id !== action.payload
            )
            // update Item
            localStorage.setItem("favorites", JSON.stringify(state.value))
        }
    }
})
export const { AddToFav, RemoveFromFavorites } = favSlice.actions
export default favSlice.reducer