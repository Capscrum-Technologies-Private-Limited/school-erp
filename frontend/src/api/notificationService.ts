import api from './axios';
import type { Notification, NotificationRecipient, NotificationTemplate } from '../types/domain';

export const notificationService = {
  getNotifications: () => api.get<Notification[]>('/api/notifications').then(r => r.data),
  getNotificationById: (id: string) => api.get<Notification>(`/api/notifications/${id}`).then(r => r.data),
  createNotification: (data: Partial<Notification>) => api.post<Notification>('/api/notifications', data).then(r => r.data),
  updateNotification: (id: string, data: Partial<Notification>) => api.put<Notification>(`/api/notifications/${id}`, data).then(r => r.data),
  deleteNotification: (id: string) => api.delete<string>(`/api/notifications/${id}`).then(r => r.data),

  getRecipients: (notificationId: string) => 
    api.get<NotificationRecipient[]>(`/api/notifications/${notificationId}/recipients`).then(r => r.data),

  getByReference: (referenceId: string, referenceType: 'ADMISSION' | 'FEE' | 'PAYMENT') => 
    api.get<Notification[]>(`/api/notifications/by-reference?referenceId=${referenceId}&referenceType=${referenceType}`)
      .then(r => r.data),

  sendAdmissionApproved: (data: { admissionId: string; recipientName: string; recipientEmail?: string; recipientPhone?: string }) => 
    api.post<Notification>('/api/notifications/admission-approved', null, { params: data }).then(r => r.data),

  sendAdmissionRejected: (data: { admissionId: string; recipientName: string; rejectionReason: string; recipientEmail?: string; recipientPhone?: string }) => 
    api.post<Notification>('/api/notifications/admission-rejected', null, { params: data }).then(r => r.data),

  sendFeePaymentConfirmation: (data: { paymentId: string; recipientName: string; feeDetails: string; amountPaid: string; recipientEmail?: string; recipientPhone?: string }) => 
    api.post<Notification>('/api/notifications/fee-payment', null, { params: data }).then(r => r.data),

  // Templates
  getTemplates: () => api.get<NotificationTemplate[]>('/api/notification-templates').then(r => r.data),
  createTemplate: (data: Partial<NotificationTemplate>) => api.post<NotificationTemplate>('/api/notification-templates', data).then(r => r.data),
  updateTemplate: (id: string, data: Partial<NotificationTemplate>) => api.put<NotificationTemplate>(`/api/notification-templates/${id}`, data).then(r => r.data),
  deleteTemplate: (id: string) => api.delete<string>(`/api/notification-templates/${id}`).then(r => r.data),
};
