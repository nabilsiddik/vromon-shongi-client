'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/shared/layout/Navbar'
import React, { Suspense } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1">
                    {children}
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}

export default Layout
