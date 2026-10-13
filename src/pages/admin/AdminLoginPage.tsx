import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@westbridge.dental');
  const [password, setPassword] = useState('westbridge2026');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, navigate straight to admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@westbridge.dental');
    setPassword('westbridge2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo className="justify-center mb-6" />
        <h2 className="text-2xl font-extrabold text-[#15324B] tracking-tight">
          Staff & Clinic Administration
        </h2>
        <p className="mt-2 text-xs text-[#5f7488]">
          Authorized medical directors, practice managers, and clinicians only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          {/* Demo quick access badge */}
          <div className="bg-[#EAF7F4] border border-[#087F70]/20 p-4 rounded-2xl text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#087F70]">
              <ShieldCheck className="w-4 h-4" />
              <span>Evaluation Demo Access</span>
            </div>
            <p className="text-slate-600">
              Demo admin credentials pre-configured below:
            </p>
            <div className="bg-white p-2 rounded-lg font-mono text-[11px] text-slate-700 flex justify-between items-center border border-slate-200">
              <span>admin@westbridge.dental / westbridge2026</span>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[#087F70] font-bold hover:underline"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@westbridge.dental"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087F70]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1.5">
                Portal Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087F70]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#087F70] hover:bg-[#066559] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-[#5f7488] hover:text-[#087F70] transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
