// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Kai - AI-agent to help you with grahical web`}
      description="Kai is an AI-powered chatbot for Konva.js"
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
