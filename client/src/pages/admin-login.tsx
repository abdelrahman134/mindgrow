import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogIn, ExternalLink } from "lucide-react";

export default function AdminLogin() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/admin";
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
              <CardDescription>
                Secure login for MindGrow administrators
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900">Secure Authentication</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      This admin panel uses Replit's secure authentication system to protect sensitive data and website management tools.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  asChild
                >
                  <a href="/api/login" className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Sign in with Replit
                  </a>
                </Button>
              </div>
              
              <div className="text-center">
                <Button variant="outline" asChild>
                  <a href="/" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Back to Website
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center">
                Only authorized administrators can access this panel. 
                All login attempts are monitored for security.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}