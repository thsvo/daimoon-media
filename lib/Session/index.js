export async function UpdateSession(id, body) {
  await fetch('/api/session/updateSession', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: id,
      body: body,
    }),
  });
}

export async function CreateSession(id) {
  await fetch('/api/session/createSession', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: id,
      body: [
        {
          service: 'spotify',
          campaigns: [],
          total: 0,
        },
        {
          service: 'youtube',
          campaigns: [],
          total: 0,
        },
        {
          service: 'soundcloud',
          campaigns: [],
          total: 0,
        },
      ],
    }),
  });
}
