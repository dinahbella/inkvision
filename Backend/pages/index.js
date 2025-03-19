import Head from "next/head";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Bar } from "react-chartjs-2";
import { FaHome } from "react-icons/fa";
import {
  Chart as ChartJs,
  CategoryScale, // Corrected
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoginLayout from "../components/LoginLayout";

export default function Home() {
  // Register Chart.js components
  ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs created monthly by Year",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsResponse, projectsResponse, shopsResponse, photosResponse] =
          await Promise.all([
            fetch("/api/blogs"),
            fetch("/api/projects"),
            fetch("/api/shops"),
            fetch("/api/photo"),
          ]);

        const blogs = await blogsResponse.json();
        const projects = await projectsResponse.json();
        const shops = await shopsResponse.json();
        const photos = await photosResponse.json();

        setBlogsData(blogs);
        setProjectData(projects);
        setShopData(shops);
        setPhotosData(photos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process monthly data for the chart
  const monthlyData = blogsData
    .filter((dat) => dat.status === "Publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // get the year
      const month = new Date(blog.createdAt).getMonth(); // get the month
      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 1)`,
  }));

  const data = {
    labels,
    datasets,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <LoginLayout>
      <>
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Admin <span>Dashboard</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <FaHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>
          {/* cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>
                {blogsData.filter((dat) => dat.status === "Publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Products</h2>
              <span>
                {" "}
                {shopData.filter((dat) => dat.status === "Publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Projects</h2>
              <span>
                {" "}
                {projectData.filter((dat) => dat.status === "Publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Photos</h2>
              <span>{photosData.length}</span>
            </div>
          </div>
          {/* year overview */}
          <div className="year_overview flex flex-sb mb-1">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="small-dot"></li>
                  <li className="big-dot"></li>
                </ul>
                <h3 className="text-right">
                  {blogsData.filter((dat) => dat.status === "Publish").length}
                  / 365 <br /> <span>Total Published</span>
                </h3>
              </div>
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="right_salescont mt-2">
            <div>
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="small-dot"></li>
              </ul>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Writing Tips</td>
                      <td>
                        {" "}
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Writing Tips"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Book Reviews</td>
                      <td>
                        {" "}
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Book Reviews"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Publishing </td>
                      <td>
                        {" "}
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Publishing"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Writing Prompts</td>
                      <td>
                        {" "}
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Writing Prompts"
                          ).length
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </LoginLayout>
  );
}
