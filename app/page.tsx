import Link from "next/link";
import ProductCard from "./components/ProductCard";


export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'black' }}>Hello World</h1>
      <Link style={{ color: 'black' }} href = "/users">Users</Link>
      <ProductCard />
    </main>
  )
}
