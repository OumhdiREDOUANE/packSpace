// components/PriceSummary.js

export default function PriceSummary() {
    return (
      <div className="mt-6 space-y-4 text-sm">
        <div>
          <p className="text-gray-500">Prix unitaire</p>
          <strong className="text-lg text-black">1.098 Dhs HT</strong>
        </div>
  
        <div>
          <p className="text-gray-500 line-through">Ancien prix</p>
          <strike>164.67 Dhs HT</strike>
        </div>
  
        <div>
          <p className="text-gray-500">Total</p>
          <span className="text-green-600">(Économisez 54.89 Dhs)</span>
          <strong className="text-lg text-black">109.78 Dhs HT</strong>
        </div>
      </div>
    );
  }
  