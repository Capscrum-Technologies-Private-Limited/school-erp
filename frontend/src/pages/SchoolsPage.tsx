import { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Loader2,
  Edit2
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { School } from '../types/domain';

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const data = await domainService.getSchools();
      setSchools(data);
    } catch (error) {
      console.error('Failed to fetch schools', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Institutional Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage multiple branches and campus information.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading institutional data...</p>
          </div>
        ) : schools.map((school) => (
          <div key={school.id} className="card p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{school.name}</h3>
                  <div className="flex items-center gap-2 text-primary-600 mt-1">
                    <Globe className="w-4 h-4" />
                    <a href={school.website} target="_blank" rel="noreferrer" className="text-sm hover:underline">{school.website}</a>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{school.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="text-sm text-gray-600 mt-1">{school.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-sm text-gray-600 mt-1">{school.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
