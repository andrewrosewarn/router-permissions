import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAuthSlice {
  username: string | undefined;
  permissions: {
    isManager: boolean;
    isRetailer: boolean;
  };
}

const initialState: IAuthSlice = {
  username: undefined,
  permissions: {
    isManager: false,
    isRetailer: false,
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuthSlice>) => {
      return {
        username: action.payload.username,
        permissions: {
          isManager: action.payload.permissions.isManager,
          isRetailer: action.payload.permissions.isRetailer,
        },
      };
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
