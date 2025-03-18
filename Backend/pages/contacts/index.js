import React from "react";
import { SiBloglovin } from "react-icons/si";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import Dataloading from "../../components/Dataloading";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import Link from "next/link";
export default function ProjectIndex() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all project data
  const { alldata, loading } = useFetchData("/api/contact");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter all data based on the search query
  const filteredProjects =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate the index of the first blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // Get the current page blogs
  const currentContacts = filteredProjects.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  // Filter published blogs
  const publishedBlogs = currentContacts.filter((ab) => {
    console.log("Blog Status:", ab.status); // Debugging
    return ab.status === "Publish";
  });

  // Calculate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProjects.length / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {" "}
      <div className="blogspage">
        <div className="titledashboard flex flex-sb">
          <div className="stack">
            <h2>
              All published <span>Contact</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span> <span>Contact</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2 className="flex">Search Contacts:</h2>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Project</th>
                <th>Open Contact</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <Dataloading />
                  </td>
                </tr>
              ) : publishedBlogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Contacts Found
                  </td>
                </tr>
              ) : (
                publishedBlogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{indexOfFirstBlog + index + 1}</td>
                    <td>
                      <h3>{blog.name}</h3>
                    </td>
                    <td>
                      <h3>{blog.email}</h3>
                    </td>
                    <td>
                      <h3>{blog.phone}</h3>
                    </td>
                    <td>
                      <h3>{blog.project[0]}</h3>
                    </td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={`/contacts/edit/${blog._id}`}>
                          <button className="edit">
                            <FaEye />
                            Edit
                          </button>
                        </Link>
                        {/* <Link href={`/contacts/delete/${blog._id}`}>
                          <button className="delete">
                            <RiDeleteBin4Line />
                            Delete
                          </button>
                        </Link> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {/* Pagination */}
          {publishedBlogs.length === 0 ? null : (
            <div className="blogpagination">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}

              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentContacts.length < perPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
