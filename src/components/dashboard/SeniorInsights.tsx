import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, PieChart as PieIcon, Map, LineChart as LineIcon } from 'lucide-react'

export const SeniorInsights = () => {
  return (
    <div className="space-y-6">
      {/* Vendor-wise Defect Rate */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Vendor-wise Defect Rate</CardTitle>
            <CardDescription>Top vendors by defect ratio over last 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 grid grid-cols-5 gap-3">
              {[
                { name: 'BHEL', value: 1.2 },
                { name: 'Tata', value: 1.8 },
                { name: 'JSW', value: 2.1 },
                { name: 'Jindal', value: 2.8 },
                { name: 'SAIL', value: 2.3 },
              ].map((v) => (
                <div key={v.name} className="flex flex-col items-center justify-end">
                  <div className="w-8 bg-destructive/20 rounded-t-sm" style={{ height: `${v.value * 20}px` }} />
                  <div className="text-xs mt-1">{v.name}</div>
                  <div className="text-[10px] text-muted-foreground">{v.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Warranty Expiry Distribution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Warranty Expiry Distribution</CardTitle>
            <CardDescription>Upcoming expiries segmented by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-3 text-center">
              {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((m, idx) => (
                <div key={m} className="p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{[120, 180, 240, 160, 90, 60][idx]}</div>
                  <div className="text-xs text-muted-foreground">{m}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zone-wise Defects */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Zone-wise Defect Heat</CardTitle>
            <CardDescription>Relative defect counts by zone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {[
                { zone: 'North', count: 67 },
                { zone: 'South', count: 23 },
                { zone: 'West', count: 56 },
                { zone: 'East', count: 34 },
                { zone: 'Central', count: 45 },
              ].map((z) => (
                <div key={z.zone} className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-center">
                  <div className="text-lg font-semibold text-warning">{z.count}</div>
                  <div className="text-xs text-muted-foreground">{z.zone}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Inspection Trends */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Inspection Trends Over Time</CardTitle>
            <CardDescription>Inspections vs failures (last 6 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-3 items-end h-40">
              {[110, 130, 150, 140, 160, 175].map((v, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto w-8 bg-primary/20 rounded-t-sm" style={{ height: `${v / 2}px` }} />
                  <div className="text-[10px] mt-1 text-muted-foreground">{['Jan','Feb','Mar','Apr','May','Jun'][i]}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Indicative visuals for demo only</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

