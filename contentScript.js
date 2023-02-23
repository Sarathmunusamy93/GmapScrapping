//content script
var clickedEl = null;

document.addEventListener(
  "contextmenu",
  function (event) {
    clickedEl = event.target;
  },
  true
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request == "getAllResultItems") {
    var itemContainer = $('div [jscontroller="AtSb"]');

    var totalDetailsList = [];

    for (let index = 0; index < itemContainer.length; index++) {
      var siteDetails = {
        name: "",
        Category: "",
        ratting: "",
        rattedCount: "",
        Address: "",
        otherinfo: "",
      };

      const currentContainer = itemContainer[index];

      siteDetails.name = $(currentContainer).find(".dbg0pd span")
        ? $(currentContainer).find(".dbg0pd span").html()
        : "";

      siteDetails.ratting = $(currentContainer).find(
        ".Y0A0hc > .yi40Hd.YrbPuc"
      )[0]
        ? $(currentContainer).find(".Y0A0hc > .yi40Hd.YrbPuc")[0].innerHTML
        : "";

      siteDetails.rattedCount = $(currentContainer).find(
        ".Y0A0hc > .RDApEe.YrbPuc"
      )[0]
        ? $(currentContainer).find(".Y0A0hc > .RDApEe.YrbPuc")[0].innerHTML
        : "";
      siteDetails.Address = $(currentContainer).find(
        ".rllt__details div:eq(2)"
      )[0]
        ? $(currentContainer).find(".rllt__details div:eq(2)")[0].innerHTML
        : "";

      siteDetails.Category = getSecondPart(
        fetchHTMLfromTarget(
          $(currentContainer).find(".rllt__details div:eq(1)")
        ),
        ". "
      );

      siteDetails.otherinfo = fetchHTMLfromTarget(
        $(currentContainer).find(".rllt__details div:eq(3)")
      );

      totalDetailsList.push(siteDetails);
    }

    if (totalDetailsList.length > 0) {
      sendResponse({ totalDetailsList });
    }
  }

  function fetchHTMLfromTarget(element) {
    var $clone = $(element).clone();

    // Remove all the children (leaves text nodes)
    $clone.children().remove();

    return $clone.text();
  }

  function getSecondPart(str) {
    var PREFIX = ".";
    return  str.substr(str.indexOf('·')+2, str.length);// str.substr(3); // str.substr(str.lastIndexOf(PREFIX) + PREFIX.length);
  }
});
