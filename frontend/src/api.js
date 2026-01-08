const API_BASE = import.meta.env.VITE_API_BASE;

async function authedFetch(idToken, path, options = {}) {
  if (!idToken) throw new Error("Missing idToken");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return res;
}

export async function listNotes(idToken) {
  const res = await authedFetch(idToken, "/notes");
  return res.json();
}

export async function createNote(idToken) {
  const res = await authedFetch(idToken, "/notes", {
    method: "POST",
    body: JSON.stringify({ title: "", content: "" }),
  });
  return res.json();
}

export async function updateNote(idToken, id, data) {
  const res = await authedFetch(idToken, `/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNote(idToken, id) {
  await authedFetch(idToken, `/notes/${id}`, { method: "DELETE" });
}
