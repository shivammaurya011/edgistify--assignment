import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

// Define Category Type
interface Category {
  _id: string;
  name: string;
}

// Define Initial State Type
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Fetch Categories
export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ data: Category[] }>('/api/categories');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Create Category
export const createCategory = createAsyncThunk<Category, { name: string }, { rejectValue: string }>(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<{ data: Category }>('/api/categories', categoryData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/categories/${categoryId}`);
      return categoryId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;