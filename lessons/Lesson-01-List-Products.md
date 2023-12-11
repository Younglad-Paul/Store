# Lesson-01-List-Products

1. Create sample data

   ```js
   // utils/data.js
   export const data = {
     products: [
       {
         id: '1',
         name: 'Pink Polo Shirt',
         image: '/images/p1.jpg',
         price: 120,
         countInStock: 10,
         rating: 4.5,
         numReviews: 10,
         description: 'high quality shirt',
       },
       {
         id: '2',
         name: 'Marl Polo Shirt',
         image: '/images/p2.jpg',
         price: 250,
         countInStock: 0,
         rating: 4.0,
         numReviews: 10,
         description: 'high quality product',
       },
       {
         id: '3',
         name: 'Slim Fit Polo Shirt',
         image: '/images/p3.jpg',
         price: 25,
         countInStock: 15,
         rating: 4.5,
         numReviews: 14,
         description: 'high quality product',
       },
       {
         id: '4',
         name: 'Orange Polo Shirt',
         image: '/images/p4.jpg',
         price: 65,
         countInStock: 5,
         rating: 4.5,
         numReviews: 10,
         description: 'high quality product',
       },
     ],
   }
   ```

2. download sample image from github repo [https://github.com/basir/nextjs-shoppoing-cart-like-amazon](https://github.com/basir/nextjs-shoppoing-cart-like-amazon)

3. create product rating component

   ```js
   // npm i @smastrom/react-rating
   // components/ProductRate.js
   'use client'
   import React from 'react'
   import '@smastrom/react-rating/style.css'
   import { Rating } from '@smastrom/react-rating'

   export default function ProductRate({ rate, count }) {
     return (
       <div className="flex">
         <Rating style={{ maxWidth: 100 }} value={rate} readOnly /> {count}{' '}
         reviews
       </div>
     )
   }
   ```

4. Create product component

   ```js
   // components/ProductItem.js
   export default function ProductItem({ product }) {
     return (
       <div className="card">
         <Link href={`/product/${product.id}`}>
           <Image
             src={`${product.image}`}
             width={400}
             height={400}
             alt={product.name}
             className="rounded shadow object-cover h-96 w-full"
           />
         </Link>
         <div className="flex flex-col items-center justify-center p-5">
           <Link href={`/product/${product.id}`}>
             <h2 className="text-lg">{product.name}</h2>
           </Link>
           <ProductRate rate={product.rating} count={product.numReviews} />

           <p className="mb-2">{product.brand}</p>
           <p>${product.price}</p>
           <button>Add to cart</button>
         </div>
       </div>
     )
   }
   ```

5. Add `card` css class

   ```css
   /* app/global.css */
   .card {
     @apply mb-5  block   rounded-lg border border-gray-200  shadow-md;
   }
   ```

6. Render products

   ```js
   // app/page.js
   export default function Home() {
     const { products } = data

     return (
       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
         {products.map((product) => (
           <ProductItem key={product.id} product={product} />
         ))}
       </div>
     )
   }
   ```
