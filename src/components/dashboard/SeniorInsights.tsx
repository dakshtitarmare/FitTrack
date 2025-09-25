import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, PieChart as PieIcon, Map, LineChart as LineIcon } from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const vendorQualityData = [
  { month: 'Jan', Bharat: 93, Tata: 90, JSW: 88, SAIL: 85 },
  { month: 'Feb', Bharat: 94, Tata: 91, JSW: 87, SAIL: 86 },
  { month: 'Mar', Bharat: 95, Tata: 92, JSW: 89, SAIL: 86 },
  { month: 'Apr', Bharat: 94, Tata: 93, JSW: 90, SAIL: 87 },
  { month: 'May', Bharat: 96, Tata: 93, JSW: 91, SAIL: 88 },
  { month: 'Jun', Bharat: 97, Tata: 94, JSW: 92, SAIL: 89 },
]

const zoneDefectsData = [
  { zone: 'North', defects: 67 },
  { zone: 'South', defects: 23 },
  { zone: 'West', defects: 56 },
  { zone: 'East', defects: 34 },
  { zone: 'Central', defects: 45 },
]

const partMixData = [
  { name: 'ERC', value: 42, color: '#FF6B35' },
  { name: 'Rail Pad', value: 28, color: '#4ECDC4' },
  { name: 'Liner', value: 18, color: '#45B7D1' },
  { name: 'Sleeper', value: 12, color: '#96CEB4' },
]

export const SeniorInsights = () => {
  return (
    <div className="space-y-6">
      {/* Vendor Quality Trend (Line + Area) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Vendor Quality Trend</CardTitle>
            <CardDescription>Monthly quality scores by vendor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={vendorQualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                <Legend />
                <Line type="monotone" dataKey="Bharat" stroke="#FF6B35" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Tata" stroke="#4ECDC4" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="JSW" stroke="#45B7D1" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="SAIL" stroke="#96CEB4" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Warranty Expiry Distribution (Area) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Warranty Expiry Distribution</CardTitle>
            <CardDescription>Upcoming expiries segmented by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={[{ m: 'Aug', exp: 120 }, { m: 'Sep', exp: 180 }, { m: 'Oct', exp: 240 }, { m: 'Nov', exp: 160 }, { m: 'Dec', exp: 90 }, { m: 'Jan', exp: 60 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                <Area type="monotone" dataKey="exp" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.15} name="Expiries" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zone-wise Defects (Bar) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Zone-wise Defects</CardTitle>
            <CardDescription>Relative defect counts by zone</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={zoneDefectsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="zone" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                <Bar dataKey="defects" fill="#FF6B35" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Part Mix (Pie) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Part Mix</CardTitle>
            <CardDescription>Distribution of part types in recent deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={partMixData} cx="50%" cy="50%" dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} label>
                  {partMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

