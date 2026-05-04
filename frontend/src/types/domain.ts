export interface PaginatedResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface JwtAuthResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  roles: string[];
}

export interface LoginRequest {
  usernameOrEmail: string;
  password?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password?: string;
  fullName: string;
  roleNames: string[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  enabled: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'TEACHER' 
  | 'STUDENT' 
  | 'PARENT' 
  | 'FINANCE_MANAGER' 
  | 'CLERK' 
  | 'LIBRARIAN';

export interface UserUpdateRequest {
  username: string;
  email: string;
  fullName: string;
  enabled: boolean;
  roles: string[];
}

export interface School {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
}

export interface Section {
  id: number;
  name: string;
  schoolId: number;
}

export interface Class {
  id: number;
  className: string;
  sectionId: number;
  schoolId: number;
}

export interface Subject {
  id: string;
  name: string;
  subjectCode: string;
  type: 'THEORY' | 'PRACTICAL' | 'LAB' | 'VOCATIONAL';
  isElective: boolean;
  school?: School;
}

export interface Student {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  photoUrl?: string;
  address?: string;
  previousSchool?: string;
  medicalNotes?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'GRADUATED';
  school?: School;
  schoolClass?: {
    id: string;
    classCode: string;
    grade: string;
    section: string;
    roomNumber: string;
    capacity: number;
    academicYear: AcademicYear;
    classTeacher: Teacher;
  };
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  occupation: string;
  relation: 'FATHER' | 'MOTHER' | 'GUARDIAN';
  school?: School;
  user?: User;
}

export interface ParentStudentLink {
  id: string;
  student: Student;
  parent: Parent;
  isPrimaryContact: boolean;
}

export interface Teacher {
  id: string;
  teacherCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subjectSpecialization: string;
  photoUrl?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  user?: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    enabled: boolean;
    roles: Array<{
      id: string;
      name: string;
      description: string;
      permissions: Array<{
        id: string;
        name: string;
        description: string;
        module: string;
      }>;
    }>;
  };
}

export interface Attendance {
  id: number;
  studentId: number;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string;
}

export interface AcademicYear {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  school?: School;
}

export interface StaffAttendance {
  id: string;
  user: User;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE';
}

export interface NotificationTemplate {
  id: string;
  code: string;
  titleTemplate: string;
  bodyTemplate: string;
  medium: 'SMS' | 'EMAIL' | 'PUSH';
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  subject: string;
  body: string;
  status: 'PENDING' | 'SENT' | 'FAILED';
  referenceId?: string;
  referenceType?: string;
  failureReason?: string;
  template?: NotificationTemplate;
  school?: School;
}

export interface NotificationRecipient {
  id: string;
  notification: Notification;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  status: string;
  sentAt: string;
  failureReason?: string;
}

export interface Homework {
  id: string;
  homeworkCode: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  attachmentUrl?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  schoolClass: {
    id: string;
    grade: string;
    section: string;
    academicYear: AcademicYear;
  };
  subject: Subject;
  teacher: Teacher;
}

export interface Exam {
  id: string;
  examCode: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  term: 'FIRST_TERM' | 'SECOND_TERM' | 'FINAL_EXAM' | 'MONTHLY_TEST';
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  schoolClass: {
    id: string;
    grade: string;
    section: string;
  };
}

export interface HomeworkSubmission {
  id: string;
  homework: Homework;
  student: Student;
  submittedAt: string;
  fileUrl: string;
  remarks?: string;
  marksObtained?: number;
  gradedBy?: User;
  gradedAt?: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
}

export interface ExamResult {
  id: string;
  student: Student;
  exam: Exam;
  subject: Subject;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks?: string;
}

// Transport
export interface TransportRoute {
  id: string;
  routeName: string;
  routeCode: string;
  startPoint: string;
  endPoint: string;
  cost: number;
}

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  vehicleModel: string;
  capacity: number;
  driverName: string;
  driverPhone: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';
}

// Library
export interface Book {
  id: string;
  title: string;
  isbn: string;
  author: string;
  category: string;
  quantity: number;
  availableQuantity: number;
  location?: string;
}

export interface BookIssue {
  id: string;
  book: Book;
  student: Student;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ISSUED' | 'RETURNED' | 'OVERDUE';
}

export interface Fee {
  id: number;
  studentId: number;
  amount: number;
  dueDate: string;
  paymentStatus: 'PAID' | 'UNPAID' | 'PARTIAL';
  feeType: string;
  month: string;
}

export interface Enquiry {
  id: string;
  enquiryCode: string;
  applicantName: string;
  parentName: string;
  phone: string;
  email: string;
  classApplyingFor: string;
  enquiryDate: string;
  source: 'WALK_IN' | 'ONLINE' | 'REFERRAL';
  status: 'NEW' | 'CONTACTED' | 'VISITED' | 'CLOSED';
  notes?: string;
  school: School;
}

export interface Admission {
  id: string;
  admissionCode: string;
  applicantName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  gradeApplyingFor: string;
  academicYearId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  previousSchool?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  enquiry?: Enquiry;
  school: School;
  student?: Student;
}

export type PaymentMethod = 'CASH' | 'CHEQUE' | 'ONLINE' | 'UPI' | 'BANK_TRANSFER';
export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type FeeStatus = 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'WAIVED';
export type FeeFrequency = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'ANNUALLY' | 'ONE_TIME';
export type AdmissionStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'WAITLISTED';
export type AdmissionEnquiryStatus = 'NEW' | 'CONTACTED' | 'CONVERTED' | 'DROPPED';
export type AdmissionEnquirySource = 'WALK_IN' | 'ONLINE' | 'REFERRAL';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
export type StaffAttendanceStatus = 'PRESENT' | 'ABSENT' | 'LEAVE' | 'HALF_DAY';
export type SubjectType = 'THEORY' | 'PRACTICAL' | 'LANGUAGE';
