import { Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from './store/authStore';

// Lazy load components
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const StudentListPage = lazy(() => import('./pages/StudentListPage'));
const UserListPage = lazy(() => import('./pages/UserListPage'));
const RoleListPage = lazy(() => import('./pages/RoleListPage'));
const TeacherListPage = lazy(() => import('./pages/TeacherListPage'));
const AcademicPage = lazy(() => import('./pages/AcademicPage'));
const AttendancePage = lazy(() => import('./pages/AttendancePage'));
const FeesPage = lazy(() => import('./pages/FeesPage'));
const SchoolsPage = lazy(() => import('./pages/SchoolsPage'));
const AdmissionListPage = lazy(() => import('./pages/AdmissionListPage'));
const StaffAttendancePage = lazy(() => import('./pages/StaffAttendancePage'));
const ParentListPage = lazy(() => import('./pages/ParentListPage'));
const NotificationLogsPage = lazy(() => import('./pages/NotificationLogsPage'));
const HomeworkListPage = lazy(() => import('./pages/HomeworkListPage'));
const HomeworkSubmissionsPage = lazy(() => import('./pages/HomeworkSubmissionsPage'));
const NotificationTemplatesPage = lazy(() => import('./pages/NotificationTemplatesPage'));
const ExamSchedulePage = lazy(() => import('./pages/ExamSchedulePage'));
const GradebookPage = lazy(() => import('./pages/GradebookPage'));
const TransportPage = lazy(() => import('./pages/TransportPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <Loader2 className="w-8 h-8 text-primary-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-gray-500 font-medium animate-pulse">Initializing ERP System...</p>
    </div>
  );
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const hasAccess = allowedRoles.some(role => 
      user.roles.includes(role) || 
      user.roles.includes(`ROLE_${role}`) ||
      user.roles.map(r => r.toUpperCase()).includes(role.toUpperCase())
    );
    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            
            {/* Academic Routes */}
            <Route path="/admissions" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'CLERK']}>
                <AdmissionListPage />
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'CLERK', 'PARENT', 'STUDENT']}>
                <StudentListPage />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                <UserListPage />
              </ProtectedRoute>
            } />
            <Route path="/roles" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <RoleListPage />
              </ProtectedRoute>
            } />
            <Route path="/teachers" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                <TeacherListPage />
              </ProtectedRoute>
            } />
            <Route path="/classes" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER']}>
                <AcademicPage />
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                <AttendancePage />
              </ProtectedRoute>
            } />
            <Route path="/staff-attendance" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                <StaffAttendancePage />
              </ProtectedRoute>
            } />
            <Route path="/homework" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                <HomeworkListPage />
              </ProtectedRoute>
            } />
            <Route path="/homework-submissions" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER']}>
                <HomeworkSubmissionsPage />
              </ProtectedRoute>
            } />
            <Route path="/exams" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                <ExamSchedulePage />
              </ProtectedRoute>
            } />
            <Route path="/gradebook" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                <GradebookPage />
              </ProtectedRoute>
            } />
            <Route path="/parents" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'CLERK']}>
                <ParentListPage />
              </ProtectedRoute>
            } />
            <Route path="/fees" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'FINANCE_MANAGER', 'CLERK', 'PARENT']}>
                <FeesPage />
              </ProtectedRoute>
            } />
            <Route path="/transport" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'CLERK']}>
                <TransportPage />
              </ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LIBRARIAN']}>
                <LibraryPage />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'CLERK']}>
                <NotificationLogsPage />
              </ProtectedRoute>
            } />

            {/* System Routes */}
            <Route path="/schools" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <SchoolsPage />
              </ProtectedRoute>
            } />
            <Route path="/sections" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                <AcademicPage />
              </ProtectedRoute>
            } />
            <Route path="/templates" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                <NotificationTemplatesPage />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
