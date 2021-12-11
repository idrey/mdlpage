var jsonData;
$.getJSON("data.json", function(data){
	jsonData = data;
});
var full_data;

function setResult() {
	var e1 = document.getElementById("Ele1").value;
	var e2 = document.getElementById("Ele2").value;
	var ratio = parseFloat(document.getElementById("ratio").value);
	var refinement = document.getElementById("switch-1").checked;
	var formula = document.getElementById("formula");

	if (full_data[e1] == undefined || full_data[e1][e2] == undefined) {
		// console.log("Wrong");
		formula.innerHTML = "<h4>Element Error</h4>"
	}
	else {
		var results = ""
		if(refinement != true) {
			var length_range = full_data[e1][e2]["range"].length;
			var ratio_range = false;
			var pack_index = -1;
			
			for(var i = 0; i < length_range; i++) {
				var tmp_arr = full_data[e1][e2]["range"][i];
				if(ratio >= tmp_arr[0] && ratio <= tmp_arr[1]) {
					ratio_range = true;
					pack_index = i;
					break;
				}
			}

			if(ratio_range == true) {
				// console.log("Results");
				results = "<h4>Results</h4>";
				var real_ratio_trans = ratio * 10;
				var pack_length = full_data[e1][e2]["length"][pack_index];
				if( real_ratio_trans == Math.floor(real_ratio_trans)) {
					// console.log("The real data is");
					results += "<p>The real data is";
					for(var i = 0; i < pack_length; i++) {
						// console.log(full_data[e1][e2]["labels"][pack_index][i]);
						results += "$$" + full_data[e1][e2]["labels"][pack_index][i];
						results += "\\ is \\ ";
						// console.log(full_data[e1][e2][real_ratio_trans.toString()][i]);
						results += full_data[e1][e2][real_ratio_trans.toString()][i].toString() + "$$";
						results += "<br>";
					}
					results += "</p>";
				}

				// console.log("The estimate data is");
				results += "<p>The estimate data is";
				for(var i = 0; i < pack_length; i++) {
					var k = full_data[e1][e2]["k"][pack_index][i];
					var b = full_data[e1][e2]["b"][pack_index][i];
					// console.log(full_data[e1][e2]["labels"][pack_index][i]);
					results += "$$" + full_data[e1][e2]["labels"][pack_index][i];
					results += "\\ is \\ ";
					// console.log((k * ratio + b).toFixed(2));
					results += (k * ratio + b).toFixed(2) + "$$";
					results += "<br>";
				}
				results += "</p>";
			}
			else {
				// console.log("Invalid ratio");
				results = "<h4>Invalid ratio</h4>";
			}
			

		}
		else {
			if(full_data[e1][e2]["refinement"] != true) {
				// console.log("No data");
				results = "<h4>No data</h4>";
			}
			else{
				var rlength_range = full_data[e1][e2]["rrange"].length;
				var rratio_range = false;
				var rpack_index = -1;
				for(var i = 0; i < rlength_range; i++) {
					var tmp_arr = full_data[e1][e2]["rrange"][i];
					if(ratio >= tmp_arr[0] && ratio <= tmp_arr[1]) {
						rratio_range = true;
						rpack_index = i;
						break;
					}
				}

				if(rratio_range == true) {
					// console.log("Results");
					results = "<h4>Results</h4>";
					var real_ratio_trans = ratio * 100;
					var rpack_length = full_data[e1][e2]["rlength"][rpack_index];
					if( real_ratio_trans == Math.floor(real_ratio_trans)) {
						// console.log("The real data is");
						results += "<p>The real data is";
						for(var i = 0; i < rpack_length; i++) {
							// console.log(full_data[e1][e2]["rlabels"][rpack_index][i]);
							results += "$$" + full_data[e1][e2]["rlabels"][rpack_index][i];
							results += "\\ is \\ ";
							// console.log(full_data[e1][e2][real_ratio_trans.toString()][i]);
							results += full_data[e1][e2][real_ratio_trans.toString()][i].toString() + "$$";
							results += "<br>";
						}
						results += "</p>";
					}

					// console.log("The estimate data is");
					results += "<p>The estimate data is";
					for(var i = 0; i < rpack_length; i++) {
						var rk = full_data[e1][e2]["rk"][rpack_index][i];
						var rb = full_data[e1][e2]["rb"][rpack_index][i];
						// console.log(full_data[e1][e2]["rlabels"][rpack_index][i]);
						results += "$$" + full_data[e1][e2]["rlabels"][rpack_index][i];
						results += "\\ is \\ ";
						// console.log((rk * ratio + rb).toFixed(2));
						results += (k * ratio + b).toFixed(2) + "$$";
						results += "<br>";
					}
					results += "</p>";
				}
				else {
					// console.log("Invalid ratio");
					results = "<h4>Invalid ratio</h4>"
				}
			}
		}

		formula.innerHTML = results;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, formula]);
	}
}

document.getElementById("submit-btn").addEventListener("click", setResult);
