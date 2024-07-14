
import Image404 from '@/components/icons/Image404';
import LogoSegimed from '@/components/logo/LogoSegimed';
import Link from 'next/link';


export default function NotFound() {
    return (
        <div className="flex flex-col  h-screen bg-gray-100">
            <div className='pr-3'>
                <LogoSegimed className="w-48 h-20" />
            </div>
            <div className='flex flex-col items-center justify-center mt-10 gap-6 '>
                <div >
                    <Image404 />
                </div>
                <p className='text-bluePrimary leading-6 text-3xl  font-semibold md:text-6xl  '>¡Oops!</p>
                <p className='text-bluePrimary leading-6 text-center text-3xl  font-semibold md:text-6xl '>No encontramos lo que estás buscando.</p>
                <Link href={`/`}>
                    <button className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-fit ">
                        <p className="block text-white font-bold">
                            Volver a Inicio
                        </p>
                    </button>
                </Link>
            </div>
        </div>
    );
}