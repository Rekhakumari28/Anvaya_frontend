import React, { useEffect, useState } from "react";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../features/leadsSlice";

import {
  fetchCommentByLeadId,
  postCommentsAsync,
} from "../../features/commentSlice";
import MobileSidebar from "../../components/MobileSidebar";

function LeadDetailsManagement() {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { leadId } = useParams();

  const leadList = useSelector((state) => state.leads);
  const { comments, status, error } = useSelector((state) => {
    return state.comment;
  });

  useEffect(() => {
    dispatch(fetchCommentByLeadId(leadId));
  }, []);

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  const leadData = leadList.leads?.find((lead) => lead._id == leadId);

  const handleAddComment = (event) => {
    event.preventDefault();
    const commentDataObject = {
      lead: leadId,
      commentText: String(newComment),
      author: leadData?.salesAgent?._id,
    };
    dispatch(postCommentsAsync({ leadId, commentDataObject }));
  };

  return (
    <>
      <LeadHeading leadData={leadData} />
      <div className="row" style={{ marginTop: "52px" }}>
        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{ position: "fixed", overflowY: "auto" }}
        >
          <SidebarNav />
        </div>
        <div className="col-12 col-md-3 col-lg-2 d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
          <MobileSidebar />
          <div className="container-fluid px-2">
            <div className="py-2">
              <div className="row">
                <h2 className="mt-2">Lead Details </h2>
              </div>
              <hr />
              <div className="col-12 col-md-12">
                {leadList.status === "Loading" && <p>Loading...</p>}
                {leadList.error && <p>{leadList.error}</p>}

                <div className="card bg-success-subtle border-0">
                  <div className="card-body">
                    <div className="row">
                      <p className="fw-normal fs-5 col-md-6">
                        Lead Name: {leadData?.name}
                      </p>

                      <p className="fw-normal fs-5 col-md-6">
                        {" "}
                        Sales Agent:{" "}
                        {leadData?.salesAgent?.name
                          ? leadData?.salesAgent?.name
                          : ""}
                      </p>
                      <p className="fw-normal fs-5 col-md-6">
                        {" "}
                        Lead Source: {leadData?.source}
                      </p>
                      <p className="fw-normal fs-5 col-md-6">
                        {" "}
                        Lead Status: {leadData?.status}
                      </p>
                      <p className="fw-normal fs-5 col-md-6">
                        {" "}
                        Time to Close: {leadData?.timeToClose}
                      </p>
                      <p className="fw-normal fs-5 col-md-6">
                        {" "}
                        Priority: {leadData?.priority}
                      </p>
                      {leadData?.tags && (
                        <p className="fw-normal fs-5 col-md-6">
                          {" "}
                          Tags: {leadData?.tags.join(", ")}{" "}
                        </p>
                      )}

                      <p className="col-md-6">
                        <Link
                          to={`/addLead/${leadData?._id}`}
                          className=" btn btn-primary float-end"
                        >
                          Edit Lead Details
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <div className="row">
                <h2 className="mt-2">Comments Sections</h2>
              </div>
              <hr />
              <div className="col-12 col-md-12">
                {status === "Loading" && <p>Loading...</p>}
                {comments.comments?.length > 0 ? (
                  comments.comments?.map((comment) => (
                    <div
                      key={comment._id}
                      className="card bg-success-subtle border-0  my-2"
                    >
                      <div key={comment._id} className="card-body">
                        <p className="fw-normal fs-5">
                          {comment.author.name} - {comment.createdAt}
                        </p>
                        <p className="fw-normal fs-5">
                          Comment : {comment.commentText}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>There is no comments. Please add new comment.</p>
                )}
                {error && <p>{error}</p>}
              </div>
              <div className="py-2">
                <h4>Add Comment</h4>
                <hr />
                <form onSubmit={handleAddComment}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Add new comment"
                      className="form-control "
                      onChange={(event) => setNewComment(event.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadDetailsManagement;
