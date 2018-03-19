$(document).ready(
    function () {
        initNewOppForm();
        $('#formdatetimepicker2').datetimepicker();
        $('#editOpp').hide();
        $('#newOpp').hide();
        $('#showNewOpp').click(function (){
            $('#newOpp').show();
            $('#oppButtons').hide();
            $('#docListTable').tablesorter();
        });


        $('clearFile').click(function() {

        });
        $('#saveNewOpp').click(function() {
            saveOpportunity();
        });

        $('#exitNewOpp').click(function() {
            $('#newOpp').hide();
            $('#oppButtons').show();
        });

      //  $('#showEditOpp').hide();  //hiding for 1st pass through
        $('#showEditOpp').click(function() {
            $('#editOpp').show();
            $('#oppButtons').hide();
        });
    });




function initNewOppForm() {
    getLeadEvals()	;
}

function uploadAllDocs() {
    /*
        var file=$('#uploadFileName')[0].files[0];
        console.log(file.name);
        var formData=new FormData();
        formData.append('file',file,file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://athena.ecs.csus.edu/~wildcard/php/api/opportunity/update.php')
        xhr.onload = function() {
            if(xhr.status == 200) {
                alert('File uploaded');
            } else {
                alert('Error uploading file');
            }
        };
        xhr.send(formData);
       */

        var numfiles =  $('#uploadMFileName')[0].files.length;
        var file;
        var formData=new FormData();
        for(i=0;i<numfiles;i++){
            file = $('#uploadMFileName')[0].files[i];
            formData.append('upload[]', file,file.name);
            console.log(file.name);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://athena.ecs.csus.edu/~wildcard/php/api/opportunity/update.php');
        xhr.onload = function() {
            if(xhr.status == 200) {
                alert('File uploaded');
            } else {
            alert('Error uploading file');
            }
        };
        xhr.send(formData);
}

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
            }
		} else {
            alert("Error response");
		}
	};
	xhr.send();
}

function saveOpportunity() {
    var scoreFile = $('#criteriaFile')[0].files[0];
    var opId = parseInt($('#formIdInput').val());
    var name = $('#formNameInput').val();
    var desc = $('#formDescriptionInput').val();
    var close = $('#formdatetimepicker2').data("DateTimePicker").viewDate().toString();
    var jsonRecord =
    {"opportunity":
			{"OpportunityID":opId,
                "Name":name,
				"ClosingDate":close,
				"ScoringCategoryBlob":scoreFile,
				"LeadEvaluatorID":3,
				"LowestBid":10000,
				"Description":desc}};
    var xhr = new XMLHttpRequest();
    xhr.open('POST','http://athena.ecs.csus.edu/~wildcard/php/api/opportunity/create.php',true);
//    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');  //Creates an  error
    xhr.onload = function() {
        if (xhr.status == 200) {
            alert(xhr.responseText);
            uploadAllDocs();
        } else {
        	alert("Error saving opportunity");
        }
    };
    xhr.send(jsonRecord);
    console.log("Wrote Json: " + jsonRecord);
}

function submitDocList() {

}

function getDocList() {

}





