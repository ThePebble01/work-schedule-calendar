var timeBlocks = $(".time-block");
$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  updateTimeBlocks(); // Update the time blocks to indicate which ones are past, present, and future.
  setExistingNotes();
});
function handleSaveNote(event) {
  event.preventDefault();
  var parentTimeBlockId = event.target.parentElement.id;
  var timeBlockNote = $("#" + parentTimeBlockId)[0].children[1].value;
  localStorage.setItem(parentTimeBlockId, timeBlockNote);
}
function updateTimeBlocks() {
  var currentHour = Number.parseInt(dayjs().format("H"));
  for (var i = 0; i < timeBlocks.length; i++) {
    var formattedHour = timeBlocks[i].id;
    var hour = Number.parseInt(
      formattedHour.slice(formattedHour.indexOf("-") + 1)
    );
    if (Number.isNaN(hour)) {
      alert(
        "Someone changed the ids from their expected format!  If only we caught this during our code review!"
      );
      return;
    }
    if (hour < currentHour) {
      $("#" + formattedHour).addClass("past");
    } else if (hour == currentHour) {
      $("#" + formattedHour).addClass("present");
    } else {
      $("#" + formattedHour).addClass("future");
    }
  }
}
function setExistingNotes() {
  for (var i = 0; i < timeBlocks.length; i++) {
    var hourNotes = localStorage.getItem(timeBlocks[i].id);
    if (hourNotes) {
      $("#" + timeBlocks[i].id)[0].children[1].value = hourNotes;
    }
  }
}
$(".saveBtn").on("click", handleSaveNote);
