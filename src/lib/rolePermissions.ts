import { UserRole } from '@/contexts/RoleContext'

// Define permissions for each role
export interface RolePermissions {
  // Dashboard & Analytics
  canViewDashboard: boolean
  canViewAnalytics: boolean
  canViewKPIs: boolean
  
  // Parts Management
  canViewParts: boolean
  canEditParts: boolean
  canAddParts: boolean
  canDeleteParts: boolean
  
  // QR Code Management
  canGenerateQR: boolean
  canViewQR: boolean
  canEditQR: boolean
  
  // Vendor Management
  canViewVendors: boolean
  canManageVendors: boolean
  canApproveVendors: boolean
  canViewVendorAnalytics: boolean
  
  // Inspections & Maintenance
  canViewInspections: boolean
  canScheduleInspections: boolean
  canApproveInspections: boolean
  canViewMaintenance: boolean
  canScheduleMaintenance: boolean
  
  // Reports & MIS
  canViewReports: boolean
  canGenerateReports: boolean
  canExportData: boolean
  canViewMIS: boolean
  
  // Safety & Compliance
  canViewSafety: boolean
  canManageSafety: boolean
  canViewAlerts: boolean
  canManageAlerts: boolean
  
  // Inventory Management
  canViewInventory: boolean
  canManageInventory: boolean
  canTrackInventory: boolean
  
  // User Management (Admin only)
  canManageUsers: boolean
  canViewAuditLogs: boolean
  canManageSystemConfig: boolean
  
  // TMS Integration
  canIntegrateTMS: boolean
  canSyncData: boolean
  canValidateInstallation: boolean
  
  // Delivery Reports
  canSubmitDeliveryReport: boolean
}

// Role-based permissions mapping
export const rolePermissions: Record<UserRole, RolePermissions> = {
  // Depot Supervisor - Generate QR codes, manage inventory, track statistics
  depot_supervisor: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewKPIs: true,
    canViewParts: true,
    canEditParts: true,
    canAddParts: true,
    canDeleteParts: false,
    canGenerateQR: true,
    canViewQR: true,
    canEditQR: true,
    canViewVendors: true,
    canManageVendors: false,
    canApproveVendors: false,
    canViewVendorAnalytics: true,
    canViewInspections: true,
    canScheduleInspections: false,
    canApproveInspections: true,
    canViewMaintenance: true,
    canScheduleMaintenance: false,
    canViewReports: true,
    canGenerateReports: true,
    canExportData: true,
    canViewMIS: false,
    canViewSafety: true,
    canManageSafety: false,
    canViewAlerts: true,
    canManageAlerts: false,
    canViewInventory: true,
    canManageInventory: true,
    canTrackInventory: true,
    canManageUsers: false,
    canViewAuditLogs: false,
    canManageSystemConfig: false,
    canIntegrateTMS: false,
    canSyncData: false,
    canValidateInstallation: false,
    canSubmitDeliveryReport: false,
  },

  // JE/SE - Junior/Section Engineer
  je_se: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewKPIs: true,
    canViewParts: true,
    canEditParts: true,
    canAddParts: true,
    canDeleteParts: false,
    canGenerateQR: true,
    canViewQR: true,
    canEditQR: true,
    canViewVendors: true,
    canManageVendors: false,
    canApproveVendors: false,
    canViewVendorAnalytics: true,
    canViewInspections: true,
    canScheduleInspections: true,
    canApproveInspections: true,
    canViewMaintenance: true,
    canScheduleMaintenance: true,
    canViewReports: true,
    canGenerateReports: true,
    canExportData: true,
    canViewMIS: false,
    canViewSafety: true,
    canManageSafety: true,
    canViewAlerts: true,
    canManageAlerts: true,
    canViewInventory: true,
    canManageInventory: true,
    canTrackInventory: true,
    canManageUsers: false,
    canViewAuditLogs: false,
    canManageSystemConfig: false,
    canIntegrateTMS: false,
    canSyncData: false,
    canValidateInstallation: false,
    canSubmitDeliveryReport: false,
  },

  // SSE/PWI - Senior Section Engineer/Permanent Way Inspector
  sse_pwi: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewKPIs: true,
    canViewParts: true,
    canEditParts: true,
    canAddParts: true,
    canDeleteParts: true,
    canGenerateQR: true,
    canViewQR: true,
    canEditQR: true,
    canViewVendors: true,
    canManageVendors: true,
    canApproveVendors: true,
    canViewVendorAnalytics: true,
    canViewInspections: true,
    canScheduleInspections: true,
    canApproveInspections: true,
    canViewMaintenance: true,
    canScheduleMaintenance: true,
    canViewReports: true,
    canGenerateReports: true,
    canExportData: true,
    canViewMIS: true,
    canViewSafety: true,
    canManageSafety: true,
    canViewAlerts: true,
    canManageAlerts: true,
    canViewInventory: true,
    canManageInventory: true,
    canTrackInventory: true,
    canManageUsers: false,
    canViewAuditLogs: true,
    canManageSystemConfig: false,
    canIntegrateTMS: false,
    canSyncData: false,
    canValidateInstallation: false,
    canSubmitDeliveryReport: false,
  },

  // TMS Operator
  tms_operator: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewKPIs: true,
    canViewParts: true,
    canEditParts: false,
    canAddParts: false,
    canDeleteParts: false,
    canGenerateQR: false,
    canViewQR: true,
    canEditQR: false,
    canViewVendors: true,
    canManageVendors: false,
    canApproveVendors: false,
    canViewVendorAnalytics: true,
    canViewInspections: true,
    canScheduleInspections: false,
    canApproveInspections: false,
    canViewMaintenance: true,
    canScheduleMaintenance: false,
    canViewReports: true,
    canGenerateReports: true,
    canExportData: true,
    canViewMIS: true,
    canViewSafety: true,
    canManageSafety: false,
    canViewAlerts: true,
    canManageAlerts: false,
    canViewInventory: true,
    canManageInventory: false,
    canTrackInventory: true,
    canManageUsers: false,
    canViewAuditLogs: true,
    canManageSystemConfig: false,
    canIntegrateTMS: true,
    canSyncData: true,
    canValidateInstallation: true,
    canSubmitDeliveryReport: false,
  },

  // UDM/Division Manager
  udm_manager: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewKPIs: true,
    canViewParts: true,
    canEditParts: true,
    canAddParts: true,
    canDeleteParts: true,
    canGenerateQR: false,
    canViewQR: false,
    canEditQR: false,
    canViewVendors: true,
    canManageVendors: true,
    canApproveVendors: true,
    canViewVendorAnalytics: true,
    canViewInspections: true,
    canScheduleInspections: true,
    canApproveInspections: true,
    canViewMaintenance: true,
    canScheduleMaintenance: true,
    canViewReports: true,
    canGenerateReports: true,
    canExportData: true,
    canViewMIS: true,
    canViewSafety: true,
    canManageSafety: true,
    canViewAlerts: true,
    canManageAlerts: true,
    canViewInventory: true,
    canManageInventory: true,
    canTrackInventory: true,
    canManageUsers: true,
    canViewAuditLogs: true,
    canManageSystemConfig: true,
    canIntegrateTMS: true,
    canSyncData: true,
    canValidateInstallation: true,
    canSubmitDeliveryReport: false,
  },

  // Vendor/Contractor
  vendor: {
    canViewDashboard: true,
    canViewAnalytics: false,
    canViewKPIs: false,
    canViewParts: true,
    canEditParts: false,
    canAddParts: true, // Can add their own parts
    canDeleteParts: false,
    canGenerateQR: false, // Removed QR generation
    canViewQR: true,
    canEditQR: false,
    canViewVendors: false,
    canManageVendors: false,
    canApproveVendors: false,
    canViewVendorAnalytics: false,
    canViewInspections: false,
    canScheduleInspections: false,
    canApproveInspections: false,
    canViewMaintenance: false,
    canScheduleMaintenance: false,
    canViewReports: true,
    canGenerateReports: false,
    canExportData: true, // Can export their own data
    canViewMIS: false,
    canViewSafety: false,
    canManageSafety: false,
    canViewAlerts: false,
    canManageAlerts: false,
    canViewInventory: true, // Can view their own inventory
    canManageInventory: true, // Can manage their own inventory
    canTrackInventory: true,
    canManageUsers: false,
    canViewAuditLogs: false,
    canManageSystemConfig: false,
    canIntegrateTMS: false,
    canSyncData: false,
    canValidateInstallation: false,
    // New permission for delivery report submission
    canSubmitDeliveryReport: true,
  },

  // Admin - System Administrator
  admin: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewKPIs: true,
    canViewParts: true,
    canEditParts: true,
    canAddParts: true,
    canDeleteParts: true,
    canGenerateQR: true,
    canViewQR: true,
    canEditQR: true,
    canViewVendors: true,
    canManageVendors: true,
    canApproveVendors: true,
    canViewVendorAnalytics: true,
    canViewInspections: true,
    canScheduleInspections: true,
    canApproveInspections: true,
    canViewMaintenance: true,
    canScheduleMaintenance: true,
    canViewReports: true,
    canGenerateReports: true,
    canExportData: true,
    canViewMIS: true,
    canViewSafety: true,
    canManageSafety: true,
    canViewAlerts: true,
    canManageAlerts: true,
    canViewInventory: true,
    canManageInventory: true,
    canTrackInventory: true,
    canManageUsers: true,
    canViewAuditLogs: true,
    canManageSystemConfig: true,
    canIntegrateTMS: true,
    canSyncData: true,
    canValidateInstallation: true,
    canSubmitDeliveryReport: false,
  },
}

// Helper function to check if user has permission
export const hasPermission = (role: UserRole, permission: keyof RolePermissions): boolean => {
  return rolePermissions[role]?.[permission] || false
}

// Helper function to get all permissions for a role
export const getRolePermissions = (role: UserRole): RolePermissions => {
  return rolePermissions[role] || rolePermissions.admin
}

// Navigation items based on role permissions
export const getNavigationItems = (role: UserRole) => {
  const permissions = getRolePermissions(role)
  
  const allItems = [
    { name: "Dashboard", href: "#", icon: "Home", permission: "canViewDashboard" },
    { name: "Depot Dashboard", href: "#", icon: "Package", permission: "canGenerateQR" },
    { name: "Parts Management", href: "#", icon: "Package", permission: "canViewParts" },
    { name: "QR Generator", href: "#", icon: "QrCode", permission: "canGenerateQR" },
    { name: "Delivery Reports", href: "#", icon: "Truck", permission: "canSubmitDeliveryReport" },
    { name: "Inspections", href: "#", icon: "Search", permission: "canViewInspections" },
    { name: "Analytics", href: "#", icon: "BarChart3", permission: "canViewAnalytics" },
    { name: "Vendors", href: "#", icon: "Users", permission: "canViewVendors" },
    { name: "Inventory", href: "#", icon: "Truck", permission: "canViewInventory" },
    { name: "Maintenance", href: "#", icon: "Cog", permission: "canViewMaintenance" },
    { name: "Safety", href: "#", icon: "Shield", permission: "canViewSafety" },
    { name: "Reports", href: "#", icon: "Activity", permission: "canViewReports" },
    { name: "Alerts", href: "#", icon: "AlertTriangle", permission: "canViewAlerts" },
    { name: "Schedule", href: "#", icon: "Calendar", permission: "canScheduleInspections" },
    { name: "TMS Integration", href: "#", icon: "Train", permission: "canIntegrateTMS" },
  ]

  return allItems.filter(item => permissions[item.permission as keyof RolePermissions])
}

