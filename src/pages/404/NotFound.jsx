import Seo from "../../seo/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 | Page Not Found"
        description="The page you are looking for does not exist"
        noIndex
      />

      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-700">The requested page could not be found.</p>
    </>
  );
}
