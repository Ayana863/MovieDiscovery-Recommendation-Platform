import { createSlice } from "@reduxjs/toolkit";

const savedHistory = JSON.parse(localStorage.getItem("watchHistory")) || []

export const HistorySlice = createSlice({
  name: "history",
  initialState: {
    value: savedHistory
  },
  reducers: {
    AddToHistory: (state, action) => {
      const index = state.value.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        // Movie already exists, update watchedAt to now
        state.value[index] = { ...state.value[index], watchedAt: new Date().toISOString() }
      } else {
        // Add new movie at the beginning
        state.value.unshift(action.payload)
      }

      // Save to localStorage
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    },

    RemoveFromHistory: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload)
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    },

    ClearHistory: (state) => {
      state.value = []
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    }
  }
})

export const { AddToHistory, RemoveFromHistory, ClearHistory } = HistorySlice.actions
export default HistorySlice.reducer
