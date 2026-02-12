export const dynamic = "force-dynamic";
import AuthInitializer from "@/components/AuthInitializer";
import Navbar from "@/components/Navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthInitializer />
      <Navbar />
      {children}
    </>
  );
}
