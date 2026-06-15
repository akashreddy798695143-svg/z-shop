# Task: Auth API Routes, Store Updates, and API Route Updates

## Summary
Implemented authentication API routes, updated the Zustand store with auth state, and modified existing API routes (checkout, orders, cart) to support userId.

## Changes Made

### 1. Auth API Routes (Created)

- **`/src/app/api/auth/register/route.ts`**: POST endpoint for user registration
  - Validates name, email, password (required, min 6 chars)
  - Checks email uniqueness
  - Uses bcryptjs for password hashing
  - Returns user object without password

- **`/src/app/api/auth/login/route.ts`**: POST endpoint for user login
  - Validates email and password
  - Uses bcryptjs for password comparison
  - Returns user object without password or 401 error

- **`/src/app/api/auth/me/route.ts`**: POST endpoint to get current user by ID
  - Accepts userId in request body
  - Returns user without password or 404 error

### 2. Zustand Store (`/src/store/use-shop-store.ts`) (Updated)

Added auth state:
- `user: UserInfo | null` - persisted to localStorage
- `isAuthModalOpen: boolean`
- `authModalTab: 'login' | 'signup'`
- `setUser()` - sets user state
- `openAuthModal(tab?)` - opens auth modal with optional tab (default 'login')
- `closeAuthModal()` - closes auth modal
- `logout()` - sets user to null AND clears cart (items, count, total)
- Added `user` to `partialize` for localStorage persistence

### 3. Checkout API Route (`/src/app/api/checkout/route.ts`) (Updated)

- Now accepts `userId` from request body
- Creates Order with `userId` field instead of `sessionId`
- `sessionId` still required for cart lookup
- Still clears cart after order creation

### 4. Orders API Route (`/src/app/api/orders/route.ts`) (Updated)

- Accepts `userId` query param alongside `sessionId`
- Finds orders by `userId` when provided
- Returns empty array if only `sessionId` provided (Order model uses userId, not sessionId)

### 5. Cart API Route (`/src/app/api/cart/route.ts`) (Updated)

- GET handler now accepts `userId` query param alongside `sessionId`
- Uses `sessionId` for cart lookup (Cart model is keyed by sessionId)
- Returns empty cart if only `userId` provided without `sessionId`

## Key Notes

- The Prisma schema already had the User model and `userId` on Order
- Database was already in sync (no schema changes needed)
- `bcryptjs` was already available in the project for password hashing
- All existing store functionality preserved
- Lint passes, dev server runs without errors
