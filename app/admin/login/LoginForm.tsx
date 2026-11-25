"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { error: "" });
  return (
    <form action={action} className="stack">
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="input" required autoComplete="username" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="input" required autoComplete="current-password" />
      </div>
      {state.error && (
        <div className="notice error" role="alert">
          <p>{state.error}</p>
        </div>
      )}
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
