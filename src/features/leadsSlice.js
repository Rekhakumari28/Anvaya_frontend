import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const response = await axios.get(
    "https://anvaya-backend.vercel.app/api/leads"
  );
  const data = response.data;
  return data;
});
export const getGroupedLead = createAsyncThunk(
  "leads/getGroupedLead",
  async () => {
    const response = await axios.get(
      "https://anvaya-backend.vercel.app/api/leads/grouped"
    );
    const data = response.data;
    return data;
  }
);


export const addLeadAsync = createAsyncThunk(
  "addLead/addLeadAsync",
  async (leadDataObject) => {
    const response = await axios.post(
      "https://anvaya-backend.vercel.app/api/leads",
      leadDataObject
    );
    const data = response.data;
    return data;
  }
);

export const updateLeadAsync = createAsyncThunk(
  "update/updateLeadAsync",
  async ({ leadId, leadDataObject }) => {
    const response = await axios.patch(
      `https://anvaya-backend.vercel.app/api/leads/${leadId}`,
      leadDataObject
    );
    const data = response.data;
    return data;
  }
);

export const deleteLeadAsync = createAsyncThunk(
  "delete/deleteLeadAsync",
  async (leadId) => {
    const response = await axios.delete(
      `https://anvaya-backend.vercel.app/api/leads/${leadId}`
    );
    const data = response.data;
    return data;
  }
);

export const fetchLeadsById = createAsyncThunk(
  "leadsById/fetchLeadsById",
  async (leadId) => {
    const response = await axios.get(
      `https://anvaya-backend.vercel.app/api/leads/${leadId}`
    );
    const data = response.data;
    return data;
  }
);

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await axios.get(
    "https://anvaya-backend.vercel.app/api/tags"
  );
  const data = response.data;
  return data;
});

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
      console.log(addedLead, "addedLead");
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
    });
    builder.addCase(getGroupedLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //leads by id
    builder.addCase(fetchLeadsById.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchLeadsById.fulfilled, (state, action) => {
      state.status = "Success";
      state.leadsById = action.payload;
    });
    builder.addCase(fetchLeadsById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //fetch tags
    builder.addCase(fetchTags.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.status = "Success";
      state.tags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default leadSlice.reducer;
