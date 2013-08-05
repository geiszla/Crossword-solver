function init()
{
	var submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", checkData, false);
}

function checkData()
{
	var inputWords = document.getElementById("inputWords").value.replace(/ /g, "").split(",");
	var inputText = document.getElementById("inputText").value.split("\n");

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

	for (var i = 0; i < inputText.length - 1; i++)
	{
		if (inputText[i].length !== inputText[i + 1].length)
		{
			alert("A táblázat sorai nem egyenlő hosszúak.");
		}
	}

	findWords();
}

function findWords()
{
}