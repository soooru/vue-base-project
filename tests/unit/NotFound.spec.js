import { mount } from '@vue/test-utils'
import NotFound from '@/router/views/NotFound'

describe('NotFound.vue', () => {
  it('NotFound 컴퍼넌트가 잘 장착이 되었는가?', () => {
    const resource = 'page'
    const wrapper = mount(NotFound, {
      props: {
        resource,
      },
    })
    const findNotFouund = wrapper.findComponent(NotFound)
    expect(findNotFouund.exists()).toBe(true)
  })

  it('resouce가 page가 아닐 경우, resource가 잘 표시되는가?', () => {
    const resource = 'content'
    const wrapper = mount(NotFound, {
      props: {
        resource,
      },
    })
    const wrapperHtml = wrapper.html()
    expect(wrapperHtml).toContain(resource)
  })
})
