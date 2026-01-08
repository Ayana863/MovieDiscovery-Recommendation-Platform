import { configureStore } from "@reduxjs/toolkit";
import historyReducer from '../Slice/Historyslice'
import FavReducer from '../Slice/Favorites'
import SearchReducer from '../Slice/SearchSlice'

export default configureStore({
    reducer: {
        history: historyReducer,
        favorites: FavReducer,
        search: SearchReducer
    }
})