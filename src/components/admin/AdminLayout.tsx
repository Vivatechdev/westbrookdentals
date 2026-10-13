import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Stethoscope, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

export const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If auth is loading, display spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <p className="text-sm font-semibold text-[#15324B]">Verifying administrator credentials...</p>
      </div>
    );
  }

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Appointments Management', path: '/admin/appointments', icon: Calendar },
    { label: 'Schedule & Availability', path: '/admin/schedule', icon: Clock },
    { label: 'Dental Services', path: '/admin/services', icon: Stethoscope },
    { label: 'Dentist Management', path: '/admin/dentists', icon: Users },
    { label: 'Clinic Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#15324B] text-white p-4 flex items-center justify-between border-b border-[#204667] sticky top-0 z-40">
        <Logo />
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 z-30 inset-y-0 left-0 w-64 bg-[#15324B] text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo Brand in Sidebar */}
          <div className="p-6 border-b border-[#204667] flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Portal badge */}
          <div className="px-6 py-3 bg-[#0e2234] flex items-center justify-between text-[11px] text-[#EAF7F4]">
            <span className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#087F70]" />
              Staff Control Center
            </span>
            <span className="bg-[#087F70] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">PROD</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#087F70] text-white shadow-xs'
                        : 'text-slate-300 hover:bg-[#204667] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#204667] space-y-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-[#204667] hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="pt-2 border-t border-[#204667]/60 flex items-center justify-between">
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-[#204667]"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
