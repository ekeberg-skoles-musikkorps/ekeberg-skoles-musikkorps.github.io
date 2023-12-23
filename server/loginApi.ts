import express from "express";
import { fetchJSON } from "../shared/fetchJSON";

export function loginApi() {
  const discovery_uri = process.env.VIPPS_OPENID_CONFIGURATION;
  const client_id = process.env.VIPPS_CLIENT_ID;
  const client_secret = process.env.VIPPS_CLIENT_SECRET;
  if (!discovery_uri || !client_id || !client_secret) {
    throw Error("Missing VIPPS config");
  }

  const loginApi = express.Router();

  loginApi.get("/api/login/config", (_, res) => {
    res.send({ discovery_uri, client_id });
  });

  loginApi.post("/api/login", async (req, res) => {
    const { code, code_verifier, redirect_uri, grant_type } = req.body;

    const { token_endpoint } = await fetchJSON(discovery_uri);
    const tokenRes = await fetch(token_endpoint, {
      method: "POST",
      body: new URLSearchParams({
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
        code,
        code_verifier,
      }),
    });
    if (tokenRes.ok) {
      const { access_token } = await tokenRes.json();
      res.cookie("vipps_access_token", access_token, { signed: true });
      res.send(200);
    } else {
      console.log(
        `Whoa! ${token_endpoint} failed ${
          tokenRes.status
        }: ${await tokenRes.text()}`,
      );
      res.send(500);
    }
  });

  loginApi.get("/api/login", async (req, res) => {
    const { vipps_access_token } = req.signedCookies;
    if (!vipps_access_token) {
      return res.send(401);
    }
    const { userinfo_endpoint } = await fetchJSON(discovery_uri);
    res.send(
      await fetchJSON(userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${vipps_access_token}`,
        },
      }),
    );
  });

  return loginApi;
}
