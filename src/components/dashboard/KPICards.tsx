import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Package, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const kpiData = [
  {
    title: "Total Parts Tracked",
    value: "2,457,891",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "primary",
    description: "Active in system",
  },
  {
    title: "Quality Score",
    value: "98.7%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle,
    color: "success",
    description: "Vendor average",
  },
  {
    title: "Pending Inspections",
    value: "1,247",
    change: "-8.3%",
    trend: "down",
    icon: Clock,
    color: "warning",
    description: "Due this week",
  },
  {
    title: "Critical Alerts",
    value: "23",
    change: "+15.2%",
    trend: "up",
    icon: AlertTriangle,
    color: "destructive",
    description: "Require attention",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const KPICards = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <motion.div key={kpi.title} variants={item}>
            <Card className="relative overflow-hidden bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </p>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-bold tracking-tight">
                        {kpi.value}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {kpi.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-xl bg-${kpi.color}/10`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}`} />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-2">
                  <Badge
                    variant={kpi.trend === "up" ? "default" : "secondary"}
                    className={`${
                      kpi.trend === "up"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {kpi.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>

                {/* Animated progress indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(index + 1) * 25}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
                
                {/* Railway track decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};