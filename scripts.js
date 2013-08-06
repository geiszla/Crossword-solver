function init()
{
	var submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", main, false);
}

function checkData()
{
	var inputWords = document.getElementById("inputWords").value.replace(/ /g, "").split(",");
	window.inputWords = inputWords;

	var inputText = document.getElementById("inputText").value.split("\n");
	window.inputText = inputText;

	if (inputText[0] === "" && inputWords[0] === "")
	{
		alert("Nincsenek beírva adatok.");
	}

	else if (inputText[0] === "")
	{
		alert("Nincs táblázat, amiben kereshetnék.");
	}

	else if (inputWords[0] === "")
	{
		alert("Nincsenek keresési kulcsszavak.");
	}

	else
	{
		for (var i = 0; i < inputText.length - 1; i++)
		{
			if (inputText[i].length !== inputText[i + 1].length)
			{
				alert("A táblázat sorai nem egyenlő hosszúak.");
			}

			else
			{
				findWords();
			}
		}
	}
}

function findWords()
{
}

function buildTable()
{
	document.body.innerHTML = '<div id="main"> Megtalált szavak: <p><table id="outputTable" style="margin:auto; font-size:40px; border-collapse: collapse;"> </table></p> </div>'

	var outputTable = document.getElementById("outputTable");

	for (var i = 0; i < inputText.length; i++)
	{
		outputTable.innerHTML += '<tr id="tr"></tr>'
		document.getElementById("tr").id += i;

		for (var j = 0; j < inputText[i].length; j++)
		{
			document.getElementById("tr" + i).innerHTML += '<td id="td" style="width: 50px;"></td>';
			document.getElementById("td").innerHTML = inputText[i][j];
			document.getElementById("td").id += String(i) + String(j);
		}
	}
}

function showResult(startCoordX, startCoordY, endCoordX, endCoordY)
{
	if (startCoordY === endCoordY && startCoordX <= endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
			console.log(endCoordX + ", " + i);

			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			if (i === startCoordX)
			{
				newAttribute.value += "border-right-style: none;";
			}

			else if (i === endCoordX)
			{
				newAttribute.value += "border-left-style: none;";
			}

			else
			{
				newAttribute.value += "border-left-style: none; border-right-style: none;";
			}

			document.getElementById("td" + String(startCoordY) + String(i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY === endCoordY && startCoordX > endCoordX)
	{
		for (var i = endCoordX; i <= startCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			if (i === startCoordX)
			{
				newAttribute.value += "border-left-style: none;";
			}

			else if (i === endCoordX)
			{
				newAttribute.value += "border-right-style: none;";
			}

			else
			{
				newAttribute.value += "border-left-style: none; border-right-style: none;";
			}

			document.getElementById("td" + String(startCoordY) + String(i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordX === endCoordX && startCoordY <= endCoordY)
	{
		for (var i = startCoordY; i <= endCoordY; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			if (i === startCoordY)
			{
				newAttribute.value += "border-bottom-style: none;";
			}

			else if (i === endCoordY)
			{
				newAttribute.value += "border-top-style: none;";
			}

			else
			{
				newAttribute.value += "border-bottom-style: none; border-top-style: none;";
			}

			document.getElementById("td" + String(i) + String(startCoordX)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordX === endCoordX && startCoordY > endCoordY)
	{
		for (var i = startCoordY; i <= endCoordY; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			if (i === startCoordY)
			{
				newAttribute.value += "border-top-style: none;";
			}

			else if (i === endCoordY)
			{
				newAttribute.value += "border-bottom-style: none;";
			}

			else
			{
				newAttribute.value += "border-bottom-style: none; border-top-style: none;";
			}

			document.getElementById("td" + String(i) + String(startCoordX)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY <= endCoordY && startCoordX <= endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			document.getElementById("td" + String(startCoordY + i) + String(startCoordX + i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY <= endCoordY && startCoordX > endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			document.getElementById("td" + String(startCoordY + i) + String(startCoordX - i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY > endCoordY && startCoordX <= endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			document.getElementById("td" + String(startCoordY - i) + String(startCoordX + i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY > endCoordY && startCoordX > endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; width: 50px;";

			document.getElementById("td" + String(startCoordY - i) + String(startCoordX - i)).setAttributeNode(newAttribute);
		}
	}
}

function main()
{
	checkData();
	buildTable();
	showResult(startCoordX, startCoordY, endCoordX, endCoordY);
}