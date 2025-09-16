import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Cog, 
  Package, 
  QrCode, 
  Search, 
  Shield, 
  Truck, 
  Users,
  Home,
  Activity,
  AlertTriangle,
  Calendar,
  Settings,
  LogOut,
  Train
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import { getNavigationItems } from "@/lib/rolePermissions";

// Icon mapping for dynamic navigation
const iconMap = {
  Home,
  Package,
  QrCode,
  Search,
  BarChart3,
  Users,
  Truck,
  Cog,
  Shield,
  Activity,
  AlertTriangle,
  Calendar,
};

// Name to section id mapping
const sectionIdMap: Record<string, string> = {
  "Dashboard": "hero",
  "Analytics": "analytics",
  "Vendors": "vendors",
  "Parts Management": "parts",
  "QR Generator": "qr",
  "Inspections": "activities",
  "Inventory": "inventory",
  "Maintenance": "maintenance",
  "Safety": "safety",
  "Reports": "reports",
  "Alerts": "alerts",
  "Schedule": "schedule",
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { selectedRole } = useRole();
  const navigation = selectedRole ? getNavigationItems(selectedRole).map(item => ({
    name: item.name,
    href: item.href,
    icon: iconMap[item.icon as keyof typeof iconMap] || Home,
    current: item.name === "Dashboard"
  })) : [];
  const [activeItem, setActiveItem] = useState("Dashboard");

  const onNavigate = (name: string) => {
    const id = sectionIdMap[name];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveItem(name);
  };

  return (
    <motion.div
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col bg-gradient-steel text-white h-screen shadow-strong overflow-hidden"
    >
      {/* Railway Track Animation */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-railway-orange to-railway-blue railway-pulse" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <motion.div
          initial={{ opacity: collapsed ? 0 : 1 }}
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Train className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">RailTrack</h1>
              <p className="text-xs text-white/70">AI Fitting System</p>
            </div>
          )}
        </motion.div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/20"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Cog className="w-4 h-4" />
          </motion.div>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = item.name === activeItem;
          return (
            <motion.button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-primary text-white shadow-railway"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="ml-3"
                >
                  {item.name}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 bg-white rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-white hover:bg-white/10 justify-start"
        >
          <Settings className="w-4 h-4" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-white hover:bg-white/10 justify-start mt-2"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>

      {/* Railway themed decoration */}
      <div className="absolute bottom-4 left-4 right-4 h-2 bg-gradient-to-r from-railway-orange/20 to-railway-blue/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/30 track-shimmer rounded-full" />
      </div>
    </motion.div>
  );
};