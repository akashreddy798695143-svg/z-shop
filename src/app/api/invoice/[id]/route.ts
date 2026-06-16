import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await db.order.findUnique({
      where: { id },
      include: {
        items: true,
        tracking: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Generate HTML invoice
    const invoiceHtml = generateInvoiceHtml(order);

    return new NextResponse(invoiceHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="invoice-${order.id.slice(-8).toUpperCase()}.html"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

interface TrackingStep {
  id: string;
  status: string;
  description: string;
  location: string | null;
  timestamp: Date;
}

interface OrderWithRelations {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string | null;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  items: OrderItem[];
  tracking: TrackingStep[];
}

function generateInvoiceHtml(order: OrderWithRelations): string {
  const invoiceNumber = `INV-${order.id.slice(-8).toUpperCase()}`;
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const paymentLabel =
    order.paymentMethod === "card"
      ? "Credit Card"
      : order.paymentMethod === "debit"
      ? "Debit Card"
      : "UPI";

  const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    confirmed: "#3b82f6",
    processing: "#6366f1",
    shipped: "#8b5cf6",
    "out-for-delivery": "#f97316",
    delivered: "#10b981",
    cancelled: "#ef4444",
  };

  const statusColor = statusColors[order.status] || "#6b7280";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoiceNumber} - Z Shop</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1f2937;
      background: #f3f4f6;
      padding: 20px;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #059669, #0d9488);
      color: white;
      padding: 32px 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header h1 { font-size: 28px; font-weight: 800; }
    .header .subtitle { font-size: 14px; opacity: 0.85; margin-top: 4px; }
    .invoice-badge {
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(8px);
      padding: 12px 20px;
      border-radius: 10px;
      text-align: right;
    }
    .invoice-badge .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; }
    .invoice-badge .number { font-size: 18px; font-weight: 700; margin-top: 2px; }
    .body { padding: 32px 40px; }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }
    .meta-section h3 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9ca3af;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .meta-section p { font-size: 13px; line-height: 1.6; color: #4b5563; }
    .meta-section .name { font-weight: 600; color: #1f2937; }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      color: white;
      background: ${statusColor};
      margin-top: 4px;
    }
    .status-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: white;
    }
    table { width: 100%; border-collapse: collapse; }
    thead th {
      background: #f9fafb;
      padding: 12px 16px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6b7280;
      font-weight: 600;
      border-bottom: 2px solid #e5e7eb;
    }
    thead th:last-child { text-align: right; }
    thead th:nth-child(3) { text-align: center; }
    tbody td {
      padding: 14px 16px;
      font-size: 14px;
      border-bottom: 1px solid #f3f4f6;
      vertical-align: middle;
    }
    tbody td:last-child { text-align: right; }
    tbody td:nth-child(3) { text-align: center; }
    .item-name { font-weight: 500; color: #1f2937; }
    .totals { margin-top: 24px; display: flex; justify-content: flex-end; }
    .totals-table { width: 280px; }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
      color: #6b7280;
    }
    .totals-row.total {
      border-top: 2px solid #1f2937;
      padding-top: 12px;
      margin-top: 4px;
      font-size: 20px;
      font-weight: 800;
      color: #1f2937;
    }
    .footer {
      background: #f9fafb;
      padding: 24px 40px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }
    .footer p { font-size: 12px; color: #9ca3af; line-height: 1.6; }
    .footer .brand { font-weight: 700; color: #059669; }
    @media print {
      body { background: white; padding: 0; }
      .invoice-container { box-shadow: none; border-radius: 0; }
      .no-print { display: none; }
    }
    .print-btn {
      position: fixed; bottom: 24px; right: 24px;
      background: #059669; color: white; border: none;
      padding: 12px 24px; border-radius: 10px;
      font-size: 14px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 12px rgba(5,150,105,0.3);
    }
    .print-btn:hover { background: #047857; }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div>
        <h1>Z Shop</h1>
        <p class="subtitle">Your One-Stop E-Commerce Destination</p>
      </div>
      <div class="invoice-badge">
        <div class="label">Invoice</div>
        <div class="number">${invoiceNumber}</div>
      </div>
    </div>
    <div class="body">
      <div class="meta-grid">
        <div class="meta-section">
          <h3>Bill To</h3>
          <p><span class="name">${order.firstName} ${order.lastName}</span><br/>
          ${order.address}<br/>
          ${order.city}, ${order.state} ${order.zipCode}<br/>
          ${order.country}</p>
        </div>
        <div class="meta-section">
          <h3>Order Details</h3>
          <p>
            Order: #${order.id.slice(-8).toUpperCase()}<br/>
            Date: ${orderDate}<br/>
            Payment: ${paymentLabel}
          </p>
          <div class="status-badge">
            <span class="status-dot"></span>
            ${order.status.charAt(0).toUpperCase() + order.status.slice(1).replace(/-/g, ' ')}
          </div>
        </div>
        <div class="meta-section">
          <h3>Contact</h3>
          <p>
            Email: ${order.email}<br/>
            ${order.phone ? `Phone: ${order.phone}` : ''}
          </p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item, i) => `
          <tr>
            <td style="color:#9ca3af">${i + 1}</td>
            <td><span class="item-name">${item.productName}</span></td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td style="font-weight:600">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <div class="totals">
        <div class="totals-table">
          <div class="totals-row">
            <span>Subtotal</span>
            <span>$${order.subtotal.toFixed(2)}</span>
          </div>
          <div class="totals-row">
            <span>Tax (8%)</span>
            <span>$${order.tax.toFixed(2)}</span>
          </div>
          <div class="totals-row">
            <span>Shipping</span>
            <span>${order.shipping === 0 ? '<span style="color:#10b981;font-weight:600">FREE</span>' : "$" + order.shipping.toFixed(2)}</span>
          </div>
          <div class="totals-row total">
            <span>Total</span>
            <span>$${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p><span class="brand">Z Shop</span> — Thank you for shopping with us!</p>
      <p style="margin-top:4px">Questions? Email akashreddy798695143@gmail.com or call +91 8790401013</p>
    </div>
  </div>
  <button class="print-btn no-print" onclick="window.print()">🖨️ Print Invoice</button>
</body>
</html>`;
}
