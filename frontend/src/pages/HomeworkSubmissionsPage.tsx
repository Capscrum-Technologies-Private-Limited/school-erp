import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { homeworkSubmissionService } from '../api/homeworkSubmissionService';
import type { HomeworkSubmission } from '../types/domain';
import { SubmissionFilters } from '../components/homework/SubmissionFilters';
import { SubmissionTable } from '../components/homework/SubmissionTable';

export default function HomeworkSubmissionsPage() {
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await homeworkSubmissionService.getSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      const matchesSearch = 
        s.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.homework.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  const handleGrade = (submission: HomeworkSubmission) => {
    console.log('Grade submission', submission);
    // TODO: Implement grading modal
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework Submissions</h1>
          <p className="text-gray-500 text-sm mt-1">Review and grade student homework submissions.</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100">
          <SubmissionFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading submissions...</p>
            </div>
          ) : (
            <SubmissionTable 
              submissions={filteredSubmissions}
              onGrade={handleGrade}
            />
          )}
        </div>
      </div>
    </div>
  );
}
