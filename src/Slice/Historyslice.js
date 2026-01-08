import { createSlice } from "@reduxjs/toolkit";
// load history from localstorage
const savedHistory = JSON.parse(localStorage.getItem("watchHistory")) || []

export const HistorySlice = createSlice({
  name: "history",
  initialState: {
    value: savedHistory
  },
  reducers: {
    AddToHistory: (state, action) => {
      const existingData = state.value.find(item => item.id === action.payload.id)
      if (!existingData) {
        state.value.unshift(action.payload)
      }
      // save to localstorage
      localStorage.setItem("watchHistory", JSON.stringify(state.value))

    },
    RemoveFromHistory: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload)
      // update Item
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    }
  }
})
export const { AddToHistory, RemoveFromHistory } = HistorySlice.actions
export default HistorySlice.reducer