import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import api from "../api";
import { useState, useEffect } from "react";
import { useNotification } from "../contexts/NotificationContext";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (
        response.data?.products &&
        Array.isArray(response.data.products)
      ) {
        setProducts(response.data.products);
      } else {
        console.error("Unexpected API response format :", response.data);
        setProducts([]);
        showError("Format de données inattendu");
      }
      setProducts(response.data.products);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
      } else {
        showError(error.message?.data?.error || "Tout est pété !!!");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(false);
    try {
      await api.post("/products", formData);
      showSuccess("Produit ajouté avec succès");
      fetchProducts()
    } catch (error) {
      showError("Erreur de l'ajout du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit= (product) => {
    setEditingProduct(product)
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      showSuccess("Produit supprimé avec succès.");
      fetchProducts();
    } catch (error) {
      showError(error.response?.data?.error || "Une erreur est survenue.");
    }
  }

  return (
    <div className="bg-white text-black p-4 h-screen w-full grid grid-col">
      <div className="container mx-auto">
        <Navbar />
      </div>

      <div className="max-w-7xl mx -auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm onSubmit={handleSubmit} />
      </div>

      <div>
        <ProductList products={products} handleDelete={handleDelete} handleEdit={handleEdit}/>
      </div>
    </div>
  );
}
