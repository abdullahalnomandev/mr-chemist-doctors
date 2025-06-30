"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface Product {
  _id: string;
  name: string;
  imageUrls: string[];
}

export default function ProductReviewPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const { pageIndex, pageSize } = pagination;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.PRODUCT, "list", { pageIndex, pageSize }],
    queryFn: () =>
      serverApiRequest("get", "/products/products-by-order", {
        params: { page: pageIndex + 1, limit: pageSize },
      }),
    select: (response) => {
      return {
        result: response.data as Product[],
        meta: {
          total: response.meta?.total || (response.data?.length ?? 0),
        },
      };
    },
  });

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-start gap-4">
              <div className="h-[80px] w-[80px] overflow-hidden rounded-md bg-gray-100 p-2">
                <Image
                  src={item.imageUrls?.[0] ?? "/placeholder-image.jpg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-1 text-sm">
                <div className="font-medium">{item.name}</div>
              </div>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={() => router.push(`/account/reviews/${row.original?._id}`)}
          >
            Write a Review
          </Button>
        ),
      },
    ],
    [router],
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Write a Review", href: "/account/reviews" }]} />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold">Write a Review</h1>

        <DataTable
          title="Your Products"
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
        />
      </div>
    </div>
  );
}
