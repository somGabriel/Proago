
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Briefcase, 
  BarChart3, PieChart, Activity, Plus, Save, Calendar, ArrowRight,
  UserCheck, AlertTriangle, ArrowUpRight, ArrowDownRight, Flame, Shield,
  Target, ChevronRight, CheckCircle2, Info, MessageSquare, List,
  Landmark, CreditCard, Wallet, Receipt
} from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../services/translations';

interface MonthlyData {
  month: string;
  year: number;
  revenue: number;
  expenses: number;
  subsidies?: number;
  salaries?: number;
  operations?: number;
  otherCosts?: number;
}

interface Goal {
  id: string;
  name: string;
  targetValue: number;
  currentValue: number;
  unit: string;
}

interface ManagerDashboardProps {
  language: Language;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ language }) => {
  const t = useTranslation(language);
  
  const [finances, setFinances] = useState<MonthlyData[]>([
    { month: 'Aug', year: 2024, revenue: 45000, expenses: 32000, subsidies: 5000, salaries: 20000, operations: 8000, otherCosts: 4000 },
    { month: 'Sep', year: 2024, revenue: 52000, expenses: 35000, subsidies: 4000, salaries: 21000, operations: 9000, otherCosts: 5000 },
    { month: 'Oct', year: 2024, revenue: 48000, expenses: 34000, subsidies: 6000, salaries: 20500, operations: 8500, otherCosts: 5000 },
    { month: 'Jan', year: 2025, revenue: 58000, expenses: 38000, subsidies: 8000, salaries: 24000, operations: 10000, otherCosts: 4000 },
  ]);

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(finances.length - 1);
  const [hoveredSegment, setHoveredSegment] = useState<{ type: 'income' | 'cost', label: string, value: number, color: string, icon: any } | null>(null);
  
  const selectedFinance = finances[selectedMonthIndex];

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: '20k revenue', targetValue: 20000, currentValue: 14500, unit: '€' },
    { id: '2', name: 'Team Expansion', targetValue: 50, currentValue: 38, unit: 'agents' },
    { id: '3', name: 'Market Share', targetValue: 100, currentValue: 65, unit: '%' },
    { id: '4', name: 'Customer Satisfaction', targetValue: 5, currentValue: 4.8, unit: '/5' },
  ]);

  const [insights] = useState([
    "Employee rentability improved by 12% this month.",
    "Subsidies optimization reached peak efficiency.",
    "Operations costs stabilized in Jan 2025.",
    "Lead conversion quality is at an all-time high."
  ]);

  const [newEntry, setNewEntry] = useState({ month: 'Feb', revenue: '', expenses: '' });

  const workerPerformance = [
    { id: '1', name: 'Jean-Pierre M.', generated: 8400, cost: 3200, sales: 154, roi: '2.6x' },
    { id: '2', name: 'Sarah W.', generated: 7200, cost: 2800, sales: 132, roi: '2.5x' },
    { id: '3', name: 'Marco V.', generated: 6500, cost: 2600, sales: 121, roi: '2.5x' },
    { id: '4', name: 'Worker 111', generated: 2400, cost: 1200, sales: 42, roi: '2.0x' },
  ];

  const handleAddFinances = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.revenue || !newEntry.expenses) return;
    const entry: MonthlyData = { 
      month: newEntry.month, 
      year: 2025,
      revenue: parseFloat(newEntry.revenue), 
      expenses: parseFloat(newEntry.expenses),
      subsidies: 0,
      salaries: parseFloat(newEntry.expenses) * 0.6,
      operations: parseFloat(newEntry.expenses) * 0.3,
      otherCosts: parseFloat(newEntry.expenses) * 0.1
    };
    setFinances([...finances, entry]);
    setSelectedMonthIndex(finances.length);
    setNewEntry({ month: '', revenue: '', expenses: '' });
  };

  const handleLoadExtendedRoadmap = () => {
    alert("Fetching encrypted future roadmap data from Proago Cloud...\nAccess Granted. Rendering Q3-Q4 forecast.");
  };

  const handleGenerateEfficiencyReport = () => {
    alert("Synthesizing efficiency analytics...\nGenerating PDF report for the Executive Board.\nDownload will start shortly.");
  };

  const totalRevenue = finances.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = finances.reduce((acc, curr) => acc + curr.expenses, 0);
  const profit = totalRevenue - totalExpenses;

  // Max value for scaling chart - dynamically calculated for the selected month to maximize clarity
  const mainMaxVal = Math.max(selectedFinance.revenue, selectedFinance.expenses) * 1.05;

  // Max value for the bottom comparison chart - dynamically calculated from the dataset
  const globalMaxVal = Math.max(...finances.map(f => Math.max(f.revenue, f.expenses))) * 1.1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-white/10 rounded-full mb-3">
             <Shield className="w-3.5 h-3.5 text-phoenix-red" />
             <span className="text-[9px] font-black uppercase tracking-widest text-white">Administrative Authority</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">{t.manager.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium uppercase tracking-[0.2em]">{t.manager.subtitle}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 dark:bg-phoenix-charcoal rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-phoenix-red/20 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-phoenix-red mb-3">{t.manager.revenue}</p>
            <p className="text-5xl font-black tracking-tighter italic uppercase leading-none">€{totalRevenue.toLocaleString()}</p>
            <div className="mt-8 flex items-center text-xs font-bold text-emerald-400 gap-2">
                <div className="p-1 bg-emerald-400/20 rounded-md"><ArrowUpRight className="w-4 h-4" /></div> +12.5% Growth
            </div>
        </div>
        <div className="bg-white dark:bg-phoenix-charcoal rounded-[40px] p-10 border border-slate-200 dark:border-white/5 shadow-xl transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-3">{t.manager.expenses}</p>
            <p className="text-5xl font-black tracking-tighter italic uppercase leading-none text-slate-900 dark:text-white">€{totalExpenses.toLocaleString()}</p>
            <div className="mt-8 flex items-center text-xs font-bold text-red-400 gap-2">
                <div className="p-1 bg-red-400/20 rounded-md"><ArrowDownRight className="w-4 h-4" /></div> Operating Overhead
            </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-[40px] p-10 border border-emerald-100 dark:border-emerald-800 shadow-xl transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500 mb-3">{t.manager.profit}</p>
            <p className="text-5xl font-black tracking-tighter italic uppercase leading-none text-emerald-700 dark:text-emerald-400">€{profit.toLocaleString()}</p>
            <div className="mt-8 flex items-center text-xs font-bold text-emerald-600 gap-2">
                <TrendingUp className="w-5 h-5" /> Optimized Yield
            </div>
        </div>
      </div>

      {/* Main Dashboard Area - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Column: Monthly Finance Detailed (Sketch 1) */}
        <div className="lg:col-span-2 bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 p-12 shadow-2xl relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white flex items-center gap-3 italic">
                <Activity className="w-5 h-5 text-phoenix-red" /> Financial Architecture
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-8">Segmented Profit & Loss Overview</p>
            </div>
            
            {/* Month Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar max-w-full bg-slate-50 dark:bg-white/5 p-2 rounded-2xl">
               {finances.map((f, i) => (
                 <button 
                  key={i}
                  onClick={() => setSelectedMonthIndex(i)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    selectedMonthIndex === i 
                    ? 'bg-slate-900 dark:bg-phoenix-red text-white shadow-xl scale-105' 
                    : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                 >
                   {f.month} {f.year}
                 </button>
               ))}
               <button 
                onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="p-3 bg-white dark:bg-white/10 rounded-xl text-slate-400 hover:text-phoenix-red transition-all shadow-sm" title="Add Month"
               >
                 <Plus className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Interactive Chart Section */}
          <div className="flex flex-col md:flex-row gap-24 md:gap-48 items-end justify-center h-[520px] relative px-4 border-b border-slate-100 dark:border-white/5 pb-16">
            
            {/* Dynamic Callout Box (Sketch Inspired) */}
            {hoveredSegment && (
              <div 
                className={`absolute z-50 pointer-events-none transition-all duration-300 transform -translate-y-1/2 flex items-center gap-6 animate-fade-in ${
                  hoveredSegment.type === 'income' ? 'left-[calc(50%-60px)] md:left-[calc(35%)]' : 'right-[calc(50%-60px)] md:right-[calc(35%)] flex-row-reverse'
                }`}
                style={{ top: '45%' }}
              >
                <div className={`w-16 h-px ${hoveredSegment.type === 'income' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                <div className={`flex flex-col p-4 rounded-3xl border shadow-2xl backdrop-blur-xl min-w-[160px] ${
                  hoveredSegment.type === 'income' 
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 shadow-emerald-500/10' 
                    : 'bg-red-50/90 dark:bg-red-950/60 border-red-200 dark:border-red-800 shadow-red-500/10'
                }`}>
                   <div className="flex items-center gap-2 mb-2">
                      <hoveredSegment.icon className={`w-4 h-4 ${hoveredSegment.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`} />
                      <span className={`text-[11px] font-black uppercase tracking-widest ${hoveredSegment.type === 'income' ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                        {hoveredSegment.label}
                      </span>
                   </div>
                   <span className={`text-2xl font-black italic tracking-tighter ${hoveredSegment.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                     €{hoveredSegment.value.toLocaleString()}
                   </span>
                </div>
              </div>
            )}

            {/* Income Bar (Green) */}
            <div className="flex-1 max-w-[180px] flex flex-col items-center group relative h-full justify-end">
              <div className="flex flex-col w-full relative h-full justify-end overflow-hidden rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Segment: Base Revenue */}
                <div 
                  className="bg-emerald-500 w-full transition-all duration-700 hover:brightness-110 cursor-pointer"
                  style={{ height: `${((selectedFinance.revenue - (selectedFinance.subsidies || 0)) / mainMaxVal) * 100}%` }}
                  onMouseEnter={() => setHoveredSegment({ type: 'income', label: 'Gross Revenue', value: (selectedFinance.revenue - (selectedFinance.subsidies || 0)), color: 'emerald', icon: Wallet })}
                  onMouseLeave={() => setHoveredSegment(null)}
                ></div>
                {/* Segment: Subsidies (Stacked) */}
                <div 
                  className="bg-emerald-300 dark:bg-emerald-400/80 w-full border-b-4 border-emerald-600/20 transition-all duration-700 hover:brightness-110 cursor-pointer"
                  style={{ height: `${((selectedFinance.subsidies || 0) / mainMaxVal) * 100}%` }}
                  onMouseEnter={() => setHoveredSegment({ type: 'income', label: 'Public Subsidies', value: (selectedFinance.subsidies || 0), color: 'emerald', icon: Landmark })}
                  onMouseLeave={() => setHoveredSegment(null)}
                ></div>
              </div>
              <div className="mt-12 text-center">
                 <p className="text-[11px] font-black uppercase text-emerald-600 tracking-[0.3em] italic">Income</p>
                 <p className="text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter italic">€{selectedFinance.revenue.toLocaleString()}</p>
              </div>
            </div>

            {/* Expenses Bar (Red) */}
            <div className="flex-1 max-w-[180px] flex flex-col items-center group relative h-full justify-end">
              <div className="flex flex-col w-full relative h-full justify-end overflow-hidden rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Segment: Salaries */}
                <div 
                  className="bg-red-500 w-full transition-all duration-700 hover:brightness-110 cursor-pointer"
                  style={{ height: `${((selectedFinance.salaries || selectedFinance.expenses * 0.6) / mainMaxVal) * 100}%` }}
                  onMouseEnter={() => setHoveredSegment({ type: 'cost', label: 'Payroll', value: (selectedFinance.salaries || selectedFinance.expenses * 0.6), color: 'red', icon: CreditCard })}
                  onMouseLeave={() => setHoveredSegment(null)}
                ></div>
                {/* Segment: Operations */}
                <div 
                  className="bg-red-400 w-full transition-all duration-700 hover:brightness-110 cursor-pointer"
                  style={{ height: `${((selectedFinance.operations || selectedFinance.expenses * 0.3) / mainMaxVal) * 100}%` }}
                  onMouseEnter={() => setHoveredSegment({ type: 'cost', label: 'Operations', value: (selectedFinance.operations || selectedFinance.expenses * 0.3), color: 'red', icon: Activity })}
                  onMouseLeave={() => setHoveredSegment(null)}
                ></div>
                {/* Segment: Other */}
                <div 
                  className="bg-red-300 dark:bg-red-400/40 w-full border-b-4 border-red-700/20 transition-all duration-700 hover:brightness-110 cursor-pointer"
                  style={{ height: `${((selectedFinance.otherCosts || selectedFinance.expenses * 0.1) / mainMaxVal) * 100}%` }}
                  onMouseEnter={() => setHoveredSegment({ type: 'cost', label: 'Misc Costs', value: (selectedFinance.otherCosts || selectedFinance.expenses * 0.1), color: 'red', icon: Receipt })}
                  onMouseLeave={() => setHoveredSegment(null)}
                ></div>
              </div>
              <div className="mt-12 text-center">
                 <p className="text-[11px] font-black uppercase text-red-500 tracking-[0.3em] italic">Costs</p>
                 <p className="text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter italic">€{selectedFinance.expenses.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl transform hover:scale-105 transition-transform cursor-default">
              <Calendar className="w-5 h-5 text-phoenix-red" />
              <span className="text-[14px] font-black uppercase tracking-[0.5em] italic">{selectedFinance.month} {selectedFinance.year}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Long Term Goals & Insights */}
        <div className="space-y-12 h-full flex flex-col">
          {/* Long Term Goals Panel */}
          <div className="bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 p-10 shadow-2xl relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-phoenix-red/5 rounded-full -mr-16 -mt-16"></div>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white flex items-center gap-3 italic">
                <Target className="w-5 h-5 text-phoenix-red" /> Future Objectives
              </h3>
            </div>
            
            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-4 group">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-phoenix-red transition-colors italic">{goal.name}</p>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">
                      {goal.currentValue.toLocaleString()}{goal.unit} / {goal.targetValue.toLocaleString()}{goal.unit}
                    </p>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.4)] relative"
                      style={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center pt-4 border-t border-slate-50 dark:border-white/5">
                 <button 
                  onClick={handleLoadExtendedRoadmap}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-phoenix-red transition-all italic focus:outline-none"
                 >
                    Load Extended Roadmap <ChevronRight className="w-4 h-4 rotate-90" />
                 </button>
              </div>
            </div>
          </div>

          {/* Insights / Notes Area */}
          <div className="bg-slate-900 dark:bg-phoenix-black rounded-[40px] p-10 text-white shadow-2xl border border-white/5 relative overflow-hidden h-fit">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -mr-24 -mb-24 blur-3xl"></div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-phoenix-red mb-8 flex items-center gap-3 italic">
              <MessageSquare className="w-5 h-5" /> Strategic Notes
            </h3>
            <div className="space-y-6">
               {insights.map((insight, idx) => (
                 <div key={idx} className="flex gap-4 items-start group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-phoenix-red group-hover:scale-150 transition-transform"></div>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-400 leading-relaxed italic group-hover:text-white transition-colors">{insight}</p>
                 </div>
               ))}
               <div className="flex gap-4 items-start opacity-30 italic">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">System syncing automated reports...</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preservation of lower dashboard sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          {/* Performance Context */}
          <div className="space-y-10">
              <div className="bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 p-10 shadow-2xl transition-all">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white flex items-center gap-3 italic">
                        <BarChart3 className="w-5 h-5 text-phoenix-red" /> Performance Context
                    </h3>
                  </div>
                  
                  <div className="flex items-end justify-between h-56 gap-6 px-4 pt-4 relative">
                      <div className="absolute inset-x-0 bottom-0 h-px bg-slate-100 dark:bg-white/5"></div>
                      {finances.map((f, i) => (
                          <div key={i} className="flex-1 flex gap-2 items-end h-full relative group">
                              <div 
                                className="bg-phoenix-red w-full rounded-t-xl transition-all duration-1000 shadow-[0_-5px_20px_rgba(255,42,42,0.3)] hover:brightness-125"
                                style={{ height: `${(f.revenue / globalMaxVal) * 100}%` }}
                              ></div>
                              <div 
                                className="bg-slate-200 dark:bg-white/10 w-full rounded-t-xl transition-all duration-1000 hover:bg-slate-300 dark:hover:bg-white/20"
                                style={{ height: `${(f.expenses / globalMaxVal) * 100}%` }}
                              ></div>
                              <div className="absolute -bottom-10 left-0 right-0 text-center">
                                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{f.month}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="flex justify-center gap-10 mt-20 text-[10px] font-black uppercase tracking-[0.2em]">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="w-4 h-4 bg-phoenix-red rounded-md"></span> Revenue</div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="w-4 h-4 bg-slate-200 dark:bg-white/10 rounded-md"></span> Expenses</div>
                  </div>
              </div>

              <div id="audit-form" className="bg-slate-100 dark:bg-white/5 rounded-[40px] p-10 border border-slate-200 dark:border-white/5 shadow-inner">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-8 flex items-center gap-3 italic">
                    <Plus className="w-5 h-5 text-phoenix-red" /> {t.manager.register}
                  </h3>
                  <form onSubmit={handleAddFinances} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input 
                        className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-black uppercase outline-none bg-white dark:bg-phoenix-black text-slate-900 dark:text-white focus:ring-2 focus:ring-phoenix-red transition-all" 
                        placeholder="MONTH" 
                        value={newEntry.month} 
                        onChange={e => setNewEntry({...newEntry, month: e.target.value})}
                      />
                      <input 
                        className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-black uppercase outline-none bg-white dark:bg-phoenix-black text-slate-900 dark:text-white focus:ring-2 focus:ring-phoenix-red transition-all" 
                        placeholder="REVENUE (€)" 
                        type="number"
                        value={newEntry.revenue} 
                        onChange={e => setNewEntry({...newEntry, revenue: e.target.value})}
                      />
                      <input 
                        className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-black uppercase outline-none bg-white dark:bg-phoenix-black text-slate-900 dark:text-white focus:ring-2 focus:ring-phoenix-red transition-all" 
                        placeholder="EXPENSES (€)" 
                        type="number"
                        value={newEntry.expenses} 
                        onChange={e => setNewEntry({...newEntry, expenses: e.target.value})}
                      />
                      <button className="bg-slate-900 dark:bg-phoenix-red text-white rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest hover:bg-phoenix-orange transition-all flex items-center justify-center gap-2 shadow-xl italic">
                          <Save className="w-4 h-4" /> LOG AUDIT
                      </button>
                  </form>
              </div>
          </div>

          {/* Worker Rentability Table */}
          <div className="bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl transition-all h-fit">
              <div className="px-10 py-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white italic">{t.manager.rentability}</h3>
                  <Users className="w-5 h-5 text-slate-300 dark:text-slate-600" />
              </div>
              <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100 dark:divide-white/5">
                      <thead>
                          <tr className="bg-slate-50/50 dark:bg-white/5">
                              <th className="px-10 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Ambassador</th>
                              <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Gen. Value</th>
                              <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Overhead</th>
                              <th className="px-10 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">ROI index</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                          {workerPerformance.map(worker => (
                              <tr key={worker.id} className="hover:bg-phoenix-red/5 transition-all group cursor-default">
                                  <td className="px-10 py-6">
                                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{worker.name}</p>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{worker.sales} Transactions</p>
                                  </td>
                                  <td className="px-6 py-6 text-right whitespace-nowrap text-sm font-black text-emerald-600 dark:text-emerald-400">€{worker.generated.toLocaleString()}</td>
                                  <td className="px-6 py-6 text-right whitespace-nowrap text-sm font-bold text-slate-400">€{worker.cost.toLocaleString()}</td>
                                  <td className="px-10 py-6 text-right whitespace-nowrap">
                                      <span className="inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black bg-slate-900 dark:bg-phoenix-red text-white shadow-lg italic">{worker.roi}</span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
              <div className="p-10 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-center">
                  <button 
                    onClick={handleGenerateEfficiencyReport}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-phoenix-red hover:text-phoenix-orange transition-all flex items-center gap-3 mx-auto italic focus:outline-none"
                  >
                      Generate Efficiency Report <ArrowRight className="w-4 h-4" />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
