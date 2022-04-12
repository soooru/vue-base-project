import Timer from '@/components/Timer'

import { mount } from '@vue/test-utils'

jest.useFakeTimers()

describe('timer', () => {
  it('mounted되면 타이머가 시작되는가?', () => {
    const wrapper = mount(Timer)
    expect(wrapper.vm.interval).not.toBe(undefined)
  })

  it('타이머가 작동하는가?', () => {
    const wrapper = mount(Timer)
    expect(wrapper.vm.counter).toBe(0)
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.counter).toBe(1)
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.counter).toBe(2)
  })

  it('타이머가 끝나면 사라지는가?', () => {
    const beforeDestroyedSpy = jest.spyOn(Timer, 'beforeDestroy')
    const wrapper = mount(Timer)
    wrapper.vm.counter = wrapper.vm.timer - 1
    jest.advanceTimersByTime(1000)
    expect(beforeDestroyedSpy).toHaveBeenCalled()
  })
})

describe
