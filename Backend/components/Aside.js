import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { RiShoppingCartLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

function Aside({ asideOpen, handleAsideOpen }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    // Update active link state when the page reloads
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <aside className={asideOpen ? "asideleft active" : "asideleft"}>
      <ul>
        <li className={activeLink === "/" ? "navactive" : ""}>
          <Link href="/">
            <div className="flex gap-1">
              <IoHome />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li
          className={
            activeLink === "/blogs"
              ? "navactive flex-col flex-left"
              : "flex-col flex-left"
          }
          onClick={() => handleLinkClick("/blogs")}
        >
          <div className="flex gap-1">
            <BsPostcard />
            <span>Blogs</span>
          </div>
          {activeLink === "/blogs" && (
            <ul>
              <li>
                <Link href="/blogs">All Blogs</Link>
              </li>
              <li>
                <Link href="/blogs/draft">Draft Blogs</Link>
              </li>
              <li>
                <Link href="/blogs/addblogs">Add Blogs</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={
            activeLink === "/projects"
              ? "navactive flex-col flex-left"
              : "flex-col flex-left"
          }
          onClick={() => handleLinkClick("/projects")}
        >
          <div className="flex gap-1">
            <MdOutlineWorkOutline />
            <span>Projects</span>
          </div>
          {activeLink === "/projects" && (
            <ul>
              <li>
                <Link href="/projects">All Projects</Link>
              </li>
              <li>
                <Link href="/projects/draftprojects">Draft Projects</Link>
              </li>
              <li>
                <Link href="/projects/addprojects">Add Projects</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={
            activeLink === "/shops"
              ? "navactive flex-col flex-left"
              : "flex-col flex-left"
          }
          onClick={() => handleLinkClick("/shops")}
        >
          <div className="flex gap-1">
            <RiShoppingCartLine />
            <span>Shops</span>
          </div>
          {activeLink === "/shops" && (
            <ul>
              <li>
                <Link href="/shops">All Products</Link>
              </li>
              <li>
                <Link href="/shops/draftshop">Draft Product</Link>
              </li>
              <li>
                <Link href="/shops/addproduct">Add Product</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={
            activeLink === "/gallery"
              ? "navactive flex-col flex-left"
              : "flex-col flex-left"
          }
          onClick={() => handleLinkClick("/gallery")}
        >
          <div className="flex gap-1">
            <GrGallery />
            <span>Gallery</span>
          </div>
          {activeLink === "/gallery" && (
            <ul>
              <li>
                <Link href="/gallery">All Photos</Link>
              </li>
              <li>
                <Link href="/gallery/addphoto">Add Photos</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={activeLink === "/contacts" ? "navactive" : ""}>
          <Link href="/contacts">
            <div className="flex gap-1">
              <RiContactsBook3Line />
              <span>Contacts</span>
            </div>
          </Link>
        </li>
        <li className={activeLink === "/settings" ? "navactive" : ""}>
          <Link href="/settings">
            <div className="flex gap-1">
              <MdOutlineSettings />
              <span>Settings</span>
            </div>
          </Link>
        </li>
      </ul>
      <button className="logoutbtn">
        <LuLogOut /> Logout
      </button>
    </aside>
  );
}

export default Aside;
