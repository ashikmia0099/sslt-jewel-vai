import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className=' h-[100vh] text-center pt-200'>
      <h2 className=' text-5xl'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}