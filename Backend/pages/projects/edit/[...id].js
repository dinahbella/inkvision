import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SiBloglovin } from "react-icons/si";
import { BsPostcard } from "react-icons/bs";
import Blog from "../../../components/Blog";
import Project from "../../../components/Project";

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProject() {
      try {
        const { data } = await axios.get(`/api/projects?id=${id}`);
        setProjectInfo(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchProject();
  }, [id]);

  if (!projectInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Update Project</title>
      </Head>
      <div className="blogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{projectInfo.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Edit Project</span>
          </div>
        </div>
        <div className="mt-3">
          {projectInfo && <Project {...projectInfo} />}
        </div>
      </div>
    </>
  );
}
