import { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  Mail, 
  MessageSquare, 
  Smartphone,
  CheckCircle2, 
  XCircle, 
  Clock,
  Loader2,
  ChevronRight,
  User,
  History,
  AlertTriangle
} from 'lucide-react';
import { notificationService } from '../api/notificationService';
import type { Notification, NotificationRecipient } from '../types/domain';

export default function NotificationLogsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipients = async (n: Notification) => {
    setSelectedNotification(n);
    setLoadingRecipients(true);
    try {
      const data = await notificationService.getRecipients(n.id);
      setRecipients(data);
    } catch (error) {
      console.error('Failed to fetch recipients', error);
    } finally {
      setLoadingRecipients(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Hub</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor delivery status for all system alerts and automated messages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logs List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card h-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search logs..." className="input pl-10 h-9 text-sm" />
              </div>
              <button className="btn-secondary h-9 gap-2 text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="divide-y divide-gray-100 overflow-y-auto max-h-[calc(100vh-300px)]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                </div>
              ) : notifications.map((n) => (
                <div 
                  key={n.id} 
                  onClick={() => handleViewRecipients(n)}
                  className={clsx(
                    "p-4 hover:bg-gray-50 cursor-pointer transition-colors group",
                    selectedNotification?.id === n.id ? "bg-primary-50/50" : ""
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={clsx(
                        "p-2 rounded-xl",
                        n.channel === 'EMAIL' ? "bg-blue-50 text-blue-600" :
                        n.channel === 'SMS' ? "bg-purple-50 text-purple-600" :
                        "bg-green-50 text-green-600"
                      )}>
                        {n.channel === 'EMAIL' && <Mail className="w-5 h-5" />}
                        {n.channel === 'SMS' && <Smartphone className="w-5 h-5" />}
                        {n.channel === 'WHATSAPP' && <MessageSquare className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{n.subject}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.body}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">
                            {n.type.replace('_', ' ')}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Clock className="w-3 h-3" />
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={clsx(
                        "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider",
                        n.status === 'SENT' ? "text-green-600" :
                        n.status === 'FAILED' ? "text-red-600" :
                        "text-amber-600"
                      )}>
                        {n.status === 'SENT' && <CheckCircle2 className="w-3 h-3" />}
                        {n.status === 'FAILED' && <XCircle className="w-3 h-3" />}
                        {n.status === 'PENDING' && <Clock className="w-3 h-3" />}
                        {n.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recipients Panel */}
        <div className="lg:col-span-1">
          {selectedNotification ? (
            <div className="card h-full p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delivery Report</h3>
                <p className="text-xs text-gray-500 mt-1">Recipient-level tracking for this notification.</p>
              </div>

              <div className="space-y-4">
                {loadingRecipients ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                  </div>
                ) : recipients.length > 0 ? recipients.map((r) => (
                  <div key={r.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-gray-900">{r.recipientName}</span>
                      </div>
                      <span className={clsx(
                        "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                        r.status === 'SENT' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {r.status}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-gray-500 flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {r.recipientEmail}
                      </p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-2">
                        <Smartphone className="w-3 h-3" /> {r.recipientPhone}
                      </p>
                      {r.failureReason && (
                        <p className="text-[10px] text-red-600 mt-2 flex items-start gap-1 font-medium italic">
                          <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                          {r.failureReason}
                        </p>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10">
                    <History className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 italic">No recipient data found</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center p-10 text-center text-gray-400 border-dashed border-2">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm font-medium">Select a notification to view delivery reports</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
