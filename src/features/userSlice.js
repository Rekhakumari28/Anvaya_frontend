import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Anvaya_CRM_URL="https://anvaya-backend.vercel.app"


export const fetchUserAsync = createAsyncThunk(
  "users/fetchUserAsync",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${Anvaya_CRM_URL}/api/users`, {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  }
);

export const registerUserAsync = createAsyncThunk(
  "users/registerUserAsync",
  async ({name, email, password}) => {
    const response = await axios.post(
      `${Anvaya_CRM_URL}/api/users/register`,
     {name, email, password}
    );
    const data = response.data;
     console.log("signup response:", response.data);
    localStorage.setItem("token", response.data.token);
    console.log(data, "data submit");
    return data;
  }
);

export const userLoginAsync = createAsyncThunk("users/userLoginAsync",async({email, password})=>{
  try {
    const response = await axios.post(
      `${Anvaya_CRM_URL}/api/users/login`,
      // `http://localhost:3000/api/users/login`,
      {email, password}
    );
    console.log("Login response:", response.data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    ;
  }
 
})

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    statusUser: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch User
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.statusUser = "All User";
      state.users = action.payload;
      // console.log(action.payload, "payload");
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });

    //register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.statusUser = "User registerd.";
      state.users = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });

     //login
     builder.addCase(userLoginAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      state.statusUser = "User Login token.";
      state.users = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
