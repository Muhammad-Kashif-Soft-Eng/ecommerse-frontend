import api from "../axios";

// Fetch all products
export const getProducts = async () => {
  try {
    const res = await api.get("/products/");

    return {
      success: res.data?.success ?? true,
      message: res.data?.message || "Products fetched successfully.",
      count: res.data?.count || 0,
      data: res.data?.products || [],
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Internal Server Error.",
      data: [],
    };
  }
};

// Fetch a single product by its ID
export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return {
      success: res.data?.success ?? true,
      message: res.data?.message || "Product fetched successfully.",
      data: res.data?.product || {},
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Internal Server Error.",
      data: {},
    };
  }
};

// Create a new product

export const createProduct = async (product) => {
  try {
    const res = await api.post("/products/", product);
    return {
      success: res.data?.success ?? true,
      message: res.data?.message || "Product created successfully.",
      data: res.data?.product || {},
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Internal Server Error.",
      data: {},
    };
  }
};

// Update an existing product by its ID
export const updateProduct = async (id, product) => {
  try {
    const res = await api.put(`/products/${id}`, product);
    return {
      success: res.data?.success ?? true,
      message: res.data?.message || "Product updated successfully.",
      data: res.data?.product || {},
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Internal Server Error.",
      data: {},
    };
  }
};

// Delete a product by its ID
export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return {
      success: res.data?.success ?? true,
      message: res.data?.message || "Product deleted successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Internal Server Error.",
    };
  }
};
