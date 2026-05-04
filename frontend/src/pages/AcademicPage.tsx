import { useState, useEffect } from 'react';
import { 
  Plus, 
  BookOpen, 
  Layers, 
  Grid,
  MoreVertical,
  Edit2,
  Trash2,
  Loader2,
  Search
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { Class, Subject, Section } from '../types/domain';

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects' | 'sections'>('classes');
  const [data, setData] = useState<{ classes: Class[], subjects: Subject[], sections: Section[] }>({
    classes: [],
    subjects: [],
    sections: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const fetchAcademicData = async () => {
    setLoading(true);
    try {
      const [classes, subjects, sections] = await Promise.all([
        domainService.getClasses(),
        domainService.getSubjects(),
        domainService.getSections()
      ]);
      setData({ classes, subjects, sections });
    } catch (error) {
      console.error('Failed to fetch academic data', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'classes', name: 'Classes', icon: Grid },
    { id: 'subjects', name: 'Subjects', icon: BookOpen },
    { id: 'sections', name: 'Sections', icon: Layers },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Structure</h1>
          <p className="text-gray-500 text-sm mt-1">Manage classes, subjects, and departmental sections.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add {activeTab.slice(0, -1)}
        </button>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all",
              activeTab === tab.id 
                ? "border-primary-600 text-primary-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name / Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference Info</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === 'classes' && data.classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">#{cls.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{cls.className}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Section ID: {cls.sectionId}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeTab === 'subjects' && data.subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">#{sub.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                      <p className="text-xs text-gray-500">{sub.subjectCode}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={clsx(
                          "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider w-fit",
                          sub.type === 'THEORY' ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                        )}>
                          {sub.type}
                        </span>
                        {sub.isElective && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider w-fit">
                            Elective
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeTab === 'sections' && data.sections.map((sec) => (
                  <tr key={sec.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">#{sec.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{sec.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">School ID: {sec.schoolId}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
