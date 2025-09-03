
import BlogPage from "./fetchDataBlogs";

export default async function FetchDataBlogs() {
  
  let responseData = [];

  try {
    const res = await fetch("http://127.0.0.1:8000/api/blogs", {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch blog data");

    responseData = await res.json();
    console.log(responseData)
  } catch (error) {
    console.error("Error fetching blog data:", error.message);
  }

  return <BlogPage regularPosts={responseData || []} />;
}
