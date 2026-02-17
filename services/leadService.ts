
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Lead, LeadFormData, Priority, Task } from '../types';

const calculateScore = (lead: Partial<Lead>): { score: number; priority: Priority } => {
  let score = 50; 
  if (lead.source === 'LinkedIn' || lead.source === 'Moovijob') score += 20;
  if (lead.source === 'Referral') score += 30;
  if (lead.postAppliedFor === 'Team Leader') score += 15;
  if (lead.postAppliedFor === 'Sales Manager') score += 10;
  
  // If AI score is provided, blend it with the heuristic score
  if (lead.aiScore !== undefined) {
    score = (score * 0.4) + (lead.aiScore * 0.6);
  }

  score = Math.min(100, Math.max(0, score));
  let priority: Priority = 'Low';
  if (score >= 80) priority = 'High';
  else if (score >= 60) priority = 'Medium';
  return { score, priority };
};

let MOCK_LEADS: Lead[] = [
  {
    id: '1',
    fullName: 'Alexandre Dubois',
    email: 'a.dubois@example.lu',
    phone: '+352 691 123 456',
    postAppliedFor: 'Team Leader',
    bio: '4 years of experience in Door-to-Door sales.',
    source: 'Moovijob',
    status: 'Interviewing',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    priority: 'High',
    score: 85,
    tasks: [{ id: 't1', text: 'Check reference letters', isCompleted: false, createdAt: new Date().toISOString() }],
    nextFollowUp: new Date(Date.now() + 86400000).toISOString(),
    aiSummary: "Experienced sales professional with a strong track record in door-to-door environments. Highly suitable for team leadership due to longevity in field marketing.",
    aiScore: 88
  },
  {
    id: '2',
    fullName: 'Sarah Wagner',
    email: 's.wagner@example.de',
    phone: '+49 151 987 6543',
    postAppliedFor: 'Promoter / Brand Ambassador',
    bio: 'University student looking for summer work.',
    source: 'LinkedIn',
    status: 'Lead',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    priority: 'Medium',
    score: 72,
    tasks: [] as Task[],
    aiSummary: "Entry-level candidate with high academic achievement. Demonstrates potential for ambassador roles, though lacking direct sales experience.",
    aiScore: 65
  }
];

export const submitLead = async (formData: LeadFormData): Promise<{ success: boolean; error?: string }> => {
  const { score, priority } = calculateScore(formData);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            post_applied_for: formData.postAppliedFor,
            bio: formData.bio,
            source: formData.source || 'Web Form',
            status: 'Lead',
            score,
            priority,
            tasks: [],
            cv_base64: formData.cvBase64,
            cv_file_name: formData.cvFileName,
            ai_summary: formData.aiSummary,
            ai_score: formData.aiScore
          },
        ]);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn("Supabase submission failed, falling back to local mock:", err);
      // Fall through to mock logic
    }
  } 

  // Mock Logic
  await new Promise(resolve => setTimeout(resolve, 800));
  const now = new Date().toISOString();
  MOCK_LEADS.unshift({
      id: Math.random().toString(36).substring(2, 11),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      postAppliedFor: formData.postAppliedFor,
      bio: formData.bio,
      source: formData.source || 'Web Form',
      status: 'Lead',
      createdAt: now,
      updatedAt: now,
      score,
      priority,
      tasks: [] as Task[],
      cvBase64: formData.cvBase64,
      cvFileName: formData.cvFileName,
      aiSummary: formData.aiSummary,
      aiScore: formData.aiScore
  });
  return { success: true };
};

export const updateLead = async (id: string, updates: Partial<Lead>): Promise<{ success: boolean; error?: string }> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      // Map frontend camelCase to DB snake_case for updates
      const dbUpdates: any = {};
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.priority) dbUpdates.priority = updates.priority;
      if (updates.score !== undefined) dbUpdates.score = updates.score;
      if (updates.fullName) dbUpdates.full_name = updates.fullName;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.postAppliedFor) dbUpdates.post_applied_for = updates.postAppliedFor;
      if (updates.bio) dbUpdates.bio = updates.bio;
      if (updates.source) dbUpdates.source = updates.source;
      
      const { error } = await supabase.from('leads').update(dbUpdates).eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn("Supabase update failed, falling back to local mock:", err);
    }
  }
  
  // Mock Logic
  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_LEADS = MOCK_LEADS.map(lead => 
    lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead
  );
  return { success: true };
};

export const deleteLead = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        console.warn("Supabase delete failed, falling back to local mock:", err);
      }
  }
  
  // Mock Logic
  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_LEADS = MOCK_LEADS.filter(lead => lead.id !== id);
  return { success: true };
};

export const fetchLeads = async (): Promise<{ data: Lead[]; error?: string }> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      
      const mappedData = data?.map((item: any) => ({
        id: item.id,
        fullName: item.full_name,
        email: item.email,
        phone: item.phone,
        postAppliedFor: item.post_applied_for,
        bio: item.bio,
        source: item.source,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at || item.created_at,
        priority: item.priority,
        score: item.score,
        tasks: item.tasks || [],
        cvBase64: item.cv_base64,
        cvFileName: item.cv_file_name,
        aiSummary: item.ai_summary,
        aiScore: item.ai_score
      })) as Lead[];
      
      return { data: mappedData || [] };
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local mock:", err);
    }
  }
  
  // Mock Logic
  await new Promise(resolve => setTimeout(resolve, 400));
  return { data: [...MOCK_LEADS] }; 
};
