import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const AddProduct = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [sizes, setSizes] = useState<Record<string, boolean>>({ S: false, M: false, L: false, XL: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product created successfully!');
    navigate('/admin/products');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Mock previews
    setPreviews([
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
    ]);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl mb-8">Add Product</h2>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="luxury-button text-muted-foreground block mb-2">Name</label>
          <input required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
        </div>

        <div>
          <label className="luxury-button text-muted-foreground block mb-2">Description</label>
          <textarea rows={4} required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="luxury-button text-muted-foreground block mb-2">Price (₹)</label>
            <input type="number" required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
          </div>
          <div>
            <label className="luxury-button text-muted-foreground block mb-2">Category</label>
            <select required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent">
              <option value="">Select</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="luxury-button text-muted-foreground block mb-2">Images</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => setPreviews(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'])}
            className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground'
            }`}
          >
            <Upload size={24} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-body text-sm text-muted-foreground">
              Drag & drop images here, or click to browse
            </p>
          </div>
          {previews.length > 0 && (
            <div className="flex gap-2 mt-3">
              {previews.map((src, i) => (
                <img key={i} src={src} alt="" className="w-16 h-16 object-cover" />
              ))}
            </div>
          )}
        </div>

        {/* Sizes & Stock */}
        <div>
          <label className="luxury-button text-muted-foreground block mb-3">Sizes & Stock</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.keys(sizes).map((size) => (
              <div key={size}>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={sizes[size]}
                    onChange={() => setSizes({ ...sizes, [size]: !sizes[size] })}
                    className="accent-foreground"
                  />
                  <span className="font-body text-sm">{size}</span>
                </label>
                {sizes[size] && (
                  <input
                    type="number"
                    placeholder="Stock"
                    className="w-full border border-border px-3 py-2 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-foreground text-background px-8 py-4 luxury-button hover:bg-accent transition-colors"
          >
            Create Product
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="border border-border px-8 py-4 luxury-button hover:border-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
