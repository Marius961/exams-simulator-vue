export default class TestsParser {
	constructor() {
		this.questionsList = {questions: []}
	}

	parseTxtToObject(event) {
		let array = event.target.result.split(/\n\s*\n|\r\n\s*\r\n/);
		array.map((elem, index) => {
      if (elem.trim() !== "") {
        this.parseRawQuestionToObject(index, elem)
      }
    })
		return this.questionsList
	}

	parseJSON(event) {
		return this.file = JSON.parse(event.target.result);
	}

	parseRawQuestionToObject(questionId, question) {
		let tempOptions = question.split('\n');

		let questionText = tempOptions[0],
			correctOptionId = 0,
			options;

		tempOptions.shift();


    options = tempOptions.map((elem, index) => {
      let text = elem.trim();
      if (text !== "") {
        if (text.substr(0, 1) === '+') {
          correctOptionId = index;
          text = text.substr(1);
        }

        return { id: index, text: text}
      }
    })

		this.questionsList.questions.push({
			id: questionId,
			question:questionText,
			answerId:correctOptionId,
			options:options
		});
	}

}
