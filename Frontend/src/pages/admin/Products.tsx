import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { products as initialProducts, Product } from '@/data/products';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  const handleDelete = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
    toast.success('Product deleted');
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
            {productList.map((product) => {
              const totalStock = Object.values(product.stock).reduce((s, v) => s + v, 0);
              return (
                <tr key={product.id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover" />
                      <span className="font-body text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm">${product.price}</td>
                  <td className="p-4 font-body text-sm capitalize hidden lg:table-cell">{product.category}</td>
                  <td className="p-4 font-body text-sm hidden lg:table-cell">{totalStock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Edit size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
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
    </div>
  );
};

export default AdminProducts;
