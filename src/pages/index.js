import { SliceZone } from "@prismicio/react";
import { createClient } from "../../prismicio";
import { components } from "../slices";
import { Head } from "next/document";

const Page = ({ page }) => {
  return <SliceZone slices={page.data.slices} components={components} />
};

export default Page;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const page = await client.getByUID("homepage", "homepage", {
    fetchLinks: [
      "article.label, article.featuredimage, article.title, article.shortdescription, article.uid",
    ],
  });

  return {
    props: {
      page,
    },

    revalidate: 60,
  };
}
