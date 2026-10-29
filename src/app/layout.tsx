import "./globals.css";
export const metadata = {
  title: "TXKPRO · 3D Explainer Engine",
  description: "Mechanical instruction, assembled with Action Blocks.",
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
