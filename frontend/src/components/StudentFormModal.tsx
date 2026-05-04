import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2 } from 'lucide-react';
import type { Student } from '../types/domain';

const studentSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  admissionNumber: z.string().min(1, 'Admission number is required'),
  admissionDate: z.string().min(1, 'Admission date is required'),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
  initialData?: Student;
  isLoading?: boolean;
}

export function StudentFormModal({ isOpen, onClose, onSubmit, initialData, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData || {
      status: 'ACTIVE',
      gender: 'MALE',
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">First Name</label>
              <input {...register('firstName')} className="input" placeholder="John" />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Last Name</label>
              <input {...register('lastName')} className="input" placeholder="Doe" />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input {...register('email')} type="email" className="input" placeholder="john.doe@example.com" />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Phone Number</label>
              <input {...register('phoneNumber')} className="input" placeholder="+1 234 567 890" />
              {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
              <input {...register('dateOfBirth')} type="date" className="input" />
              {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Gender</label>
              <select {...register('gender')} className="input">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Admission Number</label>
              <input {...register('admissionNumber')} className="input" placeholder="ADM-2026-001" />
              {errors.admissionNumber && <p className="text-xs text-red-500">{errors.admissionNumber.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Admission Date</label>
              <input {...register('admissionDate')} type="date" className="input" />
              {errors.admissionDate && <p className="text-xs text-red-500">{errors.admissionDate.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Status</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register('status')} type="radio" value="ACTIVE" className="w-4 h-4 text-primary-600" />
                <span className="text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register('status')} type="radio" value="INACTIVE" className="w-4 h-4 text-primary-600" />
                <span className="text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="btn-primary min-w-[120px]">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : initialData ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
