function initNewOppForm() {
    getLeadEvals()	;
};

function getLeadEvals() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET','http://athena.ecs.csus.edu/~wildcard/php/api/employee/read.php',true);
	xhr.onload = function() {
		if (xhr.status == 200) {
			var jsonArray = JSON.parse(xhr.responseText);
			var size = jsonArray.employee.length;
			for(var i=0;i<size;i++) {
				var lead = jsonArray.employee[i];
				var name = lead.first_name + " " + lead.last_name;
                $('select').append($('<option>', {value:lead.id, text:name }));
            };
		} else {
            alert("Error response");
		}
	};
	xhr.send();
};

function saveOpportunity() {
    var scoreFile = $('#criteriaFile')[0].files[0];
    var opId = $('#formIdInput').val();
    var name = $('#formNameInput').val();
    var desc = $('#formDescriptionInput').val();
    var close = $('#formdatetimepicker2').data("DateTimePicker").viewDate().toString()
    var jsonRecord =
    {"opportunity":
			{"OpportunityID":"80101",
				"ClosingDate":"2019-01-01 12:00:00",
				"ScoringCategoryBlob":scoreFile,
				"LeadEvaluatorID":3,
				"LowestBid":10000,
				"Description":"This is a great opportunity"}};
    var xhr = new XMLHttpRequest();
    xhr.open('POST','http://athena.ecs.csus.edu/~wildcard/php/api/opportunity/create.php',true);
//    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');  //Creates an  error
    xhr.onload = function() {
        if (xhr.status == 200) {
            alert(xhr.responseText);
        } else {
        	alert("Error saving opportunity");
        }
    };
    xhr.send(jsonRecord);
    console.log("Wrote Json: " + jsonRecord);
};

function submitDocList() {

};

function getDocList() {

};



