<template>
  <div style="width: 100vw">
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        windowSize : {{ windowSize }}
        <div v-if="windowSize > 600">PC UI</div>
        <div v-else>Mobile UI</div>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="col-lg-4 col-sm-6 col-xs-12">
        <FormSignIn />
      </v-col>
      <v-col cols="12" class="col-lg-4 col-sm-6 col-xs-12">
        <FormConfirmPwd />
      </v-col>
      <v-col cols="12" class="col-lg-4 col-sm-6 col-xs-12">
        <FormMyInfo />
      </v-col>
      <v-col cols="12" class="col-lg-4 col-sm-6 col-xs-12">
        <h3>테스트를 위한 기본 폼 양식</h3>
        <div>
          <form @submit.prevent="addTask">
            <input
              style="border: 1px solid #ddd"
              type="text"
              v-model="newTask"
              placeholder="무엇이든 입력하세요"
            />
            <v-btn small primary type="submit">Add</v-btn>
          </form>
          <p>===작성 내역===</p>
          <ul>
            <li v-for="(task, index) in tasks" :key="task">
              {{ task }}
              <button
                data-testid="del-list-button"
                small
                @click="remove(index)"
              >
                Done
              </button>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormSignIn from '@/components/FormSignIn'
import FormConfirmPwd from '@/components/FormConfirmPwd'
import FormMyInfo from '@/components/FormMyInfo'
export default {
  name: 'Forms',
  components: {
    FormSignIn,
    FormConfirmPwd,
    FormMyInfo,
  },
  computed: {
    ...mapState('app', ['windowSize']),
  },
  data() {
    return {
      tasks: [],
      newTask: '',
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length === 0) return
      this.tasks.push(this.newTask)
      this.newTask = ''
    },
    remove(index) {
      this.tasks.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped></style>
