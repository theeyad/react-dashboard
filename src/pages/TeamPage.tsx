import { useState, useMemo } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { teamMembers } from "@/data/teamMembers";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Search,
  Mail,
  Calendar,
  Users,
  UserCheck,
  Trophy,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamPage() {
  const documentTitle = useDocumentTitle();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Dynamic calculations for stats overview cards
  const stats = useMemo(() => {
    const total = teamMembers.length;
    const active = teamMembers.filter((m) => m.isActive).length;
    const avgPerformance = total
      ? Math.round(teamMembers.reduce((acc, m) => acc + m.performanceScore, 0) / total)
      : 0;
    const totalProjects = teamMembers.reduce((acc, m) => acc + m.projectsCompleted, 0);

    return { total, active, avgPerformance, totalProjects };
  }, []);

  // Filter and sort team members
  const filteredMembers = useMemo(() => {
    return teamMembers
      .filter((member) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && member.isActive) ||
          (statusFilter === "inactive" && !member.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "performance") {
          return b.performanceScore - a.performanceScore;
        } else if (sortBy === "projects") {
          return b.projectsCompleted - a.projectsCompleted;
        }
        return 0;
      });
  }, [searchTerm, statusFilter, sortBy]);

  return (
    <>
      <h1 className="text-2xl font-bold">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6">
        {/* Stats Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Members
              </CardDescription>
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Full-time collaborators
              </p>
            </CardContent>
          </Card>

          <Card className="@container/card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Status
              </CardDescription>
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <UserCheck className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.active}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  / {stats.total}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently online/active
              </p>
            </CardContent>
          </Card>

          <Card className="@container/card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avg Performance
              </CardDescription>
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <Trophy className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgPerformance}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Overall team score
              </p>
            </CardContent>
          </Card>

          <Card className="@container/card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Projects
              </CardDescription>
              <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                <Briefcase className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Successfully completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search, Filter, Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team by name, role, or email..."
              className="pl-9 w-full bg-background/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end w-full md:w-auto">
            <div className="flex items-center gap-3.25">
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Status:
              </span>
              <Select
                value={statusFilter}
                onValueChange={(val) => setStatusFilter(val || "all")}
              >
                <SelectTrigger className="w-40 bg-background/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Sort by:
              </span>
              <Select
                value={sortBy}
                onValueChange={(val) => setSortBy(val || "name")}
              >
                <SelectTrigger className="w-40 bg-background/50">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Alphabetical</SelectItem>
                  <SelectItem value="performance">
                    Highest Performance
                  </SelectItem>
                  <SelectItem value="projects">Most Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card
                key={member.id}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-border/60 hover:border-primary/30 group bg-card h-full"
              >
                {/* Visual Top Highlight Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary/30 via-primary/50 to-primary/30" />

                <CardContent className="pt-6 pb-6 flex flex-col flex-1">
                  {/* Member Identity & Status Badge */}
                  <div className="flex flex-col xs:flex-row items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-background shadow-sm shrink-0">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                          {member.name}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground leading-normal mt-0.5">
                          {member.position}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={member.isActive ? "default" : "secondary"}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-semibold text-[11px] shadow-none border",
                        member.isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
                      )}
                    >
                      <span
                        className={cn(
                          "mr-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                          member.isActive
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-red-500",
                        )}
                      />
                      {member.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <Separator className="my-5 mt-auto" />

                  {/* Core KPI metrics */}
                  <div className="grid grid-cols-3 gap-2 py-1 text-center bg-muted/40 dark:bg-muted/10 rounded-lg p-2.5">
                    <div>
                      <span className="block text-xl font-bold tracking-tight text-foreground tabular-nums">
                        {member.projectsCompleted}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                        Projects
                      </span>
                    </div>
                    <div className="border-x border-border/60">
                      <span className="block text-xl font-bold tracking-tight text-foreground tabular-nums">
                        {member.tasksCompleted}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                        Tasks Done
                      </span>
                    </div>
                    <div>
                      <span className="block text-xl font-bold tracking-tight text-primary tabular-nums">
                        {member.performanceScore}%
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                        Perf. Score
                      </span>
                    </div>
                  </div>

                  <Separator className="my-5" />

                  {/* Contact Info & Join Date */}
                  <div className="space-y-2.5 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2.5 hover:text-primary transition-colors w-fit group/email"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-muted-foreground/80 group-hover/email:text-primary transition-colors" />
                      <span className="truncate max-w-55">{member.email}</span>
                    </a>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 shrink-0 text-muted-foreground/80" />
                      <span>
                        Joined{" "}
                        {new Date(member.joinedDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="mt-8 flex">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer hover:bg-muted"
                      onClick={() =>
                        (window.location.href = `mailto:${member.email}`)
                      }
                    >
                      <Mail className="mr-1.5 h-3.5 w-3.5" /> Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-xl bg-muted/20">
            <Users className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <h3 className="font-semibold text-base text-foreground">
              No team members found
            </h3>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
              We couldn't find any team members. Try adjusting your keywords or
              filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
