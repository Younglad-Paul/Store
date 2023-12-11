# Lesson-04-Implement-Add-Remove-Cart

1. add reducers

   ```js
   // redux/slices/cartSlice.js
   const initialState = {loading: true, ...}


   const cartSlice = createSlice({
     reducers: {
       addToCart: (state, action) => {
         const item = action.payload
         const existItem = state.cartItems.find((x) => x.id === item.id)
         if (existItem) {
           state.cartItems = state.cartItems.map((x) =>
             x.id === existItem.id ? item : x
           )
         } else {
           state.cartItems = [...state.cartItems, item]
         }
         state.itemsPrice = addDecimals(
           state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
         )
         state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
         state.taxPrice = addDecimals(
           Number((0.15 * state.itemsPrice).toFixed(2))
         )
         state.totalPrice = (
           Number(state.itemsPrice) +
           Number(state.shippingPrice) +
           Number(state.taxPrice)
         ).toFixed(2)

         Cookies.set('cart', JSON.stringify(state))
       },
       removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((x) => x.id !== action.payload)

        state.itemsPrice = addDecimals(
            state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
        state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
        state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
        state.totalPrice = (
            Number(state.itemsPrice) +
            Number(state.shippingPrice) +
            Number(state.taxPrice)
        ).toFixed(2)
        state.showSidebar = state.cartItems.length > 0
        Cookies.set('cart', JSON.stringify(state))
            },
       hideLoading: (state) => {
         state.loading = false
       },
     },
   })
   ```

2. implement hideLoading

   ```js
   // components/App.js
   useEffect(() => {
     dispatch(hideLoading())
   }, [dispatch])
   ```

3. add css classes

   ```css
   .cart-badge {
     @apply absolute font-bold text-orange-600 ml-4 mt-1 text-center w-4;
   }
   .primary-button {
     @apply rounded bg-amber-300 text-black py-2 px-4 shadow outline-none hover:bg-amber-400  active:bg-amber-500;
   }
   .default-button {
     @apply rounded bg-gray-100 py-2  px-4 text-black shadow outline-none hover:bg-gray-200  active:bg-gray-300
        dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700;
   }
   ```

4. show cart items in header

   ```js
   // components/Header.js
   export default function Header() {
     const { loading, cartItems } = useSelector((state) => state.cart)
     return (
       <header>
         <nav className="flex h-12 items-center px-4 justify-between shadow-md bg-gray-800 text-white">
           <Link href="/" className="text-lg font-bold">
             Amazon Shopping Cart
           </Link>
           <div>
             <span className="cart-badge">
               {loading ? '' : cartItems.reduce((a, c) => a + c.qty, 0)}
             </span>
             <Link href="/cart" className="flex justify-between items-end">
               <span>Cart</span>
             </Link>
           </div>
         </nav>
       </header>
     )
   }
   ```

5. show cart items in sidebar

   ```js
   // components/Sidebar

   const addToCartHandler = async (product, qty) => {
     dispatch(addToCart({ ...product, qty }))
   }

   const removeFromCartHandler = (id) => {
     dispatch(removeFromCart(id))
   }
   return (
     <div>
       {loading ? (
         <div className="py-5 px-2">Loading...</div>
       ) : cartItems.length === 0 ? (
         <div className="py-5 px-2">Cart is empty</div>
       ) : (
         <>
           <div className="p-2 flex flex-col items-center border-b border-b-gary-600">
             <div>subtotal</div>
             <div className="font-bold text-orange-700">${itemsPrice}</div>
             <Link
               href="/cart"
               className="w-full text-center p-1  rounded-2xl border-2"
             >
               Go to cart
             </Link>
           </div>
           {cartItems.map((item) => (
             <div
               key={item.id}
               className="p-2 flex flex-col items-center border-b border-b-gary-600"
             >
               <Link href={`/product/${item.id}`} className="flex items-center">
                 <Image
                   src={item.image}
                   alt={item.name}
                   width={50}
                   height={50}
                   className="p-1"
                 ></Image>
               </Link>

               <select
                 value={item.qty}
                 onChange={(e) =>
                   addToCartHandler(item, Number(e.target.value))
                 }
               >
                 {[...Array(item.countInStock).keys()].map((x) => (
                   <option key={x + 1} value={x + 1}>
                     {x + 1}
                   </option>
                 ))}
               </select>
               <button
                 className="default-button mt-2"
                 onClick={() => removeFromCartHandler(item.id)}
               >
                 Delete
               </button>
             </div>
           ))}
         </>
       )}
     </div>
   )
   ```
