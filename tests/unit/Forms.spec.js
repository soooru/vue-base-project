import Forms from '@/router/views/Forms'
import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { nextTick } from 'vue'

describe('component test', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Forms, {
      store: new Vuex.Store({
        modules: {
          app: {
            namespaced: true,
            state: { windowSize: 360 },
          },
        },
      }),
    })
  })

  it('form 페이지가 mount되는가?', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('windowsize에 따라 화면이 랜더링되는가?', () => {
    //mobile 화면
    expect(wrapper.text().includes('PC UI')).toBe(false)
    expect(wrapper.text().includes('Mobile UI')).toBe(true)

    //pc화면
    wrapper = shallowMount(Forms, {
      store: new Vuex.Store({
        modules: {
          app: {
            namespaced: true,
            state: { windowSize: 1920 },
          },
        },
      }),
    })
    expect(wrapper.text().includes('PC UI')).toBe(true)
    expect(wrapper.text().includes('Mobile UI')).toBe(false)
  })

  it('input을 통해 리스트에 항목을 추가/삭제할 수 있는가?', async () => {
    //  expect(wrapper).toMatchSnapshot()

    const form = wrapper.find('form')
    const input = form.find('input')
    input.setValue('banana')
    form.trigger('submit')

    await nextTick()

    //추가되었는지 확인
    expect(wrapper.html()).toContain('banana')

    //delete 버튼 트리거
    const doneButton = wrapper.get('[data-testid="del-list-button"]')
    doneButton.trigger('click')
    await nextTick()
    //삭제되었는지 확인
    expect(wrapper.html()).not.toContain('banana')
  })
})
