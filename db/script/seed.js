import mongoose from 'mongoose';
import Category from '../../backend/models/categoryModel.js';
import Order from '../../backend/models/orderModel.js';
import Product from '../../backend/models/productModel.js';
import User from '../../backend/models/userModel.js';

const initializeDatabase = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Clear collections if they exist
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert initial data
    const categories = await Category.insertMany([
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' },
    ]);

    const users = await User.insertMany([
      { username: 'admin', email: 'admin@gmail.com', password: 'admin123', isAdmin: true },
      { username: 'user', email: 'user@gmail.com', password: 'user123', isAdmin: false },
    ]);

    const products = await Product.insertMany([
      {
        name: 'Laptop',
        image: '/images/laptop.jpg',
        brand: 'Dell',
        quantity: 10,
        category: categories[0]._id,
        description: 'A high performance laptop',
        price: 999.99,
        countInStock: 10,
      },
      {
        name: 'Book',
        image: '/images/book.jpg',
        brand: 'Author Name',
        quantity: 100,
        category: categories[1]._id,
        description: 'A fascinating book',
        price: 19.99,
        countInStock: 100,
      },
    ]);

    const orders = await Order.insertMany([
      {
        user: users[0]._id,
        orderItems: [
          {
            name: products[0].name,
            qty: 1,
            image: products[0].image,
            price: products[0].price,
            product: products[0]._id,
          },
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'Anytown',
          postalCode: '12345',
          country: 'USA',
        },
        paymentMethod: 'PayPal',
        itemsPrice: 999.99,
        taxPrice: 100,
        shippingPrice: 10,
        totalPrice: 1109.99,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
      },
    ]);

    console.log('Database initialized with initial data.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

export default initializeDatabase;
