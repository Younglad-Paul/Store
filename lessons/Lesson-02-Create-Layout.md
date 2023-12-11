# Lesson-02-Create-Layout

1. render header

   ```js
   // components/Header.js
   export default function Header() {
     return (
       <header>
         <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-gray-800 text-white">
           <Link href="/" className="text-lg font-bold">
             Amazon Shopping Cart
           </Link>
           <div>
             <span className="cart-badge">0</span>
             <Link href="/cart">Cart</Link>
           </div>
         </nav>
       </header>
     )
   }
   ```

2. render sidebar

   ```js
   // components/CartSidebar.js
   export default function CartSidebar() {
     return (
       <div className="fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-gary-700 overflow-scroll">
         <div className="py-5 px-2">Cart is empty</div>
       </div>
     )
   }
   ```

3. create App component

   ```js
   // components/App.js
   'use client'
   export default function App({ children }) {
     return (
       <div>
         <div className="mr-32">
           <Header />
           <main className="p-4">{children}</main>
         </div>
         <CartSidebar />
       </div>
     )
   }
   ```

4. edit layout

   ```js
   // app/layout.js
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body className={inter.className}>
           <App>{children}</App>
         </body>
       </html>
     )
   }
   ```
