import { db } from '../src/lib/db';

async function seedTracking() {
  const orders = await db.order.findMany({
    include: { tracking: true },
  });

  console.log(`Found ${orders.length} orders`);

  for (const order of orders) {
    // Skip if order already has tracking entries
    if (order.tracking.length > 0) {
      console.log(`Order ${order.id.slice(-8)} already has tracking, skipping`);
      continue;
    }

    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const hoursSinceOrder = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

    // Determine how far along the order should be based on time
    let trackingEntries: { status: string; description: string; location: string; timestamp: Date }[] = [];

    if (order.status === 'cancelled') {
      trackingEntries = [
        {
          status: 'pending',
          description: 'Your order has been placed successfully',
          location: 'Online',
          timestamp: orderDate,
        },
        {
          status: 'cancelled',
          description: 'Order has been cancelled as per your request',
          location: 'Z Shop',
          timestamp: new Date(orderDate.getTime() + 30 * 60 * 1000),
        },
      ];
    } else if (hoursSinceOrder < 4) {
      // Recent order - just pending
      trackingEntries = [
        {
          status: 'pending',
          description: 'Your order has been placed successfully',
          location: 'Online',
          timestamp: orderDate,
        },
      ];
    } else if (hoursSinceOrder < 12) {
      // Confirmed + processing
      trackingEntries = [
        {
          status: 'pending',
          description: 'Your order has been placed successfully',
          location: 'Online',
          timestamp: orderDate,
        },
        {
          status: 'confirmed',
          description: 'Order confirmed by seller. Preparing your package.',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        },
        {
          status: 'processing',
          description: 'Your package has been packed and is ready for dispatch',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 6 * 60 * 60 * 1000),
        },
      ];
    } else if (hoursSinceOrder < 24) {
      // Shipped
      trackingEntries = [
        {
          status: 'pending',
          description: 'Your order has been placed successfully',
          location: 'Online',
          timestamp: orderDate,
        },
        {
          status: 'confirmed',
          description: 'Order confirmed by seller. Preparing your package.',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        },
        {
          status: 'processing',
          description: 'Your package has been packed and is ready for dispatch',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 6 * 60 * 60 * 1000),
        },
        {
          status: 'shipped',
          description: 'Your package has been shipped and is on its way',
          location: 'Mumbai Hub',
          timestamp: new Date(orderDate.getTime() + 10 * 60 * 60 * 1000),
        },
      ];

      // Update order status to shipped
      await db.order.update({
        where: { id: order.id },
        data: { status: 'shipped' },
      });
    } else if (hoursSinceOrder < 48) {
      // Out for delivery
      trackingEntries = [
        {
          status: 'pending',
          description: 'Your order has been placed successfully',
          location: 'Online',
          timestamp: orderDate,
        },
        {
          status: 'confirmed',
          description: 'Order confirmed by seller. Preparing your package.',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        },
        {
          status: 'processing',
          description: 'Your package has been packed and is ready for dispatch',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 6 * 60 * 60 * 1000),
        },
        {
          status: 'shipped',
          description: 'Your package has been shipped and is on its way',
          location: 'Mumbai Hub',
          timestamp: new Date(orderDate.getTime() + 10 * 60 * 60 * 1000),
        },
        {
          status: 'out-for-delivery',
          description: 'Your package is out for delivery and will arrive today',
          location: `${order.city} Delivery Center`,
          timestamp: new Date(orderDate.getTime() + 30 * 60 * 60 * 1000),
        },
      ];

      // Update order status to out-for-delivery
      await db.order.update({
        where: { id: order.id },
        data: { status: 'out-for-delivery' },
      });
    } else {
      // Delivered
      trackingEntries = [
        {
          status: 'pending',
          description: 'Your order has been placed successfully',
          location: 'Online',
          timestamp: orderDate,
        },
        {
          status: 'confirmed',
          description: 'Order confirmed by seller. Preparing your package.',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        },
        {
          status: 'processing',
          description: 'Your package has been packed and is ready for dispatch',
          location: 'Z Shop Warehouse',
          timestamp: new Date(orderDate.getTime() + 6 * 60 * 60 * 1000),
        },
        {
          status: 'shipped',
          description: 'Your package has been shipped and is on its way',
          location: 'Mumbai Hub',
          timestamp: new Date(orderDate.getTime() + 10 * 60 * 60 * 1000),
        },
        {
          status: 'out-for-delivery',
          description: 'Your package is out for delivery and will arrive today',
          location: `${order.city} Delivery Center`,
          timestamp: new Date(orderDate.getTime() + 30 * 60 * 60 * 1000),
        },
        {
          status: 'delivered',
          description: 'Your package has been delivered successfully',
          location: order.city,
          timestamp: new Date(orderDate.getTime() + 36 * 60 * 60 * 1000),
        },
      ];

      // Update order status to delivered
      await db.order.update({
        where: { id: order.id },
        data: { status: 'delivered' },
      });
    }

    // Create tracking entries
    for (const entry of trackingEntries) {
      await db.orderTracking.create({
        data: {
          orderId: order.id,
          status: entry.status,
          description: entry.description,
          location: entry.location,
          timestamp: entry.timestamp,
        },
      });
    }

    console.log(`Seeded tracking for order ${order.id.slice(-8)} (${trackingEntries.length} steps, status: ${order.status})`);
  }

  console.log('Done!');
}

seedTracking()
  .catch(console.error)
  .finally(() => process.exit());
