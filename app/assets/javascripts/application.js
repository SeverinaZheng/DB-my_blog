// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).on("click", "#execute", function() {
								_method: 'post',
								$.ajax({  
							       type: "POST",  
							       url: "all/findit",  
							       contentType: "application/json; charset=utf-8",  
							       data: JSON.stringify(GetJsonData()),  
							       dataType: "json",  
							       success: function (data) {
							           console.log(data);
							           document.getElementById("yield").innerHTML="<h1>"+Object.values(data)[0]+"</h1>";
							           console.log("received");
							       },  
							       error: function (data) {  
							         var p = document.getElementById("yield");
							           p.value="fail";
							           console.log("not received");
							       }  
							   });
								function GetJsonData() {  
								    var content = document.getElementById("inputPlace").value;
								   console.log(content);
								      
								    var json = {  
								        "id": content 
								    };  
								    return json;  
								}

						})