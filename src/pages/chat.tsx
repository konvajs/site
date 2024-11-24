import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Konva is 2d Canvas JavaScript framework for drawings shapes, animations, node nesting, layering, filtering, event handling, drag and drop and much more."
    >
      <main>
        <iframe
          src="https://konva-chat.vercel.app/"
          style={{ width: "100%", height: "80vh" }}
        />
      </main>
    </Layout>
  );
}
