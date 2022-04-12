import { isNullOrUndefined } from '@/utils/type'

//type에 있는 함수 테스트
describe('type', () => {
  test('type.isNullOrUndefined이 ', () => {
    expect(isNullOrUndefined(null)).toBe(true)
    expect(isNullOrUndefined(undefined)).toBe(true)
    expect(isNullOrUndefined([])).toBe(true)
    expect(isNullOrUndefined({})).toBe(true)
    expect(isNullOrUndefined(12345)).toBe(false)
    expect(isNullOrUndefined('12345')).toBe(false)
    expect(isNullOrUndefined([1, 2, 3])).toBe(false)
    expect(isNullOrUndefined({ test: 'test' })).toBe(false)
  })
})
