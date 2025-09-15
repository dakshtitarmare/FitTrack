// import { createClient } from '@supabase/supabase-js'

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
// // Use a valid-looking placeholder to avoid runtime crash until Supabase is connected
// const FALLBACK_URL = 'https://aaaaaaaaaaaaaaaaaaaa.supabase.co'
// const supabaseUrl = SUPABASE_URL && /^https?:\/\/[a-z0-9-]{20,}\.supabase\.co/i.test(SUPABASE_URL) ? SUPABASE_URL : FALLBACK_URL
// const supabaseAnonKey = SUPABASE_ANON_KEY || 'placeholder-key'
// if (supabaseUrl === FALLBACK_URL) {
//   console.warn('Supabase not configured. Connect Supabase and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
// }
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// export type UserRole = 
//   | 'key_man' 
//   | 'je_se' 
//   | 'sse_pwi' 
//   | 'tms_operator' 
//   | 'udm_manager' 
//   | 'vendor_contractor' 
//   | 'admin'

// export const roleLabels: Record<UserRole, string> = {
//   key_man: 'Key Man/Mate',
//   je_se: 'JE/SE (Junior/Section Engineer)',
//   sse_pwi: 'SSE/PWI (Senior Section Engineer/Permanent Way Inspector)',
//   tms_operator: 'TMS Operator',
//   udm_manager: 'UDM/Division Manager',
//   vendor_contractor: 'Vendor/Contractor',
//   admin: 'System Administrator'
// }

// export const roleDescriptions: Record<UserRole, string> = {
//   key_man: 'Verify and approve trackman reports, assign tasks and escalate issues',
//   je_se: 'Manage schedules, verify acceleration, raise vendor requests',
//   sse_pwi: 'High-level approvals, safety checks, view dashboard, authorize replacements',
//   tms_operator: 'Implement/export to TMS, validate track installation, generate MIS',
//   udm_manager: 'Full monitoring, vendor approval, policy decisions, view analytics',
//   vendor_contractor: 'Generate QR codes, upload deliveries, receive purchase orders, manage inventory',
//   admin: 'User and system management, security policies, audit logs, system configuration'
// }

