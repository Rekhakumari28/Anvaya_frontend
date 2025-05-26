import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL } from "./userSlice";

export const fetchAllSalesAgent = createAsyncThunk(
  "salesAgent/fetchAllSalesAgent",
  async () => {
   try {
    const token = localStorage.getItem("token");
     const response = await axios.get(
      `${Anvaya_CRM_URL}/api/agents`,{
              headers: {
                Authorization: `${token}`,
              },
            }
    );
    const data = response.data;
    return data;
   } catch (error) {
    console.log(error)
   }
  }
);

export const addSalesAgentAsync = createAsyncThunk(
  "addSalesAgent/addSalesAgentAsync",
  async (newSalesAgent) => {
   try {
    const token = localStorage.getItem("token");
     const response = await axios.post(
      `${Anvaya_CRM_URL}/api/agents`,
      newSalesAgent, {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
   } catch (error) {
    console.log(error)
   }
  }
);

export const deleteSalesAgentAsync = createAsyncThunk(
  "deleteAgent/deleteSalesAgentAsync",
  async (agentId) => {
   try {
    const token = localStorage.getItem("token");
     const response = await axios.delete(
      `${Anvaya_CRM_URL}/api/agents/${agentId}`,{
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
   } catch (error) {
    console.log(error)
   }
  }
);

export const salesAgentSlice = createSlice({
  name: "SalesAgent",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //get all sales Agents
    builder.addCase(fetchAllSalesAgent.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchAllSalesAgent.fulfilled, (state, action) => {
      state.status = "Get Sales Agent successfully";
      state.agents = action.payload;
      // console.log(action.payload, "payload")
    });
    builder.addCase(fetchAllSalesAgent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add Sales Agent
    builder.addCase(addSalesAgentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addSalesAgentAsync.fulfilled, (state, action) => {
      state.status = "Added Sales Agent successfully";
      const addedSalesAgent = action.payload;
      console.log(addedSalesAgent, "addedSalesAgent");
    });
    builder.addCase(addSalesAgentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //delete Sales Agent
    builder.addCase(deleteSalesAgentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteSalesAgentAsync.fulfilled, (state, action) => {
      state.status = "Agent deleted successfully";
      const deletedAgent = action.payload;
      console.log(deletedAgent, "deletedAgent");
    });
    builder.addCase(deleteSalesAgentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
export default salesAgentSlice.reducer;
