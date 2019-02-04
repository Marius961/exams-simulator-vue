<template>
  <div>
    <main class="container">
      <div class="mt-container" v-if="mainComponentVisible">
        <div class="row justify-content-center container-box p-3">
          <div class="col-12 header-1 text-center">Вітаємо у Exams Simulator</div>
          <div class="col-12 col-sm-9 col-md-7 label-1 text-center">Це невеличкий веб додаток для перевірки знань тестів, Ви можете завантажити фийл
            з тестами у форматі JSON або власноруч створити його по посиланню нижче.</div>

          <div class="w-50 hr-orange mt-3 mb-3"></div>
          <div class="w-100"></div>

          <input class="col-12 inputFile" id="file" v-on:change="inputChange" type="file">
          <label for="file" class="col-12 col-sm-auto upload-btn p-2 pl-3 pr-3">
            <span class="row align-items-center justify-content-center">
              <span class="col-auto">
                <img src="../assets/img/upload.png" alt=">">
              </span>
              <span class="col-auto text-center">Завантажити файл</span>
            </span>
          </label>

          <div class="w-100"></div>

          <label class="col-auto params-label" @click="showTestParams = !showTestParams">Додаткові параметри</label>
          <div class="w-100"></div>

          <div class="col-auto" v-if="showTestParams">
            <div class="row">
              <app-checkbox v-model="isExpressTest" check-id="expressTest">Експрес тест</app-checkbox>
              <app-checkbox v-model="shuffleOptions" check-id="shuffleOptions">Перемішати відповіді</app-checkbox>
              <app-checkbox v-model="shuffleQuestions" check-id="shuffleQuestions">Перемішати питання</app-checkbox>
            </div>
          </div>

          <div class="w-100"></div>
          <div class="w-50 hr-orange mt-3 mb-3"></div>

          <div class="col-12 label-1 text-center mt-1 mb-3">або</div>
          <div class="w-100"></div>
          <router-link to="/constructor" el="a" class="col-12 col-sm-auto btn-orange-secondary p-3 mb-5">Створіть свої тести</router-link>

          <div class="col-12 mt-3">
            <div class="row info-container p-3">
              <div class="col-12 text-center info-header" @click="templateVisibility = !templateVisibility">Оформлення для сумісного TXT файлу</div>
              <div class="row" v-if="templateVisibility" style="overflow: hidden">
                <div class="col-12">
                  <div class="row justify-content-center">
                    <div class="col-12 text-center">Примітка: між запитаннями повинно бути 2 пустих рядки, "_" - пустий рядок</div>
                    <div class="w-50 hr-orange mt-3 mb-3"></div>
                  </div>
                  <div class="row">
                    <div class="col-12">Питання яке міститься в одному рядку</div>
                    <div class="col-12">&ensp;Перший варіант відповіді</div>
                    <div class="col-12">&ensp;Другий варіант відповіді</div>
                    <div class="col-12">&ensp;Третій варіант відповіді</div>
                    <div class="col-12">&ensp;+Четвертий варіант відповіді правильний, позначається за допомогою знака "+"</div>
                    <div class="col-12">_</div>
                    <div class="col-12">_</div>
                    <div class="col-12">&ensp;...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </main>
    <testing-segment
      v-show="testingComponentVisible"
      :questionsList="questionsList"
      @testFinished="saveResult($event)"
      @startTest="showTestingComponent"
    ></testing-segment>
    <result-component
      v-show="resultComponentVisibility"
      :result="testResult"
      @showResult="showResultComponent"
      @tryAgain="retryTesting"
      @selectNewFile="selectNewFile"
    ></result-component>
  </div>
</template>

<script>
  import TestingSegment from '../components/TestingSegment'
	import TestsParser from '../../utils/testsParser'
  import ResultComponent from '../components/ResultComponent'
  import AppCheckbox from '../components/CheckBox'
  export default {
    data() {
      return {
        file: '',
        templateVisibility: false,
        questionsList: {questions: []},
        mainComponentVisible: true,
        testingComponentVisible: false,
				resultComponentVisibility: false,
				showTestParams: false,
        testResult: {},
        isExpressTest: false,
        shuffleQuestions: false,
        shuffleOptions: false
			}
    },
    components: {
      'testing-segment': TestingSegment,
      'result-component': ResultComponent,
      'app-checkbox': AppCheckbox
    },
    methods: {
      inputChange(event) {
      	const parser = new TestsParser();
        const reader = new FileReader(),
          fileName = event.target.files[0].name,
          lastIndex = fileName.lastIndexOf('.'),
          type = fileName.substr(lastIndex);

        if (type === ".json") {
					reader.onload = (e) => {
						this.questionsList = this.addParamsToTest(parser.parseJSON(e))
					}
        } else if (type === ".txt") {
					reader.onload = (e) => {
						this.questionsList = this.addParamsToTest(parser.parseTxtToObject(e))
					}
        } else {
          // shows a message when the file is incompatible
          swal({
            title: "Формат файлу не підтримується!",
            text: "Будь ласка оберіть файл у форматі TXT або JSON",
            icon: "warning",
            button: "ОК",
          });
        }
        reader.readAsText(event.target.files[0]);
      },

      saveResult(result) {
        this.testResult = result;
      },
			showMainComponent() {
      	this.mainComponentVisible = true;
      	this.testingComponentVisible = false;
      	this.resultComponentVisibility = false;
			},
			showTestingComponent() {
				this.mainComponentVisible = false;
				this.testingComponentVisible = true;
				this.resultComponentVisibility = false;
			},
			showResultComponent() {
				this.mainComponentVisible = false;
				this.testingComponentVisible = false;
				this.resultComponentVisibility = true;
			},
      addParamsToTest(list) {
        if (this.shuffleQuestions) {
          list.questions = this.shuffledArray(list.questions)
        }

        if (this.isExpressTest && list.questions.length > 30) {
          list.questions.length = 30;
        }

        if (this.shuffleOptions) {
          for (let i = 0; i < list.questions.length; i++) {
            list.questions[i].options = this.shuffledArray(list.questions[i].options)
          }
        }
        return list;
      },
      shuffledArray(array) {
        return array.sort(function(){
          return Math.random() - 0.5;
        });
      },
      retryTesting() {
        this.addParamsToTest(this.questionsList);
        this.showTestingComponent()
      },
      selectNewFile() {
        this.file = ''
        this.showMainComponent()
      }
    }
  }
</script>

<style scoped>

</style>
