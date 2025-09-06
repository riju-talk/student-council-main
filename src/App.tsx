import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Representatives from "./pages/Representatives";
import Clubs from "./pages/Clubs";
import Hostel from "./pages/Hostel";
import ImportantContacts from "./pages/ImportantContacts";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import MeetingMinutes from "./pages/MeetingMinutes";
import Penalties from "./pages/Penalties";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/representatives" element={<Representatives />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/penalties" element={<Penalties />} />
          <Route path="/important-contacts" element={<ImportantContacts />} />
          <Route path="/meeting-minutes" element={<MeetingMinutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
