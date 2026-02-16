import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { BillStatusBadge } from "@/components/BillStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, Users, CheckCircle, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const activityData = [
  { month: "Jan", bills: 142 },
  { month: "Feb", bills: 189 },
  { month: "Mar", bills: 234 },
  { month: "Apr", bills: 198 },
  { month: "May", bills: 267 },
  { month: "Jun", bills: 312 },
];

const statusData = [
  { name: "Introduced", value: 420, color: "hsl(210, 80%, 52%)" },
  { name: "In Committee", value: 280, color: "hsl(38, 92%, 50%)" },
  { name: "Passed", value: 150, color: "hsl(152, 60%, 40%)" },
  { name: "Failed", value: 85, color: "hsl(0, 72%, 51%)" },
];

const recentBills = [
  { number: "AB 1234", title: "California Housing Accountability Act", status: "In Committee", author: "Smith", date: "2025-03-15" },
  { number: "SB 567", title: "Clean Energy Infrastructure Investment", status: "Introduced", author: "Jones", date: "2025-03-14" },
  { number: "AB 890", title: "Public Education Funding Reform", status: "Passed", author: "Garcia", date: "2025-03-13" },
  { number: "SB 234", title: "Healthcare Access Expansion Act", status: "In Committee", author: "Williams", date: "2025-03-12" },
  { number: "AB 456", title: "Environmental Protection Standards", status: "Introduced", author: "Chen", date: "2025-03-11" },
  { number: "SB 789", title: "Transportation Safety Improvement", status: "Failed", author: "Davis", date: "2025-03-10" },
];

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard" description="Legislative activity overview">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Bills" value="1,342" change="+12% from last month" changeType="positive" icon={ScrollText} />
          <StatCard title="Active Authors" value="287" change="+5 new this week" changeType="positive" icon={Users} />
          <StatCard title="Bills Passed" value="150" change="11.2% pass rate" changeType="neutral" icon={CheckCircle} />
          <StatCard title="Pending Review" value="436" change="-8% from last week" changeType="negative" icon={Clock} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="glass-card lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Bill Activity</CardTitle>
                <div className="flex items-center gap-1 text-xs text-success font-medium">
                  <TrendingUp className="h-3 w-3" /> +18%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 16%, 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="bills" fill="hsl(222, 60%, 18%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] text-muted-foreground">{item.name}</span>
                    <span className="text-[11px] font-medium text-foreground ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bills */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Bills</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Bill</th>
                    <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Title</th>
                    <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Author</th>
                    <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBills.map((bill) => (
                    <tr key={bill.number} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="py-3 px-5 font-semibold text-primary">{bill.number}</td>
                      <td className="py-3 px-5 text-foreground max-w-xs truncate">{bill.title}</td>
                      <td className="py-3 px-5"><BillStatusBadge status={bill.status} /></td>
                      <td className="py-3 px-5 text-muted-foreground">{bill.author}</td>
                      <td className="py-3 px-5 text-muted-foreground">{bill.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
