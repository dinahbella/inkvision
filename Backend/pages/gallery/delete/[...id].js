import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Head from "next/head";
import { BsPostcard } from "react-icons/bs";
import Spinner from "../../../components/Spinner";

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [photoInfo, setPhotoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const { data } = await axios.get(`/api/photo?id=${id}`);
        setPhotoInfo(data);
      } catch (error) {
        console.error("Error fetching photo:", error);
        setError("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  function goback() {
    router.push("/blogs");
  }

  async function deletePhoto() {
    try {
      await axios.delete(`/api/photo?id=${id}`);
      toast.success("Blog deleted successfully");
      goback();
    } catch (error) {
      console.error("Error deleting Photo:", error);
      toast.error("Failed to delete Photo.");
    }
  }

  if (loading) {
    return <Spinner />; // Show a spinner while loading
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error message
  }

  if (!photoInfo) {
    return <div className="text-center">No Photo found.</div>; // Handle case where photoInfo is null
  }

  return (
    <>
      <Head>
        <title>Delete Photo</title>
      </Head>
      <div className="blogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Delete <span>{photoInfo.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Delete Photo</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="6em"
              height="6em"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
            <p className="cookieHeading mb-1">Are you sure?</p>
            <p className="cookieDescription mb-1">
              If you delete this content it will be deleted permanently.
            </p>
            <div className="buttoncontainer mb-1">
              <button
                onClick={deletePhoto}
                className="acceptButton"
                aria-label="Delete"
              >
                Delete
              </button>
              <button
                onClick={goback}
                className="declineButton"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
