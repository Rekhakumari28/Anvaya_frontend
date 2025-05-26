import React from 'react'
import SidebarNav from './SidebarNav'

export default function MobileSidebar() {
  return (
      <div
          style={{ maxWidth: "220px", height: "100%" }}
          className="offcanvas offcanvas-start  "
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileSidebarLabel">
              Dashboard
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              {" "}
            </button>
          </div>
          <div className="offcanvas-body  p-0">
            <SidebarNav />
          </div>
        </div>
  )
}
