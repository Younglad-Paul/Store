# Lesson-07-Create-Shipping-Page

1. create checkout wizrad

   ```js
   // components/CheckoutWizard.js

   export default function CheckoutWizard({ activeStep = 0 }) {
     return (
       <div className="mb-5 flex flex-wrap">
         {[
           'User Login',
           'Shipping Address',
           'Payment Method',
           'Place Order',
         ].map((step, index) => (
           <div
             key={step}
             className={`flex-1 border-b-2  
              text-center 
          ${
            index <= activeStep
              ? 'border-indigo-500   text-indigo-500'
              : 'border-gray-400 text-gray-400'
          }
              
          `}
           >
             {step}
           </div>
         ))}
       </div>
     )
   }
   ```

2. create shipping page

   ```js
   // app/shipping/page.js
   'use client'
   export default function ShippingAddressPage() {
     const {
       handleSubmit,
       register,
       formState: { errors },
       setValue,
     } = useForm()
     const router = useRouter()
     const dispatch = useDispatch()
     const { shippingAddress } = useSelector((state) => state.cart)

     useEffect(() => {
       setValue('fullName', shippingAddress.fullName)
       setValue('address', shippingAddress.address)
       setValue('city', shippingAddress.city)
       setValue('postalCode', shippingAddress.postalCode)
       setValue('country', shippingAddress.country)
     }, [setValue, shippingAddress])

     const submitHandler = ({
       fullName,
       address,
       city,
       postalCode,
       country,
     }) => {
       dispatch(
         saveShippingAddress({ fullName, address, city, postalCode, country })
       )

       router.push('/payment')
     }

     return (
       <div>
         <CheckoutWizard activeStep={1} />
         <form
           className="mx-auto max-w-screen-md"
           onSubmit={handleSubmit(submitHandler)}
         >
           <h1 className="mb-4 text-xl">Shipping Address</h1>
           <div className="mb-4">
             <label htmlFor="fullName">Full Name</label>
             <input
               className="w-full"
               id="fullName"
               autoFocus
               {...register('fullName', {
                 required: 'Please enter full name',
               })}
             />
             {errors.fullName && (
               <div className="text-red-500">{errors.fullName.message}</div>
             )}
           </div>
           <div className="mb-4">
             <label htmlFor="address">Address</label>
             <input
               className="w-full"
               id="address"
               {...register('address', {
                 required: 'Please enter address',
                 minLength: {
                   value: 3,
                   message: 'Address is more than 2 chars',
                 },
               })}
             />
             {errors.address && (
               <div className="text-red-500">{errors.address.message}</div>
             )}
           </div>
           <div className="mb-4">
             <label htmlFor="city">City</label>
             <input
               className="w-full"
               id="city"
               {...register('city', {
                 required: 'Please enter city',
               })}
             />
             {errors.city && (
               <div className="text-red-500 ">{errors.city.message}</div>
             )}
           </div>
           <div className="mb-4">
             <label htmlFor="postalCode">Postal Code</label>
             <input
               className="w-full"
               id="postalCode"
               {...register('postalCode', {
                 required: 'Please enter postal code',
               })}
             />
             {errors.postalCode && (
               <div className="text-red-500 ">{errors.postalCode.message}</div>
             )}
           </div>
           <div className="mb-4">
             <label htmlFor="country">Country</label>
             <input
               className="w-full"
               id="country"
               {...register('country', {
                 required: 'Please enter country',
               })}
             />
             {errors.country && (
               <div className="text-red-500 ">{errors.country.message}</div>
             )}
           </div>
           <div className="mb-4 flex justify-between">
             <button className="primary-button">Next</button>
           </div>
         </form>
       </div>
     )
   }
   ```
