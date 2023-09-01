async function clickButtonAndWaitForReady() {
  // Click the initial button
  document.evaluate("/html/body/div[6]/div/div[2]/div/div/div[5]/div/button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

  // Ask the user to input the URL
  const url = prompt("Please enter the URL:");

  // Check if the user provided a valid URL
  if (url) {
      // Wait for 3 seconds (3000 milliseconds)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Locate and focus on the search box
      const searchBox = document.evaluate("/html/body/div[10]/div/form/div/input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      searchBox.focus();

      // Fill in text in the search box using the provided URL
      searchBox.value = url;

      // Wait for the element to load
      const buttonToClick = document.evaluate("/html/body/div[10]/div/form/div/div/button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const buttonToTry = document.evaluate("/html/body/div[10]/div/div/div[1]/div/form/button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
      // Check if the button is loaded and then click it
      if (buttonToClick) {
          buttonToClick.click();
      } else {
          console.error("Button not found.");
      }

      // Continue in a loop until the countdown text contains "READY" or an error message
      while (true) {
          // Wait for a brief moment (adjust the duration as needed)
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Extract and check the countdown text
          const countdownElement = document.evaluate("/html/body/div[10]/div/div/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          if (countdownElement) {
              const countdownText = countdownElement.textContent;
              console.log("Countdown:", countdownText);

              if (countdownText.includes("READY")) {
                  console.log("READY detected. Continuing...");
                  break; // Exit the loop
              } else if (countdownText.includes("An error occurred. Please try again.")) {
                  console.log("Error message detected. Clicking the button to retry...");
                  buttonToTry.click(); // Click the button to retry
              }
          } else {
              console.error("Countdown element not found.");
              break; // Exit the loop in case of an error
          }
      }

      // Repeat the process
      clickButtonAndWaitForReady();
  } else {
      console.error("Invalid URL or no URL provided.");
  }
}

// Start the script
clickButtonAndWaitForReady();
