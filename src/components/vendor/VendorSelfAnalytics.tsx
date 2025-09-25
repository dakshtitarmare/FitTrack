import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, BarChart3 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const vendorScores = [
  { name: "Bharat Steel", score: 96.4, deliveries: 124, defects: 1.1 },
  { name: "Tata Steel", score: 93.2, deliveries: 98, defects: 1.6 },
  { name: "JSW", score: 91.5, deliveries: 86, defects: 1.9 },
];

const monthlyQuality = [
  { month: "Jan", score: 92.5 },
  { month: "Feb", score: 93.1 },
  { month: "Mar", score: 94.0 },
  { month: "Apr", score: 93.6 },
  { month: "May", score: 95.2 },
  { month: "Jun", score: 96.1 },
];

export const VendorSelfAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Top vendor scores */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Vendor Analytics</CardTitle>
                <CardDescription>Quality score and performance overview</CardDescription>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                <TrendingUp className="w-3 h-3 mr-1" /> Improving
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vendorScores.map(v => (
                <div key={v.name} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{v.name}</div>
                      <div className="text-xs text-muted-foreground">{v.deliveries} deliveries</div>
                    </div>
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="mt-3 text-3xl font-bold">{v.score}%</div>
                  <div className="text-xs text-muted-foreground">Defects: {v.defects}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Line chart of monthly score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" /> Monthly Quality Trend
            </CardTitle>
            <CardDescription>Vendor quality score over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyQuality}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[85, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#4ECDC4" strokeWidth={3} dot={{ r: 3 }} name="Quality Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default VendorSelfAnalytics;


