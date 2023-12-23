import React, { useEffect, useState } from "react";
import { fetchJSON } from "../../../shared/fetchJSON";

export function ProfileView() {
  const [profile, setProfile] = useState<any>();

  async function loadProfile() {
    setProfile(await fetchJSON("/api/login"));
  }

  useEffect(() => {
    loadProfile().then();
  }, []);

  if (!profile) {
    return <div>Wait...</div>;
  }

  return (
    <>
      <h2>Profile page</h2>
      <div>
        <strong>Name:</strong> {profile.name}
      </div>
      <div>
        <strong>Phone number:</strong> {profile.phone_number}
      </div>
    </>
  );
}
