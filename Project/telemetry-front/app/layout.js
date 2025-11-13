import "./globals.css"

export const metadata = {
  title: "Telemetrix - EV Telemetry Dashboard",
  description: "Advanced electric vehicle telemetry monitoring dashboard",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased gradient-bg min-h-screen">{children}</body>
    </html>
  )
}
