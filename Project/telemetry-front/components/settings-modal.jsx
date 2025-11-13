"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Monitor, Bell, Shield, Palette, Volume2, Battery, Thermometer, Zap } from "lucide-react"

export function SettingsModal({ open, onOpenChange }) {
  // General Settings
  const [units, setUnits] = useState("metric")
  const [language, setLanguage] = useState("en")
  const [autoSave, setAutoSave] = useState(true)
  const [syncCloud, setSyncCloud] = useState(false)

  // Display Settings
  const [theme, setTheme] = useState("dark")
  const [refreshRate, setRefreshRate] = useState([5])
  const [chartAnimation, setChartAnimation] = useState(true)
  const [compactMode, setCompactMode] = useState(false)

  // Notifications
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [alertThresholds, setAlertThresholds] = useState({
    batteryLow: 20,
    tempHigh: 80,
    speedLimit: 120,
  })

  // Data & Privacy
  const [dataCollection, setDataCollection] = useState(true)
  const [analytics, setAnalytics] = useState(false)
  const [locationTracking, setLocationTracking] = useState(true)

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Settings saved:", {
      units,
      language,
      autoSave,
      syncCloud,
      theme,
      refreshRate: refreshRate[0],
      chartAnimation,
      compactMode,
      pushNotifications,
      emailAlerts,
      soundEnabled,
      alertThresholds,
      dataCollection,
      analytics,
      locationTracking,
    })
    onOpenChange(false)
  }

  const handleReset = () => {
    // Reset to defaults
    setUnits("metric")
    setLanguage("en")
    setAutoSave(true)
    setSyncCloud(false)
    setTheme("dark")
    setRefreshRate([5])
    setChartAnimation(true)
    setCompactMode(false)
    setPushNotifications(true)
    setEmailAlerts(false)
    setSoundEnabled(true)
    setAlertThresholds({
      batteryLow: 20,
      tempHigh: 80,
      speedLimit: 120,
    })
    setDataCollection(true)
    setAnalytics(false)
    setLocationTracking(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-foreground">
            <Settings className="h-5 w-5 text-primary" />
            Dashboard Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background/50">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Display
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            {/* General Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                General Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units" className="text-foreground">
                    Units
                  </Label>
                  <Select value={units} onValueChange={setUnits}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (km/h, °C, kWh)</SelectItem>
                      <SelectItem value="imperial">Imperial (mph, °F, kWh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="text-foreground">
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Auto-save Settings</Label>
                  <p className="text-sm text-muted-foreground">Automatically save changes as you make them</p>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Cloud Sync</Label>
                  <p className="text-sm text-muted-foreground">Sync settings across devices</p>
                </div>
                <Switch checked={syncCloud} onCheckedChange={setSyncCloud} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="display" className="space-y-6 mt-6">
            {/* Display Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                Display & Appearance
              </h3>

              <div className="space-y-2">
                <Label htmlFor="theme" className="text-foreground">
                  Theme
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-2">
                <Label className="text-foreground">Refresh Rate: {refreshRate[0]} seconds</Label>
                <Slider
                  value={refreshRate}
                  onValueChange={setRefreshRate}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">How often the dashboard updates with new data</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Chart Animations</Label>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                </div>
                <Switch checked={chartAnimation} onCheckedChange={setChartAnimation} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Show more data in less space</p>
                </div>
                <Switch checked={compactMode} onCheckedChange={setCompactMode} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            {/* Notifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications & Alerts
              </h3>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive real-time alerts in your browser</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">Send critical alerts to your email</p>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Sound Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Play sounds for important alerts</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Alert Thresholds</h4>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Battery className="h-4 w-4 text-yellow-400" />
                    Low Battery Warning: {alertThresholds.batteryLow}%
                  </Label>
                  <Slider
                    value={[alertThresholds.batteryLow]}
                    onValueChange={(value) => setAlertThresholds((prev) => ({ ...prev, batteryLow: value[0] }))}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-400" />
                    High Temperature Alert: {alertThresholds.tempHigh}°C
                  </Label>
                  <Slider
                    value={[alertThresholds.tempHigh]}
                    onValueChange={(value) => setAlertThresholds((prev) => ({ ...prev, tempHigh: value[0] }))}
                    max={100}
                    min={60}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    Speed Limit Alert: {alertThresholds.speedLimit} km/h
                  </Label>
                  <Slider
                    value={[alertThresholds.speedLimit]}
                    onValueChange={(value) => setAlertThresholds((prev) => ({ ...prev, speedLimit: value[0] }))}
                    max={200}
                    min={80}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 mt-6">
            {/* Data & Privacy */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Data & Privacy
              </h3>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow collection of usage data to improve the dashboard
                  </p>
                </div>
                <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Share anonymous analytics to help improve features</p>
                </div>
                <Switch checked={analytics} onCheckedChange={setAnalytics} />
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Location Tracking</Label>
                  <p className="text-sm text-muted-foreground">Enable location-based features and trip tracking</p>
                </div>
                <Switch checked={locationTracking} onCheckedChange={setLocationTracking} />
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <h4 className="font-medium text-foreground mb-2">Data Export</h4>
                <p className="text-sm text-muted-foreground mb-3">Download your data or request account deletion</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t border-border/30">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
