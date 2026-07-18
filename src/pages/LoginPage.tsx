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
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={(e) => e.preventDefault()}>
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
                  <FieldLabel htmlFor="login-full-name">Full Name</FieldLabel>
                  <Input
                    id="login-full-name"
                    placeholder="Eyad Othman"
                    autoComplete="off"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <FieldDescription>Enter your full name</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    id="login-password"
                    placeholder="123456789"
                    autoComplete="current-password"
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
              <Button
                type="submit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  login({
                    userName: userName,
                    fullName: fullName,
                    password: password,
                  });

                  navigate("/dashboard", {replace: true});
                }}
              >
                Submit
              </Button>
              <Button
                variant="outline"
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setUserName("");
                  setPassword("");
                  setFullName("");
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
