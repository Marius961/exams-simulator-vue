<template>
  <div class="mt-container">
    <div class="row justify-content-center">
      <div class="col-12 header-1 text-center">Правильних відповідей</div>
      <label class="col-12 result text-center">{{result.correctAnswers}}</label>
      <div class="col-11 col-md-8 mt-4">
        <div class="row">
          <div class="col-12 btn-orange-secondary-borderLess p-2"
               @click="showWrongAnswers = !showWrongAnswers"
               v-if="isArrayNotEmpty"
          >Неправильних відповідей {{getWrongAnswersArrayLength}}
          </div>
          <div class="col-12" v-if="showWrongAnswers">
            <div class="row mt-1 pt-4" v-for="question in result.wrongAnswersLog">
              <div class="col-12 question-text" v-html="question.questionText"></div>

              <question-log-item questionClass="correct-answer">{{question.selectedOptionText}}</question-log-item>
              <question-log-item questionClass="wrong-answer">{{question.correctOptionText}}</question-log-item>
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="w-100 hr-orange mt-3 mb-3"></div>
          <div class="col-6 col-md-4">
            <div class="row justify-content-center result-box p-1 mr-md-1">
              <label class="col-12 text-center result-type-text">Всього питань</label>
              <label class="col-12 text-center result-label-1 align-self-end">{{result.questionsCount}}</label>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <div class="row justify-content-center result-box p-1">
              <label class="col-12 text-center result-type-text">Відсоток правильних відповідей</label>
              <label class="col-12 text-center result-label-1 align-self-end">{{result.correctAnswersPercentage}}</label>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="row justify-content-center result-box p-1 mt-1 mt-md-0 ml-md-1">
              <label class="col-12 text-center result-type-text">Оцінка</label>
              <label class="col-12 text-center result-label-1 align-self-end">{{result.assessment}}</label>
            </div>
          </div>
          <div class="w-100 hr-orange mt-3 mb-3"></div>
          <div class="col-12 col-md-auto btn-orange-primary p-2 mb-2 m-lg-0" @click="tryAgain">Спробувати ще</div>
          <div class="col-12 col-md-auto btn-orange-primary p-2 mt-2 m-lg-0" @click="selectNewFile">Вибрати інший файл</div>
          <div class="w-100 mb-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QuestionLogItem from '../components/QuestionLogItem'
  export default {
    props: {
      result: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        showWrongAnswers: false,
      }
    },
    components: {
      'question-log-item': QuestionLogItem
    },
    watch: {
      result: {
        handler: function () {
          this.$emit("showResult")
        },
        deep: true
      }
    },
    methods: {
      tryAgain() {
        this.$emit("tryAgain")
      },
      selectNewFile() {
        this.$emit("selectNewFile")
      },
      isArrayNotEmpty() {
        return typeof this.result.wrongAnswersLog !== 'undefined' && this.result.wrongAnswersLog.length > 0
      },
      getWrongAnswersArrayLength() {
        if (this.isArrayNotEmpty) {
          return this.result.wrongAnswersLog.length;
        }
      }
    }
  }
</script>

<style scoped>

</style>
