import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useLimitPagination } from '../composables/limitPagination'
import { usePagination } from '../composables/pagination'

describe('use pagination composable', () => {
  const list = ref([1, 2, 3, 5, 6, 7, 9])
  const limit = 2
  const { items, page, gotoPage, next, previous, hasPrev, hasNext } = usePagination(list, limit)

  it('should return first page', () => {
    expect(page.value).toBe(1)
    expect(items.value).toEqual([1, 2])
    expect(hasPrev.value).toEqual(false)
    expect(hasNext.value).toEqual(true)
  })
  it('should return next page', () => {
    next()
    expect(page.value).toBe(2)
    expect(items.value).toEqual([3, 5])
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(true)
  })
  it('should return previous page', () => {
    previous()
    expect(page.value).toBe(1)
    expect(items.value).toEqual([1, 2])
    expect(hasPrev.value).toEqual(false)
    expect(hasNext.value).toEqual(true)
  })
  it('should return nth page', () => {
    gotoPage(4)
    expect(items.value).toEqual([9])
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(false)
  })
  it('should not change the page', () => {
    gotoPage(6)
    expect(items.value).toEqual([9])
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(false)
  })
  it('should be reactive', () => {
    list.value.push(10)
    list.value.push(12)
    expect(items.value).toEqual([9, 10])
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(true)
  })
  it('should be reactive', () => {
    gotoPage(5)
    expect(items.value).toEqual([12])
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(false)
  })
})

describe('use limit pagination composable', () => {
  const limit = ref(10)
  const items = ref<number[]>([])
  const pageChangeCount = ref(0)

  const fetchNextPage = async (_page = 1, _limit = 10): Promise<number> => {
    items.value = await Promise.resolve([1, 3, 4, 6, 7, 8, 9, 3, _page, _limit])
    pageChangeCount.value++
    return 100
  }
  const { page, gotoPage, fetchPage, visiblePages, hasNext, hasPrev, previous, next } = useLimitPagination(
    fetchNextPage,
    limit,
  )

  it('should return first page', async () => {
    await fetchPage()
    expect(page.value).toBe(1)
    expect(pageChangeCount.value).toEqual(1)
    expect(visiblePages.value.length).toEqual(10)
    expect(hasPrev.value).toEqual(false)
    expect(hasNext.value).toEqual(true)
  })
  it('should return next page', async () => {
    await next()
    expect(page.value).toBe(2)
    expect(pageChangeCount.value).toEqual(2)
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(true)
  })
  it('should return previous page', async () => {
    await previous()
    expect(page.value).toBe(1)
    expect(pageChangeCount.value).toEqual(3)
    expect(hasPrev.value).toEqual(false)
    expect(hasNext.value).toEqual(true)
  })
  it('should return nth page', async () => {
    await gotoPage(4)
    expect(page.value).toBe(4)
    expect(pageChangeCount.value).toEqual(4)
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(true)
  })
  it('should not change the page', async () => {
    await gotoPage(4)
    expect(pageChangeCount.value).toEqual(4)
    expect(hasPrev.value).toEqual(true)
    expect(hasNext.value).toEqual(true)
  })
})
