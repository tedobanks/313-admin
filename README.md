# **Fashion Brand Admin Dashboard**

An admin dashboard for managing an ecommerce store for a fashion brand. The dashboard allows administrators to create, upload, edit, and delete products, with all data stored in Firebase. Future features will include sales tracking capabilities.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## **Project Overview**

This project is an admin dashboard designed to manage an ecommerce store for a fashion brand. It provides an intuitive interface for administrators to handle product inventory, including the ability to create new items, upload images, edit existing product details, and delete products from the catalog.

All data is securely stored using Firebase services:

- **Firebase Firestore:** Stores all product information and other relevant data.
- **Firebase Storage:** Handles image uploads and storage for product images.

The application is built with modern web technologies, ensuring a responsive and efficient user experience.

---

## **Features**

- **Product Management:**

  - Create new products with detailed information.
  - Upload multiple images for each product.
  - Edit existing product details, including name, description, price, and quantity.
  - Delete products from the inventory.

- **Data Storage:**

  - Secure and scalable data storage using Firebase Firestore.
  - Efficient image storage and retrieval using Firebase Storage.

- **User Interface:**

  - Responsive design for various screen sizes.
  - Loading indicators for data fetching and updates.
  - User-friendly forms with validation.

- **Authentication:**

  - _(Optional)_ Secure admin login to protect the dashboard.

- **Future Features:**
  - Sales tracking and analytics.
  - Order management.
  - Customer management.

---

## **Technologies Used**

- **Frontend:**

  - [Vue.js 3](https://vuejs.org/) - JavaScript framework for building user interfaces.
  - [Vue Router](https://router.vuejs.org/) - Routing library for Vue.js.
  - [Vite](https://vitejs.dev/) - Build tool for faster development.

- **Backend & Services:**

  - [Firebase Firestore](https://firebase.google.com/docs/firestore) - NoSQL database for storing product data.
  - [Firebase Storage](https://firebase.google.com/docs/storage) - For uploading and storing images.
  - [Firebase Authentication](https://firebase.google.com/docs/auth) - _(Optional)_ For securing admin access.

- **Deployment:**
  - [Vercel](https://vercel.com/) - Hosting platform for frontend applications.

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (version 12 or higher)
- **npm** or **Yarn**
- **Firebase Account:** Set up a Firebase project to obtain configuration details.

### **Installation**

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install Dependencies:**

    - **Using npm**  

    ```sh
    npm install
    ```

    - **Or using yarn**  

    ```sh
    npm install
    ```

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact:

- **Name:** Ted Bankong
- **Email:** [bankong.ted@gmail.com](bankong.ted@gmail.com)
- **Website:** [tedbankong.com.ng](https://tedbankong.com.ng)

## Acknowledgments

- [Firebase](https://firebase.google.com/) for providing robust backend services.
- [Vue.js](https://vuejs.org/) community for an excellent frontend framework.
- [Vercel](https://vercel.com/) for seamless deployment.
