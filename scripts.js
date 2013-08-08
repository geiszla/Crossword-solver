"use strict";

function init()
{
	document.body.addEventListener("keydown", keyPressed, false);
	document.getElementById("submit").addEventListener("click", checkData, false);
	document.getElementById("settingsButton").addEventListener("click", changeSettings, false);
}

function checkData()
{
	var inputWords = [];
	inputWords = document.getElementById("inputWords").value.toUpperCase().replace(/ /g, "").split(",");
	window.inputWords = inputWords;

	var inputText = [];
	inputText = document.getElementById("inputText").value.replace(/	/g, "").toUpperCase().split("\n");
	window.inputText = inputText;

	var mainBody = document.body.innerHTML;
	window.mainBody = mainBody;

	var isSettingsOpen = false;
	window.isSettingsOpen = isSettingsOpen;

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
			main();
		}
	}
}

function main()
{
	var isBackwards = document.getElementById("isBackwards").checked;
	window.isBackwards = isBackwards;

	var wordsNotFound = [];
	window.wordsNotFound = wordsNotFound;

	for (var i = 0; i < inputWords.length; i++)
	{
		wordsNotFound[i] = inputWords[i];
	}

	buildTable();

	for (var i = 0; i < inputWords.length; i++)
	{
		findWord(inputWords[i], "horizontal", inputText.length, inputText[0].length - inputWords[i].length + 1, 0);
		findWord(inputWords[i], "vertical", inputText.length - inputWords[i].length + 1, inputText[0].length, 0);
		findWord(inputWords[i], "rightDown", inputText.length - inputWords[i].length + 1, inputText[0].length - inputWords[i].length + 1, 0);
		findWord(inputWords[i], "leftDown", inputText.length - inputWords[i].length + 1, inputText[0].length, inputWords[i].length - 1);
	}

	if (wordsNotFound.length === inputWords.length)
	{
		document.getElementById("main").innerHTML = '<p style="color: red;">Egyetlen szó sem volt megtalálható a táblázatban. Ellenőrizd a megadott adatokat és a beállításokat!</p><p><input type="button" id="back" value = "<- Vissza"><input type="button" id="settingsButton" value="Beállítások ↑" /></p><p id="settings" style="display: none;"><input type="checkbox" id="isBackwards" checked="true" /> Keresés visszafelé</p>';

		document.getElementById("back").addEventListener("click", goBack, false);
	}

	else
	{
		if (wordsNotFound.length === 0)
		{
			document.getElementById("notFound").innerHTML += "Minden megadott szó megtalálható a táblázatban.";
		}	

		else if (wordsNotFound.length === 1)
		{
			document.getElementById("isNotFound").innerHTML += "A következő szó nem található a táblázatban:";
		}

		else
		{
			document.getElementById("isNotFound").innerHTML += "A következő szavak nem találhatók a táblázatban:";
		}

		for (var i = 0; i < wordsNotFound.length; i++)
		{
			document.getElementById("notFound").innerHTML += wordsNotFound[i].toLowerCase();

			if (i !== wordsNotFound.length - 1)
			{
				document.getElementById("notFound").innerHTML += ", ";
			}
		}
	}

	document.getElementById("settingsButton").addEventListener("click", changeSettings, false);
	document.getElementById("isBackwards").addEventListener("change", main, false);

	if (isSettingsOpen === true)
	{
		changeSettings("open");
	}

	if (isBackwards !== true)
	{
		document.getElementById("isBackwards").checked = false;
	}
}

function buildTable()
{
	document.body.innerHTML = '<div id="main"><div id="head">A táblázatban megtalált szavak:</div> <p></p><table id="outputTable" style="margin:auto; font-size:20px; border-collapse: collapse;"></table> <br><div id="isNotFound"></div><div id="notFound" style="color: red;"></div> <p><input type="button" id="back" value = "<- Vissza"><input type="button" id="settingsButton" value="Beállítások ↑" /></p><p id="settings" style="display: none;"><input type="checkbox" id="isBackwards" checked="true" /> Keresés visszafelé</p> </div>'

	document.getElementById("back").addEventListener("click", goBack, false);

	var outputTable = document.getElementById("outputTable");

	for (var i = 0; i < inputText.length; i++)
	{
		outputTable.innerHTML += '<tr id="tr"></tr>'
		document.getElementById("tr").id += i;

		for (var j = 0; j < inputText[i].length; j++)
		{
			document.getElementById("tr" + i).innerHTML += '<td id="td" style="width: 50px;"></td>';
			document.getElementById("td").innerHTML = inputText[i][j];
			document.getElementById("td").id += String(i) + "|" + String(j);
		}
	}
}

function findWord(inputWord, direction, bottomBorder, rightBorder, startCoordX)
{
	var outputWord = "";
	var outputWordPlace = [];

	for (var i = 0; i < bottomBorder; i++)
	{
		for (var j = startCoordX; j < rightBorder; j++)
		{
			outputWord = "";
			var k = 0;

			while (outputWord.length < inputWord.length)
			{
				if (direction === "horizontal")
				{
					var firstCoord = i;
					var secondCoord = j + k;
				}

				else if (direction === "vertical")
				{
					var firstCoord = i + k;
					var secondCoord = j;
				}

				else if (direction === "rightDown")
				{
					var firstCoord = i + k;
					var secondCoord = j + k;
				}

				else if (direction === "leftDown")
				{
					var firstCoord = i + k;
					var secondCoord = j - k;
				}

				outputWord += document.getElementById("td" + String(firstCoord) + "|" + String(secondCoord)).innerHTML;

				if (outputWord.length === 1)
				{
					outputWordPlace[outputWordPlace.length] = [j, i];
				}

				else if (outputWord.length === inputWord.length)
				{
					outputWordPlace[outputWordPlace.length - 1][2] = secondCoord;
					outputWordPlace[outputWordPlace.length - 1][3] = firstCoord;
				}

				k++;
			}

			if (isBackwards === true)
			{
				if (outputWord !== inputWord && outputWord.split("").reverse().join("") !== inputWord)
				{
					outputWordPlace.splice(outputWordPlace.length - 1, 1);
				}

				else
				{
					for (var k = 0; k < wordsNotFound.length; k++)
					{
						if (wordsNotFound[k] === outputWord || wordsNotFound[k] === outputWord.split("").reverse().join(""))
						{
							wordsNotFound.splice(k, 1);
						}
					}
				}
			}

			else
			{
				if (outputWord !== inputWord)
				{
					outputWordPlace.splice(outputWordPlace.length - 1, 1);
				}

				else
				{
					for (var k = 0; k < wordsNotFound.length; k++)
					{
						if (wordsNotFound[k] === outputWord || wordsNotFound[k] === outputWord.split("").reverse().join(""))
						{
							wordsNotFound.splice(k, 1);
						}
					}
				}
			}

			if (outputWordPlace[outputWordPlace.length - 1] !== undefined)
			{
				if (direction !== "horizontal")
				{
					if (outputWordPlace[outputWordPlace.length - 1][1] > outputWordPlace[outputWordPlace.length - 1][3])
					{
						sortCoords();
					}
				}

				else
				{
					if (outputWordPlace[outputWordPlace.length - 1][0] > outputWordPlace[outputWordPlace.length - 1][2])
					{
						sortCoords(outputWordPlace);
					}
				}
			}
		}
	}

	for (var i = 0; i < outputWordPlace.length; i++)
	{
		showResult(outputWordPlace[i][0], outputWordPlace[i][1], outputWordPlace[i][2], outputWordPlace[i][3]);
	}	
}

function showResult(startCoordX, startCoordY, endCoordX, endCoordY)
{
	if (startCoordY === endCoordY && startCoordX <= endCoordX)
	{
		for (var i = startCoordX; i <= endCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: red; background-color: red; width: 24px;";

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

			document.getElementById("td" + String(startCoordY) + "|" + String(i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordX === endCoordX && startCoordY <= endCoordY)
	{
		for (var i = startCoordY; i <= endCoordY; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: green; background-color: green; width: 24px;";

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

			document.getElementById("td" + String(i) + "|" + String(startCoordX)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY <= endCoordY && startCoordX <= endCoordX)
	{
		for (var i = 0; i <= endCoordX - startCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: yellow; background-color: yellow; width: 24px;";

			document.getElementById("td" + String(startCoordY + i) + "|" + String(startCoordX + i)).setAttributeNode(newAttribute);
		}
	}

	else if (startCoordY <= endCoordY && startCoordX >= endCoordX)
	{
		for (var i = 0; i <= startCoordX - endCoordX; i++)
		{
			var newAttribute = document.createAttribute("style");
			newAttribute.value = "border-style: solid; border-color: lightBlue; background-color: lightBlue; width: 24px;";

			document.getElementById("td" + String(startCoordY + i) + "|" + String(startCoordX - i)).setAttributeNode(newAttribute);
		}
	}
}

function goBack()
{
	document.body.innerHTML = mainBody;

	for (var i = 0; i < inputWords.length; i++)
	{
		document.getElementById("inputWords").value += inputWords[i].toLowerCase();

		if (i !== inputWords.length - 1)
		{
			document.getElementById("inputWords").value += ", ";
		}
	}

	for (var i = 0; i < inputText.length; i++)
	{
		document.getElementById("inputText").value += inputText[i].toLowerCase();

		if (i !== inputText.length - 1)
		{
			document.getElementById("inputText").value += "\n";
		}
	}

	document.getElementById("submit").addEventListener("click", checkData, false);
	document.getElementById("settingsButton").addEventListener("click", changeSettings, false);
	document.getElementById("isBackwards").checked = isBackwards;

	changeSettings("close");
}

function keyPressed(e)
{
	if (e.keyCode == 13 && document.getElementById("submit") !== null && document.activeElement !== document.getElementById("inputText"))
	{
		checkData();
	}

	else if (e.keyCode == 8 && document.getElementById("back") !== null)
	{
		goBack();
	}
}

function changeSettings(currState)
{
	if (document.getElementById("settingsButton").value === "Beállítások ↑" || currState === "close")
	{
		document.getElementById("settings").style.cssText = "display: normal;";
		document.getElementById("settingsButton").value = "Beállítások ↓";
		isSettingsOpen = true;
	}

	else if (document.getElementById("settingsButton").value === "Beállítások ↓" || currState === "open")
	{
		document.getElementById("settings").style.cssText = "display: none;";
		document.getElementById("settingsButton").value = "Beállítások ↑";
		isSettingsOpen = false;
	}
}

function sortCoords(outputWordPlace)
{
	var temp = "0";
	temp = outputWordPlace[outputWordPlace.length - 1][0];
	outputWordPlace[outputWordPlace.length - 1][0] = outputWordPlace[outputWordPlace.length - 1][2]
	outputWordPlace[outputWordPlace.length - 1][2] = temp;

	temp = outputWordPlace[outputWordPlace.length - 1][1];
	outputWordPlace[outputWordPlace.length - 1][1] = outputWordPlace[outputWordPlace.length - 1][3]
	outputWordPlace[outputWordPlace.length - 1][3] = temp;
}