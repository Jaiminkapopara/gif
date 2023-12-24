'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Feed from '@/components/Feed'
import { auth } from '@/utils/firebase'
import Loader from '@/components/Loader'

export default function Home() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
                router.push('/registration/login')
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [router])

    if (isLoading) {
        return <Loader />
    }

    return (
        user && (
            <section>
                <Feed authUser={user} />
            </section>
        )
    )
}
