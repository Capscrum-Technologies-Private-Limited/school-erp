import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  BookOpen, 
  CalendarCheck, 
  CreditCard, 
  Bell, 
  Settings,
  GraduationCap,
  Users2,
  ShieldCheck,
  Building2,
  Layers,
  ClipboardCheck,
  UserCircle,
  BookOpenCheck,
  FileCode,
  History,
  Trophy,
  FileSpreadsheet,
  Bus,
  Library,
  X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { clsx } from '../utils/styles';

const academicNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'FINANCE_MANAGER', 'CLERK', 'LIBRARIAN'] },
  { name: 'Admissions', href: '/admissions', icon: GraduationCap, roles: ['SUPER_ADMIN', 'ADMIN', 'CLERK'] },
  { name: 'Students', href: '/students', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'CLERK', 'PARENT', 'STUDENT'] },
  { name: 'Teachers', href: '/teachers', icon: UserSquare2, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Classes', href: '/classes', icon: BookOpen, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
  { name: 'Attendance', href: '/attendance', icon: CalendarCheck, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { name: 'Staff Attendance', href: '/staff-attendance', icon: ClipboardCheck, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Homework', href: '/homework', icon: BookOpenCheck, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { name: 'Submissions', href: '/homework-submissions', icon: FileCode, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
  { name: 'Exams', href: '/exams', icon: Trophy, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { name: 'Gradebook', href: '/gradebook', icon: FileSpreadsheet, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { name: 'Parents', href: '/parents', icon: UserCircle, roles: ['SUPER_ADMIN', 'ADMIN', 'CLERK'] },
  { name: 'Fees', href: '/fees', icon: CreditCard, roles: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_MANAGER', 'CLERK', 'PARENT'] },
  { name: 'Transport', href: '/transport', icon: Bus, roles: ['SUPER_ADMIN', 'ADMIN', 'CLERK'] },
  { name: 'Library', href: '/library', icon: Library, roles: ['SUPER_ADMIN', 'ADMIN', 'LIBRARIAN'] },
  { name: 'Notifications', href: '/notifications', icon: Bell, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'CLERK'] },
];

const systemNavigation = [
  { name: 'User Management', href: '/users', icon: Users2, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Roles & Permissions', href: '/roles', icon: ShieldCheck, roles: ['SUPER_ADMIN'] },
  { name: 'Schools', href: '/schools', icon: Building2, roles: ['SUPER_ADMIN'] },
  { name: 'Sections', href: '/sections', icon: Layers, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Audit Logs', href: '/audit', icon: History, roles: ['SUPER_ADMIN'] },
  { name: 'Message Templates', href: '/templates', icon: FileCode, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const user = useAuthStore((state) => state.user);
  const userRoles = user?.roles || [];

  const hasAccess = (allowedRoles: string[]) => {
    return allowedRoles.some(role => 
      userRoles.includes(role) || 
      userRoles.includes(`ROLE_${role}`) ||
      userRoles.map(r => r.toUpperCase()).includes(role.toUpperCase())
    );
  };

  const filteredAcademicNav = academicNavigation.filter(item => hasAccess(item.roles));
  const filteredSystemNav = systemNavigation.filter(item => hasAccess(item.roles));

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">EduConnect</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto py-4 custom-scrollbar">
        {filteredAcademicNav.length > 0 && (
          <div>
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Academic</p>
            <div className="space-y-1">
              {filteredAcademicNav.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {filteredSystemNav.length > 0 && (
          <div>
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">System</p>
            <div className="space-y-1">
              {filteredSystemNav.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-4 group cursor-pointer hover:bg-gray-100 transition-colors">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Session</p>
          <div className="mt-2">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.username}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {userRoles.map(role => (
                <span key={role} className="px-1.5 py-0.5 bg-white border border-gray-200 text-[8px] font-bold text-gray-500 rounded uppercase">
                  {role.replace('ROLE_', '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
