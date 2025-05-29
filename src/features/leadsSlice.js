import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL } from "./userSlice";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${Anvaya_CRM_URL}/api/leads`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = response.data;
 
    return data;
  } catch (error) {
    console.log("Error", error);
  }
});
export const getGroupedLead = createAsyncThunk(
  "leads/getGroupedLead",
  async () => {
    const token = localStorage.getItem("token");
      const response = await axios.get(`${Anvaya_CRM_URL}/api/leads/grouped`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = response.data;
      console.log(response, "respopnse")
      return data;
  }
);

export const addLeadAsync = createAsyncThunk(
  "addLead/addLeadAsync",
  async (leadDataObject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${Anvaya_CRM_URL}/api/leads`,
        leadDataObject,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);

export const updateLeadAsync = createAsyncThunk(
  "update/updateLeadAsync",
  async ({ leadId, leadDataObject }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${Anvaya_CRM_URL}/api/leads/${leadId}`,
        leadDataObject,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);

export const deleteLeadAsync = createAsyncThunk(
  "delete/deleteLeadAsync",
  async (leadId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${Anvaya_CRM_URL}/api/leads/${leadId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);

export const leadSlice = createSlice({
  name: "Leads",
  initialState: {
    leads: [],
    statusGrouped: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch lead
    builder.addCase(fetchLeads.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "Success";
      state.leads = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add lead
    builder.addCase(addLeadAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addLeadAsync.fulfilled, (state, action) => {
      state.status = "Lead added successfully";
      const addedLead = action.payload;
    
    });
    builder.addCase(addLeadAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //update lead
    builder.addCase(updateLeadAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateLeadAsync.fulfilled, (state, action) => {
      state.status = "Lead updated successfully";
      const updatedLead = action.payload;
      console.log(updatedLead, "updatedLead");
    });
    builder.addCase(updateLeadAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // delete lead
    builder.addCase(deleteLeadAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteLeadAsync.fulfilled, (state, action) => {
      state.status = "Lead deleted successfully";
      const deletedLead = action.payload;
      console.log(deletedLead, "deletedLead");
    });
    builder.addCase(deleteLeadAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //grouped lead
    builder.addCase(getGroupedLead.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(getGroupedLead.fulfilled, (state, action) => {
      state.status = "Success";
      state.statusGrouped = action.payload;
      console.log(action.payload, "action")
    });
    builder.addCase(getGroupedLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  
  },
});

export default leadSlice.reducer;
