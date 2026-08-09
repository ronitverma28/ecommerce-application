# Entity Relationship Explanation

## Overview

The E-Commerce Application database follows a **modular relational design** that supports
authentication, product catalog management, shopping cart operations, order processing,
and payment simulation. All tables use the **InnoDB** storage engine to support ACID
transactions and foreign key constraints.

## Tables and Their Relationships

### 1. Roles & Users (Authentication)

- **roles**: Stores user role definitions (e.g., `ROLE_USER`, `ROLE_ADMIN`).
  Each role has a unique name and an optional description.

- **users**: Stores core user account data including personal information,
  credentials, and account status. The `email` field is unique.

- **user_roles**: A **join table** implementing the **Many-to-Many** relationship
  between `users` and `roles`. A user can hold multiple roles, and a role can be
  assigned to multiple users. Uses cascading deletes so that when a user or role
  is removed, the associated join records are automatically cleaned up.

### 2. Categories & Products (Catalog)

- **categories**: Represents the product catalog hierarchy. Supports a
  **self-referencing** parent-child relationship via `parent_id`, allowing
  nested categories (e.g., Electronics → Mobile Phones → Smartphones).
  The `slug` field is unique for SEO-friendly URLs. Inactive categories
  can be soft-deleted via `is_active = FALSE`.

- **products**: Stores product information. Each product belongs to a
  **category** (Many-to-One). The `slug` is unique. `stock_quantity` tracks
  inventory. `is_active` allows soft-deleting products without data loss.
  `price_at_add` in related cart/order items captures the price at the time
  of addition to cart or order, preserving historical pricing.

### 3. Shopping Cart

- **carts**: Represents a user's shopping cart. A **One-to-One** relationship
  with `users` (each user has exactly one cart). Uses `user_id` as a unique
  key, so each user can only have one cart.

- **cart_items**: Individual line items in a cart. Each cart item references
  a **product** and records the quantity and the price at the time it was
  added (`price_at_add`). **Cascading deletes** ensure that when a cart is
  removed, its items are also removed.

### 4. Orders

- **orders**: Stores order headers. Each order belongs to a **user**
  (Many-to-One). The `status` field tracks the order lifecycle:
  `PENDING → CONFIRMED → SHIPPED → DELIVERED` (with `CANCELLED` and
  `REFUNDED` as terminal states). `total_amount` is the sum of all
  order item prices.

- **order_items**: Individual line items in an order. Each order item
  references a **product** and stores the quantity and price at the time
  of purchase. The price is stored explicitly (not referenced from the
  product table) to preserve historical pricing even if the product
  price changes later.

### 5. Payments

- **payments**: Stores payment records for the payment simulation flow.
  A **One-to-One** relationship with `orders` (each order has exactly one
  payment). The `payment_status` field tracks: `PENDING → SUCCESS/FAILED`
  (with `REFUNDED` as an optional terminal state). The `transaction_id`
  simulates a third-party payment gateway transaction reference.

## Design Decisions

### Data Integrity
- All foreign key constraints use appropriate `ON DELETE` behavior:
  - `CASCADE` for dependent entities (cart items → cart, order items → order).
  - `SET NULL` for categorization references (product → category, category → parent category).
- The `users.email` field is `UNIQUE` to prevent duplicate accounts.

### Soft Deletes
- `categories.is_active` and `products.is_active` support soft deletion,
  preserving referential integrity while hiding items from the storefront.

### Historical Pricing
- Cart items and order items store `price` values at the time of creation,
  decoupled from the current product price. This ensures order history
  remains accurate even after price changes.

### Timestamps
- All mutable entities (`users`, `categories`, `products`, `carts`, `orders`,
  `payments`) include `created_at` and `updated_at` timestamps for auditing
  and change tracking.

### Indexes
- Indexes are created on all foreign key columns and frequently queried
  columns (e.g., `products.name`, `orders.status`, `orders.user_id`) to
  optimize common query patterns.
