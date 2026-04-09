import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}
