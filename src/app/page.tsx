import Image from 'next/image'
import Shopping from './components/Shopping/page'
import Cart from './components/Cart/page'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Shopping />  
      <Cart />
    </main>
  )
}
