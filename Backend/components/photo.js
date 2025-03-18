import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";

export default function Photo({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [uploading, setUploading] = useState(false);
  const uploadImageQueue = [];

  async function createBlog(ev) {
    ev.preventDefault();

    if (uploading) {
      await Promise.all(uploadImageQueue);
    }

    const data = {
      title,
      slug,
      images,
    };

    try {
      if (_id) {
        await axios.put("/api/photo", { ...data, _id });
        toast.success("Photo updated successfully");
      } else {
        await axios.post("/api/photo", data);
        toast.success("Photo created successfully");
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving Photo:", error);
      toast.error("Failed to save Photo");
    }
  }

  if (redirect) {
    router.push("/gallery");
    return null;
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-").toLowerCase();
    setSlug(newSlug);
  };

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files && files.length > 0) {
      setUploading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        uploadImageQueue.push(
          axios.post("/api/upload", formData).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }
      await Promise.all(uploadImageQueue);
      setUploading(false);
      toast.success("Images uploaded successfully");
    } else {
      toast.error("No files selected");
    }
  };

  const updateImageOrder = (newImages) => {
    setImages(newImages);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success("Image deleted successfully");
  };

  return (
    <form className="addWebsiteform" onSubmit={createBlog}>
      {/* Blog Title */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Enter title"
          required
        />
      </div>

      {/* Photo Slug URL */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="slug">Slug (SEO-friendly URL)</label>
        <input
          type="text"
          id="slug"
          placeholder="Enter slug URL"
          value={slug}
          onChange={handleSlugChange}
          required
        />
      </div>

      {/* Project Images */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <div className="w-100">
          <label htmlFor="fileInput">
            Images (first image will show as thumbnail, you can drag)
          </label>
          <input
            type="file"
            id="fileInput"
            className="mt-1"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        <div className="w-100 mt-1 flex flex-left">
          {uploading && <Spinner />}
        </div>
      </div>

      {/* Image Preview and Image Sort */}
      {images.length > 0 && (
        <div className="flex">
          <ReactSortable
            list={images}
            setList={updateImageOrder}
            animation={200}
            className="flex gap-1"
          >
            {images.map((link, index) => (
              <div key={link} className="uploadedimg">
                <img src={link} alt="image" className="object-cover" />
                <div className="deleteimg">
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      )}

      {/* Submit Button */}
      <div className="w-100 mb-2">
        <button className="w-100 addwebbtn flex-center" type="submit">
          SAVE DATA
        </button>
      </div>
    </form>
  );
}
