/*
 * Converts a HTML table object to an XML table string.
 * 
 * The first row must contain the names of the columns.
 * The root tag will be "table", each row will be a "row" entity
 * the attributes will be the content of the cells, the names of
 * the tags will be the name of the columns.
 * 
 * @param tableId the HTML table identifier.
 * 
 * @author <a href="mailto:anderson.romero@gmail.com">Anderson Romero</a>
 * 
 */
function domHtmlTableToXmlTableString(var tableId) {
	var table = document.getElementById(tableId);
	
	var xmlTable = "";

	if (table){
		var rows = table.rows;
		//More than one row must exist since the first row is assumed to be a title
		if (rows && rows.length > 1) {
			var namesArray = [];
			//We assume that the first row has the column names
			//We obtain the column names
			var namesRow = rows[0].cells;
			for (var k = 0; k < namesRow.length; k++) {
				namesArray.push(namesRow[k].innerHTML);
			}
			
			//Now we build the xml String
			xmlTable = "<table>";
			
			//Each row is an XML row object
			for (var i=1; i < rows.length; i++) {
				var row = rows[i].cells;
				xmlTable += "<row>"
				//Each column is an attribute of the sprint
				//We assign the name of the column as the XML object
				for (var j = 0; j < row.length; j++) {
					xmlTable += "<" + namesArray[j] + ">"
					xmlTable += row[j].innerHTML;
					xmlTable += "</" + namesArray[j] + ">"
				}
				xmlTable += "</row>"
			}
			
			xmlTable += "</table>"
		}
	}
	return xmlTable;
}

/*
 * Converts a HTML table string to an XML table string.
 * 
 * The first row must contain the names of the columns.
 * The root tag will be "table", each row will be a "row" entity
 * the attributes will be the content of the cells, the names of
 * the tags will be the name of the columns.
 * 
 * @param table is the HTML table string.
 * 
 * @author <a href="mailto:anderson.romero@gmail.com">Anderson Romero</a>
 * 
 */
function htmlTableStringToXmlTableString(var table) {
	var xmlTable = "";

	var tagRegex = /(<([^>]+)>)/ig;

	var rowsRegex = new RegExp(/<tr>(.+?)<\/tr>/gi);
	var headerRegex = new RegExp(/<th( colspan="\d")?>(.+?)<\/th>/gi);
	var cellsRegex = new RegExp(/<td( colspan="\d")?>(.+?)<\/td>/gi);

	if(table) {
		var rows = table.match(rowsRegex);

		var namesArray = [];

		//We assume that the first row has the column names
		//We obtain the column names
		var namesRow = rows[0].match(headerRegex);
		for (var k = 0; k < namesRow.length; k++) {
			namesArray.push(namesRow[k].replace(tagRegex, ""));
		}

		//Now we build the xml String
		xmlTable = "<table>";

		//Each row is an XML row object
		for (var i=1; i < rows.length; i++) {
			var row = rows[i].match(cellsRegex);
			xmlTable += "<row>"
			//Each column is an attribute of the sprint
			//We assign the name of the column as the XML object
			for (var j = 0; j < namesArray.length; j++) {
				xmlTable += "<" + namesArray[j] + ">"
				if (row[j]) {
					xmlTable += row[j].replace(tagRegex, "").replace(/\u00a0/g, " ");
				}
				xmlTable += "</" + namesArray[j] + ">"
			}
			xmlTable += "</row>"
		}
				
		xmlTable += "</table>"
	}

	return xmlTable;
}

