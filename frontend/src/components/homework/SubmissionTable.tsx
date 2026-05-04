import { FileText, Clock, CheckCircle2, MoreVertical, ExternalLink, Calendar } from 'lucide-react';
import type { HomeworkSubmission } from '../../types/domain';
import { clsx } from '../../utils/styles';

interface SubmissionTableProps {
  submissions: HomeworkSubmission[];
  onGrade: (submission: HomeworkSubmission) => void;
}

export function SubmissionTable({ submissions, onGrade }: SubmissionTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-bold text-gray-900">No submissions found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
          No homework submissions match your current filters.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Homework</th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted Date</th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Marks</th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {submissions.map((submission) => (
          <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-xs">
                  {submission.student.firstName[0]}{submission.student.lastName[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{submission.student.firstName} {submission.student.lastName}</p>
                  <p className="text-xs text-gray-500">Class {submission.homework.schoolClass.grade}-{submission.homework.schoolClass.section}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{submission.homework.title}</span>
                <span className="text-xs text-gray-500 truncate max-w-[200px]">{submission.homework.description}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(submission.submittedAt).toLocaleDateString()}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={clsx(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
                submission.status === 'GRADED' ? "bg-green-100 text-green-800" :
                submission.status === 'SUBMITTED' ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              )}>
                {submission.status === 'GRADED' ? <CheckCircle2 className="w-3 h-3" /> : 
                 submission.status === 'SUBMITTED' ? <FileText className="w-3 h-3" /> : 
                 <Clock className="w-3 h-3" />}
                {submission.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm font-bold text-gray-900">
                {submission.marksObtained !== undefined ? (
                  <span className="text-primary-600">{submission.marksObtained}</span>
                ) : (
                  <span className="text-gray-300">--</span>
                )}
                <span className="text-gray-400 font-normal"> / {submission.homework.maxMarks}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <a 
                  href={submission.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                  title="View Submission"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => onGrade(submission)}
                  className="btn-primary text-xs py-1 px-3"
                >
                  Grade
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
