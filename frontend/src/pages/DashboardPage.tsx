import { 
  Users, 
  UserSquare2, 
  GraduationCap, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const stats = [
  { name: 'Total Students', value: '2,450', icon: GraduationCap, change: '+4.75%', changeType: 'increase' },
  { name: 'Total Teachers', value: '124', icon: UserSquare2, change: '+2.1%', changeType: 'increase' },
  { name: 'Attendance Rate', value: '94.2%', icon: Users, change: '-0.4%', changeType: 'decrease' },
  { name: 'Revenue', value: '$45,200', icon: CreditCard, change: '+12.5%', changeType: 'increase' },
];

const attendanceData = [
  { name: 'Mon', attendance: 92 },
  { name: 'Tue', attendance: 95 },
  { name: 'Wed', attendance: 94 },
  { name: 'Thu', attendance: 96 },
  { name: 'Fri', attendance: 93 },
  { name: 'Sat', attendance: 88 },
];

const revenueData = [
  { month: 'Jan', amount: 32000 },
  { month: 'Feb', amount: 35000 },
  { month: 'Mar', amount: 31000 },
  { month: 'Apr', amount: 42000 },
  { month: 'May', amount: 38000 },
  { month: 'Jun', amount: 45000 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className={clsx(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.changeType === 'increase' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}>
                {stat.changeType === 'increase' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Weekly Attendance
            </h3>
            <select className="text-sm bg-gray-50 border-none rounded-lg focus:ring-0">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-72 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" aspect={2}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="attendance" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-600" />
              Revenue Growth
            </h3>
          </div>
          <div className="h-72 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" aspect={2}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
