import SignIn from '@/components/FormSignIn'
import { shallowMount, config } from '@vue/test-utils'
import { nextTick } from 'vue'

config.mocks.$t = (key) => key

describe('로그인 양식 테스트', () => {
  const wrapper = shallowMount(SignIn, {
    mocks: {
      $t: (key) => key,
    },
    stubs: ['BaseInput'],
  })
  it('로그인 컴포넌트가 mount되는가?', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('로그인시 잘못된 값을 넣으면 에러 메시지가 생성되는가?', async () => {
    const userId = wrapper.get('[data-testid="login-userId"]')

    //이메일 형식이 아닌 경우
    wrapper.vm.$v.login.userId.$model = 'abcde'
    userId.vm.$emit('blur')
    await nextTick()
    expect(wrapper.vm.$data.emailErrors).toHaveLength(1)

    //입력하지 않았을 경우
    wrapper.vm.$v.login.userId.$model = ''
    userId.vm.$emit('blur')
    await nextTick()
    expect(wrapper.vm.$data.emailErrors).toHaveLength(1)

    //제대로 입력한 경우
    wrapper.vm.$v.login.userId.$model = 'example1234@gmail.com'
    userId.vm.$emit('blur')
    await nextTick()
    expect(wrapper.vm.$data.emailErrors).toHaveLength(0)
  })
})
