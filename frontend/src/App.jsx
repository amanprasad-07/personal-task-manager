import AppRoutes from "./routes/AppRoutes";

// App serves as the top-level component for the client UI layer.
// Delegates all route-driven rendering to AppRoutes to keep the
// root component clean, modular, and focused on application-wide composition.
export default function App() {
  return <AppRoutes />;
}
