
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })
import { NextUIProvider } from "@nextui-org/react";


export default function RootLayout({ children }) {
    return (
        <div className='w-full relative'>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </div>
    )
}