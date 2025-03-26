import AuthForm from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      backgroundColor: "#F3F4F6"
    }}>
      <AuthForm isSignIn={true} />
    </div>
  );
}
