import { motion } from "framer-motion";
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
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Activity, AlertTriangle, Package } from "lucide-react";

// Sample data for different charts
const qualityTrendData = [
  { month: "Jan", quality: 66.2, inspections: 12500, failures: 234 },
  { month: "Feb", quality: 77.1, inspections: 13200, failures: 198 },
  { month: "Mar", quality: 88.3, inspections: 14100, failures: 167 },
  { month: "Apr", quality: 92.8, inspections: 13800, failures: 189 },
  { month: "May", quality: 96.7, inspections: 15200, failures: 145 },
  { month: "Jun", quality: 99.1, inspections: 16100, failures: 123 },
];

const vendorPerformanceData = [
  { vendor: "Bharat Heavy", score: 92.3, parts: 245000, color: "#FF6B35" },
  { vendor: "Tata Steel", score: 89.7, parts: 198000, color: "#4ECDC4" },
  { vendor: "JSW Group", score: 87.5, parts: 167000, color: "#45B7D1" },
  { vendor: "Jindal Steel", score: 85.2, parts: 134000, color: "#96CEB4" },
  { vendor: "SAIL", score: 83.9, parts: 123000, color: "#FECA57" },
];

const partTypeDistribution = [
  { name: "Elastic Rail Clips", value: 45.2, count: 1112000, color: "#FF6B35" },
  { name: "Rail Pads", value: 28.3, count: 695000, color: "#4ECDC4" },
  { name: "Liners", value: 16.8, count: 413000, color: "#45B7D1" },
  { name: "Sleepers", value: 9.7, count: 238000, color: "#96CEB4" },
];

const failureHeatmapData = [
  { zone: "Northern", failures: 45, severity: "High" },
  { zone: "Southern", failures: 23, severity: "Medium" },
  { zone: "Western", failures: 67, severity: "High" },
  { zone: "Eastern", failures: 34, severity: "Low" },
  { zone: "Central", failures: 56, severity: "Medium" },
];

export const AnalyticsChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quality Trend Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Quality Trends
                </CardTitle>
                <CardDescription>Monthly quality scores and inspection volumes</CardDescription>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                +2.9% Quality ↑
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="quality"
                  orientation="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="inspections"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  yAxisId="quality"
                  type="monotone"
                  dataKey="quality"
                  stroke="#FF6B35"
                  strokeWidth={3}
                  dot={{ fill: "#FF6B35", strokeWidth: 2, r: 4 }}
                  name="Quality Score (%)"
                />
                <Area
                  yAxisId="inspections"
                  type="monotone"
                  dataKey="inspections"
                  stroke="#4ECDC4"
                  fill="#4ECDC4"
                  fillOpacity={0.1}
                  name="Inspections"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vendor Performance Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2 text-accent" />
              Vendor Performance
            </CardTitle>
            <CardDescription>Quality scores by vendor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendorPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  type="category"
                  dataKey="vendor"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar 
                  dataKey="score"
                  fill="#4ECDC4"
                  radius={[0, 4, 4, 0]}
                  name="Quality Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Part Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Package className="w-5 h-5 mr-2 text-success" />
              Part Distribution
            </CardTitle>
            <CardDescription>Distribution by part type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={partTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {partTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value, name) => [
                    `${value}% (${partTypeDistribution.find(p => p.name === name)?.count?.toLocaleString()} parts)`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Failure Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Failure Heatmap
            </CardTitle>
            <CardDescription>Failures by railway zone</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failureHeatmapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="zone"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar 
                  dataKey="failures"
                  fill="#FF6B35"
                  radius={[4, 4, 0, 0]}
                  name="Failure Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};