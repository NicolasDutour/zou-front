"use client"

import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : '' || {},
  token: Cookies.get('token') || null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload
      Cookies.set('user', JSON.stringify(action.payload))
    },
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.jwt
      Cookies.set('user', JSON.stringify(action.payload.user))
      Cookies.set('token', action.payload.jwt)
    },
    signUp: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.jwt
      Cookies.set('user', JSON.stringify(action.payload.user))
      Cookies.set('token', action.payload.jwt)
    },
    logout: (state) => {
      state.user = {}
      state.token = null
      Cookies.remove('user', { path: '/', domain: process.env.NEXT_PUBLIC_FRONT_URL })
      Cookies.remove('token', { path: '/', domain: process.env.NEXT_PUBLIC_FRONT_URL })
    },
    setError: (state, action) => {
      state.user = null
      state.user = token
      state.error = action.payload
    }
  },
})

export const { setUserInfo, getUserInfo, login, signUp, logout, setError } = authSlice.actions

export default authSlice.reducer