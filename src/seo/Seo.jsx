import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, canonical, noIndex }) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {canonical && <link rel="canonical" href={canonical} />}

      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}
