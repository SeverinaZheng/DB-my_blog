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
							           document.getElementById("yield").innerHTML="<h1>"+Object.values(data)[0]+Object.values(data)[1]+"</h1>";
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
									var operator = [];
								    var condition = [];
								    var table = [];
								    var popOper;
								    var sql = "";
								    var tempTable = "";
								    var i;
								    var now = content.charAt(i);
								    for(i = 0; i < content.length;){
								    	if(now == ' '){i++;now = content.charAt(i);}
								    	else if(now =='('){
								    		i++;
								    		now = content.charAt(i);
								    		if(now == 'π' ||now == 'σ'||now == 'ρ');
								    		else if(now == '('){i++;now = content.charAt(i)}
								    		else{
								    			var t = "";
												while(now !=')'){
									   				if(now == ' '){
									   					i++;
								    					now = content.charAt(i);
									   				}else{
								    					t+=now;
								    					i++;
								    					now = content.charAt(i);
									    			}
							    				}
							    				table.push(t);
							    				i++;
								    			now = content.charAt(i);
							    				
								    		}
								    	}else if(now == 'π'){
								    		operator.push(now);
								    		i++;
								    		now = content.charAt(i);
								   			var c = "";
								   			while(now !='('){
								   				if(now != ' '){
							    					c+=now;
							    				}
							    				i++;
							    				now = content.charAt(i);
								    				
							    			}
							    			condition.push(c);
							    			i++;
								    		now = content.charAt(i);
							    		}else if(now == 'x'){
								    		operator.push(now);
								    		i++;
								    		now = content.charAt(i);
							    		}else if(now == 'σ'){
								    		operator.push(now);
								    		i++;
								    		now = content.charAt(i);
								   			var c = "";
								   			while(now !='('){
								   				if(now != ' '){
							    					c+=now;
							    				}
							    				i++;
							    				now = content.charAt(i);
								    			
							    			}
							    			condition.push(c);
							    			i++;
								    		now = content.charAt(i);
							    		}else if(now == 'ρ'){
								    		operator.push(now);
								    		i++;
								    		now = content.charAt(i);
								   			var c = "";
								   			while(now !='('){
							    				i++;
							    				now = content.charAt(i);	
							    			}
							    			i++;
							    			now = content.charAt(i);
							    			while(now !=','){
								   				if(now != ' '){
							    					c+=now;
							    				}
							    				i++;
							    				now = content.charAt(i);
								    			
							    			}
							    			condition.push(c);
							    			c = "";
							    			i++;
							    			now = content.charAt(i);
							    			while(now !=')'){
								   				if(now != ' '){
							    					c+=now;
							    				}
							    				i++;
							    				now = content.charAt(i);
								    			
							    			}
							    			condition.push(c);
							    			i++;
								    		now = content.charAt(i);
							    		}else if(now == '⨝'){
								    		i++;
								    		now = content.charAt(i);
								   			var token = 0;
								   			var c = '';
								   			while(now !='('){
								   				if(now != ' '){
								   					token = 1;
								   					c+=now;
								   				}
							    				i++;
							    				now = content.charAt(i);
								    			
							    			}
							    			if(token = 0) operator.push('⨝2');
							    			else condition.push(c);
							    			i++;
							    			now = content.charAt(i);
							    		}else if(now == ')'){
							    			//pop and parse to sql
							    			popOper = operator.pop();


								    		if(popOper == 'π'){
								    			var col = condition.pop();
								    			sql = "select " + col +" from( " + sql +" )";
								    			
								    		}else if(popOper == 'x'){
								    			var t1 = table.pop();
								    			var t2="";
								    			if(tempTable == ""){
													t2 = table.pop();
								    				sql = "select * from ( " +t2 + " join " + t1 +" )";
								    			}else sql = "select * from ( " +tempTable + " join " + t1 +" )";
								    		}else if(popOper == 'σ'){
									    		var c = condition.pop();
									    		sql = "select * from ( " +sql+ " )"+"where " + c;
								    		}else if(popOper == 'ρ'){
								    			var ocol = condition.pop();
								    			var ncol = condition.pop();
								    			tempTable = ocol + " as " +ncol;
									    		
									   			
								    		}else if(popOper == '⨝1'){
									    		var t1 = table.pop();
								    			var t2="";
								    			var cond = condition.pop();
								    			if(tempTable == "")  t2 = table.pop();
								    			else t2 = tempTable;
								    			sql = sql + t2 + "join" +t1 + " on "+cond;
								    		}else if(popOper == '⨝2'){
									    		var t1 = table.pop();
								    			var t2="";
								    			if(tempTable == "")  t2 = table.pop();
								    			else t2 = tempTable;
								    			sql = sql + t2 + " join " +t1;
								    		}
								    		i++;
								    		now = content.charAt(i);
								    
							    		}
								    }
								    popOper = operator.pop();
								    if(popOper == 'π'){
								    			var col = condition.pop();
								    			sql = "select distict " + col +" from ( " + sql +" )";
								    			
								    		}else if(popOper == 'x'){
								    			var t1 = table.pop();
								    			var t2="";
								    			if(tempTable == ""){
													t2 = table.pop();
								    				sql = "select distinct * from ( " +t2 + " join " + t1 +" )";
								    			}else sql = "select distinct * from ( " +tempTable + " join " + t1 +" )";
								    		}else if(popOper == 'σ'){
									    		var c = condition.pop();
									    		sql = "select distinct * from ( " +sql+ " )"+"where " + c;
								    		}else if(popOper == 'ρ'){
								    			var ocol = condition.pop();
								    			var ncol = condition.pop();
								    			sql = "select distinct "+ ocol + " as " +ncol +" from ( " +sql+ " )";
								    		}else if(popOper == '⨝1'){
									    		var t1 = table.pop();
								    			var t2="";
								    			var cond = condition.pop();
								    			if(tempTable == "")  t2 = table.pop();
								    			else t2 = tempTable;
								    			sql = sql + t2 + "join" +t1 + " on "+cond;
								    		}else if(popOper == '⨝2'){
									    		var t1 = table.pop();
								    			var t2="";
								    			if(tempTable == "")  t2 = table.pop();
								    			else t2 = tempTable;
								    			sql = sql + t2 + "join" +t1;
								    		}
								    		

								    /*var ans = {
								    	"operator":operator,
								    	"condition":condition,
								    	"table":table,
								    };

								    return ans;*/



								      
								    var json = {  
								        "sql": sql
								    }; 
								    return json;  
								}
								    

						})