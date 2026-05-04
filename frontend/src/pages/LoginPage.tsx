import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GraduationCap, Loader2, AlertCircle, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { authService } from '../api/authService';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleName: z.string().min(1, 'Role is required'),
  customRole: z.string().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    try {
      // Backend might expect 'username' instead of 'usernameOrEmail'
      const payload = {
        ...data,
        username: data.usernameOrEmail // Support both common naming conventions
      };
      const response = await authService.login(payload);
      setAuth(
        { username: response.username, roles: response.roles },
        response.accessToken
      );
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const { roleName, customRole, ...regData } = data;
      // Backend documentation specifies role names without ROLE_ prefix (e.g., ADMIN, TEACHER)
      const finalRole = roleName === 'CUSTOM' ? customRole : roleName;
      const response = await authService.register({ 
        ...regData, 
        roleNames: [finalRole || 'STUDENT'] 
      });
      setAuth(
        { username: response.username, roles: response.roles },
        response.accessToken
      );
      navigate('/');
    } catch (err: any) {
      console.error('Registration error:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Check if role name is valid (e.g. ADMIN, TEACHER).';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-primary-600 p-3 rounded-2xl shadow-lg transform transition-transform hover:scale-110">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'EduConnect ERP Management Portal' : 'Join the EduConnect ecosystem today'}
          </p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
              isLogin ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
              !isLogin ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <UserPlus className="w-4 h-4" />
            Register
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form 
          className="mt-6 space-y-5" 
          onSubmit={isLogin ? loginForm.handleSubmit(onLoginSubmit) : registerForm.handleSubmit(onRegisterSubmit)}
        >
          {!isLogin && (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  {...registerForm.register('fullName')}
                  type="text"
                  className={clsx("input", registerForm.formState.errors.fullName && "border-red-500")}
                  placeholder="John Doe"
                />
                {registerForm.formState.errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                <input
                  {...registerForm.register('username')}
                  type="text"
                  className={clsx("input", registerForm.formState.errors.username && "border-red-500")}
                  placeholder="johndoe"
                />
                {registerForm.formState.errors.username && (
                  <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.username.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Account Role</label>
                <select
                  {...registerForm.register('roleName')}
                  className={clsx("input", registerForm.formState.errors.roleName && "border-red-500")}
                >
                  <option value="STUDENT">Student (Default)</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="PARENT">Parent</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="FINANCE_MANAGER">Finance Manager</option>
                  <option value="CLERK">Clerk</option>
                  <option value="LIBRARIAN">Librarian</option>
                  <option value="CUSTOM">Other (Type below...)</option>
                </select>
                {registerForm.watch('roleName') === 'CUSTOM' && (
                  <input
                    {...registerForm.register('customRole')}
                    type="text"
                    className="input mt-2 animate-in slide-in-from-top-1"
                    placeholder="Enter custom role name..."
                  />
                )}
                {registerForm.formState.errors.roleName && (
                  <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.roleName.message}</p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isLogin ? 'Username or Email' : 'Email Address'}
              </label>
              <input
                {...(isLogin ? loginForm.register('usernameOrEmail') : registerForm.register('email'))}
                type="text"
                className={clsx(
                  "input",
                  (isLogin ? loginForm.formState.errors.usernameOrEmail : registerForm.formState.errors.email) && "border-red-500"
                )}
                placeholder={isLogin ? "admin@school.com" : "john@example.com"}
              />
              {(isLogin ? loginForm.formState.errors.usernameOrEmail : registerForm.formState.errors.email) && (
                <p className="mt-1 text-xs text-red-500">
                  {isLogin ? loginForm.formState.errors.usernameOrEmail?.message : registerForm.formState.errors.email?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                {...(isLogin ? loginForm.register('password') : registerForm.register('password'))}
                type="password"
                className={clsx(
                  "input",
                  (isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password) && "border-red-500"
                )}
                placeholder="••••••••"
              />
              {(isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password) && (
                <p className="mt-1 text-xs text-red-500">
                  {(isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password)?.message}
                </p>
              )}
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Register Now'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          &copy; 2026 EduConnect ERP Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
