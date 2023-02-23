var homePageURL = "",
  totalScrapResult;

chrome.contextMenus.create({
  id: "doScrap",
  title: "Gmap Scrap",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "getAllImages") {
    console.log("Get Images");
  } else if (info.menuItemId == "getSameLikeElements") {
  } else if (info.menuItemId == "getAllResultItems") {
    homePageURL = info.pageUrl;
    chrome.tabs.sendMessage(
      tab.id,
      "getAllResultItems",
      { frameId: info.frameId },
      (data) => {
       
       totalScrapResult = data;
         chrome.tabs.create({ url: "popup.html" });
      }
    );
  }
});

// chrome.contextMenus.create({
//   title: "Get All Images",
//   id: "getAllImages",
//   parentId: "doScrap",
//   contexts: ["all"],
// });

chrome.contextMenus.create({
  title: "Fetch same like element",
  parentId: "doScrap",
  contexts: ["selection"],
  id: "getSameLikeElements",
});

chrome.contextMenus.create({
  title: "Get All Results",
  parentId: "doScrap",
  contexts: ["all"],
  id: "getAllResultItems",
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "scrapResult") {
    //chrome.tabs.sendMessage(sender.tab.id, { result: request.options.result });
    chrome.tabs.create({ url: "popup.html" });
  }
  if (request.type == "getScrapResult") {
    sendResponse(totalScrapResult);
  }
});
