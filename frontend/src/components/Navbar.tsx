import { Search, Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative flex-1 max-w-xl hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-900">{user?.username || 'Admin User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.roles?.[0]?.replace('ROLE_', '').toLowerCase() || 'Administrator'}</p>
          </div>
          <div className="group relative">
            <button className="w-9 h-9 md:w-10 md:h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm overflow-hidden transition-transform hover:scale-105">
              {user?.username?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-50 md:hidden">
                <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500 truncate">{user?.roles?.[0]}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
