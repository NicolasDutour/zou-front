"use client"

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devtools: true
})

export default store