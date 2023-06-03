/** 
 * Author: Gunhee Park
 * Topic: Chrome Extension: Export Tabs
 * Description: This script is part of a Chrome extension that exports URLs of all open tabs in the current window to a .txt text file.
 * When the extension icon is clicked, it gets the current window, gathers URLs from all tabs, and formats these URLs into a string.
 * It then creates a blob from the string, converts the blob to a data URL, and prompts the user to download the file as 'exported-tabs.txt'.
 *
 * Completed: Friday, June 2, 2023.
 */

chrome.action.onClicked.addListener((tab) => {
  try {
    chrome.windows.getCurrent({ populate: true }, function (window) {
      let urls = "";
      const numberOfTabs = window.tabs.length;

      for (let i = 0; i < numberOfTabs; i++) {
        const tab = window.tabs[i];
        urls += tab.url;

        // Add two line breaks if it's not the last URL
        if (i !== numberOfTabs - 1) {
          urls += "\n\n";
        }
      }

      const blob = new Blob([urls], { type: 'text/plain' });
      
      // Read blob content and convert it to a data URL
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      
      reader.onloadend = () => {
        const dataUrl = reader.result;
        
        chrome.downloads.download({
          url: dataUrl,
          filename: 'exported-tabs.txt',
          saveAs: true,
        });
      };
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
});