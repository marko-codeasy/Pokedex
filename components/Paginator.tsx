import { motion } from 'framer-motion'

interface Props {
  page: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
}

export default function Paginator({ page, perPage, total, onPageChange }: Props): JSX.Element | null {
  return (
    <div className="inline-flex mt-2 mb-6 xs:mt-0">
      <motion.button
        disabled={page === 1}
        className="text-sm bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded-l mr-1 disabled:opacity-50"
        onClick={() => onPageChange(Math.max(--page, 1))}
        whileTap={{ scale: 0.9 }}
      >
        Prev
      </motion.button>
      <motion.button
        disabled={page * perPage >= total}
        className="text-sm bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded-r disabled:opacity-50"
        onClick={() => onPageChange(Math.min(++page, Math.ceil(total / perPage)))}
        whileTap={{ scale: 0.9 }}
      >
        Next
      </motion.button>
    </div>
  )
}
