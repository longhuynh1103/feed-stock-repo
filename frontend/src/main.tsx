import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen' // File này sẽ tự sinh ra khi bạn chạy dev
import './globals.css'

// Khởi tạo Query Client toàn cục
const queryClient = new QueryClient()

// Khởi tạo Router và truyền Query Client vào Context
const router = createRouter({
  routeTree,
  context: { queryClient },
})

// Khai báo kiểu cho TypeScript nhận diện an toàn
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
