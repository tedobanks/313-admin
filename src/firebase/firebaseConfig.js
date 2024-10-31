// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firebase Firestore
const db = getFirestore(app);

// Function to upload multiple files to Firebase Storage
export const uploadFilesToFirebase = (files, onProgress, onComplete, onError) => {
    files.forEach((file, index) => {
        const fileRef = storageRef(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) {
                    onProgress(index, progress); // Pass index and progress to track each file
                }
            },
            (error) => {
                if (onError) {
                    onError(index, error); // Pass index and error to track each file
                }
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    if (onComplete) {
                        onComplete(index, downloadURL); // Pass index and downloadURL to track each file
                    }
                } catch (error) {
                    if (onError) {
                        onError(index, error);
                    }
                }
            }
        );
    });
};

// Function to add a product to Firestore
export const addProductToFirestore = async (product) => {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        return docRef;
    } catch (error) {
        throw new Error(`Failed to add product: ${error.message}`);
    }
};

export const getAllProductsFromFirestore = async () => {
    try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productsList;
    } catch (error) {
        throw new Error(`Failed to retrieve products: ${error.message}`);
    }
};

export const getProductFromFirestore = async (productId) => {
    try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            return { id: productSnap.id, ...productSnap.data() };
        } else {
            throw new Error("No such product!");
        }
    } catch (error) {
        throw new Error(`Failed to get product: ${error.message}`);
    }
};

// Function to delete a product from Firestore
export const deleteProductFromFirestore = async (productId) => {
    try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
        return true; // Indicate success
    } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
    }
};

// Function to update an existing product in Firestore
export const updateProductInFirestore = async (productId, updatedData) => {
    try {
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, updatedData);
        return true; // Indicate success
    } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
    }
};

export { db, storage };
