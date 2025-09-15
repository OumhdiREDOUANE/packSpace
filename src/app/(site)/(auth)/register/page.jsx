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
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "nomComplet", label: "Nom complet" },
    { name: "numero_telephone", label: "Numéro de téléphone" },
    { name: "email", label: "Adresse e-mail" },
    { name: "password", label: "Mot de passe" },
    { name: "password_confirmation", label: "Confirmer le mot de passe" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center font-inter">
          Créer un compte
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1 font-inter">
                {field.label}
              </label>
              <input
                type={field.name.includes("password") ? "password" : "text"}
                name={field.name}
                value={form[field.name]}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:outline-none font-inter font-medium"
              />
            </div>
          ))}

          {error && (
            <div className="p-3 rounded-xl text-sm text-center font-inter font-normal">
              {error}
            </div>
          )}
          {msg && (
            <div className="p-3 rounded-xl text-sm text-center font-inter font-normal">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl font-inter font-semibold text-lg flex items-center justify-center disabled:opacity-50"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 font-inter font-normal">
          Vous avez déjà un compte ?{" "}
          <span
            onClick={() => router.push("/login")}
            className="font-inter font-medium cursor-pointer"
          >
            Connectez-vous
          </span>
        </p>
      </div>
    </div>
  );
}
