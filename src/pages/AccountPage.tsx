import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginPassword } from "@/data/loginData";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
import { activities, sessions } from "@/data/accountData";

export default function AccountPage() {
  const documentTitle = useDocumentTitle();
  const user = useAuthStore((state) => state.user)!;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6 space-y-6">
        {/* Profile Banner & Hero Section */}
        <div className="border border-border/70 rounded-xl overflow-hidden bg-card/50 backdrop-blur-md shadow-xs">
          {/* Gradient Cover */}
          <div className="h-32 sm:h-44 w-full bg-[#00bc7d] dark:bg-[#1b1b1b] relative overflow-hidden"></div>

          {/* User Profile Header Content */}
          <div className="p-6 pt-0 flex flex-col sm:flex-row sm:items-end sm:gap-6 relative">
            <div className="relative -mt-12 sm:-mt-16 w-fit">
              <Avatar className="size-24 sm:size-32 border-4 border-card bg-card shadow-lg rounded-full">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback className="text-2xl font-semibold bg-muted-foreground/10">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 flex h-4 w-4 rounded-full border-2 border-card bg-emerald-500" />
            </div>

            <div className="mt-4 sm:mt-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {user.fullName}
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/15 border-none font-medium"
                >
                  Administrator
                </Badge>
                <Badge
                  variant="outline"
                  className="border-border/70 text-muted-foreground font-normal"
                >
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">@{user.userName}</p>
            </div>
          </div>
        </div>

        {/* Details & Activities Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Read-Only Information Form */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-card/50 shadow-xs border border-border/70">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="size-5 text-indigo-500" />
                  Account Details
                </CardTitle>
                <CardDescription>
                  Your current account profile credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <Field>
                    <FieldLabel
                      htmlFor="account-fullname"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      id="account-fullname"
                      value={user.fullName}
                      readOnly
                      className="bg-muted/40 cursor-default border-border/60 hover:border-border/60 focus-visible:border-border/60 focus-visible:ring-0 text-muted-foreground font-medium"
                    />
                    <FieldDescription className="text-xs text-muted-foreground/75">
                      User full name
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="account-username"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Username
                    </FieldLabel>
                    <Input
                      id="account-username"
                      value={user.userName}
                      readOnly
                      className="bg-muted/40 cursor-default border-border/60 hover:border-border/60 focus-visible:border-border/60 focus-visible:ring-0 text-muted-foreground font-medium"
                    />
                    <FieldDescription className="text-xs text-muted-foreground/75">
                      Active user ID
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="account-email"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      id="account-email"
                      value={user.email}
                      readOnly
                      className="bg-muted/40 cursor-default border-border/60 hover:border-border/60 focus-visible:border-border/60 focus-visible:ring-0 text-muted-foreground font-medium"
                    />
                    <FieldDescription className="text-xs text-muted-foreground/75">
                      Registration email
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="account-password"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative w-full flex items-center">
                      <Input
                        id="account-password"
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        readOnly
                        className="bg-muted/40 cursor-default border-border/60 hover:border-border/60 focus-visible:border-border/60 focus-visible:ring-0 pr-10 text-muted-foreground font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none transition-colors"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FieldDescription className="text-xs text-muted-foreground/75">
                      Password
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Context Card */}
            <Card className="bg-card/50 shadow-xs border border-border/70">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Lock className="size-5 text-indigo-500" />
                  Security Context
                </CardTitle>
                <CardDescription>
                  System parameters and scope permissions of the active session.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/20 border border-border/40 space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block font-semibold">
                      Role Tier
                    </span>
                    <span className="text-sm font-semibold">Global Admin</span>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/20 border border-border/40 space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block font-semibold">
                      Scope Permissions
                    </span>
                    <span className="text-sm font-semibold">
                      Read, Write, Execute
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sessions & Timeline */}
          <div className="space-y-6">
            {/* Active Sessions */}
            <Card className="bg-card/50 shadow-xs border border-border/70">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Active Devices
                </CardTitle>
                <CardDescription>
                  Current active devices authorized to access the session.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions.map((session, index) => {
                  const Icon = session.icon;
                  return (
                    <div
                      key={index}
                      className="flex gap-3 items-start p-3 rounded-lg bg-muted/20 border border-border/40"
                    >
                      <div className="p-2 bg-primary/10 rounded-md text-primary mt-0.5">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-sm font-medium truncate">
                            {session.device}
                          </p>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              session.status === "Active Now"
                                ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {session.browser}
                        </p>
                        <p className="text-[11px] text-muted-foreground/75 mt-1">
                          {session.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-card/50 shadow-xs border border-border/70">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Recent Operations
                </CardTitle>
                <CardDescription>
                  A timeline log of operations during the current session.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l border-border/70 space-y-6">
                  {activities.map((act) => {
                    const Icon = act.icon;
                    return (
                      <div key={act.id} className="relative">
                        {/* Timeline node icon */}
                        <div
                          className={`absolute -left-9.25 top-1.5 size-7 rounded-full flex items-center justify-center border-4 border-card ${act.iconColor}`}
                        >
                          <Icon className="size-3.5" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-xs font-semibold text-foreground/90">
                              {act.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {act.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground/85 leading-relaxed">
                            {act.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
