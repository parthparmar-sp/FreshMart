import Product from "../models/Product.js";


// Vendor adds product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      vendor: req.user.id
    });

    res.status(201).json({
      message: "Product added, waiting for admin approval",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin approves product
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json({
      message: "Product approved",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin - get pending products
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false }).populate("vendor", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public – users see approved products
export const getApprovedProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;
    const query = { isApproved: true };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).populate(
      "vendor",
      "name"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Vendor - get own products
export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Vendor - delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, vendor: req.user._id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};
