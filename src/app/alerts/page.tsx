"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

interface Alert {
  id: string;
  token: string;
  condition: "above" | "below";
  price: string;
  isActive: boolean;
  createdAt: string;
  triggered: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    token: "PEPE",
    condition: "above",
    price: "$0.000015",
    isActive: true,
    createdAt: "2 days ago",
    triggered: false,
  },
  {
    id: "2",
    token: "SHIB",
    condition: "below",
    price: "$0.000020",
    isActive: true,
    createdAt: "1 week ago",
    triggered: false,
  },
  {
    id: "3",
    token: "DOGE",
    condition: "above",
    price: "$0.10",
    isActive: false,
    createdAt: "3 days ago",
    triggered: true,
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const activeAlerts = alerts.filter(a => a.isActive).length;
  const triggeredAlerts = alerts.filter(a => a.triggered).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Price Alerts</h1>
            <p className="text-muted-foreground">
              Get notified when tokens reach your target prices
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Price Alert</DialogTitle>
                <DialogDescription>
                  Set up a new price alert for your favorite tokens
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <Input id="token" placeholder="e.g., PEPE" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select defaultValue="above">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Price goes above</SelectItem>
                      <SelectItem value="below">Price goes below</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Target Price</Label>
                  <Input id="price" type="number" placeholder="0.00" step="0.000001" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  Create Alert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-3xl font-bold mt-2">{alerts.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Bell className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-3xl font-bold mt-2">{activeAlerts}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Triggered</p>
                <p className="text-3xl font-bold mt-2">{triggeredAlerts}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <TrendingDown className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts List */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Alerts</h3>
            {alerts.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No alerts yet</p>
                <p className="text-muted-foreground mb-4">
                  Create your first price alert to get started
                </p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        alert.condition === "above"
                          ? "bg-green-500/10"
                          : "bg-red-500/10"
                      }`}>
                        {alert.condition === "above" ? (
                          <TrendingUp className={`h-5 w-5 ${
                            alert.condition === "above"
                              ? "text-green-500"
                              : "text-red-500"
                          }`} />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{alert.token}</p>
                          {alert.triggered && (
                            <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                              Triggered
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Alert when price goes {alert.condition} {alert.price}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created {alert.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`alert-${alert.id}`} className="text-sm cursor-pointer">
                          {alert.isActive ? "Active" : "Inactive"}
                        </Label>
                        <Switch
                          id={`alert-${alert.id}`}
                          checked={alert.isActive}
                          onCheckedChange={() => toggleAlert(alert.id)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteAlert(alert.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
