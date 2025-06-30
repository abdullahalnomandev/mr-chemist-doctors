"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serverApiRequest } from "@/lib/utils-server";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface Product {
  _id: string;
  imageUrls: string[];
}
interface OrderItem {
  _id: string;
  name: string;
  product: Product;
  variant: string;
  productBasePrice: number;
  royalMailStatus: string;
  totalAmount: number;
  quantity: number;
  type: string;
  unit: string;
  totalItems: number;
  value: string;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  customer: string;
  couponCode: string;
  items: OrderItem[];
  orderStatus?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cash" | "card";
  paymentStatus?: "pending" | "paid" | "failed" | "cod_pending" | "refunded";
  createdAt: string;
  updatedAt: string;
  subTotal: number;
  taxAmount: number;
  royalMailStatus: string;
  totalAmount: number;
}

interface FlatOrderItem extends OrderItem {
  orderId: string;
  status: string;
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<Order["orderStatus"] | "all">("all");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  const { pageIndex, pageSize } = pagination;
  const sortingFormatted = sorting.length > 0 ? `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}` : undefined;

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "orders",
      "list",
      {
        pageIndex,
        pageSize,
        statusFilter,
        sorting: sortingFormatted,
      },
    ],
    queryFn: () =>
      serverApiRequest("get", "/orders", {
        params: {
          page: pageIndex + 1,
          limit: pageSize,
          status: statusFilter === "all" ? undefined : statusFilter,
          sort: sortingFormatted,
        },
      }),
    select: (response) => {
      const orders: Order[] = response.data.result;

      const result = orders.flatMap((order) =>
        order.items.map((item) => ({
          ...item,
          orderId: order.orderId,
          totalItems: order.items.length,
          status: order.orderStatus ?? "new",
          totalAmount: order.totalAmount,
          royalMailStatus: order.royalMailStatus,
        })),
      );

      return {
        result,
        meta: {
          total: response.data.meta?.total,
          totalUnfiltered: response.data.meta?.totalUnfiltered,
        },
      };
    },
  });

  const columns: ColumnDef<FlatOrderItem>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-start gap-4">
              <div className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-md bg-gray-100 p-2">
                <Image
                  src={item?.product?.imageUrls?.[0] ?? "/placeholder-image.jpg"}
                  alt={item?.name ?? "Product Image"}
                  width={80} // required for optimization
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="space-y-2 text-sm leading-tight">
                <div className="font-semibold">{item?.name}</div>
                <div className="text-gray-500">
                  Weight: {item.value}
                  {item.unit}
                </div>
                <div className="text-gray-500">🏷 Weight Lost</div>
              </div>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <span>${row.original.totalAmount.toFixed(2)}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => <span>{row.original.totalItems.toString().padStart(2, "0")}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original?.royalMailStatus.toLocaleLowerCase() || "new";
          const colorMap = {
            new: "bg-yellow-500",
            processing: "bg-blue-500",
            shipped: "bg-purple-500",
            delivered: "bg-green-500",
            cancelled: "bg-red-500",
          };
          return (
            <div className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${colorMap[status as keyof typeof colorMap]}`} />
              <span className="capitalize">{status}</span>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [],
  );

  const router = useRouter();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Order History", href: "/account/orders" }]} />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Order History</h1>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Orders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DataTable
          title="My Order"
          isLoading={isLoading}
          isError={isError}
          data={data?.result || []}
          columns={columns}
          totalRows={data?.meta?.total || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          showRowSelection={false}
          headerBg="#F1F5F9"
          tableCellClass="py-4"
          onClick={(row) => router.push(`/account/orders/${row.orderId}`)}
        />
      </div>
    </div>
  );
}
