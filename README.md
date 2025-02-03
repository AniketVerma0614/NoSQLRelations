# RELATIONSHIPS
Here's a **README.md** file for your project:  

---

# **MongoDB Relationships in Mongoose**  

This project demonstrates how to implement **embedded** and **referenced relationships** in MongoDB using **Mongoose**.  

## **Overview**  
- `User` model: Uses **embedded documents** to store multiple addresses inside a single user document.  
- `Customer` model: Uses **referenced documents** (ObjectId) to associate multiple orders with a customer.  

## **Installation**  

### **1. Clone the Repository**  
```sh
git clone <your-repo-url>
cd <your-project-directory>
```

### **2. Install Dependencies**  
```sh
npm install mongoose
```

## **Database Setup**  

Ensure MongoDB is running locally at `mongodb://127.0.0.1:27017/relationDemo`. You can start MongoDB using:  
```sh
mongod
```

## **Models**  

### **User Model (Embedded Relationship)**  
Located in `user.js`, this model stores multiple addresses within a single user document.  

```js
const userSchema = new Schema({
    username: String,
    addresses: [
        {   
            _id: false,
            location: String,
            city: String,
        }
    ]
});
```

### **Customer & Order Models (Referenced Relationship)**  
Located in `customer.js`, this model links a customer to multiple orders using **ObjectId references**.  

```js
const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
        type: Schema.Types.ObjectId,
        ref: "Order"
        }
    ]
});
```

## **Running the Project**  

### **1. Adding Orders to the Database**  
Run the following function to insert sample orders before adding customers:  
```js
const addOrders = async ()=>{
    let res = await Order.insertMany([
        {item: "Samosa", price: 12},
        {item: "Chips", price: 10},
        {item: "Chocolate", price: 40}, 
    ]);
    console.log(res);
};
addOrders();
```

### **2. Running the Scripts**  

#### **User Script (Embedded Documents)**  
```sh
node user.js
```

#### **Customer Script (Referenced Documents)**  
```sh
node customer.js
```

## **Expected Output**  

When running `user.js`, it should create a user with two addresses:  
```sh
{
  username: 'sherlockhomes',
  addresses: [
    { location: '221B Baker Street', city: 'London' },
    { location: 'P32 WallStreet', city: 'London' }
  ]
}
```

When running `customer.js`, it should associate a customer with their respective orders using ObjectId references:  
```sh
{
  name: 'Raul Kumar',
  orders: [
    ObjectId("xyz123"),
    ObjectId("xyz456")
  ]
}
```

## **Conclusion**  
- **Embedded relationships** are useful for tightly coupled data (e.g., user addresses).  
- **Referenced relationships** are ideal for larger datasets with reusable entities (e.g., orders).  
---
