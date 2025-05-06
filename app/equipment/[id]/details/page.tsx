"use client"

import { useState } from "react"
import { Building2, Info } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data for the equipment details
const equipmentDetails = {
  id: "EQ-2024-001",
  description: "Heavy-duty underground drilling equipment for mining operations",
  parent: "Mining Equipment Division",
  location: "Underground Level 3, Section B",
  glAccount: "12345-678",
  rotatingArticle: true,
  assetModel: {
    id: "AM-2024-001",
    description: "HD-2000X Underground Drill",
    manufacturer: "DrillTech Industries",
    reference: "DT-HD2000X-2024",
    isMTE: true,
    status: "Active",
  },
  site: "North Mining Complex",
  isMTE: true,
  isLinear: false,
  isCalibrated: true,
  image: "/placeholder.svg",
}

export default function EquipmentDetailsPage() {
  const [isAssetModelOpen, setIsAssetModelOpen] = useState(false)

  return (
    <div className="min-h-screen space-y-8 bg-gray-50/50 p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Equipment Details</h1>
        <p className="text-muted-foreground">Technical specifications and asset information</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="relative aspect-square w-40 overflow-hidden rounded-lg border">
                <Image
                  src={equipmentDetails.image || "/placeholder.svg"}
                  alt={equipmentDetails.description}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label className="text-muted-foreground">Equipment ID</Label>
                  <p className="font-medium">{equipmentDetails.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="font-medium">{equipmentDetails.description}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-muted-foreground">Parent Equipment</Label>
                <p className="font-medium">{equipmentDetails.parent}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Location</Label>
                <p className="font-medium">{equipmentDetails.location}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">GL Account</Label>
                <p className="font-medium">{equipmentDetails.glAccount}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Site</Label>
                <p className="font-medium">{equipmentDetails.site}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Model */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Asset Model</CardTitle>
              <Dialog open={isAssetModelOpen} onOpenChange={setIsAssetModelOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Info className="h-4 w-4" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Asset Model Details</DialogTitle>
                    <DialogDescription>Detailed information about the equipment asset model</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Model ID</Label>
                      <p className="font-medium">{equipmentDetails.assetModel.id}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Description</Label>
                      <p className="font-medium">{equipmentDetails.assetModel.description}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Manufacturer</Label>
                      <p className="font-medium">{equipmentDetails.assetModel.manufacturer}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Reference</Label>
                      <p className="font-medium">{equipmentDetails.assetModel.reference}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <p className="font-medium">{equipmentDetails.assetModel.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={equipmentDetails.assetModel.isMTE} disabled />
                      <Label>Is M&TE</Label>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mte" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Is M&TE?
                  </Label>
                  <Switch id="mte" checked={equipmentDetails.isMTE} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="linear" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Linear?
                  </Label>
                  <Switch id="linear" checked={equipmentDetails.isLinear} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="calibrated" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Calibrated?
                  </Label>
                  <Switch id="calibrated" checked={equipmentDetails.isCalibrated} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

