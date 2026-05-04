import api from './axios';
import type { 
  School, 
  Section, 
  Class, 
  Subject, 
  Teacher, 
  Attendance, 
  Fee,
  Homework,
  Exam,
  ExamResult,
  TransportRoute,
  Vehicle,
  Book,
  BookIssue,
  StaffAttendance
} from '../types/domain';

export const domainService = {
  // Schools
  getSchools: () => api.get<School[]>('/api/schools').then(r => r.data),
  createSchool: (data: Partial<School>) => api.post<School>('/api/schools', data).then(r => r.data),

  // Sections
  getSections: () => api.get<Section[]>('/api/sections').then(r => r.data),
  createSection: (data: Partial<Section>) => api.post<Section>('/api/sections', data).then(r => r.data),

  // Classes
  getClasses: () => api.get<Class[]>('/api/classes').then(r => r.data),
  createClass: (data: Partial<Class>) => api.post<Class>('/api/classes', data).then(r => r.data),

  // Subjects
  getSubjects: () => api.get<Subject[]>('/api/subjects').then(r => r.data),
  createSubject: (data: Partial<Subject>) => api.post<Subject>('/api/subjects', data).then(r => r.data),

  // Teachers
  getTeachers: () => api.get<Teacher[]>('/api/teachers').then(r => r.data),
  createTeacher: (data: Partial<Teacher>) => api.post<Teacher>('/api/teachers', data).then(r => r.data),

  // Homework
  getHomework: () => api.get<Homework[]>('/api/homework').then(r => r.data),
  createHomework: (data: Partial<Homework>) => api.post<Homework>('/api/homework', data).then(r => r.data),
  getHomeworkByParent: (parentId: string) => api.get<Homework[]>(`/api/homework/parent/${parentId}`).then(r => r.data),
  
  // Exams & Results
  getExams: () => api.get<Exam[]>('/api/exams').then(r => r.data),
  createExam: (data: Partial<Exam>) => api.post<Exam>('/api/exams', data).then(r => r.data),
  getResultsByExam: (examId: string) => api.get<ExamResult[]>(`/api/results/exam/${examId}`).then(r => r.data),
  getResultsByStudent: (studentId: string) => api.get<ExamResult[]>(`/api/results/student/${studentId}`).then(r => r.data),
  submitResult: (data: Partial<ExamResult>) => api.post<ExamResult>('/api/results', data).then(r => r.data),

  // Transport
  getTransportRoutes: () => api.get<TransportRoute[]>('/api/transport-routes').then(r => r.data),
  getVehicles: () => api.get<Vehicle[]>('/api/vehicles').then(r => r.data),
  
  // Library
  getBooks: () => api.get<Book[]>('/api/books').then(r => r.data),
  getIssuedBooks: () => api.get<BookIssue[]>('/api/book-issues').then(r => r.data),
  issueBook: (data: Partial<BookIssue>) => api.post<BookIssue>('/api/book-issues', data).then(r => r.data),

  // Attendance & Staff
  getAttendance: async (date: string): Promise<Attendance[]> => {
    const response = await api.get<Attendance[]>(`/api/attendance?date=${date}`);
    return response.data;
  },

  getStaffAttendance: async (date: string): Promise<StaffAttendance[]> => {
    const response = await api.get<StaffAttendance[]>(`/api/staff-attendance?date=${date}`);
    return response.data;
  },
  markAttendance: (data: Partial<Attendance>) => api.post<Attendance>('/api/attendance', data).then(r => r.data),

  // Fees
  getFees: () => api.get<Fee[]>('/api/fees').then(r => r.data),
  createFee: (data: Partial<Fee>) => api.post<Fee>('/api/fees', data).then(r => r.data),
};
