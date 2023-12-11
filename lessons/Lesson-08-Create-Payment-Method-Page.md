# Lesson-08-Create-Payment-Method-Page

1. create payment page

   ```js
   // app/payment/page.js
   export default function ShippingAddressPage() {
     const {
       handleSubmit,
       register,
       formState: { errors },
       setValue,
     } = useForm()
     const router = useRouter()
     const dispatch = useDispatch()
     const { shippingAddress, paymentMethod } = useSelector(
       (state) => state.cart
     )

     useEffect(() => {
       if (!shippingAddress.address) {
         return router.push('/shipping')
       }
       setValue('paymentMethod', paymentMethod)
     }, [paymentMethod, router, setValue, shippingAddress.address])

     const submitHandler = ({ paymentMethod }) => {
       dispatch(savePaymentMethod(paymentMethod))
       router.push('/placeorder')
     }

     return (
       <div>
         <CheckoutWizard activeStep={1} />
         <form
           className="mx-auto max-w-screen-md"
           onSubmit={handleSubmit(submitHandler)}
         >
           <h1 className="mb-4 text-xl">Payment Method</h1>
           {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
             <div key={payment} className="mb-4">
               <input
                 name="paymentMethod"
                 className="p-2 outline-none focus:ring-0"
                 id={payment}
                 type="radio"
                 value={payment}
                 {...register('paymentMethod', {
                   required: 'Please select payment method',
                 })}
               />

               <label className="p-2" htmlFor={payment}>
                 {payment}
               </label>
               {errors.paymentMethod && (
                 <div className="text-red-500 ">
                   {errors.paymentMethod.message}
                 </div>
               )}
             </div>
           ))}
           <div className="mb-4 flex justify-between">
             <button
               onClick={() => router.push('/shipping')}
               type="button"
               className="default-button"
             >
               Back
             </button>
             <button className="primary-button">Next</button>
           </div>
         </form>
       </div>
     )
   }
   ```
