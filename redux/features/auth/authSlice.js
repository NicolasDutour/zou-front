"use client"

import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
import { removeCookie, createCookie } from "@/app/actions"

const initialState = {
  user: {},
  token: null,
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
      createCookie('user', JSON.stringify(action.payload.user))
      createCookie('token', action.payload.jwt)
    },
    signUp: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.jwt
      createCookie('user', JSON.stringify(action.payload.user))
      createCookie('token', action.payload.jwt)
    },
    logout: (state) => {
      state.user = {}
      state.token = null
      removeCookie('token')
      removeCookie('user')
    },
    setError: (state, action) => {
      state.user = {}
      state.user = token
      state.error = action.payload
      removeCookie('token')
      removeCookie('user')
    }
  },
})

export const { setUserInfo, getUserInfo, login, signUp, logout, setError } = authSlice.actions

export default authSlice.reducer