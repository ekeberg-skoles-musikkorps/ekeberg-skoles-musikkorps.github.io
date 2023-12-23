import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchToken() {
    const params = Object.fromEntries(
      new URLSearchParams(location.search.substring(1)),
    );
    const { code, state } = params;
    const expected_state = sessionStorage.getItem("expected_state")!;
    if (state !== expected_state) {
      throw Error(`Login request not initialized by me?`);
    }
    const code_verifier = sessionStorage.getItem("code_verifier")!;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        code,
        code_verifier,
        grant_type: "authorization_code",
        redirect_uri: window.location.origin + "/login/callback",
      }),
    });
    if (!res.ok) {
      throw Error(`Failed to login: ${res.status} ${res.statusText}`);
    }
    navigate("/login/profile");
    sessionStorage.removeItem("code_verifier");
    sessionStorage.removeItem("expected_state");
  }

  useEffect(() => {
    fetchToken().then();
  }, []);

  return <div>Please wait</div>;
}
