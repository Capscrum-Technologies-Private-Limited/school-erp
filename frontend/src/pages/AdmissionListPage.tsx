import { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  UserCheck,
  UserX,
  Loader2,
  Calendar,
  Building2
} from 'lucide-react';
import { admissionService } from '../api/admissionService';
import type { Admission } from '../types/domain';

export default function AdmissionListPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const data = await admissionService.getAdmissions();
      setAdmissions(data);
    } catch (error) {
      console.error('Failed to fetch admissions', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (window.confirm('Are you sure you want to approve this admission? This will create a student record.')) {
      try {
        await admissionService.approveAdmission(id);
        fetchAdmissions();
      } catch (error) {
        console.error('Failed to approve admission', error);
      }
    }
  };

  const handleReject = async () => {
    if (!selectedAdmission || !rejectionReason) return;
    try {
      await admissionService.rejectAdmission(selectedAdmission.id, rejectionReason);
      setIsRejectModalOpen(false);
      setRejectionReason('');
      fetchAdmissions();
    } catch (error) {
      console.error('Failed to reject admission', error);
    }
  };

  const filteredAdmissions = admissions.filter(a => 
    a.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.admissionCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admissions</h1>
          <p className="text-gray-500 text-sm mt-1">Review and process student admission applications.</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or admission code..."
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
              <p className="text-gray-500 font-medium">Processing applications...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admission ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade / School</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAdmissions.map((admission) => (
                  <tr key={admission.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold">
                          {admission.applicantName[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{admission.applicantName}</p>
                          <p className="text-xs text-gray-500">{admission.parentName} ({admission.parentPhone})</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {admission.admissionCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-900">Grade {admission.gradeApplyingFor}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {admission.school?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        admission.status === 'APPROVED' ? "bg-green-100 text-green-700" :
                        admission.status === 'REJECTED' ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      )}>
                        {admission.status === 'APPROVED' && <CheckCircle className="w-3 h-3" />}
                        {admission.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                        {admission.status === 'PENDING' && <Clock className="w-3 h-3" />}
                        {admission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {admission.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => handleApprove(admission.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                              title="Approve"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => { setSelectedAdmission(admission); setIsRejectModalOpen(true); }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Reject"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
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

      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reject Application</h3>
            <p className="text-sm text-gray-500 mb-6">Please provide a reason for rejecting {selectedAdmission?.applicantName}'s application.</p>
            <div className="space-y-4">
              <textarea 
                className="input min-h-[100px] py-3" 
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex gap-3">
                <button onClick={() => setIsRejectModalOpen(false)} className="flex-1 btn-secondary">Cancel</button>
                <button 
                  onClick={handleReject}
                  disabled={!rejectionReason}
                  className="flex-1 bg-red-600 text-white btn hover:bg-red-700 disabled:opacity-50"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
