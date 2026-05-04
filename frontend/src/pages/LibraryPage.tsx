import { useState, useEffect } from 'react';
import { 
  Book as BookIcon, 
  Plus, 
  Search, 
  History, 
  Library, 
  ArrowRightLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  BookOpen,
  Filter
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { Book, BookIssue } from '../types/domain';

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<BookIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inventory' | 'issues'>('inventory');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksData, issuedData] = await Promise.all([
        domainService.getBooks(),
        domainService.getIssuedBooks()
      ]);
      setBooks(booksData);
      setIssuedBooks(issuedData);
    } catch (error) {
      console.error('Failed to fetch library data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
          <p className="text-gray-500 text-sm mt-1">Catalog your collection and track book circulations.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary gap-2">
            <ArrowRightLeft className="w-4 h-4" />
            Issue Book
          </button>
          <button className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Add Book
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={clsx(
            "pb-4 px-2 text-sm font-bold transition-all relative",
            activeTab === 'inventory' ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Book Inventory
          {activeTab === 'inventory' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('issues')}
          className={clsx(
            "pb-4 px-2 text-sm font-bold transition-all relative",
            activeTab === 'issues' ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Circulation Logs
          {activeTab === 'issues' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full" />}
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search by title, author, or ISBN..." className="input pl-10" />
          </div>
          <button className="btn-secondary p-2">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Indexing collection...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              {activeTab === 'inventory' ? (
                <>
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Info</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author / Category</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {books.map(book => (
                      <tr key={book.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 bg-amber-50 text-amber-600 rounded flex items-center justify-center shadow-sm">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{book.title}</p>
                              <p className="text-[10px] font-mono text-gray-400">{book.isbn}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-700">{book.author}</span>
                            <span className="text-[10px] font-bold text-primary-600 uppercase">{book.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                              <div 
                                className="h-full bg-green-500" 
                                style={{ width: `${(book.availableQuantity / book.quantity) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-gray-600">{book.availableQuantity} / {book.quantity}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Book</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timeline</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {issuedBooks.map(issue => (
                      <tr key={issue.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{issue.book.title}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {issue.student.firstName[0]}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{issue.student.firstName} {issue.student.lastName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500">
                          {new Date(issue.issueDate).toLocaleDateString()} → <span className="font-bold text-red-600">{new Date(issue.dueDate).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={clsx(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            issue.status === 'ISSUED' ? "bg-blue-100 text-blue-700" : 
                            issue.status === 'OVERDUE' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          )}>
                            {issue.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
