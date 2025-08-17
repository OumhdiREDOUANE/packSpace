// components/AddToCartButton.js

export default function AddToCartButton() {
    const handleClick = () => {
      alert("Produit ajouté au panier !");
    };
  
    return (
      <div className="mt-4">
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Ajouter au panier
        </button>
      </div>
    );
  }
  