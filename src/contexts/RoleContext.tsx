import React, { createContext, useContext, useEffect, useState } from 'react'

export type UserRole = 
  | 'depot_supervisor' 
  | 'je_se' 
  | 'sse_pwi' 
  | 'tms_operator' 
  | 'udm_manager' 
  | 'vendor' 
  | 'admin'

export const roleLabels: Record<UserRole, string> = {
  depot_supervisor: 'Depot Supervisor',
  je_se: 'JE/SE (Junior/Section Engineer)',
  sse_pwi: 'SSE/PWI (Senior Section Engineer/Permanent Way Inspector)',
  tms_operator: 'TMS Operator',
  udm_manager: 'UDM/Division Manager',
  vendor: 'Vendor/Contractor',
  admin: 'System Administrator'
}

export const roleDescriptions: Record<UserRole, string> = {
  depot_supervisor: 'Generate QR codes for deliveries, manage inventory, track daily statistics, supervise depot operations',
  je_se: 'Manage inspection schedules, cross-check task completion, analyze field data, communicate with vendors',
  sse_pwi: 'Monitor safety compliance, approve escalated issues, plan preventive maintenance, high-level approvals',
  tms_operator: 'Integrate field data into TMS, sync QR scan info with official records, generate MIS reports',
  udm_manager: 'High-level monitoring, vendor contract approval, policy decisions, comprehensive analytics access',
  vendor: 'Submit delivery reports, upload delivery proofs, track payment status, manage own inventory',
  admin: 'Manage all users & roles, system configuration, cybersecurity compliance, full audit trail access'
}

export const dummyUsers: Record<UserRole, { name: string; email: string }> = {
  depot_supervisor: { name: 'Rajesh Kumar', email: 'rajesh.kumar@railway.demo' },
  je_se: { name: 'Priya Sharma', email: 'priya.sharma@railway.demo' },
  sse_pwi: { name: 'Amit Singh', email: 'amit.singh@railway.demo' },
  tms_operator: { name: 'Sneha Patel', email: 'sneha.patel@railway.demo' },
  udm_manager: { name: 'Vikram Reddy', email: 'vikram.reddy@railway.demo' },
  vendor: { name: 'Sunil Gupta', email: 'sunil.gupta@railway.demo' },
  admin: { name: 'Admin User', email: 'admin@railway.demo' }
}

interface RoleContextType {
  selectedRole: UserRole | null
  currentUser: { name: string; email: string } | null
  loading: boolean
  selectRole: (role: UserRole) => void
  clearRole: () => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const useRole = () => {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load role from localStorage on app start
    const savedRole = localStorage.getItem('demo_role') as UserRole | null
    if (savedRole && Object.keys(roleLabels).includes(savedRole)) {
      setSelectedRole(savedRole)
      setCurrentUser(dummyUsers[savedRole])
    }
    setLoading(false)
  }, [])

  const selectRole = (role: UserRole) => {
    setSelectedRole(role)
    setCurrentUser(dummyUsers[role])
    localStorage.setItem('demo_role', role)
  }

  const clearRole = () => {
    setSelectedRole(null)
    setCurrentUser(null)
    localStorage.removeItem('demo_role')
  }

  const value = {
    selectedRole,
    currentUser,
    loading,
    selectRole,
    clearRole,
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}
