// $(function () {
$("#scrape-btn").on("click", function(event) {
  event.preventDefault();

  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(data) {
    console.log(data);
  });
});
// });
