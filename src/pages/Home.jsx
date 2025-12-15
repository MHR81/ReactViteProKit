import Seo from "../seo/Seo";
import toggleTheme from "../components/toggleTheme";

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
      <button
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Theme
      </button>
    </>
  );
}
