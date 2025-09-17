# Role-Based Functionality Breakdown

## Overview
The FitTrack now implements comprehensive role-based access control aligned with the web-based railway management hierarchy. Each role has specific permissions and access to different features based on their responsibilities.

## Web-Based Roles & Their Functionality

### 1. Key Man/Mate (Immediate Supervisor of Trackmen)
**Demo User:** Rajesh Kumar  
**Platform:** Web Portal (Limited Access)

**Permissions:**
- ✅ View Dashboard & KPIs
- ✅ View Parts (Read-only)
- ✅ View QR Codes (Read-only)
- ✅ View Inspections & Approve/Reject trackmen work
- ✅ View Maintenance (Read-only)
- ✅ View Reports (Read-only)
- ✅ View Safety & Alerts
- ✅ View Inventory (Read-only)
- ❌ Cannot edit parts, generate QR codes, or manage vendors

**Key Features:**
- Supervise trackmen activities
- Verify and approve QR scan entries from field workers
- Escalate issues to higher authority
- View safety compliance status

---

### 2. JE/SE (Junior/Section Engineer)
**Demo User:** Priya Sharma  
**Platform:** Web Portal

**Permissions:**
- ✅ Full Dashboard access
- ✅ View & Edit Parts
- ✅ Add New Parts
- ✅ Generate QR Codes
- ✅ View & Edit QR Codes
- ✅ View Vendors & Analytics
- ✅ Schedule & Approve Inspections
- ✅ Schedule Maintenance
- ✅ Generate Reports & Export Data
- ✅ Manage Safety & Alerts
- ✅ Manage Inventory

**Key Features:**
- Manage inspection schedules
- Cross-check task completion
- Analyze field data from QR scans
- Communicate with vendors for replacements
- Generate comprehensive reports

---

### 3. SSE/PWI (Senior Section Engineer/Permanent Way Inspector)
**Demo User:** Amit Singh  
**Platform:** Web Portal (Full Access)

**Permissions:**
- ✅ All JE/SE permissions PLUS:
- ✅ Delete Parts
- ✅ Manage Vendors & Approve Vendors
- ✅ View MIS Reports
- ✅ View Audit Logs
- ❌ Cannot manage users or system config

**Key Features:**
- Monitor safety compliance across zones
- Approve escalated issues from lower levels
- Plan preventive maintenance
- High-level approvals for replacements
- Access to comprehensive analytics

---

### 4. TMS Operator
**Demo User:** Sneha Patel  
**Platform:** Web Portal (TMS Integration Focus)

**Permissions:**
- ✅ View Dashboard & Analytics
- ✅ View Parts (Read-only)
- ✅ View QR Codes (Read-only)
- ✅ View Vendors & Analytics
- ✅ View Inspections (Read-only)
- ✅ Generate Reports & Export Data
- ✅ View MIS Reports
- ✅ View Audit Logs
- ✅ **TMS Integration & Data Sync**
- ✅ **Validate Track Installation**
- ❌ Cannot edit parts or manage vendors

**Key Features:**
- Integrate collected field data into TMS
- Sync QR scan information with official records
- Generate MIS reports for higher authorities
- Validate track installation compliance
- Data synchronization between systems

---

### 5. UDM/Division Manager
**Demo User:** Vikram Reddy  
**Platform:** Web Portal (Admin Access)

**Permissions:**
- ✅ **ALL PERMISSIONS** - Full system access
- ✅ Manage Users
- ✅ View Audit Logs
- ✅ Manage System Configuration
- ✅ TMS Integration
- ✅ Vendor Contract Approval
- ✅ Policy Decisions

**Key Features:**
- High-level monitoring of track health & worker activities
- View comprehensive dashboards & AI-predicted risks
- Approve vendor contracts and escalations
- Ensure compliance with railway safety guidelines
- Full system administration capabilities

---

### 6. Vendor/Contractor
**Demo User:** Sunil Gupta  
**Platform:** Web Portal (Vendor Portal)

**Permissions:**
- ✅ View Dashboard (Limited)
- ✅ View Parts (Own parts only)
- ✅ Add Parts (Own parts only)
- ✅ Generate QR Codes (For own parts)
- ✅ View QR Codes
- ✅ View Reports (Own data only)
- ✅ Export Data (Own data only)
- ✅ Manage Own Inventory
- ❌ Cannot view other vendors, manage inspections, or access analytics

**Key Features:**
- Generate QR codes for their parts
- Upload delivery proofs and work completion documents
- Track payment status
- Manage their own inventory
- View assigned work orders

---

### 7. Admin (Railway IT/Ministry Authority)
**Demo User:** Admin User  
**Platform:** Web Portal (Super Admin Access)

**Permissions:**
- ✅ **ABSOLUTE FULL ACCESS** - All system permissions
- ✅ Manage all users & roles
- ✅ Control system configurations
- ✅ Ensure cybersecurity compliance
- ✅ Access full system logs & audit trails
- ✅ All TMS integration capabilities

**Key Features:**
- Complete system administration
- User and role management
- Security policy enforcement
- System configuration control
- Full audit trail access

---

## Feature Access Matrix

| Feature | Key Man | JE/SE | SSE/PWI | TMS Op | UDM | Vendor | Admin |
|---------|---------|-------|---------|--------|-----|--------|-------|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Analytics | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Parts Management | 👁️ | ✏️ | ✏️ | 👁️ | ✏️ | 👁️* | ✏️ |
| QR Generator | ❌ | ✅ | ✅ | ❌ | ✅ | ✅* | ✅ |
| Vendor Analytics | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| TMS Integration | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| User Management | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Reports | 👁️ | ✏️ | ✏️ | ✏️ | ✏️ | 👁️* | ✏️ |

**Legend:**
- ✅ Full Access
- 👁️ Read Only
- ✏️ Read/Write
- ❌ No Access
- * Limited to own data

## Navigation Menu by Role

### Key Man/Mate
- Dashboard
- Parts Management
- Inspections
- Safety
- Reports
- Alerts

### JE/SE
- Dashboard
- Parts Management
- QR Generator
- Inspections
- Analytics
- Vendors
- Inventory
- Maintenance
- Safety
- Reports
- Alerts
- Schedule

### SSE/PWI
- All JE/SE features PLUS:
- Full vendor management capabilities
- MIS reports access
- Audit logs

### TMS Operator
- Dashboard
- Parts Management
- Inspections
- Analytics
- Vendors
- Inventory
- Maintenance
- Safety
- Reports
- Alerts
- **TMS Integration Center**

### UDM/Division Manager
- **ALL NAVIGATION ITEMS**
- User Management
- System Configuration
- Full administrative access

### Vendor/Contractor
- Dashboard
- Parts Management (Own)
- QR Generator (Own)
- Reports (Own)
- Inventory (Own)

### Admin
- **COMPLETE SYSTEM ACCESS**
- All navigation items
- Administrative controls

## Implementation Details

### Role-Based Components
- `RoleBasedAccess` - Wrapper component for conditional rendering
- `CanViewAnalytics`, `CanManageVendors`, etc. - Convenience components
- Dynamic sidebar navigation based on role permissions
- Conditional button rendering in tables and forms

### Permission System
- Centralized permission definitions in `rolePermissions.ts`
- Granular control over 25+ different permissions
- Easy to extend and modify permissions
- Type-safe permission checking

### Demo Experience
- Each role has a realistic demo user with appropriate name
- Role descriptions match actual railway hierarchy
- Visual indicators show current role and permissions
- Easy role switching for demonstration purposes

This implementation provides a comprehensive, realistic demonstration of how different railway personnel would interact with the FitTrack based on their roles and responsibilities.
