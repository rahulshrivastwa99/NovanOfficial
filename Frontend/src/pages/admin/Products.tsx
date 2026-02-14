import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchProducts } from '@/store/productSlice';
import { toast } from 'sonner';

const AdminProducts = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { items: products, status, pages } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber: page }));
  }, [page, dispatch]);

  // TODO: Implement actual delete API call
  const handleDelete = (id: string) => {
     toast.info("Delete functionality requires backend implementation");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl">Products</h2>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-foreground text-background px-6 py-3 luxury-button hover:bg-accent transition-colors"
        >
          <Plus size={14} /> Add Product
        </Link>
      </div>

      <div className="bg-background border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Product</th>
              <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Price</th>
              <th className="text-left p-4 luxury-button text-muted-foreground font-normal hidden lg:table-cell">Category</th>
              <th className="text-left p-4 luxury-button text-muted-foreground font-normal hidden lg:table-cell">Stock</th>
              <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const totalStock = Object.values(product.stock).reduce((s, v) => s + v, 0);
              return (
                <tr key={product._id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover" />
                      <span className="font-body text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm">₹{product.price}</td>
                  <td className="p-4 font-body text-sm capitalize hidden lg:table-cell">{product.category}</td>
                  <td className="p-4 font-body text-sm hidden lg:table-cell">{totalStock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                       {<Link
                        to={`/admin/products/edit/${product._id}`}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Edit size={14} />
                      </Link>}
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 hover:bg-secondary text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors text-sm"
          >
            Previous
          </button>
          
          <span className="px-3 py-1 text-sm font-medium">
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(p => Math.min(pages, p + 1))}
            className="px-3 py-1 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
