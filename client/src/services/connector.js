const baseUrl = "http://127.0.0.1:5000/api";

export const connect = async (url, method, body, token) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: body,
  });

  return response.json();
};
