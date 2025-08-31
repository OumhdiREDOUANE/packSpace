"use client";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const side1Ref = useRef(null);
  const side2Ref = useRef(null);
  const [scrollPassed, setScrollPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!side1Ref.current) return;

      // المسافة التي تم تمريرها من أعلى الصفحة
      const scrollTop = window.scrollY;

      // طول الجزء الأول
      const side1Height = side1Ref.current.offsetHeight;

      // إذا تجاوزنا طول الجزء الأول => نسمح للتمرير عادي (فتح)
      if (scrollTop >= side1Height) {
        setScrollPassed(true);
      } else {
        setScrollPassed(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
  <>
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* الجزء الأول الطويل */}
      <div
        ref={side1Ref}
        className="md:w-2/3 p-4"
        style={{ minHeight: "150vh", backgroundColor: "#f0f0f0" }}
      >
        <h2 className="text-xl font-bold mb-4">الجزء الأول الطويل</h2>
        {[...Array(50)].map((_, i) => (
          <p key={i}>سطر طويل في الجزء الأول رقم {i + 1}</p>
        ))}
      </div>

      {/* الجزء الثاني القصير، ثابت أثناء تمرير الجزء الأول */}
      <div
        ref={side2Ref}
        className={`md:w-1/3 p-4 ${
          scrollPassed ? "relative" : "sticky top-0"
        } bg-white`}
        style={{ height: "300px" }}
      >
        <h2 className="text-xl font-bold mb-4">الجزء الثاني القصير</h2>
        <p>هذا الجزء ثابت أثناء التمرير في الجزء الأول.</p>
        <p>سيصبح طبيعياً بعد الانتهاء من التمرير في الجزء الأول.</p>
      </div>
    </div>
    <section
    id="newsletter"
    className="bg-[#FFFFFF] border-t border-[#006294] py-12 font-helveticaCondensed"
  >
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center md:justify-start">
        <img src="/boite.png" alt="Newsletter" width={200} height={200} />
      </div>
      <div className="md:w-2/3 text-right">
        <h2 className="text-2xl text-[#006294] font-semibold mb-2">
          Inscrivez-vous à notre Newsletter.
        </h2>
        <p className="text-[#58595a] mb-4 font-medium">
          et recevez toutes les nouveautés, inspirations, promotions...
        </p>
  
        <form
          
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            type="email"
            placeholder="Saisissez votre email ici"
            required
            value=""
            
            className="flex-1 px-4 py-2 border border-[#006294] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C09200] transition"
          />
          <button
            type="submit"
            className="bg-[#C09200] text-[#FFFFFF] px-6 py-2 rounded-md font-semibold hover:bg-[#006294] hover:text-[#C09200] transition-colors duration-300"
          >
            ENVOYER
          </button>
        </form>
  
    
      </div>
    </div>
  </section>
  </>
  );
}
