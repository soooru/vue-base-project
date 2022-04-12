import { shallowMount } from '@vue/test-utils'
import NetworkIssue from '@/router/views/NetworkIssue.vue'

describe('NetworksIssue', () => {
  test('NetworksIssue 정상적으로 렌더링 되었는가?', () => {
    const wrapper = shallowMount(NetworkIssue)
    expect(wrapper.exists()).toBeTruthy()
  })
})
