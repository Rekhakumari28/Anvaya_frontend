import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../features/leadsSlice";
import { salesAgentSlice } from "../features/salesAgentSlice";
import { reportSlice } from "../features/reportSlice";
import { commentsSlice } from "../features/commentSlice";

export default configureStore({
    reducer:{
        leads: leadSlice.reducer,
        salesAgent: salesAgentSlice.reducer,
        report: reportSlice.reducer,
        comment: commentsSlice.reducer
    }
})