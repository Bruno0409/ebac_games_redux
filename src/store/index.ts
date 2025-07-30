import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import carrinhoReducer from './reducers/carrinho'
import api from '../services/api' // <-- importa sua API

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    [api.reducerPath]: api.reducer // <-- adiciona reducer da API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) // <-- adiciona middleware da API
})

setupListeners(store.dispatch) // <-- ativa recursos como refetchOnFocus

export type RootReduce = ReturnType<typeof store.getState>
