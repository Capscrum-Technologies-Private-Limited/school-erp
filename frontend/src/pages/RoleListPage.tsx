import { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  ChevronRight, 
  Loader2, 
  Search,
  Check
} from 'lucide-react';
import { roleService } from '../api/roleService';
import type { Role } from '../types/domain';

export default function RoleListPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await roleService.getRoles();
      setRoles(data);
      if (data.length > 0) setSelectedRole(data[0]);
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-gray-500 text-sm mt-1">Define system access levels and module permissions.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading permission matrices...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Roles List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-sm">System Roles</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={clsx(
                      "w-full flex items-center justify-between p-4 text-left transition-all",
                      selectedRole?.id === role.id 
                        ? "bg-primary-50 border-r-4 border-primary-600" 
                        : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        selectedRole?.id === role.id ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-500"
                      )}>
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{role.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{role.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={clsx(
                      "w-4 h-4 transition-transform",
                      selectedRole?.id === role.id ? "text-primary-600 translate-x-1" : "text-gray-300"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="lg:col-span-2">
            {selectedRole ? (
              <div className="card animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-900">{selectedRole.name}</h2>
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] font-bold rounded uppercase tracking-wider">
                        {selectedRole.permissions.length} Permissions
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{selectedRole.description}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Group by module if permissions have them */}
                    {selectedRole.permissions.map((permission) => (
                      <div 
                        key={permission.id} 
                        className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group"
                      >
                        <div className="mt-0.5 p-1 bg-green-50 text-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Check className="w-3 h-3" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-gray-900">{permission.name}</p>
                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter bg-gray-50 px-1 rounded">
                              {permission.module}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedRole.permissions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="p-4 bg-gray-100 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-bold text-gray-900">No Permissions Assigned</h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                        This role currently has no specific module permissions assigned.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 text-center p-12">
                <Shield className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="font-bold text-gray-900">Select a Role</h3>
                <p className="text-sm text-gray-500 mt-1">Select a role from the left to view its associated permissions.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
