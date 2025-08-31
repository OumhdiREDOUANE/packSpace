
"use client";
import { useState,useEffect } from "react";
import { apiLogin, resendVerificationEmail } from "src/app/lib/api";
import { useAuth } from "src/app/components/AuthProvider";
import Cookies  from "js-cookie" ;
import { useRouter,useSearchParams  } from "next/navigation";
import Link from 'next/link';
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const verifyUrl = searchParams.get("verifyUrl");

  useEffect(() => {
    if (verifyUrl) {
      const backendUrl = "http://127.0.0.1:8000" + verifyUrl;
      fetch(backendUrl, { method: "GET", credentials: "include" })
        .then(res => res.json())
        .then(data => {
          alert(data.message || "تم تفعيل البريد الإلكتروني بنجاح!");
        })
        .catch(err => console.error(err));
    }
  }, [verifyUrl]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const response = await apiLogin(email, password);
    
      // إذا كانت هناك رسالة خطأ من السيرفر (مثلاً البريد غير مفعل أو بيانات غير صحيحة)
      if (response.message && !response.user) {
        setError(response.message); // يظهر رسالة "يجب تفعيل البريد الإلكتروني أولاً" أو "بيانات الاعتماد غير صحيحة"
        setLoading(false);
        return;
      }
    
      // حفظ التوكن إذا موجود

if (response.token) {
  Cookies.set("token", response.token);
  login(response.token); // ← يحدث Header فورًا
}
      console.log(response); // لمعرفة بيانات الـ user والتوكن
    
      // إعادة التوجيه حسب الدور
      if (response.user.role === "admin") {
        router.push("/cartClient");
      } else {
        router.push("/");
      }
    
    } catch (err) {
      // إذا حصل خطأ غير متوقع
      console.error(err);
    
      // حاول جلب رسالة الخطأ من response إذا كانت موجودة
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "حدث خطأ غير معروف. حاول مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
    
  
      
     
      
    

    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">تسجيل الدخول</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            className="w-full border rounded-xl px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">كلمة المرور</label>
          <input
            type="password"
            className="w-full border rounded-xl px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">
            {error}
            {error.includes("تفعيل البريد") && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await resendVerificationEmail();
                    setInfo("تم إرسال رابط التحقق إلى بريدك الإلكتروني");
                  } catch (e) {
                    setError(e.message);
                  }
                }}
                className="underline block mt-2"
              >
                إعادة إرسال رابط التحقق
              </button>
            )}
          </div>
        )}
        
        {info && (
          <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm">{info}</div>
        )}
        <button
          disabled={loading}
          className="w-full rounded-xl py-2 bg-gray-900 text-white disabled:opacity-50"
        >
          {loading ? "..." : "دخول"}
        </button>
      </form>
      <p className="text-sm mt-4 text-center">
        ليس لديك حساب؟ {" "}
        <Link  href="/register" className="underline">
        
          إنشاء حساب
        </Link>
      </p>
    </div>
  );
}

