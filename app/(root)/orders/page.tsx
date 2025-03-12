import { Button } from "@/components/ui/button";
import { getOrders } from "@/lib/actions/action";
import { auth } from "@clerk/nextjs/server";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Orders = async () => {
  const { userId } = await auth();
  const orders = await getOrders(userId as string);


  return (
    <div className="px-8 md:px-6 lg:px-0 py-5 max-sm:px-3 max-w-7xl mx-auto mt-20">
      <div className="flex items-center gap-3 mb-8">
        <Package className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
      </div>

      {!orders ||
        (orders.length === 0 && (
          <div className="py-16 text-center">
            <Package className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              When you place an order, it will appear here
            </p>
            <Button asChild>
              <Link href="/">
                Start Shopping
              </Link>
            </Button>
          </div>
        ))}

      <div className="flex flex-col gap-10">
        {orders?.map((order: OrderType) => (
          <div key={order._id} className="border rounded-lg">
            <div>
              <div className="bg-muted/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-medium">
                  Order Id: {`${order._id.slice(0, 6)}...`}
                </h3>
                <p className="font-medium">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="p-4 border-t">
                <div className="flex items-center gap-4">
                  {order.products.map((orderItem: OrderItemType) => (
                    <>
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary/30">
                        <Image
                          src={orderItem.product.media[0]}
                          alt={orderItem.product.title}
                          width={200}
                          height={200}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-1">
                          {orderItem.product.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {orderItem.quantity}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Size: {orderItem.size}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Color: {orderItem.color}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export const dynamic = "force-dynamic";

export default Orders;
