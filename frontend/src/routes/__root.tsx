import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { AmbientBackground } from '@/components/ambient-background'
import { ThemeToggle } from '@/components/theme-toggle'

// 1. Khởi tạo QueryClient nhận diện kiểu dữ liệu
interface MyRouterContext {
  queryClient: QueryClient
}

// 2. Khởi tạo Root Route với Context truyền từ file Main vào
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      {/* Nền ambient aurora blobs nằm dưới toàn bộ nội dung */}
      <AmbientBackground />

      {/* Giao diện chính của toàn bộ trang web nằm ở Outlet */}
      <div className="relative z-10 p-4 min-h-screen text-foreground">
        <div className="fixed top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        <Outlet />
      </div>

      {/* Hệ thống Devtools hỗ trợ lập trình (Tự động ẩn khi Build Production) */}
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
}
