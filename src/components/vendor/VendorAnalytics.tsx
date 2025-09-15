import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Award, AlertTriangle, Package, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import { hasPermission } from "@/lib/rolePermissions";

const vendorData = [
  {
    id: "VND101",
    name: "Bharat Heavy Electricals Ltd",
    shortName: "BHEL",
    totalParts: 645000,
    qualityScore: 98.5,
    onTimeDelivery: 96.2,
    defectRate: 1.2,
    warrantyClaimsRate: 0.8,
    lastDelivery: "2024-08-20",
    contractValue: "₹245 Cr",
    rating: "A+",
    trend: "up",
    ratingChange: "+0.3",
    specializations: ["ERC", "Fish Plates"],
  },
  {
    id: "VND102",
    name: "Tata Steel Limited",
    shortName: "Tata Steel",
    totalParts: 523000,
    qualityScore: 97.2,
    onTimeDelivery: 94.8,
    defectRate: 1.8,
    warrantyClaimsRate: 1.2,
    lastDelivery: "2024-08-18",
    contractValue: "₹198 Cr",
    rating: "A",
    trend: "up",
    ratingChange: "+0.1",
    specializations: ["Rail Pads", "Liners"],
  },
  {
    id: "VND103",
    name: "JSW Steel Limited",
    shortName: "JSW Steel",
    totalParts: 412000,
    qualityScore: 96.8,
    onTimeDelivery: 92.3,
    defectRate: 2.1,
    warrantyClaimsRate: 1.5,
    lastDelivery: "2024-08-15",
    contractValue: "₹167 Cr",
    rating: "A",
    trend: "down",
    ratingChange: "-0.2",
    specializations: ["Sleepers", "Bolts"],
  },
  {
    id: "VND104",
    name: "Jindal Steel & Power",
    shortName: "Jindal",
    totalParts: 334000,
    qualityScore: 95.9,
    onTimeDelivery: 91.7,
    defectRate: 2.8,
    warrantyClaimsRate: 2.1,
    lastDelivery: "2024-08-12",
    contractValue: "₹134 Cr",
    rating: "B+",
    trend: "up",
    ratingChange: "+0.4",
    specializations: ["ERC", "Rail Pads"],
  },
];

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "A+":
      return "bg-success text-success-foreground";
    case "A":
      return "bg-primary text-primary-foreground";
    case "B+":
      return "bg-warning text-warning-foreground";
    case "B":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-destructive text-destructive-foreground";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 98) return "text-success";
  if (score >= 95) return "text-primary";
  if (score >= 90) return "text-warning";
  return "text-destructive";
};

export const VendorAnalytics = () => {
  const { selectedRole } = useRole();
  
  const canGenerateReports = selectedRole ? hasPermission(selectedRole, 'canGenerateReports') : false;
  const canManageVendors = selectedRole ? hasPermission(selectedRole, 'canManageVendors') : false;

  return (
    <div className="space-y-6">
      {/* Vendor Performance Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {vendorData.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {vendor.shortName}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {vendor.id}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRatingColor(vendor.rating)}>
                      {vendor.rating}
                    </Badge>
                    <div className="flex items-center text-xs">
                      {vendor.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                      <span className="ml-1">{vendor.ratingChange}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Quality</span>
                      <span className={`font-medium ${getScoreColor(vendor.qualityScore)}`}>
                        {vendor.qualityScore}%
                      </span>
                    </div>
                    <Progress value={vendor.qualityScore} className="h-1.5 mt-1" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className={`font-medium ${getScoreColor(vendor.onTimeDelivery)}`}>
                        {vendor.onTimeDelivery}%
                      </span>
                    </div>
                    <Progress value={vendor.onTimeDelivery} className="h-1.5 mt-1" />
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Package className="w-3 h-3 mr-1" />
                      Total Parts
                    </span>
                    <span className="font-medium">{(vendor.totalParts / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Defect Rate
                    </span>
                    <span className="font-medium">{vendor.defectRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Last Delivery
                    </span>
                    <span className="font-medium">{vendor.lastDelivery}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Specializations</div>
                  <div className="flex flex-wrap gap-1">
                    {vendor.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs px-2 py-0">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contract Value */}
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Contract Value</span>
                    <span className="text-sm font-bold text-primary">{vendor.contractValue}</span>
                  </div>
                </div>

                {/* Railway decoration */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full transform translate-x-6 translate-y-6 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Vendor Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Vendor Performance Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics and ratings for all railway fitting suppliers
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                {canGenerateReports && (
                  <Button variant="outline" size="sm">
                    Generate Report
                  </Button>
                )}
                {canManageVendors && (
                  <Button size="sm" className="bg-gradient-secondary hover:opacity-90">
                    <Award className="w-4 h-4 mr-2" />
                    Vendor Awards
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Performer */}
              <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
                <Award className="w-8 h-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-success">Top Performer</h3>
                <p className="text-2xl font-bold text-success mt-2">BHEL</p>
                <p className="text-sm text-muted-foreground mt-1">98.5% Quality Score</p>
                <Badge className="mt-3 bg-success text-success-foreground">
                  A+ Rating
                </Badge>
              </div>

              {/* Best Delivery */}
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-primary">Best Delivery</h3>
                <p className="text-2xl font-bold text-primary mt-2">BHEL</p>
                <p className="text-sm text-muted-foreground mt-1">96.2% On-Time</p>
                <Badge className="mt-3 bg-primary text-primary-foreground">
                  Excellent
                </Badge>
              </div>

              {/* Most Improved */}
              <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                <TrendingUp className="w-8 h-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold text-warning">Most Improved</h3>
                <p className="text-2xl font-bold text-warning mt-2">Jindal</p>
                <p className="text-sm text-muted-foreground mt-1">+0.4 Rating Change</p>
                <Badge className="mt-3 bg-warning text-warning-foreground">
                  Rising
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};