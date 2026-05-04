import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { domainService } from '../api/domainService';
import { studentService } from '../api/studentService';
import type { Fee, Student } from '../types/domain';

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [students, setStudents] = useState<Record<number, Student>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [feesData, studentsData] = await Promise.all([
        domainService.getFees(),
        studentService.getStudents(0, 100)
      ]);
      setFees(feesData);
      
      const studentMap: Record<number, Student> = {};
      studentsData.content.forEach(s => {
        studentMap[s.id] = s;
      });
      setStudents(studentMap);
    } catch (error) {
      console.error('Failed to fetch fees data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fees Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track payments, invoices, and outstanding dues.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-primary-600 text-white border-none shadow-lg shadow-primary-100">
          <p className="text-primary-100 text-sm font-medium">Total Collected</p>
          <h3 className="text-3xl font-bold mt-1">$45,200.00</h3>
          <p className="text-primary-100 text-xs mt-4 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> +12% from last month
          </p>
        </div>
        <div className="card p-6 bg-amber-500 text-white border-none shadow-lg shadow-amber-100">
          <p className="text-amber-100 text-sm font-medium">Pending Dues</p>
          <h3 className="text-3xl font-bold mt-1">$12,850.00</h3>
          <p className="text-amber-100 text-xs mt-4 flex items-center gap-1">
            <Clock className="w-3 h-3" /> 24 invoices overdue
          </p>
        </div>
        <div className="card p-6 bg-white border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Collections Today</p>
          <h3 className="text-3xl font-bold mt-1 text-gray-900">$2,400.00</h3>
          <p className="text-green-600 text-xs mt-4 flex items-center gap-1 font-bold uppercase tracking-wider">
            On Track
          </p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search by student or invoice ID..." className="input pl-10" />
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary gap-2 text-sm"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary gap-2 text-sm"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Fetching financial records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Month</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {students[fee.studentId] ? `${students[fee.studentId].firstName} ${students[fee.studentId].lastName}` : 'Unknown Student'}
                          </p>
                          <p className="text-xs text-gray-500">ID: #{fee.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{fee.feeType}</p>
                      <p className="text-xs text-gray-500">{fee.month}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">${fee.amount.toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">Due: {fee.dueDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        fee.paymentStatus === 'PAID' ? "bg-green-100 text-green-700" :
                        fee.paymentStatus === 'PARTIAL' ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {fee.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
