import { getToken } from "./auth";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api";

export async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {

    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  credentials: "include"
  });

  try {
    const data = await res.json();
  console.log("Order saved:", data);
 
  if (!res.ok) {
    // هنا data.message غادي يكون "يجب تفعيل البريد الإلكتروني أولاً" أو أي رسالة أخرى
    throw new Error(data.message || "حدث خطأ غير معروف. حاول مرة أخرى.");
  }




  return data

} catch (error) {
  return error
}

//   if (!res.ok) {
//     const message = data?.message || "Request failed";
//     const error = new Error(message);
//     error.status = res.status;
//     error.responseText = text;
// // console.log(re.statuts,text)
//     throw error;
//   }


}

export async function apiRegister(payload) {
  return request("/register", { method: "POST", body: payload });
}

    export async function apiLogin(email, password) {
      return request("/login", { method: "POST", body: { email, password } });
    }

export async function resendVerificationEmail() {
  return request("/email/verification-notification", {
    method: "POST",
    auth: true,
  });
}

export async function getMe() {
  return request("/me", { method: "GET", auth: true });
}
