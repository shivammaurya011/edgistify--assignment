import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCategories, deleteCategory, createCategory } from "../../features/categoriesSlice";
import DashboardLayout from "../../layout/DashboardLayout";
import { useToast } from "../../components/ToastContext";
import { FiTrash } from "react-icons/fi";


const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, error } = useAppSelector((state) => state.categories);
const {addToast} = useToast()
  const [newCategory, setNewCategory] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    dispatch(createCategory({ name: newCategory }));
    addToast("New Categories Added", "success")
    setNewCategory("");
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteCategory(deleteId));
      addToast("Categories Deleted", "success")
      setDeleteId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Manage product categories</p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={handleAddCategory}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add Category
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {categories.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                  <span className="text-gray-800">{category.name}</span>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                  >
                    <FiTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">No categories found</div>
          )}
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Delete Category</h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600">Are you sure you want to delete this category? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Categories;
