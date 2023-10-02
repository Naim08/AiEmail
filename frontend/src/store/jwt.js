import axios from "axios";

function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === cookieName) return value;
  }
  return null;
}

async function jwtFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};
  const jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) options.headers["Authorization"] = "Bearer " + jwtToken;

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  }

  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
}

function getAxiosCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === cookieName) return value;
  }
  return null;
}

export async function jwtAxiosFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  const jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) options.headers["Authorization"] = "Bearer " + jwtToken;

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["CSRF-Token"] = getAxiosCookie("CSRF-TOKEN");
  }

  try {
    const res = await axios(url, options);
    return res;
  } catch (error) {
    throw error.response; // axios stores the HTTP response inside the `response` field of the error object
  }
}

export default jwtFetch;
