export default {
  methods: {
    $_keyEventMixin_enter(name, isPrefix = true) {
      const otherNames = Object.keys(this.$v.$params).filter((v) => v !== name)
      // 입력란 모두 입력한 흔적이 있으면 submit
      if (this.$v.$dirty) {
        const invalidOthers = otherNames.filter(
          (v) => this.$v[v].$dirty && this.$v[v].$invalid,
        )
        if (invalidOthers.length > 0) {
          this.$refs[invalidOthers[0]].$children[0].focus()
          return
        }
        return this.submit()
      }
      // 현재 입력란에 입력한 흔적이 없음, 현재 입력란이 유효하지 않으면 stop
      if (!this.$v[name].$dirty || this.$v[name].$invalid) return
      const cleanOthers = otherNames.filter((v) => !this.$v[v].$dirty)
      if (
        cleanOthers.length <= 0 ||
        !this.$refs[cleanOthers[0]] ||
        !this.$refs[cleanOthers[0]].$children[0]
      )
        return
      const childrenIdx = isPrefix ? 1 : 0
      const nextEl = this.$refs[cleanOthers[0]].$children[childrenIdx]
      if (nextEl) nextEl.focus()
    },
  },
}
