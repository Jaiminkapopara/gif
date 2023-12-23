'use client'

import { auth } from '@/utils/firebase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [user, setUser] = useState()
    const router = useRouter()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUser(authUser)
        })
    }, [router])

    const Logout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Successfully Logout!')
                router.push('/registration/login')
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    return (
        <nav className="flex justify-between items-center sm:p-8 p-2 md:px-16 mb-5">
            <Link href={user ? '/' : '/registration/login'}>
                <h1 className="md:text-5xl text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text md:leading-[64px] leading-[48px]">
                    GIF Gallery
                </h1>
            </Link>

            {!user && (
                <div className="flex items-center sm:gap-x-5 gap-2">
                    <span className="font-semibold md:text-lg text-base hidden sm:block">
                        Hello, {user && user.displayName}
                    </span>
                    <Link href={`/user/favorite?uid=${user.uid}`} className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                    </Link>
                    <button
                        onClick={Logout}
                        className="bg-black sm:px-7 sm:py-4 px-4 py-3 text-white rounded-xl"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
