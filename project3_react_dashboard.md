# Project 3 — Finalize React: Full Dashboard App

## Purpose

This project is a bridge, not a destination. Every concept you build here exists because
Next.js will either replace it, abstract it, or change how it works. You need to build
it manually first so that when Next.js removes it from your hands, you understand what
it's doing under the hood and why.

The project is a Task Management + Analytics Dashboard — a domain rich enough to force
every React concept without artificial complexity.

---

## React Concepts You Must Cover

| Concept | Where You'll Use It | What Next.js Does Instead |
|---|---|---|
| React Router DOM | All navigation | File-based routing (`app/` directory) |
| Nested routes + layouts | Dashboard shell | `layout.tsx` files |
| Route-based code splitting (`React.lazy`) | Every page | Automatic per-page splitting |
| `Suspense` | Wrapping lazy pages | `loading.tsx` |
| Error Boundaries | Route-level error catching | `error.tsx` |
| TanStack Query | All server state | Server Components + `fetch()` |
| Zustand | UI state + user session | Still used in Next.js client components |
| Custom hooks | Reusable logic | Same in Next.js |
| `useNavigate` / `useParams` / `useSearchParams` | Navigation + URL state | `useRouter` / `useParams` / `useSearchParams` |
| Protected routes | Auth guard HOC | Middleware (`middleware.ts`) |
| `React.memo` / `useMemo` / `useCallback` | Performance optimization | Less needed with Server Components |
| Portal | Modal rendering | Same in Next.js |

If you skip any row, you are missing the exact concept Next.js will abstract away from you.

---

## Tech Stack

- React + Vite + TypeScript
- React Router DOM v6
- TanStack Query v5
- Zustand
- TailwindCSS + shadcn/ui
- JSONPlaceholder API (free, no auth: `https://jsonplaceholder.typicode.com`)
- Recharts (for analytics charts: `npm install recharts`)

---

## Free API Endpoints You Will Use

| Endpoint | Data |
|---|---|
| `GET /users` | Team members list |
| `GET /users/:id` | Single user profile |
| `GET /posts` | Tasks (repurpose posts as tasks) |
| `GET /posts/:id` | Single task detail |
| `GET /posts/:id/comments` | Task comments |
| `GET /todos` | Todo items |
| `GET /todos?userId=:id` | Todos filtered by user |
| `POST /posts` | Create task (fake — API accepts but doesn't persist) |
| `PUT /posts/:id` | Update task (fake) |
| `DELETE /posts/:id` | Delete task (fake) |

JSONPlaceholder always returns 200 for mutations — use this to practice mutation flow
even though data doesn't actually change server-side.

---

## Pages and Routes

```
/                          → redirect to /dashboard
/login                     → Login page (fake auth — no real backend)
/dashboard                 → Dashboard overview (protected)
/dashboard/tasks           → Task list with filters (protected)
/dashboard/tasks/:id       → Task detail (protected)
/dashboard/team            → Team members list (protected)
/dashboard/team/:id        → Team member profile (protected)
/dashboard/analytics       → Analytics page with charts (protected)
/dashboard/settings        → Settings page (protected)
*                          → 404 page
```

---

## Route Architecture

### Layout Structure

```tsx
// App.tsx
<BrowserRouter>
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected — wrapped in auth guard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<OverviewPage />} />
          <Route path="/dashboard/tasks" element={<TasksPage />} />
          <Route path="/dashboard/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/dashboard/team" element={<TeamPage />} />
          <Route path="/dashboard/team/:id" element={<TeamMemberPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
</BrowserRouter>
```

### Code Splitting — Every Page is Lazy

```ts
// pages/index.ts — all lazy imports in one file
import { lazy } from 'react'

export const LoginPage = lazy(() => import('./LoginPage'))
export const OverviewPage = lazy(() => import('./OverviewPage'))
export const TasksPage = lazy(() => import('./TasksPage'))
export const TaskDetailPage = lazy(() => import('./TaskDetailPage'))
export const TeamPage = lazy(() => import('./TeamPage'))
export const TeamMemberPage = lazy(() => import('./TeamMemberPage'))
export const AnalyticsPage = lazy(() => import('./AnalyticsPage'))
export const SettingsPage = lazy(() => import('./SettingsPage'))
```

Open Network tab. Click between pages. Each page's JS chunk loads on first visit only.
This is what Next.js automates — but you need to see it working manually first.

### Protected Route

```tsx
// components/ProtectedRoute.tsx
function ProtectedRoute() {
  const user = useAuthStore((state) => state.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
```

After login, redirect back to `location.state.from` so the user lands where they intended.
This exact pattern is replaced by `middleware.ts` in Next.js — understand it here.

---

## Dashboard Layout Component

```
┌─────────────────────────────────────────┐
│              Topbar                      │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │     <Outlet />               │
│          │  (page content renders here) │
│          │                              │
└──────────┴──────────────────────────────┘
```

```tsx
// layouts/DashboardLayout.tsx
function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />   {/* nested page renders here */}
        </main>
      </div>
    </div>
  )
}
```

`<Outlet />` is React Router's version of `{children}` for nested routes.
Next.js `layout.tsx` does the exact same thing with `{children}`.

---

## Zustand Stores

### Store 1 — Auth Store

```ts
interface AuthStore {
  user: { id: number; name: string; email: string } | null
  login: (credentials: { email: string; password: string }) => void
  logout: () => void
  isAuthenticated: () => boolean
}
```

- `login()` — hardcode one valid credential pair. Set user in store + persist to localStorage.
- `logout()` — clear user + navigate to `/login`
- Persist this store — user stays logged in on refresh

### Store 2 — UI Store

```ts
interface UIStore {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  activeModal: string | null
  openModal: (modalId: string) => void
  closeModal: () => void
}
```

- `theme` applies a `dark` class to `document.documentElement` (Tailwind dark mode)
- `isSidebarCollapsed` shrinks the sidebar to icon-only mode
- Persist `theme` and `isSidebarCollapsed` — user preferences survive refresh

### Store 3 — Task Filter Store

```ts
interface TaskFilterStore {
  search: string
  status: 'all' | 'completed' | 'pending'
  userId: number | null
  setSearch: (q: string) => void
  setStatus: (s: 'all' | 'completed' | 'pending') => void
  setUserId: (id: number | null) => void
  reset: () => void
}
```

This store controls the Tasks page filter bar. It is client state — no server involved.
Filters persist during the session but not across refresh (no persist middleware).

---

## Page Specifications

### Overview Page `/dashboard`

Widgets:
- Total tasks count
- Completed tasks count + completion percentage
- Total team members
- Recent 5 tasks (list)

Data: fetch all todos + all users. Derive stats client-side.
This teaches you to compose multiple queries into one UI.

```ts
const todosQuery = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })

const stats = useMemo(() => {
  if (!todosQuery.data) return null
  const total = todosQuery.data.length
  const completed = todosQuery.data.filter(t => t.completed).length
  return { total, completed, rate: Math.round((completed / total) * 100) }
}, [todosQuery.data])
```

---

### Tasks Page `/dashboard/tasks`

Features:
- List of all posts (treated as tasks)
- Filter bar: search by title, filter by status (completed/pending), filter by user
- Filters are controlled by `useTaskFilterStore`
- Filtered results are derived client-side from the full fetched list
- Each task row links to `/dashboard/tasks/:id`
- "New Task" button opens a modal (Portal-based modal)
- Modal contains a form to create a task (`useMutation` → POST /posts)
- Optimistic update: add the new task to the list immediately, revert on error

**URL state requirement:**
Sync the search filter to the URL using `useSearchParams`:

```ts
// When search changes → update URL
// On mount → read search from URL and set it in the store
// This makes the filtered view shareable/bookmarkable
```

This is something Next.js `useSearchParams` hook does identically — learn it here.

---

### Task Detail Page `/dashboard/tasks/:id`

Features:
- Fetch task by ID from URL params: `useParams()`
- Show task title, body, user who created it
- Fetch and show comments below the task (dependent query — wait for task to load first)
- "Delete Task" button → `useMutation` → DELETE /posts/:id → navigate back on success
- "Edit" inline (toggle between display and edit mode for title/body)
  → `useMutation` → PUT /posts/:id → `invalidateQueries` on success

---

### Team Page `/dashboard/team`

Features:
- Grid of all users (10 users from JSONPlaceholder)
- Each card shows: avatar (use `https://i.pravatar.cc/150?u={email}`), name, email, company
- Click card → navigate to `/dashboard/team/:id`

---

### Team Member Page `/dashboard/team/:id`

Features:
- User profile (name, email, phone, website, company, address)
- Their todos list (`GET /todos?userId=:id`) — show completion progress bar
- Their posts/tasks (`GET /posts?userId=:id`) — show as a small list

Two queries, both dependent on the `id` param from the URL.

---

### Analytics Page `/dashboard/analytics`

Features (all data derived from JSONPlaceholder — no real analytics API):
- **Bar chart:** tasks per user (group posts by userId)
- **Pie chart:** completed vs pending todos
- **Line chart:** simulate "tasks over time" by using post IDs as x-axis (ids 1–100 grouped into 10 buckets)

Use Recharts. Each chart is a separate component.

This page is intentionally the heaviest. `React.lazy` makes it load only when visited.
Open Network tab and verify the analytics chunk loads on first visit to this page only.

---

### Settings Page `/dashboard/settings`

Features:
- Theme toggle (light/dark) — reads/writes `useUIStore`
- Sidebar collapse toggle — reads/writes `useUIStore`
- Display name edit (local only — no API call, just updates auth store)
- "Logout" button — clears auth store + navigates to `/login`

---

## Error Boundary Implementation

```tsx
// components/ErrorBoundary.tsx — class component (required by React)
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Boundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} reset={() => this.setState({ hasError: false })} />
    }
    return this.props.children
  }
}
```

Wrap each major route section:

```tsx
<ErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <OverviewPage />
  </Suspense>
</ErrorBoundary>
```

To test it: temporarily throw an error inside any component and verify the boundary catches
it without crashing the whole app. This is `error.tsx` in Next.js.

---

## Portal — Modal Implementation

```tsx
// components/Modal.tsx
import { createPortal } from 'react-dom'

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 ...">
        {children}
      </div>
    </div>,
    document.body   // renders outside the component tree, directly in body
  )
}
```

Why Portal: modals rendered inside a `overflow-hidden` parent get clipped. Portal
escapes the DOM tree. Inspect the DOM — the modal will be a direct child of `<body>`,
not nested inside the dashboard layout.

---

## Performance Optimization Requirements

### React.memo

```tsx
// RepoCard re-renders when parent re-renders even if its props didn't change
// Wrap it:
const TaskRow = React.memo(function TaskRow({ task, onClick }) {
  return ( ... )
})
```

Use React DevTools Profiler. Record interactions. Identify which components re-render
unnecessarily. Wrap with `React.memo`. Record again. Compare.

### useCallback

```tsx
// Without useCallback: new function reference on every render → breaks React.memo
const handleDelete = useCallback((id: number) => {
  deleteMutation.mutate(id)
}, [deleteMutation])
```

### useMemo

```tsx
// Expensive filter operation — runs once, not on every render
const filteredTasks = useMemo(() => {
  return tasks
    .filter(t => t.title.includes(search))
    .filter(t => status === 'all' ? true : t.completed === (status === 'completed'))
}, [tasks, search, status])
```

---

## Custom Hooks You Must Write

| Hook | What it does |
|---|---|
| `useDebounce(value, delay)` | Delays search input before filtering |
| `useLocalStorage(key, initial)` | Read/write localStorage with state sync |
| `useDocumentTitle(title)` | Sets `document.title` based on current page |
| `useMediaQuery(query)` | Returns boolean for responsive logic |
| `useClickOutside(ref, handler)` | Fires handler when clicking outside a ref |

`useClickOutside` closes the modal when clicking the backdrop.
`useDebounce` prevents filtering on every keystroke.
`useDocumentTitle` sets the browser tab title per page — Next.js uses `metadata` export instead.

---

## Folder Structure

```
src/
├── api/
│   ├── posts.ts
│   ├── todos.ts
│   └── users.ts
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── ui/                    ← shadcn components live here
│   ├── charts/
│   │   ├── TasksBarChart.tsx
│   │   ├── TodosPieChart.tsx
│   │   └── ActivityLineChart.tsx
│   ├── ErrorBoundary.tsx
│   ├── Modal.tsx
│   ├── PageLoader.tsx
│   └── ProtectedRoute.tsx
├── hooks/
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useDocumentTitle.ts
│   ├── useMediaQuery.ts
│   └── useClickOutside.ts
├── lib/
│   ├── queryClient.ts
│   └── queryKeys.ts
├── pages/
│   ├── index.ts               ← all lazy imports
│   ├── LoginPage.tsx
│   ├── OverviewPage.tsx
│   ├── TasksPage.tsx
│   ├── TaskDetailPage.tsx
│   ├── TeamPage.tsx
│   ├── TeamMemberPage.tsx
│   ├── AnalyticsPage.tsx
│   ├── SettingsPage.tsx
│   └── NotFoundPage.tsx
├── stores/
│   ├── useAuthStore.ts
│   ├── useUIStore.ts
│   └── useTaskFilterStore.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## What You Must Be Able to Explain When Done

These are exactly what Next.js will replace — understanding the manual version
is what makes the Next.js version make sense:

| Manual React | Next.js Equivalent | You built it in |
|---|---|---|
| React Router `<Route>` | `app/page.tsx` files | App.tsx routing |
| `<DashboardLayout>` + `<Outlet>` | `app/dashboard/layout.tsx` | DashboardLayout |
| `React.lazy()` + `<Suspense>` | Automatic per-page splitting | pages/index.ts |
| `<ErrorBoundary>` class component | `error.tsx` files | ErrorBoundary.tsx |
| `<Suspense fallback>` | `loading.tsx` files | PageLoader usage |
| `ProtectedRoute` HOC | `middleware.ts` | ProtectedRoute.tsx |
| TanStack Query `useQuery` | `async` Server Components | hooks/ |
| `useSearchParams` (react-router) | `useSearchParams` (next/navigation) | TasksPage filters |
| `useNavigate` | `useRouter` from next/navigation | throughout |
| `document.title` via hook | `export const metadata` | useDocumentTitle |

---

## Completion Checklist

- [ ] Does code splitting work? (Network tab shows separate JS chunks per page)
- [ ] Does `<Suspense>` show a fallback while a lazy page loads?
- [ ] Does `<ErrorBoundary>` catch a thrown error without crashing the app?
- [ ] Does the Portal modal render as a direct child of `<body>` in the DOM?
- [ ] Does `ProtectedRoute` redirect unauthenticated users to `/login`?
- [ ] Does `/login` redirect back to the intended page after login?
- [ ] Does the search filter sync to the URL (bookmarkable)?
- [ ] Does `React.memo` prevent unnecessary re-renders (verified in DevTools Profiler)?
- [ ] Does `useDebounce` delay the filter from firing on every keystroke?
- [ ] Does dark mode toggle apply and persist across refresh?
- [ ] Does the sidebar collapse state persist across refresh?
- [ ] Do all 5 custom hooks work correctly?
- [ ] Can you draw the full component tree from memory?
- [ ] Can you explain what Next.js replaces for every concept in the table above?

---

## Estimated Time

| Phase | Time |
|---|---|
| Setup + routing + layouts + code splitting | 2–3 hours |
| Auth store + protected routes + login page | 2–3 hours |
| Overview page + TanStack queries | 2–3 hours |
| Tasks page + filters + URL sync + modal | 3–4 hours |
| Task detail + dependent queries + mutations | 2–3 hours |
| Team pages | 2–3 hours |
| Analytics page + Recharts | 3–4 hours |
| Settings + theme + sidebar persistence | 1–2 hours |
| Custom hooks (all 5) | 2–3 hours |
| Error boundaries + performance (memo/callback/memo) | 2–3 hours |
| DevTools profiling + review checklist | 1–2 hours |
| **Total** | **22–33 hours** |

This is the longest project deliberately. Do not rush it.
The goal is not to finish — the goal is to understand everything
so thoroughly that Next.js feels like a simplification, not a new system.
