export default function BrowsePagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="text-blue-900 font-semibold">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
