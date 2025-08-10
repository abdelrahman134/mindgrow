import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/ui/language-provider";
import ChildrenHome from "@/pages/children-home";
import ParentsHome from "@/pages/parents-home";
import SellersHome from "@/pages/sellers-home";
import TeachersHome from "@/pages/teachers-home";
import AboutUs from "@/pages/about-us";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import ServiceAgreement from "@/pages/service-agreement";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/useAuth";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) {
    window.location.href = "/admin-login";
    return null;
  }
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={ChildrenHome} />
      <Route path="/parents" component={ParentsHome} />
      <Route path="/sellers" component={SellersHome} />
      <Route path="/teachers" component={TeachersHome} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/service-agreement" component={ServiceAgreement} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-dashboard" component={() => <ProtectedRoute component={AdminDashboard} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
