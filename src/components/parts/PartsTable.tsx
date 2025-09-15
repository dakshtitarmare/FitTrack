import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Edit, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRole } from "@/contexts/RoleContext";
import { hasPermission } from "@/lib/rolePermissions";

const partsData = [
  {
    id: "ERC240012345",
    type: "Elastic Rail Clip",
    vendor: "Bharat Heavy",
    mfgDate: "2024-08-15",
    status: "In Service",
    location: "Northern Zone - Track 12A",
    qualityScore: 98.5,
    warrantyDays: 456,
    lastInspection: "2024-08-01",
    nextInspection: "2024-09-01",
  },
  {
    id: "RPD240023456",
    type: "Rail Pad",
    vendor: "Tata Steel",
    mfgDate: "2024-07-22",
    status: "Installed",
    location: "Western Zone - Track 8B",
    qualityScore: 97.2,
    warrantyDays: 423,
    lastInspection: "2024-07-25",
    nextInspection: "2024-08-25",
  },
  {
    id: "LNR240034567",
    type: "Liner",
    vendor: "JSW Steel",
    mfgDate: "2024-06-10",
    status: "Flagged",
    location: "Central Zone - Track 5C",
    qualityScore: 85.3,
    warrantyDays: 387,
    lastInspection: "2024-08-10",
    nextInspection: "2024-08-20",
  },
  {
    id: "SLP240045678",
    type: "Sleeper",
    vendor: "Jindal Steel",
    mfgDate: "2024-05-18",
    status: "In Transit",
    location: "Eastern Zone - Warehouse",
    qualityScore: 96.8,
    warrantyDays: 512,
    lastInspection: "2024-05-20",
    nextInspection: "2024-09-15",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Service":
      return "bg-success/10 text-success border-success/20";
    case "Installed":
      return "bg-primary/10 text-primary border-primary/20";
    case "Flagged":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "In Transit":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "In Service":
      return <CheckCircle className="w-4 h-4" />;
    case "Installed":
      return <CheckCircle className="w-4 h-4" />;
    case "Flagged":
      return <AlertTriangle className="w-4 h-4" />;
    case "In Transit":
      return <Clock className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export const PartsTable = () => {
  const { selectedRole } = useRole();
  
  const canAddParts = selectedRole ? hasPermission(selectedRole, 'canAddParts') : false;
  const canEditParts = selectedRole ? hasPermission(selectedRole, 'canEditParts') : false;
  const canExportData = selectedRole ? hasPermission(selectedRole, 'canExportData') : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Parts Inventory</CardTitle>
              <CardDescription>
                Track and manage railway fittings across all zones
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              {canExportData && (
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
              {canAddParts && (
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  Add New Part
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by ID, type, or location..."
                className="pl-10"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Part Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="erc">Elastic Rail Clip</SelectItem>
                <SelectItem value="pad">Rail Pad</SelectItem>
                <SelectItem value="liner">Liner</SelectItem>
                <SelectItem value="sleeper">Sleeper</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="service">In Service</SelectItem>
                <SelectItem value="installed">Installed</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="transit">In Transit</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-medium">Part ID</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Vendor</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium">Quality Score</TableHead>
                  <TableHead className="font-medium">Warranty</TableHead>
                  <TableHead className="font-medium">Next Inspection</TableHead>
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partsData.map((part, index) => (
                  <motion.tr
                    key={part.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-mono text-sm font-medium">
                      {part.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{part.type}</div>
                      <div className="text-xs text-muted-foreground">
                        Mfg: {part.mfgDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{part.vendor}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(part.status)}
                      >
                        {getStatusIcon(part.status)}
                        <span className="ml-1">{part.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{part.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{part.qualityScore}%</div>
                        <div className={`w-2 h-2 rounded-full ${
                          part.qualityScore >= 95 ? 'bg-success' :
                          part.qualityScore >= 90 ? 'bg-warning' : 'bg-destructive'
                        }`} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{part.warrantyDays} days</div>
                        <div className="text-xs text-muted-foreground">
                          {part.warrantyDays < 90 ? 'Expires Soon' : 'Active'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{part.nextInspection}</div>
                        <div className="text-xs text-muted-foreground">
                          Last: {part.lastInspection}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {canEditParts && (
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing 4 of 2,457,891 parts
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2 text-sm text-muted-foreground">...</span>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};