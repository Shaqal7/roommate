import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Welcome, {session.user.name}
      </h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <Link 
          href="/topics" 
          style={{ 
            backgroundColor: "white", 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            transition: "box-shadow 0.3s ease"
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Manage Topics</h2>
          <p style={{ color: "#6B7280" }}>
            Create, view, and manage your topics and chatrooms
          </p>
        </Link>

        <Link 
          href="/profile" 
          style={{ 
            backgroundColor: "white", 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            transition: "box-shadow 0.3s ease"
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Profile Settings</h2>
          <p style={{ color: "#6B7280" }}>
            Update your profile and account settings
          </p>
        </Link>
      </div>
    </div>
  );
}
