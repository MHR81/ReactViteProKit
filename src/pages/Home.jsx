import Seo from "../seo/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="Home Page | My Website"
        description="This is the home page of my React + Vite project"
        canonical="https://example.com/"
      />

      <h1 className="text-2xl font-bold mb-4">Welcome to Home</h1>
      <p className="text-gray-700">
        This is a clean and SEO-ready React layout template.
      </p>
    </>
  );
}
