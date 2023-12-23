export async function fetchJSON(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw Error(`Failed to fetch ${input}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}
