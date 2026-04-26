import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Resources from "./pages/Resources";
import GetAQuote from "./pages/GetAQuote";
import Contact from "./pages/Contact";
import CyberHealthCheck from "./pages/CyberHealthCheck";
import NotFound from "./pages/NotFound";
import { EditModeProvider } from "./components/EditModeProvider";
import EditModeToggle from "./components/EditModeToggle";
import InlineEditorEngine from "./components/InlineEditorEngine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EditModeProvider>
        <EditModeToggle />
        <InlineEditorEngine />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cyber-health-check" element={<CyberHealthCheck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
