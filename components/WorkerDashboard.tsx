
import React, { useState } from 'react';
import { 
  Award, Clock, DollarSign, TrendingUp, TrendingDown, Calendar, MapPin, Shield, 
  X, BarChart3, Star, Zap, CheckCircle2, Box, Info,
  Trophy, Target, ChevronUp, Flag, Users, Medal, LayoutDashboard,
  Briefcase, ArrowUpRight, History, ShoppingBag, Activity, Lock, Flame,
  Coffee, Heart, Crown, Check, ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../services/translations';

interface WorkerDashboardProps {
  language: Language;
}

interface DayData {
  day: string;
  fullDay: string;
  score: number;
  sales: number;
  hours: number;
  status: 'Excellent' | 'Good' | 'Average' | 'Low' | 'Rest';
  color: string;
  feedback: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isUnlocked: boolean;
  unlockedDate?: string;
  color: string;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ language }) => {
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<'performance' | 'ranking' | 'shifts'>('performance');
  const [activeModal, setActiveModal] = useState<'earnings' | 'achievements' | 'career' | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const achievements: Achievement[] = [
    { id: '1', title: 'Top Closer', description: 'Complete 100 sales in a single month.', icon: Trophy, isUnlocked: true, unlockedDate: 'Nov 12, 2024', color: 'bg-yellow-500' },
    { id: '2', title: 'Early Bird', description: 'Start your shift before 8:00 AM 5 times.', icon: Coffee, isUnlocked: true, unlockedDate: 'Oct 28, 2024', color: 'bg-orange-500' },
    { id: '3', title: 'Flash Seller', description: 'Make 3 sales in under one hour.', icon: Zap, isUnlocked: true, unlockedDate: 'Nov 05, 2024', color: 'bg-indigo-500' },
    { id: '4', title: 'Helping Hand', description: 'Mentor a new recruit during a shift.', icon: Heart, isUnlocked: true, unlockedDate: 'Nov 01, 2024', color: 'bg-rose-500' },
    { id: '5', title: 'Weekly Legend', description: 'Maintain an 90%+ score for 7 consecutive days.', icon: Flame, isUnlocked: false, color: 'bg-orange-600' },
    { id: '6', title: 'Market King', description: 'Lead the city leaderboard for two weeks.', icon: Crown, isUnlocked: false, color: 'bg-amber-500' },
    { id: '7', title: 'Iron Guard', description: 'Zero missed shifts for 3 months.', icon: Shield, isUnlocked: false, color: 'bg-blue-600' },
    { id: '8', title: 'Perfect Pitch', description: 'Get a 100% feedback score from a mystery shopper.', icon: Target, isUnlocked: false, color: 'bg-emerald-500' },
  ];

  const weeklyData: DayData[] = [
    { day: 'Mon', fullDay: 'Monday', score: 92, sales: 15, hours: 8.5, status: 'Excellent', color: 'bg-emerald-500', feedback: 'Outstanding start to the week. High conversion rate.' },
    { day: 'Tue', fullDay: 'Tuesday', score: 35, sales: 3, hours: 8.0, status: 'Low', color: 'bg-phoenix-red', feedback: 'Low energy detected. Sales pitch adherence was below 60%.' },
    { day: 'Wed', fullDay: 'Wednesday', score: 88, sales: 12, hours: 7.5, status: 'Excellent', color: 'bg-emerald-500', feedback: 'Great recovery! Territory coverage was perfect.' },
    { day: 'Thu', fullDay: 'Thursday', score: 95, sales: 18, hours: 9.0, status: 'Excellent', color: 'bg-emerald-500', feedback: 'Top performer of the day. Consistent energy levels.' },
    { day: 'Fri', fullDay: 'Friday', score: 60, sales: 8, hours: 6.0, status: 'Average', color: 'bg-amber-400', feedback: 'Solid effort, but left shift early.' },
    { day: 'Sat', fullDay: 'Saturday', score: 75, sales: 10, hours: 5.0, status: 'Good', color: 'bg-emerald-400', feedback: 'Good weekend hustle.' },
    { day: 'Sun', fullDay: 'Sunday', score: 0, sales: 0, hours: 0, status: 'Rest', color: 'bg-slate-200 dark:bg-slate-800', feedback: 'Rest Day.' },
  ];

  const stats = [
    { id: 'earnings', label: t.worker.earnings, value: '€2,450.00', icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'shifts', label: t.worker.shifts, value: '18', icon: Calendar, color: 'text-phoenix-red', bgColor: 'bg-phoenix-red/10' },
    { id: 'avg', label: t.worker.avg, value: '2.4', icon: Target, color: 'text-indigo-600', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'rank', label: t.worker.rank, value: 'Promoter', icon: Award, color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children?: React.ReactNode }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-phoenix-charcoal rounded-[40px] shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-white/10 scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-10 py-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{title}</h3>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition-all group">
            <X className="w-6 h-6 text-slate-400 group-hover:text-phoenix-red transition-all" />
          </button>
        </div>
        <div className="p-10 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Modals Rendering */}
      {activeModal === 'achievements' && (
        <Modal title="Mastery Badges" onClose={() => setActiveModal(null)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-6 rounded-[32px] border-2 transition-all flex items-start gap-4 ${
                  achievement.isUnlocked 
                    ? 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 grayscale-0' 
                    : 'bg-slate-100/50 dark:bg-white/5 border-dashed border-slate-200 dark:border-white/10 grayscale opacity-50'
                }`}
              >
                <div className={`p-4 rounded-2xl ${achievement.color} text-white shadow-xl`}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase italic text-sm tracking-tight">{achievement.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{achievement.description}</p>
                  {achievement.isUnlocked && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                      <Check className="w-3 h-3" /> Unlocked {achievement.unlockedDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === 'earnings' && (
        <Modal title="Earnings Intelligence" onClose={() => setActiveModal(null)}>
          <div className="space-y-8">
            <div className="bg-slate-900 p-8 rounded-[32px] text-white flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">Available for Withdrawal</span>
              <span className="text-6xl font-black italic tracking-tighter">€1,840.00</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Transactions</h4>
              {[
                { label: 'Weekly Commission (Nov 15)', value: '+ €850.00', status: 'Success' },
                { label: 'Performance Bonus (Oct)', value: '+ €400.00', status: 'Success' },
                { label: 'Travel Reimbursement', value: '+ €120.00', status: 'Pending' }
              ].map((tx, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{tx.label}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{tx.status}</p>
                  </div>
                  <span className="text-lg font-black text-emerald-600 italic">{tx.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {selectedDay && (
        <Modal title={`${selectedDay.fullDay} Analysis`} onClose={() => setSelectedDay(null)}>
          <div className="space-y-8">
            <div className={`p-8 rounded-[32px] flex flex-col items-center ${selectedDay.color} text-white shadow-2xl`}>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Efficiency Rating</span>
              <span className="text-6xl font-black italic tracking-tighter">{selectedDay.score}%</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Gross Sales</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white italic">{selectedDay.sales} Deals</span>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Shift Hours</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white italic">{selectedDay.hours}h</span>
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-white/5 p-8 rounded-[32px] border-l-4 border-slate-900 dark:border-phoenix-red">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2 italic">
                 <History className="w-4 h-4" /> Manager Feedback
               </h4>
               <p className="text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">"{selectedDay.feedback}"</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Main UI Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-phoenix-red/10 border border-phoenix-red/20 rounded-full">
             <Flame className="w-3.5 h-3.5 text-phoenix-red animate-fire" />
             <span className="text-[9px] font-black uppercase tracking-widest text-phoenix-red">Elite Tier Status</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">{t.worker.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">ID #111 • Active Duty</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl gap-1">
            <button onClick={() => setActiveTab('performance')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'performance' ? 'bg-white dark:bg-phoenix-red shadow-lg text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <LayoutDashboard className="w-4 h-4" /> {t.worker.performance}
            </button>
            <button onClick={() => setActiveTab('ranking')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ranking' ? 'bg-white dark:bg-phoenix-red shadow-lg text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <Medal className="w-4 h-4" /> {t.worker.ranking}
            </button>
            <button onClick={() => setActiveTab('shifts')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'shifts' ? 'bg-white dark:bg-phoenix-red shadow-lg text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <Briefcase className="w-4 h-4" /> {t.worker.shifts}
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => (
          <button 
            key={stat.id} 
            onClick={() => {
              if (stat.id === 'earnings') setActiveModal('earnings');
              if (stat.id === 'rank') setActiveModal('career');
            }}
            className="bg-white dark:bg-phoenix-charcoal p-8 rounded-[32px] border border-slate-200 dark:border-white/5 hover:border-phoenix-red/30 transition-all group shadow-xl relative overflow-hidden text-left focus:outline-none"
          >
             <div className="absolute top-0 right-0 w-24 h-24 bg-phoenix-red/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
             <div className="flex flex-col items-start gap-4 relative z-10">
               <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.color} shadow-sm group-hover:rotate-12 transition-transform`}>
                 <stat.icon className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 italic tracking-tighter uppercase">{stat.value}</p>
               </div>
             </div>
          </button>
        ))}
      </div>

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Graph Panel */}
           <div className="lg:col-span-2 bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 p-10 shadow-2xl relative">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 italic">
                  <TrendingUp className="w-5 h-5 text-phoenix-red" /> Performance Arc
                </h3>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">Last 7 Cycles</span>
              </div>
              
              <div className="h-72 flex items-end justify-between gap-4 sm:gap-8 relative">
                 <div className="absolute inset-x-0 top-0 h-px bg-slate-100 dark:bg-white/5"></div>
                 <div className="absolute inset-x-0 top-1/2 h-px bg-slate-100 dark:bg-white/5"></div>
                 <div className="absolute inset-x-0 bottom-0 h-px bg-slate-100 dark:bg-white/5"></div>
                 
                 {weeklyData.map((data, i) => (
                   <div 
                      key={i} 
                      onClick={() => setSelectedDay(data)}
                      className="flex-1 rounded-2xl relative group cursor-pointer transition-all duration-300 h-full flex flex-col justify-end" 
                   >
                     <div 
                        className={`w-full mx-auto rounded-t-2xl transition-all duration-700 ease-out relative ${data.color} shadow-[0_-5px_20px_rgba(255,42,42,0.1)] group-hover:brightness-110 group-hover:shadow-[0_0_30px_rgba(255,42,42,0.4)] ${data.score === 0 ? 'h-2 opacity-10' : ''}`} 
                        style={{ height: data.score === 0 ? '8px' : `${data.score}%` }}
                      >
                        <div className="absolute top-[-30px] inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] font-black text-white bg-slate-900 px-2 py-0.5 rounded-lg">{data.score}%</span>
                        </div>
                     </div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between mt-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] px-2">
                {weeklyData.map(d => <span key={d.day} className="flex-1 text-center">{d.day}</span>)}
              </div>
           </div>
           
           {/* Side Summary */}
           <div className="bg-slate-900 dark:bg-phoenix-black rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl border border-white/5">
             <div className="absolute top-0 right-0 w-64 h-64 bg-phoenix-red/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
             <div>
               <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6">
                 <Zap className="w-4 h-4 text-yellow-400 animate-pulse" /> Kinetic Drive
               </div>
               <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">5 Day <br /> Streak</h3>
               <p className="text-slate-400 text-xs mt-4 font-medium leading-relaxed uppercase tracking-wider">Unleash the phoenix within. Your current trajectory is 12% above team average.</p>
             </div>
             <div className="mt-12 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-2">
                    <span>Rank Progress</span>
                    <span>88%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-phoenix-red w-[88%] rounded-full shadow-[0_0_15px_rgba(255,42,42,0.5)]"></div>
                </div>
                <button 
                  onClick={() => setActiveModal('achievements')} 
                  className="w-full py-5 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-phoenix-orange hover:text-white transition-all mt-6 shadow-2xl italic flex items-center justify-center gap-2"
                >
                  Mastery Badges <ChevronRight className="w-4 h-4" />
                </button>
             </div>
           </div>
        </div>
      )}

      {activeTab === 'ranking' && (
        <div className="bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 p-10 shadow-2xl">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 italic mb-10">
            <Trophy className="w-5 h-5 text-amber-500" /> City Leaderboard
          </h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Marco V.', score: 98, status: 'Legend' },
              { rank: 2, name: 'You', score: 92, status: 'Elite' },
              { rank: 3, name: 'Sarah W.', score: 89, status: 'Expert' },
              { rank: 4, name: 'Jean-Pierre M.', score: 85, status: 'Pro' }
            ].map((user) => (
              <div key={user.rank} className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${user.name === 'You' ? 'bg-phoenix-red/5 border-phoenix-red shadow-lg' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5'}`}>
                <div className="flex items-center gap-6">
                  <span className={`text-2xl font-black italic ${user.rank === 1 ? 'text-amber-500' : 'text-slate-400'}`}>#{user.rank}</span>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{user.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.status} Tier</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right">
                     <p className="text-xs font-black text-slate-900 dark:text-white">{user.score}%</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase">Consistency</p>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white/5 flex items-center justify-center">
                     <ChevronUp className="w-5 h-5 text-emerald-500" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'shifts' && (
        <div className="bg-white dark:bg-phoenix-charcoal rounded-[40px] border border-slate-200 dark:border-white/5 p-10 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 italic">
              <Calendar className="w-5 h-5 text-phoenix-red" /> Operational Schedule
            </h3>
            <button className="text-[10px] font-black uppercase text-phoenix-red border border-phoenix-red/20 px-4 py-2 rounded-xl hover:bg-phoenix-red hover:text-white transition-all italic">Request Swap</button>
          </div>
          <div className="space-y-4">
             {[
               { date: 'Nov 18', time: '08:30 - 17:30', zone: 'Luxembourg City Centre', status: 'Confirmed' },
               { date: 'Nov 19', time: '09:00 - 18:00', zone: 'Esch-sur-Alzette', status: 'Pending' },
               { date: 'Nov 20', time: '10:00 - 19:00', zone: 'Kirchberg District', status: 'Confirmed' }
             ].map((shift, idx) => (
               <div key={idx} className="flex flex-col sm:flex-row justify-between items-center p-8 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-slate-100 dark:border-white/10 group hover:border-phoenix-red/30 transition-all">
                  <div className="flex items-center gap-8">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl text-center min-w-[80px]">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Date</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white uppercase italic">{shift.date}</p>
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{shift.zone}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase">{shift.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-0 flex items-center gap-6">
                     <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${shift.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                       {shift.status}
                     </span>
                     <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 hover:text-phoenix-red transition-all">
                        <MapPin className="w-5 h-5" />
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
