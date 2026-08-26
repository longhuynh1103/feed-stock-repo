import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

// ==========================================
// 1. LOGIN PAYLOAD TYPE
// ==========================================

interface LoginPayload {
  username: string
  password: string
  rememberDevice: boolean
}

// ==========================================
// 2. ROUTE
// ==========================================

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

// ==========================================
// 3. COMPONENT
// ==========================================

function LoginComponent() {
  const navigate = useNavigate()

  // ==========================================
  // LOGIN MUTATION
  // ==========================================
  //
  // Tạm thời dùng mock. Khi backend có auth module,
  // thay bằng gọi API POST /auth/login và lưu token.
  //

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      await new Promise((resolve) => setTimeout(resolve, 600))

      if (
        payload.username !== 'admin' ||
        payload.password !== 'admin'
      ) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng')
      }

      return payload
    },

    onSuccess: async () => {
      await navigate({ to: '/' })
    },
  })

  // ==========================================
  // TANSTACK FORM
  // ==========================================

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberDevice: false,
    },

    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value)
    },
  })

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-xl border p-8 text-card-foreground shadow-lg shadow-black/5 dark:shadow-black/30">
        {/* ======================================
            HEADER
        ======================================= */}

        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Đăng nhập
          </h1>

          <p className="text-sm text-muted-foreground">
            Hệ thống quản lý kho thức ăn chăn nuôi
          </p>
        </div>

        {/* ======================================
            FORM
        ======================================= */}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()

            form.handleSubmit()
          }}
          className="space-y-4"
        >
          {/* ==================================
              USERNAME
          =================================== */}

          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                !value.trim()
                  ? 'Tên đăng nhập không được để trống'
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>
                  Tên đăng nhập
                </Label>

                <Input
                  id={field.name}
                  autoComplete="username"
                  autoFocus
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                />

                {field.state.meta.errors.length > 0 ? (
                  <em className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>

          {/* ==================================
              PASSWORD
          =================================== */}

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value.trim()
                  ? 'Mật khẩu không được để trống'
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>
                  Mật khẩu
                </Label>

                <Input
                  id={field.name}
                  type="password"
                  autoComplete="current-password"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                />

                {field.state.meta.errors.length > 0 ? (
                  <em className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>

          {/* ==================================
              REMEMBER DEVICE
          =================================== */}

          <form.Field name="rememberDevice">
            {(field) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />

                <Label
                  htmlFor={field.name}
                  className="font-normal text-muted-foreground"
                >
                  Ghi nhớ thiết bị trong 30 ngày
                </Label>
              </div>
            )}
          </form.Field>

          {/* ==================================
              ERROR MESSAGE
          =================================== */}

          {loginMutation.isError ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {loginMutation.error.message}
            </div>
          ) : null}

          {/* ==================================
              SUBMIT
          =================================== */}

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="h-8 w-full text-sm"
                disabled={
                  !canSubmit || loginMutation.isPending
                }
              >
                {isSubmitting || loginMutation.isPending
                  ? 'Đang đăng nhập...'
                  : 'Đăng nhập'}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  )
}
