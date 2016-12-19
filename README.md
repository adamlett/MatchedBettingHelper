# Matched Betting Helper
A chrome extension that provides a quick matched betting calculator.

## Features:
* Quick matched betting calculator access from icon
* Always-on-top bet calculator popup (with MatchedBetOnTop.exe helper)
* Provide bet details as notifications so that they're easily viewable
  * Useful for:
    * Comparing different odd choices
    * Information available while placing bet
* Display bet extraction percentage
* Set back and lay odds by right clicking on elements (incomplete feature)
 * Confirmed working:
   * Smarkets
    * bet365
    * Ladbrokes
    * Coral
 * Not working:
    * SkyBet
 * Everything else untested

 ## Installation
 1. Navigate to [chrome://extensions](chrome://extensions) or open Extensions page
 2. Enable Developer mode
 3. Drag and drop [MatchedBettingHelper.crx](https://github.com/adamlett/MatchedBettingHelper/raw/master/MatchedBettingHelper.crx) onto the chrome://extensions page
 4. (Optional but recommended) Download the helper program (makes the popup window always stay on top)
   1. Download [MatchedBetOnTop.exe](https://github.com/adamlett/MatchedBettingHelper/raw/master/MatchedBetOnTop.exe)
   2. To use, just run MatchedBetOnTop.exe
     * To start program automatically with Windows:
       1. Go to your Start-up folder, type "shell:startup" into Windows Explorer address bar to get there
       2. Add MatchedBetOnTop.exe (or a shortcut to it) to your startup folder. The program will now run automatically at each boot

 ## Usage
  * (Optional) For always-on-top feature, run MatchedBetOnTop.exe
  * Click icon to activate calculator
  * Input bet information, caclulation takes place automatically
  * Click "Notify" to get the bet details as a notification
  * Click "Popup" to make a calculator window
  * Right-click on the odds you want to set and select "Matched Betting Helper" from context menu
