import React, { useEffect, useState } from "react";
import { randomString } from "../../lib/randomString";
import { sha256 } from "../../lib/sha256";
import { fetchJSON } from "../../../shared/fetchJSON";

export function StartLogin() {
  async function loadAuthorizationUri() {
    const { discovery_uri, client_id } = await fetchJSON("/api/login/config");
    const { authorization_endpoint } = await fetchJSON(discovery_uri);
    const state = randomString();
    const code_verifier = randomString();

    sessionStorage.setItem("expected_state", state);
    sessionStorage.setItem("code_verifier", code_verifier);

    const params = {
      response_type: "code",
      client_id,
      redirect_uri: window.location.origin + "/login/callback",
      scope: "name phoneNumber",
      state,
      code_challenge: await sha256(code_verifier),
      code_challenge_method: "S256",
    };
    setAuthorizationUri(
      authorization_endpoint + "?" + new URLSearchParams(params),
    );
  }

  const [authorizationUri, setAuthorizationUri] = useState<string>();
  useEffect(() => {
    loadAuthorizationUri().then();
  }, []);

  return authorizationUri ? (
    <div>
      Redirecting to <a href={authorizationUri}>{authorizationUri}</a>
    </div>
  ) : (
    <div>Please wait</div>
  );
}
