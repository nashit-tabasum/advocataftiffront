import Link from "next/link";

// This is a temporary simplification to debug the home page issue.
export default function Home() {
  return (
    <div>
      <h1>Hello from the simplified Home page!</h1>
      <Link href="/components" className="text-blue-400 underline">
        Components Page
      </Link>
    </div>
  );
}
Home.title = "Home";
