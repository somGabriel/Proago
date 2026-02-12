
import React, { useEffect, useState, useRef } from 'react';
import { Lead, LeadStatus, LeadFormData, Priority, Task, Language } from '../types';
import { fetchLeads, updateLead, deleteLead, submitLead } from '../services/leadService';
import { 
    Loader2, AlertCircle, Filter, Search, Clock, ArrowUpDown, Pencil, Check, X, 
    Briefcase, UserCheck, GraduationCap, Users, XCircle, Trash2, Plus, Calendar, 
    LayoutGrid, List as ListIcon, BarChart3, CheckSquare, Square, FileText, Send, Mail, MessageSquare,
    Phone, GripVertical, Copy, ExternalLink, TrendingUp, ChevronRight, Sparkles, BrainCircuit
} from 'lucide-react';
import { useTranslation } from '../services/translations';

type SortConfig = {
    key: 'createdAt' | 'status' | 'score';
    direction: 'asc' | 'desc';
} | null;

type DashboardView = 'PIPELINE_LIST' | 'PIPELINE_BOARD' | 'PLANNING' | 'METRICS';

interface DashboardProps {
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const t = useTranslation(language);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState<DashboardView>('PIPELINE_BOARD');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  
  // Drag and Drop State
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dropTargetStatus, setDropTargetStatus] = useState<LeadStatus | null>(null);
  const dragCounter = useRef<Record<string, number>>({});

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const { data } = await fetchLeads();
    setLeads(data);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      const result = await updateLead(id, { status: newStatus });
      if (!result.success) loadLeads();
  };

  const handleBatchDelete = async () => {
      if (!window.confirm(`Delete ${selectedLeads.size} leads?`)) return;
      const idsToDelete = Array.from(selectedLeads) as string[];
      setLeads(prev => prev.filter(l => !selectedLeads.has(l.id)));
      setSelectedLeads(new Set());
      for (const id of idsToDelete) await deleteLead(id);
  };

  const handleBatchStatus = async (status: LeadStatus) => {
      const ids = Array.from(selectedLeads) as string[];
      setLeads(prev => prev.map(l => selectedLeads.has(l.id) ? { ...l, status } : l));
      setSelectedLeads(new Set());
      for (const id of ids) await updateLead(id, { status });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingLead) return;
      setLeads(prev => prev.map(l => l.id === editingLead.id ? editingLead : l));
      setIsEditModalOpen(false);
      await updateLead(editingLead.id, editingLead);
      setEditingLead(null);
  };

  const addTask = () => {
      if (!editingLead || !newTaskText.trim()) return;
      const newTask: Task = { id: Date.now().toString(), text: newTaskText, isCompleted: false, createdAt: new Date().toISOString() };
      setEditingLead({ ...editingLead, tasks: [newTask, ...editingLead.tasks] });
      setNewTaskText('');
  };

  const toggleTask = (taskId: string) => {
      if (!editingLead) return;
      setEditingLead({ ...editingLead, tasks: editingLead.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t) });
  };

  const removeTask = (taskId: string) => {
      if (!editingLead) return;
      setEditingLead({ ...editingLead, tasks: editingLead.tasks.filter(t => t.id !== taskId) });
  };

  const viewCV = (lead: Lead) => {
      if (!lead.cvBase64) return;
      const win = window.open();
      if (win) {
          win.document.write(`<iframe src="${lead.cvBase64}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      }
  };

  const sendPersonalizedEmail = (lead: Lead) => {
      const subject = encodeURIComponent(`Regarding your application for ${lead.postAppliedFor} at ProAgo`);
      const body = encodeURIComponent(`Hi ${lead.fullName},\n\nThis is the recruitment team from ProAgo World. We were impressed by your profile submitted via ${lead.source}.\n\nBest regards,\nProAgo Recruitment`);
      window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  const sendPersonalizedSMS = (lead: Lead) => {
      const body = encodeURIComponent(`Hi ${lead.fullName}, this is ProAgo World. We loved your application for ${lead.postAppliedFor}! Would you be free for a quick call today?`);
      window.location.href = `sms:${lead.phone}?body=${body}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const filteredLeads = React.useMemo(() => {
    let result = [...leads];
    if (filter) {
        const lower = filter.toLowerCase();
        result = result.filter(l => l.fullName.toLowerCase().includes(lower) || l.email.toLowerCase().includes(lower) || l.postAppliedFor.toLowerCase().includes(lower));
    }
    result.sort((a, b) => {
        if (a.priority === 'High' && b.priority !== 'High') return -1;
        if (a.priority !== 'High' && b.priority === 'High') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return result;
  }, [leads, filter]);

  const PriorityBadge = ({ priority }: { priority: Priority }) => {
      const colors = { 'High': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800', 'Medium': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800', 'Low': 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700' };
      return <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[priority]}`}>{priority}</span>;
  };

  const ScoreBadge = ({ score, aiScore }: { score: number, aiScore?: number }) => {
      const color = score >= 80 ? 'text-green-600 dark:text-green-400 font-bold' : score >= 50 ? 'text-yellow-600 dark:text-yellow-400 font-medium' : 'text-slate-600 dark:text-slate-400';
      return (
        <div className="flex flex-col">
          <div className={`text-xs ${color}`}>Overall: {Math.round(score)}</div>
          {aiScore !== undefined && (
            <div className="flex items-center gap-1 text-[9px] text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-widest">
              <Sparkles className="w-2.5 h-2.5" /> AI: {aiScore}
            </div>
          )}
        </div>
      );
  };

  const KanbanColumn = ({ status, title, icon: Icon }: { status: LeadStatus, title: string, icon: any }) => {
      const columnLeads = filteredLeads.filter(l => l.status === status);
      const isOver = dropTargetStatus === status;

      return (
          <div 
            className={`flex-1 min-w-[320px] rounded-2xl flex flex-col h-full max-h-full border-2 transition-all duration-300 ease-out ${
              isOver 
                ? 'bg-indigo-50/80 dark:bg-indigo-900/10 border-indigo-400 shadow-lg scale-[1.02] ring-4 ring-indigo-500/10' 
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
            }`} 
            onDragEnter={(e) => {
              e.preventDefault();
              dragCounter.current[status] = (dragCounter.current[status] || 0) + 1;
              setDropTargetStatus(status);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              dragCounter.current[status] = (dragCounter.current[status] || 0) - 1;
              if (dragCounter.current[status] <= 0) {
                setDropTargetStatus(null);
                dragCounter.current[status] = 0;
              }
            }}
            onDrop={async (e) => {
              e.preventDefault();
              setDropTargetStatus(null);
              dragCounter.current[status] = 0;
              if (draggedLeadId) {
                await handleStatusChange(draggedLeadId, status);
                setDraggedLeadId(null);
              }
            }}
          >
              <div className={`p-4 border-b-2 flex justify-between items-center transition-colors duration-300 rounded-t-2xl ${
                isOver ? 'bg-white dark:bg-slate-800 border-indigo-400' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
              }`}>
                  <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 transition-colors ${isOver ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
                      <h3 className={`font-black text-sm uppercase tracking-widest italic ${isOver ? 'text-indigo-900 dark:text-indigo-50' : 'text-slate-700 dark:text-slate-300'}`}>{title}</h3>
                  </div>
                  <span className={`transition-all duration-300 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
                    isOver ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {columnLeads.length}
                  </span>
              </div>
              
              <div className="p-3 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                  {columnLeads.map(lead => (
                      <div 
                        key={lead.id} 
                        draggable 
                        onDragStart={(e) => {
                          setDraggedLeadId(lead.id);
                          e.dataTransfer.effectAllowed = 'move';
                          e.dataTransfer.setData('text/plain', lead.id);
                          setTimeout(() => {
                            if (e.target instanceof HTMLElement) {
                                e.target.classList.add('opacity-30');
                                e.target.classList.add('scale-95');
                            }
                          }, 0);
                        }}
                        onDragEnd={(e) => {
                          if (e.target instanceof HTMLElement) {
                            e.target.classList.remove('opacity-30');
                            e.target.classList.remove('scale-95');
                          }
                          setDraggedLeadId(null);
                          setDropTargetStatus(null);
                        }}
                        className={`bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border-2 border-slate-100 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:shadow-xl transition-all duration-200 group relative ${
                          draggedLeadId === lead.id ? 'z-0 border-indigo-200' : 'hover:border-indigo-100 dark:hover:border-indigo-900 z-10'
                        } ${draggedLeadId && draggedLeadId !== lead.id ? 'pointer-events-none' : ''}`} 
                        onClick={() => { 
                          if (!draggedLeadId) {
                            setEditingLead(lead); 
                            setIsEditModalOpen(true); 
                          }
                        }}
                      >
                          <div className="flex justify-between items-start mb-3">
                              <div className="flex flex-col">
                                <h4 className="font-black text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight italic">{lead.fullName}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{lead.postAppliedFor}</p>
                              </div>
                              <PriorityBadge priority={lead.priority} />
                          </div>
                          
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-4 uppercase">
                            <div className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-300 dark:text-slate-600" /> <span className="truncate max-w-[100px]">{lead.email.split('@')[0]}</span></div>
                            <div className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-300 dark:text-slate-600" /> <span>...{lead.phone.slice(-4)}</span></div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-slate-700/50">
                              <div className="flex gap-4 items-center">
                                <ScoreBadge score={lead.score} aiScore={lead.aiScore} />
                                {lead.cvBase64 && <span title="CV Attached"><FileText className="w-3.5 h-3.5 text-indigo-400" /></span>}
                              </div>
                              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase"><Clock className="w-3 h-3 mr-1" />{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                          </div>
                      </div>
                  ))}
                  
                  {isOver && (
                    <div className="border-2 border-dashed border-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl h-32 animate-pulse flex items-center justify-center text-indigo-400 text-xs font-black uppercase tracking-widest">
                      Drop Here
                    </div>
                  )}
              </div>
          </div>
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4rem)] flex flex-col overflow-hidden animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 shrink-0 gap-4">
        <div><h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">{t.dashboard.title}</h1><p className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-widest">{t.dashboard.subtitle}</p></div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-1 rounded-2xl shadow-sm self-start md:self-auto">
             <button onClick={() => setViewMode('PIPELINE_BOARD')} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest ${viewMode === 'PIPELINE_BOARD' ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><LayoutGrid className="w-4 h-4" /> {t.dashboard.board}</button>
             <button onClick={() => setViewMode('PIPELINE_LIST')} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest ${viewMode === 'PIPELINE_LIST' ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><ListIcon className="w-4 h-4" /> {t.dashboard.list}</button>
        </div>
      </div>

      {(viewMode === 'PIPELINE_LIST' || viewMode === 'PIPELINE_BOARD') && (
         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 shrink-0 gap-4">
            <div className="w-full sm:max-w-xs relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"><Search className="h-4 w-4 text-slate-400" /></div>
                <input type="text" className="block w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 pl-11 focus:border-indigo-500 focus:ring-0 sm:text-sm py-3 border bg-white dark:bg-slate-900 dark:text-white transition-all font-medium" placeholder={t.dashboard.search} value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto ml-auto inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] active:scale-95"><Plus className="h-5 w-5 mr-2" /> {t.dashboard.register}</button>
         </div>
      )}

      {viewMode === 'PIPELINE_BOARD' && (
          <div className="flex-1 overflow-x-auto overflow-y-hidden pb-6 custom-scrollbar">
            <div className="flex h-full gap-6 min-w-[1600px] px-1 py-1">
              <KanbanColumn status="Lead" title={t.dashboard.stages.lead} icon={Briefcase} />
              <KanbanColumn status="Interviewing" title={t.dashboard.stages.interviewing} icon={UserCheck} />
              <KanbanColumn status="Formation" title={t.dashboard.stages.formation} icon={GraduationCap} />
              <KanbanColumn status="Recruiter" title={t.dashboard.stages.recruiter} icon={Users} />
              <KanbanColumn status="Rejected" title={t.dashboard.stages.rejected} icon={XCircle} />
            </div>
          </div>
      )}

      {isEditModalOpen && editingLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col scale-in border-2 border-white/20">
                  <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-3xl bg-slate-900 dark:bg-slate-700 flex items-center justify-center text-white text-3xl font-black italic shadow-2xl transform -rotate-3">{editingLead.fullName.charAt(0)}</div>
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">{editingLead.fullName}</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">ID: #{editingLead.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                    <button onClick={() => setIsEditModalOpen(false)} className="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-slate-700 group"><X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-all" /></button>
                  </div>
                  
                  <div className="p-10 overflow-y-auto space-y-12 custom-scrollbar dark:bg-slate-900">
                      {editingLead.aiSummary && (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800 rounded-[32px] p-8 shadow-inner relative overflow-hidden">
                           <div className="absolute top-2 right-4 flex items-center gap-1.5 opacity-50">
                              <BrainCircuit className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Gemini AI Insights</span>
                           </div>
                           <div className="flex flex-col md:flex-row gap-8 items-start">
                              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[120px] border border-indigo-50 dark:border-indigo-900/50">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Suitability</span>
                                 <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 italic leading-none">{editingLead.aiScore}%</span>
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-100 uppercase tracking-widest mb-2 flex items-center gap-2">
                                   <Sparkles className="w-4 h-4 text-indigo-400" /> {t.dashboard.profile.insights}
                                 </h4>
                                 <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200 leading-relaxed italic">"{editingLead.aiSummary}"</p>
                              </div>
                           </div>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row gap-6 p-8 bg-indigo-900 dark:bg-indigo-950 rounded-[32px] items-center justify-between text-white shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                          <div className="flex gap-10 items-center relative z-10">
                            <div className="text-center group">
                              <span className="block text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">{t.dashboard.profile.score}</span>
                              <span className="text-5xl font-black text-white tracking-tighter transition-transform block italic">{Math.round(editingLead.score)}</span>
                            </div>
                            <div className="h-16 w-px bg-white/10"></div>
                            <div className="text-center">
                              <span className="block text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">{t.dashboard.profile.quality}</span>
                              <div className="mt-1"><PriorityBadge priority={editingLead.priority} /></div>
                            </div>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center mb-8 border-l-4 border-indigo-600 pl-4">{t.dashboard.profile.channels}</h3>
                            <div className="space-y-4">
                                <div className="group relative bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-all">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</span>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm font-black text-slate-800 dark:text-slate-200 break-all">{editingLead.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                  </div>
                  <div className="p-10 border-t-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-6 shrink-0">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">{t.dashboard.profile.discard}</button>
                    <button type="button" onClick={handleEditSubmit} className="px-12 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 dark:bg-indigo-600 rounded-[20px] hover:bg-slate-800 shadow-2xl transition-all italic">{t.dashboard.profile.finalize}</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Dashboard;
