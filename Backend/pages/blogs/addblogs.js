import { SiBloglovin } from "react-icons/si";
import Blog from "../../components/Blog";

export default function Addblog() {
  return (
    <div className="addblogspage">
      <div className="titledashboard flex flex-sb">
        <div className="stack">
          <h2>
            Add <span>Blog</span>
          </h2>
          <h3>Admin Panel</h3>
        </div>
        <div className="breadcrumb">
          <SiBloglovin /> <span>/</span> <span>Addblog</span>
        </div>
      </div>
      <div className="blogsadd">
        <Blog />
      </div>
    </div>
  );
}
