import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload, FileSpreadsheet, MapPin, Factory, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type InventoryRow = {
  partId: string;
  partType: string;
  vendorCompany: string;
  vendorLocation: string;
  lotOrBatch: string;
  deliveredTo: string; // e.g., Indian Railway zone/depot
  status: "Approved" | "Pending" | "Rejected";
  qualityScore?: string; // optional quality score
};

const sampleData: InventoryRow[] = [
  {
    partId: "ERC-000123",
    partType: "Elastic Rail Clip",
    vendorCompany: "Bharat Supplies",
    vendorLocation: "Bhilai, Chhattisgarh",
    lotOrBatch: "LOT-24-0912",
    deliveredTo: "Northern Railway - Delhi Depot",
    status: "Approved",
    qualityScore: "97.8%",
  },
  {
    partId: "PAD-004567",
    partType: "Rail Pad",
    vendorCompany: "Tata Steel",
    vendorLocation: "Jamshedpur, Jharkhand",
    lotOrBatch: "BATCH-IR-775",
    deliveredTo: "Western Railway - Mumbai Central",
    status: "Pending",
    qualityScore: "—",
  },
];

function parseCsv(text: string): InventoryRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name.toLowerCase());
  const rows: InventoryRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    if (!cols.filter(Boolean).length) continue;
    rows.push({
      partId: cols[idx("partId")] || cols[idx("part_id")] || cols[idx("part id")] || cols[0] || "",
      partType: cols[idx("partType")] || cols[idx("type")] || cols[1] || "",
      vendorCompany: cols[idx("vendorCompany")] || cols[idx("vendor")] || cols[2] || "",
      vendorLocation: cols[idx("vendorLocation")] || cols[idx("location")] || cols[3] || "",
      lotOrBatch: cols[idx("lotOrBatch")] || cols[idx("lot")] || cols[idx("batch")] || cols[4] || "",
      deliveredTo: cols[idx("deliveredTo")] || cols[idx("delivered_to")] || cols[5] || "",
      status: (() => {
        const s = (cols[idx("status")] || cols[6] || "Pending").toLowerCase();
        if (s.startsWith("app")) return "Approved";
        if (s.startsWith("rej")) return "Rejected";
        return "Pending";
      })(),
      qualityScore: cols[idx("qualityScore")] || cols[idx("quality")] || cols[7],
    });
  }
  return rows;
}

function toCsv(rows: InventoryRow[]): string {
  const header = [
    "partId",
    "partType",
    "vendorCompany",
    "vendorLocation",
    "lotOrBatch",
    "deliveredTo",
    "status",
    "qualityScore",
  ];
  const body = rows.map((r) => [
    r.partId,
    r.partType,
    r.vendorCompany,
    r.vendorLocation,
    r.lotOrBatch,
    r.deliveredTo,
    r.status,
    r.qualityScore ?? "",
  ].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  return `${header.join(",")}\n${body}`;
}

export const VendorInventory = () => {
  const [rows, setRows] = useState<InventoryRow[]>(sampleData);
  const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [reviewStatus, setReviewStatus] = useState<"Approved" | "Pending" | "Rejected">("Pending");
  const [reviewNotes, setReviewNotes] = useState("");

  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.partId, r.partType, r.vendorCompany, r.vendorLocation, r.lotOrBatch, r.deliveredTo, r.status, r.qualityScore]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, filter]);

  const triggerImport = () => inputRef.current?.click();

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseCsv(text);
    if (parsed.length) setRows(parsed);
    e.target.value = "";
  };

  const onExport = () => {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vendor-inventory.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openReview = (index: number) => {
    setSelectedRowIndex(index);
    setReviewStatus(rows[index].status);
    setReviewNotes("");
    setReviewOpen(true);
  };

  const applyReview = () => {
    if (selectedRowIndex === null) return;
    const updated = [...rows];
    updated[selectedRowIndex] = { ...updated[selectedRowIndex], status: reviewStatus };
    setRows(updated);
    setReviewOpen(false);
  };

  const requestChange = () => {
    if (selectedRowIndex === null) return;
    const updated = [...rows];
    updated[selectedRowIndex] = { ...updated[selectedRowIndex], status: "Pending" };
    setRows(updated);
    setReviewOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center">
                <FileSpreadsheet className="w-5 h-5 mr-2 text-primary" />
                Vendor Inventory
              </CardTitle>
              <CardDescription>
                Import or export CSV for lots/batches and track delivery status
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search parts, vendors, lots..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-56"
              />
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={onImport}
                className="hidden"
              />
              <Button variant="outline" onClick={triggerImport}>
                <Upload className="w-4 h-4 mr-2" /> Import CSV
              </Button>
              <Button onClick={onExport} className="bg-primary hover:opacity-90">
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="min-w-[180px]">Vendor Company</TableHead>
                  <TableHead className="min-w-[180px]">Vendor Location</TableHead>
                  <TableHead>Lot/Batch</TableHead>
                  <TableHead className="min-w-[220px]">Delivered To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quality Score</TableHead>
                  <TableHead className="w-[110px]">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r, idx) => (
                  <TableRow key={`${r.partId}-${r.lotOrBatch}`}>
                    <TableCell className="font-medium">{r.partId}</TableCell>
                    <TableCell>{r.partType}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-muted-foreground" /> {r.vendorCompany}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" /> {r.vendorLocation}
                    </TableCell>
                    <TableCell>{r.lotOrBatch}</TableCell>
                    <TableCell>{r.deliveredTo}</TableCell>
                    <TableCell>
                      {r.status === "Approved" ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
                        </Badge>
                      ) : r.status === "Rejected" ? (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                          <AlertCircle className="w-3 h-3 mr-1" /> Rejected
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                          <Clock className="w-3 h-3 mr-1" /> Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{r.qualityScore ?? "—"}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => openReview(idx)}>
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No records found. Try adjusting your search or import a CSV.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Review Delivery Status</DialogTitle>
            <DialogDescription>Approve, reject, or keep pending. Optionally add notes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={reviewStatus} onValueChange={(v) => setReviewStatus(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)} placeholder="Optional notes or reason" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={requestChange}>Request Change</Button>
              <Button className="bg-primary hover:opacity-90" onClick={applyReview}>Save Status</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default VendorInventory;


