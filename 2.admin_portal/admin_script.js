let header = document.querySelector("#header");
header.innerHTML = `<center><h1> Welcome ${
  JSON.parse(sessionStorage.getItem("user")).name
}</h1></center>`;
header.style.paddingTop = "20px";

//retrieving data from the db and posting to the db
let url_survey = "http://localhost:3000/surveys";
let                   report_popup = document.querySelector(".report_popup");


//Create surveys form------------------------------------------------------------------------------------------------------------------------------//
async function getSurveys() {
  let usersResults = await fetch(url_survey, {
    method: "GET",
  });

  let jsonResults = await usersResults.json();
  return jsonResults;
}

async function postSurveyData(data) {
  try {
    const responseData = await fetch(url_survey, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return responseData.json();
  } catch (err) {
    console.log("found this error", err);
  }
}

async function updateSurveyData(id, data) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log("found error", err);
  }
}

const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/accounts", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

//Create questions form --------------------------------------------------------------------------------------------------------------------------------------//

//questions db
let url_questions = "http://localhost:3000/questions";
let user_id = JSON.parse(sessionStorage.getItem("user")).id;

async function getQuestions() {
  let usersResults = await fetch(url_questions, {
    method: "GET",
  });

  let jsonResults = await usersResults.json();
  return jsonResults;
}

async function postQuestionsData(data) {
  try {
    const responseData = await fetch(url_questions, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return responseData.json();
  } catch (err) {
    console.log("found this error", err);
  }
}

//Getting the admin panel values-----------------------------------------------------------------------------------------------------------///
let admin_dashboard = document.querySelector("#dashboard");
let create_survey = document.querySelector("#create_a_survey");
// let view_survey= document.querySelector('#view_surveys')
let take_survey = document.querySelector("#take_a_survey");
let admin_log_out = document.querySelector("#log_out");

let admin_dashboardValue = admin_dashboard.value;
let create_surveyValue = create_survey.value;
// let view_surveyValue=view_survey.value
let take_surveyValue = take_survey.value;
let admin_log_outValue = admin_log_out.value;

//getting each panel forms----------------------------------------------------------------------------------------------------------------//
let enter_survey_name_input = document.querySelector("#create_your_survey");
let surveySaveBtn = document.querySelector("#survey_submitBtn");
let create_your_questions = document.querySelector("#create_your_questions");
let question_submitBtn = document.querySelector("#question_submitBtn");

//pop ups forms---------------------------------------------------------------------------------------------------------------------------//
let create_survey_form_popup = document.querySelector(
  ".create_survey_form_popup"
);
let questions_form_popup_db = document.querySelector(
  ".questions_form_popup_db"
);

//----------------------------------------------------------------------------------------------------------------------------------------//
admin_log_out.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../1.login_pages/takeSurvey.html";
});

//Create a survey-------------------------------------------------------------------------------------------------------------------------//
create_survey.addEventListener("click", (e) => {
  e.preventDefault();
  create_survey_form_popup.style.display = "block";
});

//survey save button (posting to the database) ------------------------------------------------------------------------------------------//
surveySaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  create_survey_form_popup.style.display = "none";

  let surveyNameValue = enter_survey_name_input.value;

  let survey_data = {
    Name: surveyNameValue,
    CreatedBy: user_id,
  };

  console.log(surveyNameValue);

  postSurveyData(survey_data).then((result) => {
    console.log(result);
    question_submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let questionValue = create_your_questions.value;
      console.log(questionValue);

      let question_data = {
        Question_Text: questionValue,
        Survey_Id: result.Survey_Id,
      };

      postQuestionsData(question_data);
      document.querySelector("#create_your_questions").value = "";
    });
  });

  document.querySelector("#create_your_survey").value = "";
  questions_form_popup_db.style.display = "block";
});

///questions finish button
let finish_submitBtn = document.querySelector("#finish_submitBtn");

finish_submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#create_your_questions").value = "";
  questions_form_popup_db.style.display = "none";

  location.reload();
});

let url_response = "http://localhost:3000/surveys_responses";

async function getSurveyResponse() {
  let usersResults = await fetch(url_response, {
    method: "GET",
  });

  let jsonResults = await usersResults.json();
  return jsonResults;
}

async function postSurveyResponse(data) {
  try {
    const responseData = await fetch(url_response, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return responseData.json();
  } catch (err) {
    console.log("found this error", err);
  }
}

let url_answers = "http://localhost:3000/surveys_responses_answers";

async function getSurveyAnswers() {
  let usersResults = await fetch(url_response, {
    method: "GET",
  });

  let jsonResults = await usersResults.json();
  return jsonResults;
}

async function postSurveyAnswers(data) {
  try {
    const responseData = await fetch(url_answers, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return responseData.json();
  } catch (err) {
    console.log("found this error", err);
  }
}

let survey;
let answers_submitBtn = document.querySelector("#answers_submitBtn");

//Report
let url_reports = "http://localhost:3000/reports";

async function getReports() {
  let usersResults = await fetch(url_reports, {
    method: "GET",
  });

  let jsonResults = await usersResults.json();
  return jsonResults;
}

take_survey.addEventListener("click", (e) => {
  e.preventDefault();

  let surveyDiv = document.querySelector(".survey_list");

  let para = document.createElement("h4");
  para.innerHTML = "Click on the survey you would like to take.";
  surveyDiv.append(para);

  let ul = document.createElement("ul");
  ul.classList.add("surveyList");

  getSurveys().then((survey) => {
    survey.forEach((createdSurvey) => {
      console.log(createdSurvey);

      let li = document.createElement("li");
      li.setAttribute("class", "SurveyNames");
      li.innerHTML = `${createdSurvey.Name}`;

      ul.append(li);
      surveyDiv.append(ul);
    });

    surveyList = ul.querySelectorAll("li");
    console.log("-----survey list-----", surveyList);

    let survey_questions_Form = document.querySelector(
      ".survey_questions_Form_main"
    );

    surveyList.forEach((item) => {
      item.addEventListener("click", () => {
        survey_questions_Form.style.display = "block";
        console.log("Clicked", item.innerHTML);
        console.log("-----survey-----", survey);

        surveyDiv.style.display = "none";
        survey_questions_Form.style.display = "block";

        survey.forEach((record) => {
          if (record.Name == item.innerHTML) {
            console.log(record.Survey_Id);
            getQuestions().then((results) => {
              console.log(results);

              results.forEach((question) => {
                if (Object.values(question).includes(record.Survey_Id)) {
                  let userid = JSON.parse(sessionStorage.getItem("user")).id;

                  console.log("-------Question-------", question.Question_Text); // nn, jj
                  console.log("-------Survey_id-------", question.Survey_Id);
                  console.log("-------user_id---------", userid);

                  let questions_input_container_div =
                    document.createElement("div");
                  questions_input_container_div.classList.add(
                    "questions_input_container"
                  );
                  questions_input_container_div.innerHTML = `
                                            <label for="resources" id="label-resources" class="question_label">${question.Question_Text}</label>
                                             
                                            <!-- Dropdown options -->
                                            <select name="resources" id="SelectedValue" class="questions_input_box">
                                                <option></option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                                <option value="sometimes">Sometimes</option>
                                            </select>`;

                  let questionsDiv = document.querySelector(
                    ".questions_form_inputs"
                  );
                  questionsDiv.appendChild(questions_input_container_div);


                  answers_submitBtn.addEventListener("click", (e) => {
                    // let user_answer=document.querySelector('#SelectedValue').value
                    let user_answer = document.querySelectorAll(
                      ".questions_input_box"
                    );

                    user_answer.forEach((answer) => {
                      console.log("---Clicked this answer----", answer.value);
                      // questions_input_container_div.remove()
                      e.preventDefault();

                      let response_data = {
                        Survey_Id: question.Survey_Id,
                        User_Id: userid,
                      };

                      postSurveyResponse(response_data).then(
                        (response_result) => {
                          console.log(response_result);

                          let answers_data = {
                            SurveyResponse_Id:
                              response_result.SurveyResponse_Id,
                            Question_Id: question.Question_Id,
                            Answers: answer.value,
                          };

                          postSurveyAnswers(answers_data).then((answers) => {
                            console.log("---answers", answers);
                          });
                        }
                      );

                      survey_questions_Form.style.display = "none";
                    //   report_popup.style.visibility = "visible";
                    //   window.addEventListener('click', (event) => {
                    //     if (event.target == report_popup) {
                    //         report_popup.style.visibility = "hidden";
                    //     }
                    // })
                    });
                  });
                }
              });
            });
          }
        });

        surveyDiv.style.display = "none";
      });
    });
  });
});

admin_dashboard.addEventListener("click", () => {
  let surveyDiv = document.querySelector(".survey_list");

  let para2 = document.createElement("h4");
  para2.innerHTML = "Click on the survey to view the report.";
  surveyDiv.append(para2);

  let ul = document.createElement("ul");
  ul.classList.add("surveyList");

  getSurveys().then((survey) => {
    survey.forEach((createdSurvey) => {
      console.log(createdSurvey);

      let li = document.createElement("li");
      li.setAttribute("class", "SurveyNames");
      li.innerHTML = `${createdSurvey.Name}`;

      ul.append(li);
      surveyDiv.append(ul);
    });

    let reportView = ul.querySelectorAll("li");

    reportView.forEach((view) => {
      view.addEventListener("click", () => {
        console.log(view.textContent);
        let labels = [];
        let data = [];
        let label = [];

        let reportContent = report_popup.querySelector('div');
        console.log(reportContent)
        let show_chart_div = document.querySelector(".show_chart");
        let mychart_div = document.getElementById("myChart2");

        getReports().then((reportAnswers) => {
          console.log("-----Report-----", reportAnswers);
          reportAnswers.forEach((answer) => {
            if (Object.values(answer).includes(view.textContent)) {
            labels.push(answer.Answers);
            data.push(answer.Total);
            // label.push(answer.Answers)
            }
            label = "Report";
          });
        });
        setTimeout(() => {
            console.log(labels, label, data);
            const myChart = new Chart(mychart_div, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: label,
                    data: data,
                    backgroundColor: ["white",'pink','gray'],
                  },
                ],
              },
            });
            reportContent.appendChild(mychart_div)
      report_popup.style.visibility = "visible";

          },500);
      });
    //   survey_questions_Form.style.display = "none";
      window.addEventListener('click', (event) => {
        if (event.target == report_popup) {
            report_popup.style.visibility = "hidden";
        }
    })
    });
  });
});
