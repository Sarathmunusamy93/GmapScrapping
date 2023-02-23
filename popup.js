chrome.runtime.sendMessage({ type: "getScrapResult" }, (response) => {
  // use the response here
});

$(document).ready(function () {
  //   $("#doScrap").click(function () {
  chrome.runtime.sendMessage({ type: "getScrapResult" }, (response) => {
    var resultList = response.totalDetailsList;

    var siteDetails = response.totalDetailsList,
        hdWidth = ['35','5','3','3','35','19'];

    // $("#tblTitle").html(
    //   siteDetails.siteName + " : " + siteDetails.searchText
    // );

    for (let index = 0; index < resultList.length; index++) {
      const element = resultList[index];

      if (index == 0) {
        let tableHeader = "",
            headerIndex = 0;

        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            tableHeader += "<th  style='width: "+ hdWidth[headerIndex]+"%' >" + capitalizeFirstLetter(key) + "</th>";
          }
          headerIndex++;
        }
        $("#table").append(
          "<thead><tr class='theader' > " + tableHeader + "</tr></thead>"
        );
     
      }

      var newRow = "";
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          if (key == "itemImage") {
            newRow += "<td><img src=" + element[key] + " class='itemImg'></td>";
          } else {
            newRow += "<td>" + element[key] + "</td>";
          }
        }
      }

      $("#table").append("<tr>" + newRow + "</tr>");
    }
  });
  //});

  $("#dwnJson").on("click", function () {
    $("#table").tableHTMLExport({ type: "json", filename: "sample.json" });
  });
  $("#dwnexcel").on("click", function () {
    $("#table").tableHTMLExport({ type: "csv", filename: "sample.csv" });
  });
  $("#dwnPDF").on("click", function () {
    $("#table").tableHTMLExport({ type: "pdf", filename: "sample.pdf" });
  });
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
