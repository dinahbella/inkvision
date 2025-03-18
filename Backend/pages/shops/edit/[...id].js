import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SiBloglovin } from "react-icons/si";
import { BsPostcard } from "react-icons/bs";
import Blog from "../../../components/Blog";
import Shop from "../../../components/Shop";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const { data } = await axios.get(`/api/shops?id=${id}`);
        setProductInfo(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Update Product</title>
      </Head>
      <div className="blogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{productInfo.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Edit Product</span>
          </div>
        </div>
        <div className="mt-3">{productInfo && <Shop {...productInfo} />}</div>
      </div>
    </>
  );
}
