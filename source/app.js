// import $ from 'jquery';

const totalFilesFolderList = new Array;

function list(name, parentNode)
{
  this.name = name;
  this.parentNode = parentNode;
  this.childNodes = new Array;
  this.pathname = ""
}



const lists = new Array
lists.push(new list("Root", null))
lists[0].pathname = ("/Root")

$("#folders_list").show('fast');
$("#folders_list").append('<li>'+ lists[0].name +'</li>')

$("#folders_list li").click(function() {
  currentNodeTxt = $(this).html()
  for (let j = 0; j < lists.length; j++)
  {
    if (lists[j].name === currentNodeTxt)
      currentNode = lists[j];
  }
  $("ul").empty();
  $("#pathName").empty();

  document.getElementById("pathName").innerHTML = currentNode.pathname;
  for (let index=0; index < currentNode.childNodes.length; index++)
  {
    $("#folders_list").show('fast');
    $("#folders_list").append('<li>' + currentNode.childNodes[index] + '</li>')
  }
});


class Folder
{
  constructor(folderName)
  {
    totalFilesFolderList.push(folderName);
    lists.push(new list(folderName, currentNode))

    for (let i = 0; i < lists.length; i++)
    {
      if(lists[i].name == folderName)
      lists[i].pathname = lists[i].parentNode.pathname + "/" + folderName;
    }


    for (let i=0; i < lists.length; i++)
    {
      if(lists[i].name == currentNodeTxt)
      lists[i].childNodes.push(folderName)
    }

    updateList();
    clickElement();

  }
}

class File
{
  constructor(fileName)
  {
    totalFilesFolderList.push(fileName);
    for(var i=0; i<lists.length; i++)
    {
      if(lists[i].name == currentNodeTxt)
      lists[i].childNodes.push(fileName)
    }

  updateList();
  clickElement();
  }
}





function clickSearchList()
{
  $("#search_list li").click(function() {
    currentPathTxt = $(this).html()

    for (let j = 0; j < lists.length; j++)
    {
      if(lists[j].pathname == currentPathTxt)
      currentNode = lists[j].parentNode;
    }


  $("ul").empty();
    		$("#pathName").empty();

    		document.getElementById("pathName").innerHTML = currentNode.pathname;

    		for(var index=0; index < currentNode.childNodes.length; index++)
    		{
    			$("#folders_list").show('fast');
				$("#folders_list").append('<li>'+ currentNode.childNodes[index] +'</li>')
    		}
		});
	clickElement();
}






function updateList()
{
	$("ul").empty();
    for(var index=0; index < currentNode.childNodes.length; index++)
    {
    	$("#folders_list").show('fast');
		$("#folders_list").append('<li>'+ currentNode.childNodes[index] +'</li>')
    }
}


function clickElement()
{
	$("#folders_list li").click(function() {
			currentNodeTxt = $(this).html()

    			for(var j=0; j<lists.length; j++)
    			{
    				if(lists[j].name == currentNodeTxt)
    					currentNode = lists[j];
    			}


    		$("ul").empty();
    		$("#pathName").empty();

    		document.getElementById("pathName").innerHTML = currentNode.pathname;

    		for(var index=0; index < currentNode.childNodes.length; index++)
    		{
    			$("#folders_list").show('fast');
				$("#folders_list").append('<li>'+ currentNode.childNodes[index] +'</li>')
    		}
		});
}







function goBack()
{
	var node = currentNode;
	$("ul").empty();

	if(currentNode.name == "Root" )
	{
		$("#folders_list").show('fast');
		$("#folders_list").append('<li>'+ "Root" +'</li>')
	}
	else
	{
		currentNode = node.parentNode
		for(var index=0; index < currentNode.childNodes.length; index++)
    		{
    			$("#folders_list").show('fast');
				$("#folders_list").append('<li>'+ currentNode.childNodes[index] +'</li>')
    		}
	}

	clickElement();

}





function checkFileValidity(fileName, type)
{
	var flag = 0;
	var regex = /^[a-z0-9]+$/;
	if(regex.test(fileName.toLowerCase()) && regex.test(type.toLowerCase()))
		flag = 1;
	else
		flag = 0;

	for(let i=0; i<totalFilesFolderList.length; i++)
	{
		if(totalFilesFolderList[i] == fileName)
			flag = 0;
	}
	return flag

}


function checkFolderValidity(folderName)
{
	var flag = 0;
	var regex = /^[a-z0-9]+$/
	if (regex.test(folderName.toLowerCase()))
		flag = 1;
	else
		flag = 0;

	for(let i=0; i<totalFilesFolderList.length; i++)
	{
		if(totalFilesFolderList[i] == folderName)
			flag = 0;
	}
	return flag
}



function searchFile()
{
	var searchInput = document.getElementById("searchText").value;

	for(let i=0; i<lists.length; i++)
	{
		if(lists[i].pathname.includes(searchInput))
		{
			$("#search_list").show('fast');
			$("#search_list").append('<li>'+ lists[i].pathname +'</li>')
		}

	}
	clickSearchList();

}


function checkInput()
{
	var fname = document.getElementById("fname").value
	var check;

	if (fname.split(".").length == 1)
	{
		check = checkFolderValidity(fname)
		if(check == 1)
		  var obj = new Folder(fname)
		else
			alert("Please enter a valid name");
	}

	else if (fname.split(".").length == 2)
	{
		check = checkFileValidity(fname.split(".")[0], fname.split(".")[1])
		if(check == 1)
		  var obj = new File(fname)
		else
			alert("Please enter a valid name");
	}

	else
		alert("Please enter a valid name")
}


var create = document.getElementById("createButton")
create.addEventListener("click", function(event){
    event.preventDefault()
    });

create.addEventListener("click", checkInput);


var back = document.getElementById("backButton")
back.addEventListener("click", function(event){
    event.preventDefault()
    });

back.addEventListener("click", goBack)


var search = document.getElementById("searchButton")
search.addEventListener("click", function(event){
    event.preventDefault()
    });

search.addEventListener("click", searchFile)
