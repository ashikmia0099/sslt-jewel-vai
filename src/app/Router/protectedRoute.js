'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {

    const { loginData } = useSelector((state) => state.login);
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace('/Auth');
        } else {
            setIsReady(true);
        }
    }, [router]);

    if (!isReady) return null;

    return <>{children}</>;
}