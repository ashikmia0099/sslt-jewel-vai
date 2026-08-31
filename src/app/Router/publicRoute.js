'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function PublicRoute({ children }) {
  const { loginData } = useSelector(state => state.login);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if  ( token || loginData) {
      router.replace('/Deshboard/DeshboardLoginUser/DeshboardLoginUserAllList');
    }else {
      setIsChecking(false);
    }
  }, [loginData, router]);

  if (isChecking) return null;

  return <>{children}</>;
}