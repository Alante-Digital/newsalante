import { Pagination } from "@/components/Pagination";
import { UpdateFeed } from "@/components/UpdateFeed";
import type { UpdateMeta } from "@/lib/updates";

export function UpdatesList({
  updates,
  currentPage,
  totalPages,
  paginationBasePath = "",
  showFeatured = true,
  emptyMessage,
}: {
  updates: UpdateMeta[];
  currentPage: number;
  totalPages: number;
  paginationBasePath?: string;
  showFeatured?: boolean;
  emptyMessage?: string;
}) {
  return (
    <>
      <UpdateFeed
        updates={updates}
        showFeatured={showFeatured}
        emptyMessage={emptyMessage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={paginationBasePath}
      />
    </>
  );
}
