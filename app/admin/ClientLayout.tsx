"use client"

import React from "react"

import { useMobileMenuStore } from '@/global-state/store';
import Layout from './layout';

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
  const openMenu = useMobileMenuStore((state) => state.openMobileMenu);
  return <Layout openMenu={openMenu}>{children}</Layout>;
}