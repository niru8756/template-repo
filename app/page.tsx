// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Immediately redirect to login
  redirect("/auth/login");

  // This will never render
  return null;
}
