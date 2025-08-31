// app/cart/page.jsx (Server Component)
import CartClient from "./cartClient";
import { cookies } from "next/headers";

async function getOrders(sessionId, token) {
  let res;

  if (token) {
    res = await fetch(`http://127.0.0.1:8000/api/cart/${sessionId}`, {
      cache: "no-store",
      credentials: "include",
      headers: { "Authorization": `Bearer ${token}` },
    });
  } else {
    res = await fetch(`http://127.0.0.1:8000/api/cart/notLogin/${sessionId}`, {
      cache: "no-store",
      credentials: "include",
    });
  }
console.log(res)
  if (!res.ok) {
    const text = await res.text();
    console.error("Laravel API error:", res.status, text);
    throw new Error("Erreur lors du chargement des commandes");
  }

  const data = await res.json();
  return data;
}

export default async function CartClientPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value || 0;
  const token = cookieStore.get("token")?.value || "";

  const orders = await getOrders(sessionId, token);

  return <CartClient sessionId={sessionId} orders={orders} token={token} />;
}
