# Lesson-03-Add-Redux

1. npm install @reduxjs/toolkit react-redux
2. create cart slice

   ```js
   // redux/slices/cartSlice.js
   import { createSlice } from '@reduxjs/toolkit'

   const initialState = {
     cartItems: [],
   }

   const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers: {
       addToCart: (state, action) => {},
       removeFromCart: (state, action) => {},
     },
   })

   export const { addToCart, removeFromCart } = cartSlice.actions

   export default cartSlice.reducer
   ```

3. configure store

   ```js
   // redux/store.js
   import { configureStore } from '@reduxjs/toolkit'
   import cartSliceReducer from './slices/cartSlice'

   export const store = configureStore({
     reducer: {
       cart: cartSliceReducer,
     },
     devTools: process.env.NODE_ENV !== 'production',
   })
   ```

4. create StoreProvider component

   ```js
   // redux/StoreProvider.js
   'use client'

   import { store } from './store'
   import { Provider } from 'react-redux'

   export function StoreProvider({ children }) {
     return <Provider store={store}>{children}</Provider>
   }
   ```

5. use StoreProvider in App

   ```js
   <StoreProvider>
     <App>{children}</App>
   </StoreProvider>
   ```
