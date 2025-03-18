import React from "react";
import { SiBloglovin } from "react-icons/si";
import Shop from "../../components/Shop";

export default function addproduct() {
  return (
    <div>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div className="stack">
            <h2>
              Add <span>Product</span>
            </h2>
            <h3>Admin Panel</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span> <span>Add product</span>
          </div>
        </div>
        <div className="blogsadd">
          <Shop />
        </div>
      </div>
    </div>
  );
}
