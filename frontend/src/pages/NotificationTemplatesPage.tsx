import { useState, useEffect } from 'react';
import { 
  FileCode, 
  Plus, 
  Search, 
  Mail, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Edit2, 
  Trash2,
  Loader2,
  Settings2,
  Eye
} from 'lucide-react';
import { notificationService } from '../api/notificationService';
import type { NotificationTemplate } from '../types/domain';

export default function NotificationTemplatesPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to fetch templates', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-500 text-sm mt-1">Configure automated SMS and Email templates for system events.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading templates...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div key={t.id} className="card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl",
                    t.medium === 'EMAIL' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                  )}>
                    {t.medium === 'EMAIL' ? <Mail className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={clsx(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      t.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {t.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Settings2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t.code.replace(/_/g, ' ')}</h3>
                <p className="text-xs font-mono text-gray-400 mb-4">{t.code}</p>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Preview</p>
                  <p className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{t.titleTemplate}</p>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{t.bodyTemplate}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button className="text-xs font-bold text-gray-400 hover:text-red-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
                <button className="p-2 bg-gray-50 text-gray-400 rounded-lg group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
