import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Shield, 
  Loader2, 
  User as UserIcon,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { userService } from '../api/userService';
import { roleService } from '../api/roleService';
import type { User, Role } from '../types/domain';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, rolesData] = await Promise.all([
        userService.getUsers(),
        roleService.getRoles()
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Failed to fetch users/roles', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage system users, their status, and roles.</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, or email..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading user directory...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Roles</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                          {user.fullName[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium">@{user.username}</span>
                    </td>
                    <td className="px-6 py-4">
                      {user.enabled ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" />
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map(role => (
                          <span key={role} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            {role.replace('ROLE_', '')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedUser(user); setIsRoleModalOpen(true); }}
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                          title="Assign Roles"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Simplified Role Assignment Modal */}
      {isRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Assign Roles for {selectedUser.fullName}</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {roles.map(role => (
                <label key={role.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{role.name}</p>
                      <p className="text-xs text-gray-500">{role.description}</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedUser.roles.includes(role.name)}
                    className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setIsRoleModalOpen(false)} className="flex-1 btn-secondary">Cancel</button>
              <button className="flex-1 btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
