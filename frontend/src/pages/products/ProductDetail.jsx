import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearError, clearProduct } from '../../store/slices/productSlice'
import { toast } from 'react-toastify'
import AddToCartButton from '../../components/cart/AddToCartButton'

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(fetchProductById(id))
    
    return () => {
      dispatch(clearProduct())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600">Product not found</p>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="text-indigo-600 hover:text-indigo-700 mb-4 inline-block">
        &larr; Back to products
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-2">Category: {product.categoryName}</p>
            <p className="text-3xl font-bold text-indigo-600 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.isActive ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="text-gray-600">Stock: {product.stockQuantity}</span>
            </div>
            <AddToCartButton productId={product.id} stockQuantity={product.stockQuantity} productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  )
}
