import Seo from "../seo/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="About Us | My Website"
        description="Learn more about us"
        canonical="https://example.com/about"
      />

      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700">
        This page is fully SEO-ready for a React SPA.
      </p>
    </>
  );
}
