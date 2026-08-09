# Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              ROLES                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ PK  id          BIGINT      AUTO_INCREMENT  ████████                    │
│     name        VARCHAR(50) UNIQUE           ██████░                    │
│     description VARCHAR(255)                 ░░░░░░░                    │
└─────────────────────────────────────────────────────────────────────────┘
        ▲
        │
┌───────┴────────┐         ┌─────────────────────────────────────────────┐
│   USER_ROLES   │◄────────│  Many-to-Many  USER_ROLES  Many-to-One      │
├────────────────┤   FK    ├─────────────────────────────────────────────┤
│ user_id (PK,FK)│─────────│ users.id                                        │
│ role_id (PK,FK)│◄────────┤ roles.id                                       │
└──────┬─────────┘         └─────────────────────────────────────────────┘
       │
┌──────┴────────┐
│    USERS      │
├───────────────┤
│ PK  id        │
│     first_name│
│     last_name │
│     email     │ UNIQUE
│     password  │
│     phone     │
│     status    │
│     createdAt │
│     updatedAt │
└──────┬────────┘
       │ One-to-One
       │ (user_id)
┌──────┴────────┐
│    CARTS      │
├───────────────┤
│ PK  id        │
│ FK  user_id   │ UNIQUE
│     createdAt │
│     updatedAt │
└──────┬────────┘
       │ One-to-Many
       │ (cart_id)
┌──────┴────────┐
│  CART_ITEMS   │
├───────────────┤
│ PK  id        │
│ FK  cart_id   │
│ FK  product_id│
│     quantity  │
│     price     │
└──────┬────────┘
       │ Many-to-One
       │
┌──────────┐     ┌─────────────┐
│ PRODUCTS │◄────│ CATEGORIES  │
├──────────┤     ├─────────────┤
│ PK id    │     │ PK id       │
│ FK cat   │     │ name        │
│ name     │     │ slug        │ UNIQUE
│ slug     │     │ description │
│ price    │     │ FK parent   │ (self-ref)
│ stock    │     │ is_active   │
│ image    │     │ createdAt   │
│ is_active│     │ updatedAt   │
│ createdAt│     └──────┬──────┘
│ updatedAt│            │ One-to-Many
└──────────┘            │ (category_id)
                          ▼
┌──────────┐     ┌─────────────┐
│ PRODUCTS │    │ CATEGORIES   │
│  (cont)  │    │  (children)  │
└──────────┘    └──────────────┘

┌─────────────────────────────────────────────┐
│              ORDERS                          │
├─────────────────────────────────────────────┤
│ PK  id                                       │
│ FK  user_id                                    │
│     total_amount                             │
│     status                                   │
│     shipping_address                         │
│     createdAt                                │
│     updatedAt                                │
└──────┬───────────────────────────────────────┘
       │ One-to-Many (order_id)
┌──────┴────────┐
│ ORDER_ITEMS   │
├───────────────┤
│ PK  id        │
│ FK  order_id  │
│ FK  product_id│
│     quantity  │
│     price     │
└───────────────┘
       │ Many-to-One
       │ (order_id)
┌──────┴────────┐
│  PAYMENTS     │
├───────────────┤
│ PK  id        │
│ FK  order_id  │ UNIQUE (One-to-One)
│     amount    │
│     method    │
│     txn_id    │
│     status    │
│     createdAt │
│     updatedAt │
└───────────────┘
```

## Relationship Summary

| Relationship              | Type             | Cardinality     | Join Table/Column |
|---------------------------|------------------|-----------------|-------------------|
| User ↔ Role               | Many-to-Many     | N : N           | user_roles        |
| User → Cart               | One-to-One       | 1 : 1           | carts.user_id     |
| Cart → CartItem           | One-to-Many      | 1 : N           | cart_items.cart_id|
| CartItem → Product        | Many-to-One      | N : 1           | cart_items.product_id |
| Order → OrderItem         | One-to-Many      | 1 : N           | order_items.order_id |
| OrderItem → Product       | Many-to-One      | N : 1           | order_items.product_id |
| Order → Payment           | One-to-One       | 1 : 1           | payments.order_id |
| Order → User              | Many-to-One      | N : 1           | orders.user_id    |
| Product → Category        | Many-to-One      | N : 1           | products.category_id |
| Category → Category       | One-to-Many (self-referencing) | 1 : N | categories.parent_id |
