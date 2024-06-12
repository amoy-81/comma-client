export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <h1>auth layout</h1>
      {children}
    </main>
  );
}
