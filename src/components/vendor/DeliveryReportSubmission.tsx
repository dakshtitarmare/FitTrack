import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Package, Calendar, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface DeliveryReportData {
  deliveryId: string
  partType: string
  quantity: number
  deliveryDate: string
  location: string
  vendorId: string
  driverName: string
  vehicleNumber: string
  qualityCheck: string
  remarks: string
  attachments: File[]
}

export const DeliveryReportSubmission = () => {
  const [reportData, setReportData] = useState<DeliveryReportData>({
    deliveryId: '',
    partType: '',
    quantity: 0,
    deliveryDate: '',
    location: '',
    vendorId: 'VND101',
    driverName: '',
    vehicleNumber: '',
    qualityCheck: '',
    remarks: '',
    attachments: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const generateDeliveryId = () => {
    const timestamp = Date.now().toString().slice(-6)
    const newId = `DEL${timestamp}`
    setReportData(prev => ({ ...prev, deliveryId: newId }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setReportData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reportData.deliveryId || !reportData.partType || !reportData.quantity || !reportData.deliveryDate) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Delivery report submitted successfully!')
      setSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setReportData({
          deliveryId: '',
          partType: '',
          quantity: 0,
          deliveryDate: '',
          location: '',
          vendorId: 'VND101',
          driverName: '',
          vehicleNumber: '',
          qualityCheck: '',
          remarks: '',
          attachments: []
        })
      }, 3000)
      
    } catch (error) {
      toast.error('Failed to submit delivery report')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">Report Submitted Successfully!</h3>
        <p className="text-muted-foreground">Your delivery report has been recorded and will be reviewed.</p>
        <Badge className="mt-4 bg-green-100 text-green-800">
          Delivery ID: {reportData.deliveryId}
        </Badge>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <FileText className="w-6 h-6 mr-3 text-primary" />
            Delivery Report Submission
          </CardTitle>
          <CardDescription>
            Submit delivery reports for railway fitting parts and track completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Delivery ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryId">Delivery ID *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="deliveryId"
                    value={reportData.deliveryId}
                    onChange={(e) => setReportData(prev => ({ ...prev, deliveryId: e.target.value }))}
                    placeholder="DEL123456"
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateDeliveryId}>
                    Generate
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="partType">Part Type *</Label>
                <Select value={reportData.partType} onValueChange={(value) => setReportData(prev => ({ ...prev, partType: value }))}>
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
            </div>

            {/* Quantity and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Delivered *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={reportData.quantity}
                  onChange={(e) => setReportData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  placeholder="1000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={reportData.deliveryDate}
                  onChange={(e) => setReportData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Delivery Location *</Label>
              <Input
                id="location"
                value={reportData.location}
                onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Northern Zone - Track 12A, Delhi"
                required
              />
            </div>

            {/* Driver and Vehicle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name</Label>
                <Input
                  id="driverName"
                  value={reportData.driverName}
                  onChange={(e) => setReportData(prev => ({ ...prev, driverName: e.target.value }))}
                  placeholder="Driver name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                <Input
                  id="vehicleNumber"
                  value={reportData.vehicleNumber}
                  onChange={(e) => setReportData(prev => ({ ...prev, vehicleNumber: e.target.value }))}
                  placeholder="DL01AB1234"
                />
              </div>
            </div>

            {/* Quality Check */}
            <div className="space-y-2">
              <Label htmlFor="qualityCheck">Quality Check Status</Label>
              <Select value={reportData.qualityCheck} onValueChange={(value) => setReportData(prev => ({ ...prev, qualityCheck: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passed">Quality Passed</SelectItem>
                  <SelectItem value="failed">Quality Failed</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={reportData.remarks}
                onChange={(e) => setReportData(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="Any additional notes about the delivery..."
                rows={3}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Delivery Documents</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload delivery receipts, quality certificates, or photos
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="max-w-xs mx-auto"
                />
                {reportData.attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Attached files:</p>
                    {reportData.attachments.map((file, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mt-1">
                        {file.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-railway"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Report...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Delivery Report</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Recent Delivery Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'DEL789123', type: 'ERC', quantity: 1500, date: '2024-08-20', status: 'approved' },
              { id: 'DEL789124', type: 'RPD', quantity: 800, date: '2024-08-19', status: 'pending' },
              { id: 'DEL789125', type: 'LNR', quantity: 1200, date: '2024-08-18', status: 'approved' },
            ].map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{report.id}</p>
                  <p className="text-sm text-muted-foreground">{report.type} - {report.quantity} units</p>
                </div>
                <div className="text-right">
                  <Badge variant={report.status === 'approved' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
