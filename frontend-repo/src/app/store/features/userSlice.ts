import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  success: boolean;
  errMsg: string;
}

const initialState: UserState = {
  loading: false,
  success: false,
  errMsg: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    successFetch: (state) => {
      state.loading = false;
      state.success = true;
      state.errMsg = "";
    },
    errorFetch: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.success = false;
      state.errMsg = action.payload || "Something wnet wrong";
    },
    loadingFetch: (state) => {
      state.loading = true;
      state.success = false;
      state.errMsg = "";
    },
  },
});

export const { successFetch, errorFetch, loadingFetch } = userSlice.actions;
export default userSlice.reducer;
