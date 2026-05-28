import "./globals.css";

export const metadata = {
  title: "Trinethra — Supervisor Feedback Analyzer",
  description:
    "AI-assisted Fellow performance analysis tool for DeepThought psychology interns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
