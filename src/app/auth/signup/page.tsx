import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      backgroundColor: "#F3F4F6"
    }}>
      <AuthForm isSignIn={false} />
    </div>
  );
}
