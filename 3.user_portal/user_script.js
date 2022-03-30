
//Header
let header = document.querySelector('#header')
header.innerHTML = `<center><h1> Welcome ${JSON.parse(sessionStorage.getItem('user')).name}</h1></center>`
header.style.paddingTop = '20px'

//Logging out
let admin_log_out = document.querySelector('.logout')
let admin_log_outValue = admin_log_out.value

admin_log_out.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = '../1.login_pages/takeSurvey.html';
})


//Viewing all the surveys
let url_survey = "http://localhost:3000/surveys";
let take_survey = document.querySelector('#take_a_survey')
let take_surveyValue = take_survey.value

//Getting all the available surveys from the ----Survey Table-----------------------------------------------------------------------------------------------------------------------------//
async function getSurveys() {
    let usersResults = await fetch(url_survey, {
        method: 'GET'
    })

    let jsonResults = await usersResults.json();
    return jsonResults
}

//questions Table----------------------------------------------------------------------
let url_questions = "http://localhost:3000/questions";
let user_id = JSON.parse(sessionStorage.getItem('user')).id

async function getQuestions() {
    let usersResults = await fetch(url_questions, {
        method: 'GET'
    })

    let jsonResults = await usersResults.json();
    return jsonResults
}

//Survey_response Table-------------------------------------------------------------------------------
let url_response = "http://localhost:3000/surveys_responses";
async function postSurveyResponse(data) {
    try {
        const responseData = await fetch(url_response, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return responseData.json();

    } catch (err) {
        console.log('found this error', err);
    }

}

//survey response answers
let url_answers = "http://localhost:3000/surveys_responses_answers";

async function postSurveyAnswers(data) {
    try {
        const responseData = await fetch(url_answers, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return responseData.json();

    } catch (err) {
        console.log('found this error', err);
    }

}


//Take a survey button
take_survey.addEventListener('click', (e) => {
    e.preventDefault()

    let surveyDiv = document.querySelector('.survey_list')
    let para = document.createElement('h4')
    para.innerHTML = 'Click on the survey you want to take.'
    surveyDiv.append(para)

    let ul = document.createElement('ul');
    ul.classList.add("surveyList");


    getSurveys().then(survey => {

        survey.forEach(createdSurvey => {
            console.log(createdSurvey)

            let li = document.createElement('li');
            li.setAttribute('class', 'SurveyNames')
            li.innerHTML = `${createdSurvey.Name}`;

            ul.append(li)
            surveyDiv.append(ul)
        })

        surveyList = ul.querySelectorAll('li')
        console.log('-----survey list-----', surveyList)

        let survey_questions_Form = document.querySelector('.survey_questions_Form_main')

        surveyList.forEach(item => {
            item.addEventListener('click', () => {
                survey_questions_Form.style.display = 'block'
                console.log('Clicked', item.innerHTML)
                console.log('-----survey-----', survey)

                surveyDiv.style.visibility = 'hidden'
                survey_questions_Form.style.display = 'block'


                survey.forEach(record => {
                    if (record.Name == item.innerHTML) {
                        console.log(record.Survey_Id)
                        getQuestions().then(results => {
                            console.log(results)

                            results.forEach(question => {
                                if (Object.values(question).includes(record.Survey_Id)) {
                                    let userid = JSON.parse(sessionStorage.getItem('user')).id

                                    console.log('-------Question-------', question.Question_Text)// nn, jj
                                    console.log('-------Survey_id-------', question.Survey_Id)
                                    console.log('-------user_id---------', userid)



                                    let questions_input_container_div = document.createElement('div');
                                    questions_input_container_div.classList.add('questions_input_container');
                                    questions_input_container_div.innerHTML = `
                                            <label for="resources" id="label-resources" class="question_label">${question.Question_Text}</label>
                                             
                                            <!-- Dropdown options -->
                                            <select name="resources" id="SelectedValue" class="questions_input_box">
                                                <option></option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                                <option value="sometimes">Sometimes</option>
                                            </select>`


                                    let questionsDiv = document.querySelector('.questions_form_inputs');
                                    questionsDiv.appendChild(questions_input_container_div)

                                    let report_popup = document.querySelector('.report_popup')


                                    answers_submitBtn.addEventListener('click', (e) => {
                                        let user_answer = document.querySelectorAll('.questions_input_box')
                                        user_answer.forEach(answer => {
                                            console.log('---Clicked this answer----', answer.value)
                                            // questions_input_container_div.remove()
                                            e.preventDefault()

                                            let response_data = {
                                                Survey_Id: question.Survey_Id,
                                                User_Id: userid,
                                            }

                                            postSurveyResponse(response_data).then(response_result => {
                                                console.log(response_result)

                                                let answers_data = {
                                                    SurveyResponse_Id: response_result.SurveyResponse_Id,
                                                    Question_Id: question.Question_Id,
                                                    Answers: answer.value
                                                }

                                                postSurveyAnswers(answers_data).then(answers => {
                                                    console.log('---answers', answers)



                                                })
                                            })

                                        })
                                        survey_questions_Form.style.display = 'none'
                                        report_popup.style.display = 'block'

                                        //retrieve a view from the db and show it here
                                    })
                                }
                            })
                        })
                    }
                })

                surveyDiv.style.visibility = 'hidden'
            })
        })
    })
})








