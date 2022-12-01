import { computed, ref } from 'vue'

export const range = (start: number, stop: number, step = 1): number[] =>
  Array(Math.ceil((stop + 1 - start) / step))
    .fill(start)
    .map((x: number, y: number): number => x + y * step)

export const useLimitPagination = (
  fetchData: (page: number, limit: number) => Promise<number>,
  limit = ref(10),
  visiblePageCount = ref(10)
) => {
  const page = ref(1)
  const totalPages = ref(1)
  const hasPrev = ref(false)
  const hasNext = ref(false)
  const loading = ref(false)

  const fetchPage = async () => {
    loading.value = true
    const totalItems = await fetchData(page.value, limit.value)
    totalPages.value = Math.ceil(totalItems / limit.value)
    hasPrev.value = page.value > 1
    hasNext.value = page.value < totalPages.value
    loading.value = false
  }

  const gotoPage = async (_page: number) => {
    if (_page >= 1 && _page <= totalPages.value && page.value !== _page) {
      page.value = _page
      await fetchPage()
    }
  }
  const next = async () => {
    if (totalPages.value > page.value) {
      page.value++
      await fetchPage()
    }
  }
  const previous = async () => {
    if (hasPrev.value) {
      page.value--
      await fetchPage()
    }
  }

  const visiblePages = computed(() => {
    const _pages = range(1, totalPages.value)
    if (totalPages.value <= visiblePageCount.value) return _pages // if less than 10 return all pages
    const pages = [..._pages].splice(page.value - 5, 10)
    if (page.value > 8 && pages.length < 10) return [..._pages].splice(page.value - 5 - (10 - pages.length), 10)
    if (page.value > 8) return pages
    return [..._pages].splice(0, 10)
  })

  return { page, loading, visiblePages, fetchPage, totalPages, hasPrev, hasNext, gotoPage, next, previous }
}
