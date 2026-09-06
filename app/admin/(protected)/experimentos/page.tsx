import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "Testes A/B | Administração", robots: { index: false, follow: false } };

export default function ExperimentsPage() {
  return <AdminDashboard />;
}
