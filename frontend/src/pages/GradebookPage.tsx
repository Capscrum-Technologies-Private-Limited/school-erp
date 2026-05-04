import { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Save, 
  User, 
  BookOpen,
  GraduationCap,
  Loader2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { Exam, ExamResult, Student, Subject } from '../types/domain';

export default function GradebookPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [results, setResults] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [examsData, subjectsData] = await Promise.all([
        domainService.getExams(),
        domainService.getSubjects()
      ]);
      setExams(examsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Failed to fetch gradebook data', error);
    }
  };

  const fetchStudents = async (examId: string) => {
    setLoading(true);
    try {
      // For demo, we'll just get all students. 
      // In production, you'd filter by the class linked to the exam.
      const data = await domainService.getStudents();
      setStudents(data);
      
      const existingResults = await domainService.getResultsByExam(examId);
      const marksMap: Record<string, number> = {};
      existingResults.forEach(r => {
        marksMap[r.student.id] = r.marksObtained;
      });
      setResults(marksMap);
    } catch (error) {
      console.error('Failed to fetch students', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Batch save logic (demo: individual calls)
      const promises = Object.entries(results).map(([studentId, marks]) => {
        return domainService.submitResult({
          student: { id: studentId } as any,
          exam: { id: selectedExam } as any,
          subject: { id: selectedSubject } as any,
          marksObtained: marks,
          maxMarks: 100,
          grade: marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B' : 'C'
        });
      });
      await Promise.all(promises);
      alert('Marks saved successfully!');
    } catch (error) {
      console.error('Failed to save marks', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Gradebook</h1>
          <p className="text-gray-500 text-sm mt-1">Input and manage student marks for specific examinations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={!selectedExam || !selectedSubject || saving}
          className="btn-primary gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-4 flex flex-col gap-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Examination</label>
          <select 
            className="input"
            value={selectedExam}
            onChange={(e) => {
              setSelectedExam(e.target.value);
              if (e.target.value) fetchStudents(e.target.value);
            }}
          >
            <option value="">Choose an exam...</option>
            {exams.map(e => <option key={e.id} value={e.id}>{e.name} ({e.examCode})</option>)}
          </select>
        </div>
        <div className="card p-4 flex flex-col gap-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Subject</label>
          <select 
            className="input"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Choose a subject...</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      </div>

      {selectedExam && selectedSubject ? (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Marks (out of 100)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-xs">
                          {student.firstName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{student.firstName} {student.lastName}</p>
                          <p className="text-[10px] text-gray-400">{student.studentCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="number" 
                        max="100" 
                        min="0"
                        className="input w-24 h-9 text-sm"
                        value={results[student.id] || ''}
                        onChange={(e) => setResults({...results, [student.id]: parseInt(e.target.value)})}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-600">
                        {results[student.id] >= 90 ? 'A+' : results[student.id] >= 80 ? 'A' : results[student.id] >= 70 ? 'B' : 'C'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card p-20 flex flex-col items-center justify-center text-center border-dashed border-2">
          <BookOpen className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Select an exam and subject to start grading.</p>
        </div>
      )}
    </div>
  );
}
