import { motion } from "framer-motion";
import { useRole } from "@/contexts/RoleContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { KPICards } from "@/components/dashboard/KPICards";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { PartsTable } from "@/components/parts/PartsTable";
import { VendorAnalytics } from "@/components/vendor/VendorAnalytics";
import { RoleBasedAccess, CanViewAnalytics, CanManageVendors, CanGenerateQR, CanIntegrateTMS } from "@/components/common/RoleBasedAccess";
import { Activity, TrendingUp, AlertCircle, Package, Train, LogOut, Shield, Users, BarChart3, QrCode, Cog } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roleLabels } from "@/contexts/RoleContext";
import railwayHero from "@/assets/railway-hero.jpg";

const recentActivities = [
  {
    id: 1,
    type: "inspection",
    title: "Batch L2024-45 Inspection Complete",
    description: "98.5% quality score achieved",
    time: "2 mins ago",
    status: "success",
  },
  {
    id: 2,
    type: "alert",
    title: "Western Zone Failure Alert",
    description: "Elevated failure rate detected",
    time: "15 mins ago",
    status: "warning",
  },
  {
    id: 3,
    type: "delivery",
    title: "New Parts Batch Received",
    description: "15,000 ERCs from Tata Steel",
    time: "1 hour ago",
    status: "info",
  },
];

export const Dashboard = () => {
  const { selectedRole, currentUser } = useRole();

  const handleSignOut = async () => {
    try {
      // await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section with Railway Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div 
            className="relative h-64 bg-gradient-hero flex items-center justify-between px-8"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(78, 205, 196, 0.8) 100%), url(${railwayHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="text-white">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                RailTrack AI System
              </h1>
              <p className="text-xl opacity-90 mb-2">
                AI-powered QR code marking and tracking system for Indian Railways
              </p>
              <p className="text-lg opacity-80 mb-4">
                Welcome back, <strong>{currentUser?.name || 'Demo User'}</strong>
                {selectedRole && (
                  <span className="block text-sm mt-1">
                    Role: {roleLabels[selectedRole]}
                  </span>
                )}
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Activity className="w-4 h-4 mr-2" />
                  System Operational
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Train className="w-4 h-4 mr-2" />
                  All Zones Active
                </Badge>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
            
            <div className="text-white text-right">
              <div className="text-3xl font-bold">2.4M+</div>
              <div className="text-sm opacity-80">Parts Tracked</div>
              <div className="text-2xl font-bold mt-2">99.2%</div>
              <div className="text-sm opacity-80">System Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <KPICards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Analytics Charts */}
          <CanViewAnalytics>
            <div className="xl:col-span-2">
              <AnalyticsChart />
            </div>
          </CanViewAnalytics>

          {/* Recent Activities Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-card border-0 shadow-soft h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest system events and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success/10' :
                      activity.status === 'warning' ? 'bg-warning/10' :
                      'bg-primary/10'
                    }`}>
                      {activity.type === 'inspection' && <Package className="w-4 h-4 text-success" />}
                      {activity.type === 'alert' && <AlertCircle className="w-4 h-4 text-warning" />}
                      {activity.type === 'delivery' && <TrendingUp className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Vendor Analytics */}
        <CanManageVendors>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Vendor Performance Analytics</h2>
              <p className="text-muted-foreground">
                AI-powered insights and quality scoring for railway fitting suppliers
              </p>
            </div>
            <VendorAnalytics />
          </motion.div>
        </CanManageVendors>

        {/* Parts Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Parts Management System</h2>
            <p className="text-muted-foreground">
              Comprehensive inventory tracking and lifecycle management for railway fittings
            </p>
          </div>
          <PartsTable />
        </motion.div>

        {/* QR Generator Section */}
        <CanGenerateQR>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">QR Code Generator</h2>
              <p className="text-muted-foreground">
                Generate unique QR codes for track fitting identification and lifecycle tracking
              </p>
            </div>
            <QRGenerator />
          </motion.div>
        </CanGenerateQR>

        {/* TMS Integration Section */}
        <CanIntegrateTMS>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">TMS Integration & Data Sync</h2>
              <p className="text-muted-foreground">
                Track Management System integration, data validation, and MIS report generation
              </p>
            </div>
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cog className="w-6 h-6 mr-3 text-primary" />
                  TMS Operations Center
                </CardTitle>
                <CardDescription>
                  Manage TMS integration, validate track installations, and generate MIS reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                    <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-primary">Data Integration</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Sync QR scan data with official TMS records
                    </p>
                    <Button size="sm" className="mt-4 bg-primary hover:opacity-90">
                      Sync Data
                    </Button>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
                    <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                    <h3 className="font-semibold text-success">Validation</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Validate track installation and quality compliance
                    </p>
                    <Button size="sm" className="mt-4 bg-success hover:opacity-90">
                      Validate
                    </Button>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                    <Activity className="w-8 h-8 text-warning mx-auto mb-3" />
                    <h3 className="font-semibold text-warning">MIS Reports</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Generate comprehensive MIS reports for authorities
                    </p>
                    <Button size="sm" className="mt-4 bg-warning hover:opacity-90">
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </CanIntegrateTMS>
      </div>
    </MainLayout>
  );
};