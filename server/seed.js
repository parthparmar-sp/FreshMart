// Simple seeding script to hit the FreshMart backend
// Run with: node seed.js (while server is running on localhost:5000)

const BASE_URL = "http://localhost:5000/api";

async function apiRequest(path, method = "GET", body, token) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore JSON parse error
  }

  if (!res.ok) {
    throw new Error(
      `Request ${method} ${path} failed: ${res.status} ${res.statusText} - ${JSON.stringify(
        data
      )}`
    );
  }

  return data;
}

async function run() {
  try {
    // 1. Register users (admin, vendor, customer)
    console.log("Registering users (if not already present)...");

    const users = [
      {
        name: "Admin User",
        email: "admin2711@gmail.com",
        password: "admin11",
        role: "admin",
      },
      {
        name: "Vendor User",
        email: "vendor@freshmart.com",
        password: "Vendor123!",
        role: "vendor",
      },
      {
        name: "Customer User",
        email: "user@freshmart.com",
        password: "User123!",
        role: "user",
      },
    ];

    for (const u of users) {
      try {
        const res = await apiRequest("/auth/register", "POST", u);
        console.log(`Registered ${u.role}:`, res);
      } catch (err) {
        const msg = String(err.message || "");
        if (msg.includes("User already exists")) {
          console.log(`${u.role} already exists, skipping register.`);
        } else {
          console.error(`Error registering ${u.role}:`, err.message);
        }
      }
    }

    // 2. Login to get tokens
    console.log("Logging in users...");
    const login = async (email, password) => {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      return res.token;
    };

    const adminToken = await login("admin2711@gmail.com", "admin11");
    const vendorToken = await login("vendor@freshmart.com", "Vendor123!");
    const userToken = await login("user@freshmart.com", "User123!");

    console.log("Tokens acquired.");

    // 3. Vendor creates multiple products
    console.log("Creating sample products as vendor...");
    const productBodies = [
      {
        name: "Fresh Apples",
        description: "Crisp, juicy apples sourced daily.",
        price: 99,
        category: "Fruits",
        image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
      },
      {
        name: "Organic Bananas",
        description: "Sweet and ripe organic bananas.",
        price: 60,
        category: "Fruits",
        image: "https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg",
      },
      {
        name: "Farm Fresh Tomatoes",
        description: "Juicy red tomatoes perfect for salads.",
        price: 80,
        category: "Vegetables",
        image: "https://images.pexels.com/photos/8390/food-wood-red-tomato.jpg",
      },
      {
        name: "Green Leaf Spinach",
        description: "Cleaned and ready-to-cook spinach leaves.",
        price: 40,
        category: "Vegetables",
        image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
      },
      {
        name: "Whole Wheat Bread",
        description: "Soft, high-fiber whole wheat bread loaf.",
        price: 55,
        category: "Bakery",
        image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
      },
    ];

    const createdProducts = [];

    for (const body of productBodies) {
      const created = await apiRequest("/products", "POST", body, vendorToken);
      console.log("Created product:", created);
      const id = created?.product?._id || created?._id || null;
      if (id) {
        createdProducts.push(id);
      }
    }

    if (createdProducts.length === 0) {
      throw new Error("No products were created.");
    }

    // 4. Admin approves all products
    console.log("Approving products as admin...");
    for (const id of createdProducts) {
      const approved = await apiRequest(
        `/products/approve/${id}`,
        "PUT",
        {},
        adminToken
      );
      console.log("Approved product:", approved?.product?._id || approved?._id);
    }

    // 5. User adds first product to cart
    console.log("Adding product to cart as user...");
    const cart = await apiRequest(
      "/cart",
      "POST",
      { productId: createdProducts[0], quantity: 2 },
      userToken
    );
    console.log("Updated cart:", cart);

    // 6. User places an order
    console.log("Creating order from cart as user...");
    const order = await apiRequest(
      "/orders",
      "POST",
      { paymentMethod: "COD" },
      userToken
    );
    console.log("Created order:", order);

    // 7. Quick sanity checks
    console.log("Fetching approved products list...");
    const products = await apiRequest("/products", "GET");
    console.log("Approved products:", products);

    console.log("Fetching user cart (should be empty after order)...");
    const finalCart = await apiRequest("/cart", "GET", undefined, userToken);
    console.log("Final cart:", finalCart);

    console.log("Seeding complete. Backend flow verified.");
  } catch (err) {
    console.error("Seeding script failed:", err.message);
  }
}

run();

