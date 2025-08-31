"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit, Copy, Save, Download } from "lucide-react";
import Cookies from "js-cookie";
import { getToken } from "src/app/lib/auth";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useAuth } from "src/app/components/AuthProvider";
const fetcher = (url, token) =>
  fetch(url, {
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
  }).then(res => res.json());


export default function CartClient({ sessionId,orders,token  }) {
  const { isLoggedIn } = useAuth();
  const [showDetails, setShowDetails] = useState({});
  const [dataOfOrders,setDataOfOrders] =useState(orders)
   
  const router = useRouter();
  
  const url = sessionId
  ? token
    ? `http://127.0.0.1:8000/api/cart/${sessionId}`
    : `http://127.0.0.1:8000/api/cart/notLogin/${sessionId}`
  : null;

const { data } = useSWR(
  url,
  (url) => fetcher(url, token),
  { fallbackData: orders, refreshInterval: 5000 }
); 
useEffect(() => {
  if (data) setDataOfOrders(data);
}, [data]);
  

  

  const handleSubmit = async (id_orderProduct) => {
    
        
    try {
      console.log(orders)
      const sourceOrders = dataOfOrders?.data || [];
const order = sourceOrders.find(o => o.id_orderProduct === id_orderProduct);
if (!order) return; 
      const payload = {};
      order.product.proprieter.forEach((item, index) => {
        payload[`selected_option_${index + 1}`] = item.options.id_ProductOption; 
      });
     console.log(payload)
      const sessionId = Cookies.get("session_id");
      const response = await fetch("http://127.0.0.1:8000/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "X-Session-Id": sessionId,
         },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text); 
        return;
      }
  
      const data = await response.json();
      console.log("Order saved:", data);
     

        
      
      if (data.success === true) {
        
        mutate(`http://127.0.0.1:8000/api/cart/notLogin/${sessionId}`);

       console.log(dataOfOrders)
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  const handleDelete = async (id_orderProduct) => {
    try {
      const sessionId = Cookies.get("session_id");
  
      const response = await fetch(`http://127.0.0.1:8000/api/cart/notLogin/${id_orderProduct}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId
        },
         
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        return;
      }
  
      // حذف العنصر محلياً بدون إعادة تحميل الصفحة
      setDataOfOrders(prev => ({
        ...prev,
        data: prev.data.filter(order => order.id_orderProduct !== id_orderProduct)
      }));
  
      console.log("Order deleted");
      
      // إعادة جلب البيانات من السيرفر
      mutate(`http://127.0.0.1:8000/api/cart/notLogin/${sessionId}`);
  
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  
  const handleEdit = (order) => {
    // Store data in sessionStorage
    sessionStorage.setItem("orderData", JSON.stringify(order));
  
    // Navigate to product page without query
    router.push(`/product/${order.product.name_product}/${order.uuid}`);
  };
  const handleSave = async (id_orderProduct) => {
    if (!isLoggedIn) {
      alert("سجل أولاً للحفظ");
      router.push("/login");
      return;
    }

    try {
      const sessionId = Cookies.get("session_id");
      const token = getToken();
      const response = await fetch(`http://127.0.0.1:8000/api/save/${id_orderProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        return;
      }

      const data = await response.json();
      console.log("Order updated:", data);
      mutate(`http://127.0.0.1:8000/api/cart/${sessionId}`);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  const handleValidation =async (prix_panier)=>{
    if (!isLoggedIn) {
      alert("سجل أولاً للحفظ");
      router.push("/login");
      return;
    }
   console.log(prix_panier)
    try {
      const sessionId = Cookies.get("session_id");
      const token = getToken();
      const response = await fetch(`http://127.0.0.1:8000/api/cart/valider-panier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
          "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({"prix":prix_panier})
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        return;
      }

      const data = await response.json();
      console.log("Order updated:", data);
      mutate(`http://127.0.0.1:8000/api/cart/${sessionId}`);
    } catch (error) {
      console.error("Error saving order:", error);
    }

  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produits */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 space-y-6">
          {dataOfOrders.data?.map((order) => {
            const product = order.product;
       

            return (
              <div
                key={order.id_orderProduct}
                className="flex flex-col md:flex-row gap-4 border-b pb-4"
              >
                {/* Image */}
                <div className="w-28 h-28 flex-shrink-0">
                  <img
                    src={product.image?.url_image}
                    alt={product.name_product}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>

                {/* Product Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold">
                      {product.name_product}
                    </h2>
                    <button 
  onClick={() => handleDelete(order.id_orderProduct)}
  className="text-red-500 hover:text-red-700"
>
  <Trash2 size={20} />
</button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Quantité: {order.product.proprieter.find(
                      (p) => p.name_proprieter === "Quantité"
                    )?.options.name_option ?? "-"}
                  </p>

                  <div className="mt-2">
                    <p className="font-medium text-gray-800">
                      {order.prix_total} Dhs HT
                    </p>
                    {/* لو عندك TTC من API تقدر تضيفو هنا */}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button className="p-2 border rounded-lg hover:bg-gray-100"
                      onClick={() => 
                        handleEdit(order)

                    }
                    >
                      <Edit size={18} />
                    </button>
                    <button onClick={()=>{
                       handleSubmit(order.id_orderProduct)
                    }
                     
                    }
                     className="p-2 border rounded-lg hover:bg-gray-100">
                      <Copy size={18} />
                    </button>
                    
                    <button 
                    key={order.id_orderProduct}
          onClick={() => handleSave(order.id_orderProduct)}
                    className="p-2 border rounded-lg hover:bg-gray-100">
                      <Save size={18} />
                    </button>
                    <button className="p-2 border rounded-lg hover:bg-gray-100">
                      <Download size={18} />
                    </button>
                  </div>

                  {/* Details Toggle */}
                  <div className="mt-4">
                    <button
                      className="text-sm text-gray-600 hover:underline"
                      onClick={() =>setShowDetails(prev => ({
                        ...prev,
                        [order.id_orderProduct]: !prev[order.id_orderProduct]
                      }))}
                    >
                      {showDetails[order.id_orderProduct] ?  "Masquer les détails ▲" : "Détails ▼"}
                    </button>
                    {showDetails[order.id_orderProduct] && (
                      <ul className="mt-2 text-sm text-gray-600 space-y-1 pl-4 list-disc">
                        {product.proprieter.map((p) => (
                          <li key={p.id_proprieter}>
                            <span className="font-medium">
                              {p.name_proprieter}:
                            </span>{" "}
                            {p.options.name_option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Résumé */}
        <div className="bg-white rounded-2xl shadow p-4 h-fit">
          <div className="space-y-2 border-b pb-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total H.T</span>
              <span className="font-semibold">
                { orders.data.reduce((sum, o) => sum + o.prix_total, 0)} Dhs
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-pink-600">
              <span>Total TTC</span>
              <span>0.00 Dhs</span>
            </div>
          </div>
 
          <div className="mt-4 flex flex-col gap-3">
          
            <button
            onClick={()=>{
handleValidation(orders.data.reduce((sum, o) => sum + o.prix_total, 0))
            }}
             className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold">
              Valider mon panier
            </button>
            <button
              onClick={() => (window.location.href = "https://weprint.ma")}
              className="w-full border py-2 rounded-lg hover:bg-gray-50"
            >
              Poursuivre mes achats
            </button>
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold">
              Télécharger un devis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
