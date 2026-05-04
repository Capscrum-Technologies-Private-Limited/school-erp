import { Search, Filter } from 'lucide-react';

interface SubmissionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function SubmissionFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: SubmissionFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by student or homework..."
          className="input pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <select 
          className="input text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="GRADED">Graded</option>
        </select>
        <button className="btn-secondary gap-2 text-sm">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>
    </div>
  );
}
