"use client";
import { useState } from "react";
import { apiRegister } from "src/app/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nomComplet: "",
    numero_telephone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    
    e.preventDefault();
    setError(null);
    setMsg(null);
    setLoading(true);
    try {
      const { message } = await apiRegister(form);
      setMsg(message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">إنشاء حساب</h2>
      <form onSubmit={onSubmit} method="post" className="space-y-4">
        {["nomComplet","numero_telephone","email","password","password_confirmation"].map((field) => (
          <div key={field}>
            <label className="block text-sm mb-1">{field}</label>
            <input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              className="w-full border rounded-xl px-3 py-2"
              value={form[field]}
              onChange={onChange}
              required
            />
          </div>
        ))}
        {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">{error}</div>}
        {msg && <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm">{msg}</div>}
        <button
          disabled={loading}
          className="w-full rounded-xl py-2 bg-gray-900 text-white disabled:opacity-50"
        >
          {loading ? "..." : "تسجيل"}
        </button>
      </form>
    </div>
  );
}
