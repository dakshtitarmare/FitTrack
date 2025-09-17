import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { Download, Copy, RefreshCw, Check, Package, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import axios from "axios"; // Make sure axios is imported

interface PartData {
  partType: string;
  serialNo: string;
  vendorId: string;
  mfgDate: string;
  lotNo: string;
  warrantyPeriod: string;
  // inspectionDue: string;
}

export const QRGenerator = () => {
  const { toast } = useToast();
  const [partData, setPartData] = useState<PartData>({
    partType: "",
    serialNo: "",
    vendorId: "",
    mfgDate: "",
    lotNo: "",
    warrantyPeriod: "24",
    // inspectionDue: "",
  });
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateQRCode = async () => {
    if (!partData.partType || !partData.serialNo || !partData.vendorId || !partData.mfgDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
  
    setIsGenerating(true);
  
    try {
      // Step 1: Call the backend API
      console.log('call api');
      const response = await axios.post(
        "https://fittrack-backend-ix2u.onrender.com/api/save_qr_data",
        {
          partType: partData.partType,
          serialNo: partData.serialNo,
          vendorId: partData.vendorId,
          mfgDate: partData.mfgDate,
          lotNo: partData.lotNo,
          warrantyPeriod: partData.warrantyPeriod,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log('call api done',response);

      const uid = response.data.uid;

      console.log('got response',uid);

      if (!uid) throw new Error("UID not returned from backend");
  
      // Step 2: Create QR code pointing to showdata/UID
      const qrUrl = `https://fittrack-backend-ix2u.onrender.com/showdata/${uid}`; // Update this to your actual hosted domain (Render or localhost)  
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H",
      });
  
      setQrDataUrl(dataUrl);
  
      toast({
        title: "QR Code Generated",
        description: "QR code has been successfully created and stored.",
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
        title: "Error",
        description: "Something went wrong while generating QR.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

// Generates a serial number based on part type and timestamp
const generateSerialNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  setPartData(prev => ({
    ...prev,
    serialNo: `${partData.partType?.slice(0, 3).toUpperCase() || "PRT"}${timestamp}${random}`,
  }));
};

  const copyQRData = () => {
    // QR string (without inspectionDue)
    const qrData = `${partData.partType}|${partData.serialNo}|${partData.vendorId}|${partData.mfgDate}|${partData.lotNo}|${partData.warrantyPeriod}|HMAC_SIGNATURE`;
  
    navigator.clipboard.writeText(qrData);
    setIsCopied(true);
  
    // Reset copied state after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  
    toast({
      title: "Copied!",
      description: "QR data copied to clipboard.",
    });
  };
  

// Triggers download of the generated QR code image
const downloadQR = () => {
  if (!qrDataUrl) return;

  const link = document.createElement("a");
  link.download = `QR_${partData.partType}_${partData.serialNo}.png`;
  link.href = qrDataUrl;
  link.click();

  toast({
    title: "Downloaded",
    description: "QR code image has been downloaded.",
  });
};


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Package className="w-6 h-6 mr-3 text-primary" />
              Part Information
            </CardTitle>
            <CardDescription>
              Enter part details to generate a unique QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Part Type */}
            <div className="space-y-2">
              <Label htmlFor="partType">Part Type *</Label>
              <Select 
                value={partData.partType} 
                onValueChange={(value) => setPartData(prev => ({ ...prev, partType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select part type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ERC">Elastic Rail Clip (ERC)</SelectItem>
                  <SelectItem value="RPD">Rail Pad (RPD)</SelectItem>
                  <SelectItem value="LNR">Liner (LNR)</SelectItem>
                  <SelectItem value="SLP">Sleeper (SLP)</SelectItem>
                  <SelectItem value="FSH">Fish Plate (FSH)</SelectItem>
                  <SelectItem value="BLT">Bolt (BLT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Serial Number */}
            <div className="space-y-2">
              <Label htmlFor="serialNo">Serial Number *</Label>
              <div className="flex space-x-2">
                <Input
                  id="serialNo"
                  value={partData.serialNo}
                  onChange={(e) => setPartData(prev => ({ ...prev, serialNo: e.target.value }))}
                  placeholder="Enter serial number"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={generateSerialNumber}
                  disabled={!partData.partType}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Vendor ID */}
            <div className="space-y-2">
              <Label htmlFor="vendorId">Vendor ID *</Label>
              <Select 
                value={partData.vendorId} 
                onValueChange={(value) => setPartData(prev => ({ ...prev, vendorId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND101">Bharat Heavy Electricals Ltd (VND101)</SelectItem>
                  <SelectItem value="VND102">Tata Steel Limited (VND102)</SelectItem>
                  <SelectItem value="VND103">JSW Steel Limited (VND103)</SelectItem>
                  <SelectItem value="VND104">Jindal Steel & Power (VND104)</SelectItem>
                  <SelectItem value="VND105">Steel Authority of India (VND105)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Manufacturing Date */}
            <div className="space-y-2">
              <Label htmlFor="mfgDate">Manufacturing Date *</Label>
              <Input
                id="mfgDate"
                type="date"
                value={partData.mfgDate}
                onChange={(e) => setPartData(prev => ({ ...prev, mfgDate: e.target.value }))}
              />
            </div>

            {/* Lot Number */}
            <div className="space-y-2">
              <Label htmlFor="lotNo">Lot Number</Label>
              <Input
                id="lotNo"
                value={partData.lotNo}
                onChange={(e) => setPartData(prev => ({ ...prev, lotNo: e.target.value }))}
                placeholder="Enter lot number"
              />
            </div>

            {/* Warranty Period */}
            <div className="space-y-2">
              <Label htmlFor="warrantyPeriod">Warranty Period (Months)</Label>
              <Select 
                value={partData.warrantyPeriod} 
                onValueChange={(value) => setPartData(prev => ({ ...prev, warrantyPeriod: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                  <SelectItem value="36">36 Months</SelectItem>
                  <SelectItem value="60">60 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inspection Due */}
            {/* <div className="space-y-2">
              <Label htmlFor="inspectionDue">Next Inspection Due</Label>
              <Input
                id="inspectionDue"
                type="date"
                value={partData.inspectionDue}
                onChange={(e) => setPartData(prev => ({ ...prev, inspectionDue: e.target.value }))}
              />
            </div> */}

            <Button 
              onClick={generateQRCode} 
              disabled={isGenerating}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate QR Code"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* QR Code Display Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              QR Code Preview
            </CardTitle>
            <CardDescription>
              Generated QR code for part identification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {qrDataUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {/* QR Code Image */}
                <div className="flex justify-center">
                  <div className="p-6 bg-white rounded-xl shadow-medium">
                    <img 
                      src={qrDataUrl} 
                      alt="Generated QR Code" 
                      className="w-64 h-64"
                    />
                  </div>
                </div>

                {/* Part Summary */}
                <div className="space-y-4">
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Package className="w-4 h-4 mr-2" />
                        Part Type
                      </div>
                      <Badge variant="outline">{partData.partType}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <User className="w-4 h-4 mr-2" />
                        Vendor
                      </div>
                      <Badge variant="outline">{partData.vendorId}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Mfg Date
                      </div>
                      <Badge variant="outline">{partData.mfgDate}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        Serial No
                      </div>
                      <Badge variant="outline">{partData.serialNo}</Badge>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    onClick={copyQRData} 
                    variant="outline"
                    className="flex-1"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-success" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Data
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={downloadQR}
                    className="flex-1 bg-gradient-secondary hover:opacity-90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Package className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-center">Fill in the part information and click "Generate QR Code" to create a unique identifier for this part.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};