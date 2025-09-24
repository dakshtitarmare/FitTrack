import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { QrCode, Package, TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, Calendar } from 'lucide-react'

const dailyStats = {
  qrGenerated: 47,
  partsReceived: 1240,
  partsInstalled: 890,
  partsNearExpiry: 23,
  qualityIssues: 3,
  pendingInspections: 12
}

const recentQRActivity = [
  { id: 'QR24082001', partType: 'ERC', quantity: 500, time: '09:30', status: 'completed' },
  { id: 'QR24082002', partType: 'RPD', quantity: 300, time: '10:15', status: 'completed' },
  { id: 'QR24082003', partType: 'LNR', quantity: 200, time: '11:45', status: 'in_progress' },
  { id: 'QR24082004', partType: 'SLP', quantity: 150, time: '13:20', status: 'pending' },
]

const partsExpiryData = [
  { partType: 'ERC', total: 1500, expiring: 45, expiryDate: '2024-09-15' },
  { partType: 'RPD', total: 800, expiring: 23, expiryDate: '2024-09-20' },
  { partType: 'LNR', total: 600, expiring: 12, expiryDate: '2024-09-25' },
  { partType: 'SLP', total: 400, expiring: 8, expiryDate: '2024-10-01' },
]

export const DepotSupervisorDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Daily Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">QR Codes Generated Today</p>
                  <p className="text-3xl font-bold text-primary">{dailyStats.qrGenerated}</p>
                  <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Parts Received Today</p>
                  <p className="text-3xl font-bold text-success">{dailyStats.partsReceived}</p>
                  <p className="text-xs text-muted-foreground">3 deliveries completed</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Package className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Parts Installed Today</p>
                  <p className="text-3xl font-bold text-accent">{dailyStats.partsInstalled}</p>
                  <p className="text-xs text-muted-foreground">72% of received parts</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/10">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Near Expiry (30 days)</p>
                  <p className="text-3xl font-bold text-warning">{dailyStats.partsNearExpiry}</p>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Quality Issues</p>
                  <p className="text-3xl font-bold text-destructive">{dailyStats.qualityIssues}</p>
                  <p className="text-xs text-muted-foreground">0.2% defect rate</p>
                </div>
                <div className="p-3 rounded-xl bg-destructive/10">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Inspections</p>
                  <p className="text-3xl font-bold text-primary">{dailyStats.pendingInspections}</p>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent QR Generation Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2 text-primary" />
                Recent QR Generation Activity
              </CardTitle>
              <CardDescription>Today's QR code generation progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentQRActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-success/10' :
                        activity.status === 'in_progress' ? 'bg-warning/10' : 'bg-muted'
                      }`}>
                        {activity.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : activity.status === 'in_progress' ? (
                          <Clock className="w-4 h-4 text-warning" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.id}</p>
                        <p className="text-xs text-muted-foreground">{activity.partType} - {activity.quantity} units</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        activity.status === 'completed' ? 'default' :
                        activity.status === 'in_progress' ? 'secondary' : 'outline'
                      }>
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All QR Activities
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parts Expiry Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-warning" />
                Parts Expiry Tracking
              </CardTitle>
              <CardDescription>Parts nearing warranty expiry (next 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partsExpiryData.map((part, index) => (
                  <motion.div
                    key={part.partType}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="p-4 bg-warning/5 rounded-lg border border-warning/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{part.partType}</h4>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        {part.expiring} expiring
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium">{part.total}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiring</p>
                        <p className="font-medium text-warning">{part.expiring}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiry Date</p>
                        <p className="font-medium">{part.expiryDate}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Full Inventory Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common depot supervisor tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-primary hover:opacity-90">
                <QrCode className="w-6 h-6" />
                <span>Generate QR Codes</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Package className="w-6 h-6" />
                <span>Manage Inventory</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
