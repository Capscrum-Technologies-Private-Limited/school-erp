import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  UserCircle,
  MoreVertical,
  Link2,
  Loader2,
  Eye,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { parentService } from '../api/parentService';
import type { Parent, ParentStudentLink } from '../types/domain';

export default function ParentListPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParentLinks, setSelectedParentLinks] = useState<Record<string, ParentStudentLink[]>>({});

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    setLoading(true);
    try {
      const data = await parentService.getParents();
      setParents(data);
      
      // Fetch linked students for each parent (optimization: only on expand in production)
      const linksPromises = data.map(p => parentService.getLinkedStudents(p.id));
      const linksResults = await Promise.all(linksPromises);
      
      const linksMap: Record<string, ParentStudentLink[]> = {};
      data.forEach((p, index) => {
        linksMap[p.id] = linksResults[index];
      });
      setSelectedParentLinks(linksMap);
    } catch (error) {
      console.error('Failed to fetch parents', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredParents = parents.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parents & Guardians</h1>
          <p className="text-gray-500 text-sm mt-1">Manage family accounts and student relationships.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add Parent
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Synchronizing family records...</p>
            </div>
          ) : filteredParents.map((parent) => (
            <div key={parent.id} className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                    {parent.firstName[0]}{parent.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{parent.firstName} {parent.lastName}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">
                        {parent.relation}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        {parent.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        {parent.phoneNumber}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Briefcase className="w-4 h-4" />
                        {parent.occupation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Link Student">
                      <Link2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Account">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Linked Students</p>
                    <div className="flex flex-wrap justify-end gap-2">
                      {selectedParentLinks[parent.id]?.map((link) => (
                        <div key={link.id} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                          <div className="w-6 h-6 bg-primary-100 text-primary-700 rounded text-[10px] flex items-center justify-center font-bold">
                            {link.student.firstName[0]}
                          </div>
                          <span className="text-xs font-medium text-gray-700">
                            {link.student.firstName} {link.student.lastName}
                          </span>
                          {link.isPrimaryContact && (
                            <ShieldCheck className="w-3 h-3 text-green-500" title="Primary Contact" />
                          )}
                        </div>
                      ))}
                      {(!selectedParentLinks[parent.id] || selectedParentLinks[parent.id].length === 0) && (
                        <p className="text-xs text-gray-400 italic">No linked students</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
