
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { Globe, Mail, BarChart2, Link, QrCode, History } from "lucide-react"

export function CloudExport() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Globe className="mr-2 h-4 w-4" />
          Cloud Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Cloud Export & Integrations</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="export">
          <TabsList>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="export">
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Export your data to your favorite cloud services.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Google Sheets
                </Button>
                <Button variant="outline">Dropbox</Button>
                <Button variant="outline">OneDrive</Button>
                <Button variant="outline">Notion</Button>
                <Button variant="outline">Airtable</Button>
              </div>
              <div className="mt-4">
                <Label>Export Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax">Tax Report</SelectItem>
                    <SelectItem value="monthly">Monthly Summary</SelectItem>
                    <SelectItem value="category">
                      Category Analysis
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="share">
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Generate a shareable link or QR code for your export.
              </p>
              <div className="flex items-center space-x-2">
                <Input value="https://yourexpense.data/share/xY2zAbC" readOnly />
                <Button>
                  <Link className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
              <div className="flex justify-center mt-4">
                <div className="p-4 bg-white rounded-md">
                  <QrCode size={128} />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="schedule">
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Set up automatic backups to your preferred cloud service.
              </p>
              <div className="flex items-center justify-between">
                <Label>Enable Automatic Backups</Label>
                <Switch />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cloud Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gdrive">Google Drive</SelectItem>
                      <SelectItem value="dropbox">Dropbox</SelectItem>
                      <SelectItem value="onedrive">OneDrive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                View your recent export history.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monthly Summary</p>
                    <p className="text-sm text-muted-foreground">
                      Exported to Google Sheets
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sep 20, 2025, 10:30 AM
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tax Report</p>
                    <p className="text-sm text-muted-foreground">
                      Emailed to accountant@example.com
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sep 15, 2025, 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
