import { createFileRoute } from '@tanstack/react-router'
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { flexRender } from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// ==========================================
// 1. USER TYPE
// ==========================================

interface User {
  id: number
  name: string
  email: string
}

// ==========================================
// 2. MOCK DATA
// ==========================================

let mockUsers: User[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'a@gmail.com',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'b@gmail.com',
  },
]

// ==========================================
// 3. TANSTACK TABLE V9 FEATURES
// ==========================================
//
// v9 yêu cầu createColumnHelper có TFeatures.
// Core row model được tạo tự động.
//
// Nếu sau này cần sorting/filtering/pagination,
// có thể thêm feature tương ứng vào đây.
//

const features = tableFeatures({})

const columnHelper = createColumnHelper<typeof features, User>()

// ==========================================
// 4. TABLE COLUMNS
// ==========================================
//
// Không cần ColumnDef<User, any>[].
// Để helper tự infer type.
//

const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: 'Họ và Tên',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('email', {
    header: 'Địa chỉ Email',
    cell: (info) => info.getValue(),
  }),
])

// ==========================================
// 5. ROUTE
// ==========================================

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

// ==========================================
// 6. COMPONENT
// ==========================================

function HomeComponent() {
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // ==========================================
  // TANSTACK QUERY
  // ==========================================

  const {
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))

      return [...mockUsers]
    },
  })

  // ==========================================
  // CREATE USER MUTATION
  // ==========================================

  const createUserMutation = useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>) => {
      await new Promise((resolve) => setTimeout(resolve, 300))

      mockUsers.push({
        id: Date.now(),
        ...newUser,
      })
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users'],
      })

      setIsDialogOpen(false)
    },
  })

  // ==========================================
  // TANSTACK FORM
  // ==========================================

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },

    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync(value)

      form.reset()
    },
  })

  // ==========================================
  // TANSTACK TABLE V9
  // ==========================================

  const table = useTable({
    features,
    data: users,
    columns,
  })

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-10">
      {/* ======================================
          HEADER
      ======================================= */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hệ thống quản lý
          </h1>

          <p className="text-muted-foreground">
            Giải pháp đồng bộ shadcn/ui và TanStack V9.
          </p>
        </div>

        {/* ======================================
            CREATE USER DIALOG
        ======================================= */}

        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              Thêm thành viên
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Tạo thành viên mới
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()

                form.handleSubmit()
              }}
              className="space-y-4 pt-4"
            >
              {/* ==================================
                  NAME
              =================================== */}

              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim()
                      ? 'Họ tên không được để trống'
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-1">
                    <Label htmlFor={field.name}>
                      Họ và tên
                    </Label>

                    <Input
                      id={field.name}
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
                  EMAIL
              =================================== */}

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value.includes('@')
                      ? 'Email không đúng định dạng'
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-1">
                    <Label htmlFor={field.name}>
                      Email
                    </Label>

                    <Input
                      id={field.name}
                      type="email"
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
                  ACTIONS
              =================================== */}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>

                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                  ]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={
                        !canSubmit ||
                        createUserMutation.isPending
                      }
                    >
                      {isSubmitting ||
                      createUserMutation.isPending
                        ? 'Đang lưu...'
                        : 'Lưu lại'}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ========================================
          TABLE
      ========================================= */}

      <div className="glass rounded-md border text-card-foreground shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">
            Đang đồng bộ danh sách dữ liệu...
          </div>
        ) : (
          <Table>
            {/* ==================================
                HEADER
            =================================== */}

            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* ==================================
                BODY
            =================================== */}

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getAllCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không tìm thấy dữ liệu nào trên hệ thống.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
