interface Props {
  page: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
}

export default function Paginator({ page, perPage, total, onPageChange }: Props): JSX.Element | null {
  return (
    <div className="inline-flex mt-2 mb-2 xs:mt-0">
      <button
        disabled={page === 1}
        className="text-sm bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded-l mr-1 disabled:opacity-50"
        onClick={() => onPageChange(Math.max(--page, 1))}
      >
        Prev
      </button>
      <button
        disabled={page * perPage >= total}
        className="text-sm bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded-r disabled:opacity-50"
        onClick={() => onPageChange(Math.min(++page, Math.ceil(total / perPage)))}
      >
        Next
      </button>
    </div>
  )
}
