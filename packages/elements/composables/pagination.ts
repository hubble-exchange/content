import type { Ref } from 'vue'
import { ref, watchSyncEffect } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePagination = <Item>(allItems: Ref<Item[]>, limit: number) => {
  const totalPages = ref<number>(1)
  const page = ref(1)
  const items: Ref<Item[]> = ref([])
  const hasPrev = ref<boolean>(false)
  const hasNext = ref<boolean>(false)

  const getPageItems = () => {
    const start = page.value * limit - limit
    const end = start + limit
    totalPages.value = Math.ceil(allItems.value.length / limit)
    items.value = [...allItems.value].splice(start, limit)
    hasPrev.value = page.value > 1
    hasNext.value = end < allItems.value.length
  }

  const gotoPage = (_page: number) => _page >= 1 && _page <= totalPages.value && (page.value = _page)
  const next = () => totalPages.value > page.value && page.value++
  const previous = () => hasPrev.value && page.value--

  watchSyncEffect(() => getPageItems())

  return { page, limit, items, totalPages, hasPrev, hasNext, gotoPage, next, previous }
}
