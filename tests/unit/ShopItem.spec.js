import { shallowMount } from '@vue/test-utils'
import ShopItem from '@/components/ShopItem'
import store from '@/state'

describe('ShopItem', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mountShopItem({
      mountOptions: {
        propsData: {
          item: {
            id: 1,
            category: 'hat',
            title: '검은 모자',
            price: '50.00',
            thumbnail: 'https://webpack.kr/site-logo.1fcab817090e78435061.svg',
          },
        },
      },
    })
  })
  it('상품 아이템 컴포넌트가 존재하는가?', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('item title', () => {
    it('카테고리가 나타나는가?', () => {
      const category = wrapper.find('[data-testid=category]')
      expect(category.exists()).toBeTruthy()
      expect(category.text()).toContain('hat')
    })

    it('상품명이 나타나는가?', () => {
      const title = wrapper.find('[data-testid=title]')
      expect(title.exists()).toBeTruthy()
      expect(title.text()).toContain('검은 모자')
    })

    it('가격이 잘 변환되서 나타나는가?', () => {
      const price = wrapper.find('[data-testid=price]')
      expect(price.exists()).toBeTruthy()
      expect(price.text()).toContain(`USD: 50.00`)
    })
  })
})

function mountShopItem(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}
  return shallowMount(ShopItem, {
    global: {
      plugins: [store],
    },
    ...config.mountOptions,
  })
}
