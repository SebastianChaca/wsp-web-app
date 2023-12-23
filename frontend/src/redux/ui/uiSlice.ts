import { createSlice } from '@reduxjs/toolkit';

interface Initialstate {
  isMobile: boolean;
}
const initialState: Initialstate = {
  isMobile: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});
export const { setIsMobile } = uiSlice.actions;

export default uiSlice.reducer;
