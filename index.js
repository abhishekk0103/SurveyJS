Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
  options.request.setRequestHeader(
    "APIkey",
    "5lqV7rJPVfCltgnh48gl9AW9nGJWwyNr"
  );
};

const json = {
  title: "Demo Survey",
  description: "This is a demo of SurveyJs",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      title: "Survey",
      elements: [
        {
          type: "text",
          name: "question1",
          title: "Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "question2",
          title: "Email",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "text",
          name: "question3",
          title: "Phone Number",
          isRequired: true,
          inputType: "number",
        },
        {
          type: "dropdown",
          title: "Mentors",
          name: "question4",
          choicesByUrl: {
            url: "https://apim.quickwork.co/Quickworkk/bookyourslotapi/v1/v1",
            valueName: "Mentor Name",
            titleName: "Mentors",
            path: "mentors",
          },
        },
        {
          type: "dropdown",
          name: "question5",
          title: "Timeslot",
          choices: [
          ]
        },
      ],
    },
  ],
};

const survey = new Survey.Model(json);
function alertResults(sender) {
  const results = JSON.stringify(sender.data);
}


survey.onValueChanged.add(function(sender, options){
  var newMentorName = sender.getQuestionByName("question4").value;
  var selectedMentorsName = {"Mentors Name" : newMentorName}

  var slotSettings = {
    "url" : "https://apim.quickwork.co/Quickworkk/bookyourslotapi/v1/v3",
    "method" : "POST",
    "headers" : {
      "APIkey" : "oI5taNdrsUURhyw34iamNyiRlONNxqWB",
      "Content-Type" : "application/json"
    },
    "data": JSON.stringify(selectedMentorsName)
  };

  $.ajax(slotSettings).done(function(response){
    console.log(response)
    sender.getQuestionByName("question5").choices = response.newMentorsSlot;
  })
})

survey.onComplete.add(function(sender, options){
  const data = {
      "Mentors Name" : sender.data.question4,
      "Booked" : "Yes",
      "SlotAvailable" : sender.data.question5,
      "NameOfClient" : sender.data.question1,
      "EmailOfClient" : sender.data.question2,
      "PhoneNoOfClient" : sender.data.question3
  }
  
    alert("The results are: " + JSON.stringify(sender.data));
    $.ajax({
      url : "https://apim.quickwork.co/Quickworkk/bookyourslotapi/v1/v2",
      type : "POST",
      contentType : "application/json; charset = utf-8",
      data: JSON.stringify(data),
      headers: {"APIkey" : "Ak9h4zn6LOvfOVb9piD0VG7XgXr5Gbc6"},
      success: function(data){
        alert(data.status)
      }
    })
});


document.addEventListener("DOMContentLoaded", function () {
  survey.render(document.getElementById("surveyElement"));
});


