import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <AppLayout title="Settings" description="Configure your Legisly instance">
      <div className="space-y-6 max-w-2xl">
        {/* Data Source */}
        <Card className="glass-card animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Data Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Legislature Data URL</Label>
              <Input defaultValue="https://downloads.leginfo.legislature.ca.gov/" className="font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Default File</Label>
              <Input defaultValue="pubinfo_daily_Mon.zip" className="font-mono text-sm" />
            </div>
          </CardContent>
        </Card>

        {/* Database */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">PostgreSQL Connection</Label>
              <Input defaultValue="postgresql://localhost:5432/legisly" className="font-mono text-sm" type="password" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Database Name</Label>
                <Input defaultValue="legisly" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Schema</Label>
                <Input defaultValue="public" className="text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Automation */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Automation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-sync daily</p>
                <p className="text-xs text-muted-foreground">Automatically run pipeline every morning</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email notifications</p>
                <p className="text-xs text-muted-foreground">Get notified on pipeline errors</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-generate weekly report</p>
                <p className="text-xs text-muted-foreground">Generate PDF report every Monday</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Settings
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
