import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn, ExternalLink, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const { isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/admin-dashboard";
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).message || 'Login failed';
        throw new Error(msg);
      }
      window.location.href = '/admin-dashboard';
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent bg-gradient-to-r from-purple-500 to-orange-500 mx-auto"></div>
            <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
            <Shield className="absolute inset-0 m-auto h-8 w-8 text-white" />
          </div>
          <p className="text-white/80 text-lg font-medium">Verifying credentials...</p>
          <p className="text-white/60 text-sm mt-2">Please wait while we authenticate your session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="w-full max-w-md z-10">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
                <Shield className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-orange-400/20 via-pink-500/20 to-purple-600/20 rounded-2xl blur-lg"></div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-white/70 text-base mt-2">
                Secure access for authorized administrators
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    dir="ltr"
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400/50 focus:ring-orange-400/20 h-12"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400/50 focus:ring-orange-400/20 h-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                size="lg" 
                onClick={handleSubmit}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                disabled={submitting}
              >
                <LogIn className="h-5 w-5 mr-2" />
                {submitting ? 'Authenticating...' : 'Sign In Securely'}
              </Button>
            </div>
            
            <div className="text-center pt-4">
              <Button 
                variant="outline" 
                asChild 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <a href="/" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Back to Website
                </a>
              </Button>
            </div>
            
            <div className="border-t border-white/20 pt-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">Secure Connection</span>
                </div>
                <p className="text-xs text-white/50">
                  Protected by enterprise-grade encryption
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Floating elements for visual interest */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg opacity-60 transform rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg opacity-40 transform -rotate-12 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}