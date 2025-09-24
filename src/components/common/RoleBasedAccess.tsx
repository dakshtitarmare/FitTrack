import React from 'react'
import { useRole } from '@/contexts/RoleContext'
import { hasPermission } from '@/lib/rolePermissions'
import { UserRole } from '@/contexts/RoleContext'

interface RoleBasedAccessProps {
  children: React.ReactNode
  permission: string
  fallback?: React.ReactNode
  roles?: UserRole[]
}

export const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ 
  children, 
  permission, 
  fallback = null,
  roles 
}) => {
  const { selectedRole } = useRole()

  if (!selectedRole) {
    return <>{fallback}</>
  }

  // If specific roles are provided, check if current role is in the list
  if (roles && !roles.includes(selectedRole)) {
    return <>{fallback}</>
  }

  // Check permission for the current role
  if (!hasPermission(selectedRole, permission as any)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Convenience components for common permissions
export const CanViewAnalytics: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canViewAnalytics" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)

export const CanManageVendors: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canManageVendors" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)

export const CanGenerateQR: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canGenerateQR" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)

export const CanViewReports: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canViewReports" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)

export const CanManageUsers: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canManageUsers" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)

export const CanIntegrateTMS: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canIntegrateTMS" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)

export const CanSubmitDeliveryReport: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback }) => (
  <RoleBasedAccess permission="canSubmitDeliveryReport" fallback={fallback}>
    {children}
  </RoleBasedAccess>
)
