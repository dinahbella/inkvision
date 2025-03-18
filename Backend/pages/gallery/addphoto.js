import { SiBloglovin } from "react-icons/si";
import Photo from "../../components/photo";

export default function Addblog() {
  return (
    <div className="addblogspage">
      <div className="titledashboard flex flex-sb">
        <div className="stack">
          <h2>
            Add <span>Photo</span>
          </h2>
          <h3>Admin Panel</h3>
        </div>
        <div className="breadcrumb">
          <SiBloglovin /> <span>/</span> <span>Add Photos</span>
        </div>
      </div>
      <div className="blogsadd">
        <Photo />
      </div>
    </div>
  );
}
