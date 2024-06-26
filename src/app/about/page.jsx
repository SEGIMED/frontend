import { NavBar } from '@/components/NavBar/navbar'

export default function About() {
  return (
    <div className="h-full flex flex-col">
      <div className="fixed top-0 w-full z-10">
        <NavBar />
      </div>
      <div className='flex justify-center item-center'>
        <h1>Hola soy el about</h1>
      </div>
    </div>
  )
}