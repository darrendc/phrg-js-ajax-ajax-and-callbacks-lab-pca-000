$(document).ready(function (){
});

function searchRepositories() {
  let searchTerm = $("#searchTerms").val()
  let repoUrl = `https://api.github.com/search/repositories?q=${searchTerm}`
  $.get(repoUrl, function(response) {
    const repoCollection = response.items.map(function(r){ return( "<p>" + r.name + "</p>"
      + "<p>" + '<a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login + '"onclick="showCommits(this)">Get Commits</a>'  + "</p>")}).join("")

    $("#results").html(repoCollection)
  }).fail(function(error){
    displayError()
  })
  }

  function showCommits(el) {
    const repo = el.dataset.repository
    const owner = el.dataset.owner
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`
    $.get(url,function(response) {
      console.log(response)
      const commitCollection = response.map(function(r) {
        return(
          `<p> ${r.sha} </p>`
        )
      }).join("")
      $("#details").html(commitCollection)
    })
  }

  function displayError(error) {
    $("#errors").html(`I'm sorry, there's been an error. Please try again.`)
  }
