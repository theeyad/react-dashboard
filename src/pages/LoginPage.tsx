import { AlertDestructive } from "@/components/AlertDestructive";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type AuthError = { title: string; desc: string } | null;

export default function LoginPage() {
  // login function from store
  const login = useAuthStore((s) => s.login);

  // form states
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [authError, setAuthError] = useState<AuthError>(null);

  useEffect(() => {
    if (!authError) return;

    const timer = window.setTimeout(() => {
      setAuthError(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [authError]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const success = login({ userName, password });
    if (success) {
      navigate("/dashboard", { replace: true });
    } else {
      setAuthError({
        title: "Login Failed",
        desc: "Wrong username or password.",
      });
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md px-4">
        {authError ? (
          <AlertDestructive
            className="mb-5"
            alertTitle={authError.title}
            alertDesc={authError.desc}
          />
        ) : null}

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Login Form</FieldLegend>
              <FieldDescription>
                Login to gain acess to dashboard
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="login-username">Username</FieldLabel>
                  <Input
                    id="login-username"
                    placeholder="EyadOsman123"
                    autoComplete="off"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <FieldDescription>Enter your username</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    id="login-password"
                    placeholder="123456789"
                    autoComplete="current-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FieldDescription>Enter your password</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
              <Button type="submit" style={{ cursor: "pointer" }}>
                Submit
              </Button>
              <Button
                variant="outline"
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setUserName("");
                  setPassword("");
                }}
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
