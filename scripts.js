function init()
{
	var submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", main, false);
}

function sortCoords()
{
	var temp = "0";
	temp = outputWordPlace[outputWordPlace.length - 1][0];
	outputWordPlace[outputWordPlace.length - 1][0] = outputWordPlace[outputWordPlace.length - 1][2]
	outputWordPlace[outputWordPlace.length - 1][2] = temp;

	temp = outputWordPlace[outputWordPlace.length - 1][1];
	outputWordPlace[outputWordPlace.length - 1][1] = outputWordPlace[outputWordPlace.length - 1][3]
	outputWordPlace[outputWordPlace.length - 1][3] = temp;
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

function findWord(inputWord, direction, bottomBorder, rightBorder)
{
	var outputWord = "";
	var outputWordPlace = [];

	for (var i = 0; i < bottomBorder; i++)
	{
		for (var j = 0; j <= rightBorder; j++)
		{
			outputWord = "";

			if (direction === "horizontal")
			{
				var wordBorder = j;
			}

			else if (direction === "vertical")
			{
				var wordBorder = i;
			}

			for (var k = wordBorder; k < inputWord.length + wordBorder; k++)
			{
				if (direction === "horizontal")
				{
					var firstCoord = i;
					var secondCoord = k;
				}

				else if (direction === "vertical")
				{
					var firstCoord = k;
					var secondCoord = j;
				}

				outputWord += document.getElementById("td" + String(firstCoord) + String(secondCoord)).innerHTML;

				if (k === wordBorder)
				{
					outputWordPlace[outputWordPlace.length] = [secondCoord, firstCoord];
				}

				else if (k === inputWord.length + wordBorder - 1)
				{
					outputWordPlace[outputWordPlace.length - 1][2] = secondCoord;
					outputWordPlace[outputWordPlace.length - 1][3] = firstCoord;
				}
			}

			if (outputWord !== inputWord && outputWord.split("").reverse().join("") !== inputWord)
			{
				outputWordPlace.splice(outputWordPlace.length - 1, 1);
			}

			else if (outputWordPlace[outputWordPlace.length - 1][0] > outputWordPlace[outputWordPlace.length - 1][2])
			{
				sortCoords();
			}

			else if (outputWordPlace[outputWordPlace.length - 1][1] > outputWordPlace[outputWordPlace.length - 1][3])
			{
				sortCoords();
			}
		}

		for (var j = 0; j < outputWordPlace.length; j++)
		{
			showResult(outputWordPlace[j][0], outputWordPlace[j][1], outputWordPlace[j][2], outputWordPlace[j][3]);
		}
	}
}

function showResult(startCoordX, startCoordY, endCoordX, endCoordY)
{
	if (startCoordY === endCoordY && startCoordX <= endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
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
	var inputWords = document.getElementById("inputWords").value.toUpperCase().replace(/ /g, "").split(",");
	window.inputWords = inputWords;

	var inputText = document.getElementById("inputText").value.toUpperCase().split("\n");
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
		var isEqual = true;

		for (var i = 0; i < inputText.length - 1; i++)
		{
			if (inputText[i].length !== inputText[i + 1].length)
			{
				isEqual = false;
			}
		}

		if (isEqual = false)
		{
			alert("A táblázat sorai nem egyenlő hosszúak.");
		}

		else
		{
			buildTable();

			for (var i = 0; i < inputWords.length; i++)
			{
				findWord(inputWords[i], "horizontal", inputText.length, inputText[0].length - inputWords[i].length);
				findWord(inputWords[i], "vertical", inputText.length - inputWords[i].length + 1, inputText[0].length - 1);
			}
		}
	}
}