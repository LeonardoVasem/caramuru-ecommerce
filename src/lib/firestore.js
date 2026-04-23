import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { PRODUCTS } from '@/constants/products';

/**
 * Syncs local PRODUCTS constant to Firestore
 * ⚠️ Be careful: this will clear existing products in Firestore and replace them
 */
export async function seedProductsToFirestore() {
  try {
    const productsRef = collection(db, 'products');
    
    // 1. Get existing products
    const snapshot = await getDocs(productsRef);
    
    // 2. Optional: Clear existing (Uncomment if you want a fresh start every time)
    // for (const document of snapshot.docs) {
    //   await deleteDoc(doc(db, 'products', document.id));
    // }

    // Check if we already have products (prevent duplicates if not clearing)
    if (snapshot.size > 0) {
      console.log('Firestore already has products. Skipping seed or implement merge logic.');
      return { success: true, message: 'Products already exist' };
    }

    // 3. Add each product from local constant
    const promises = PRODUCTS.map((product) => addDoc(productsRef, {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Promise.all(promises);
    
    return { success: true, message: `Successfully seeded ${PRODUCTS.length} products.` };
  } catch (error) {
    console.error('Error seeding products:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch all active products from Firestore
 */
export async function fetchProductsFromFirestore() {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('status', '==', 'active'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id // Use Firestore ID
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
