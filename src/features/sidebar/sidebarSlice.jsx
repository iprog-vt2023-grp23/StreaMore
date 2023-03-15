import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    currentPage: 'Search'
}

const sidebarSlice = createSlice({
    name: 'searchResulst',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            console.log("currentPage", state.currentPage);
        }
    }
})
export const getSidebarState = (state) => state.sidebar.open;
export const getCurrentPage = (state) => state.sidebar.currentPage;

export const {toggleSidebar, setCurrentPage} = sidebarSlice.actions;

export default sidebarSlice.reducer;