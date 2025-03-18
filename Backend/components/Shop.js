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

export default function Shop({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  tags: existingTags,
  afilink: existingAfilink,
  price: existingPrice,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [tags, setTags] = useState(existingTags || "");
  const [afilink, setAfilink] = useState(existingAfilink || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [status, setStatus] = useState(existingStatus || "");
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
      description,
      tags,
      afilink,
      price,
      status,
    };

    try {
      if (_id) {
        await axios.put("/api/shops", { ...data, _id });
        toast.success("Product updated successfully");
      } else {
        await axios.post("/api/shops", data);
        toast.success("Product created successfully");
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  }

  if (redirect) {
    router.push("/shops");
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
      {/* Product Title */}
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

      {/* Product Slug URL */}
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

      {/* Affiliate Link */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="afilink">Affiliate Link</label>
        <input
          type="text"
          id="afilink"
          placeholder="Enter affiliate link"
          value={afilink}
          onChange={(ev) => setAfilink(ev.target.value)}
          required
        />
      </div>

      {/* Price */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Enter price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          required
        />
      </div>

      {/* Product Images */}
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
                <img src={link} alt="product" className="object-cover" />
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

      {/* Product Description */}
      <div className="description w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Product Description</label>
        <MarkdownEditor
          value={description}
          onChange={({ text }) => setDescription(text)}
          style={{ width: "100%", height: "400px" }}
          renderHTML={(text) => (
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  if (inline) {
                    return <code>{children}</code>;
                  } else {
                    return (
                      <div style={{ position: "relative" }}>
                        <pre
                          style={{
                            padding: "0",
                            borderRadius: "5px",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                          }}
                          {...props}
                        >
                          <code>{children}</code>
                        </pre>
                        <button
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            zIndex: "1",
                          }}
                          onClick={() =>
                            navigator.clipboard.writeText(String(children))
                          }
                        >
                          Copy Code
                        </button>
                      </div>
                    );
                  }
                },
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        />
      </div>

      {/* Tags */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="tags">Tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(ev) => setTags(ev.target.value)}
          required
        >
          <option value="">Select tags</option>
          <option value="Blog Writing">Blog Writing</option>
          <option value="Screenwriting">Screenwriting</option>
          <option value="Novel Writing">Novel Writing</option>
          <option value="Writing Techniques">Writing Techniques</option>
          <option value="Freelance Writing">Freelance Writing</option>
          <option value="Ghostwriting">Ghostwriting</option>
          <option value="Short Story Writing">Short Story Writing</option>
        </select>
      </div>

      {/* Status */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(ev) => setStatus(ev.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="Draft">Draft</option>
          <option value="Publish">Publish</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="w-100 mb-2">
        <button className="w-100 addwebbtn flex-center" type="submit">
          SAVE DATA
        </button>
      </div>
    </form>
  );
}
