function init()
{
	var submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", checkData, false);
}

function buildTable()
{
	document.body.innerHTML = '<div id="main"> Megtalált szavak: <p><table id="outputTable" style="margin:auto; font-size:40px;"> </table></p> </div>'

	var outputTable = document.getElementById("outputTable");

	for (var i = 0; i < inputText.length; i++)
	{
		outputTable.innerHTML += '<tr id="tr"></tr>'
		document.getElementById("tr").id += i;

		for (var j = 0; j < inputText[i].length; j++)
		{
			document.getElementById("tr" + i).innerHTML += '<td id="td""></td>';
			document.getElementById("td").innerHTML = inputText[i][j];
			document.getElementById("td").id += String(i) + String(j);

		}
	}
}

function showResult(startCoordX, startCoordY, endCoordX, endCoordY, direction)
{
	buildTable();
}

function findWords()
{
	showResult();
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