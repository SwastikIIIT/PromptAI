import Nav from "@/components/Nav";
import "../styles/globals.css"
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/ui/theme-provider"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/blog.png", 
  },
};

export default function RootLayouwdaadasdat({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav/>
            {children}
          </main>
      </Provider>
      </ThemeProvider>
      </body>
    </html>
  );
}
