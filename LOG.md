# Debug log

Your notes. One entry per bug you fixed, using the template below.

This file is read as carefully as your code. A correct fix you cannot
explain counts for little; a bug you could not fix but investigated
honestly still counts for something.

Delete the example before you submit.



## Example — delete this

### CC-99 — "The cart total is wrong"

**Reproduced:** Added 2 dosas at Rs. 60 each. The cart showed
Rs. 119.99999 instead of Rs. 130. Happened every time, on any dish with
a price ending in .50.

**Cause:** The total was being added up with plain floating point and
never rounded, so 0.1 + 0.2 style errors showed up on screen. The
rounding helper existed but this one place was not using it.

**Fix:** Ran the total through the existing rounding helper instead of
adding a new one, so every price on screen goes through the same path.

**Checked:** Cart, checkout and the order screen all show Rs. 130 now.
Prices without decimals still show without a trailing .00.

**Time:** about 40 minutes, most of it working out that the cart and the
order screen round in different places.



## CC-0X — "<the complaint, in short>"

**Reproduced:**

**Cause:**

**Fix:**

**Checked:**

**Time:**



## Could not fix

For anything you investigated but did not solve. Say what you tried and
where you got to. This is worth marks — leaving it blank when you got
stuck is not.

### CC-0X — "<the complaint>"

**What I tried:**

**Where I got to:**

**What I would try next:**



## Extra credit

Anything not on the bug log: a problem you found yourself, a test you
wrote, or a fix you are unsure about. Same format, plus one line on how
you noticed it.


### CC-01 : "The search suggestions are behind everything"

**Reproduced:** Searched "ra" in the search bar, the options did show up but some middle options were hidden behind the section where categories were listed(breakfast, lunch, chinese, snacks etc.). Clicking on the options (that were visible), did allow me to add them to cart though.

**Cause:** The `.suggest-box` had a high z-index (100), but it was inside `.search-wrap` that was its parent div, which had a lower stacking level (1) than `.cat-tabs` (40). Therefore, increasing the `.suggest-box` z-index alone could not place it above the category bar.

**Fix:** Increased the z-index of `.search-wrap` so that the search section stays above the category bar and the suggestions can appear clearly & properly on top.

**Checked:** Refreshed the page and searched "ra" again. The suggestions that were hidden were now properly visible above the category bar, and I was able to click different suggestions like Bread Pakora and Aloo Paratha, like before. 

**Time:** about 30 minutes, including reproducing the issue, inspecting the CSS, testing the stacking order in DevTools, and then finally applying the fix.



### CC-02: "Can't read anything in dark mode"

**Reproduced:** Opened the site in dark mode. The dish names and prices were almost invisible because the text was staying dark, while light mode looked normal. also to mention that the site automatically opened in dark mode(maybe due to system settings idk)

**Cause:** `.dish-body` had a hard-coded `color: #2b2118`. The dish name inherits its color from `.dish-body`, so this was overriding the color provided by the dark-mode theme.

**Fix:** Removed the hard-coded color from `.dish-body` so the text can inherit the theme's color instead of always using a dark color.

**Checked:** Tested both dark and light mode. The dish names and prices are now readable in both. (though they were already readable in light mode but just to check if light mode got ruined because of fixing the dark mode, but no both work completely fine now)

**Time:** About 30 minutes.



### CC-03: "The menu is wider than my phone"

**Reproduced:** Tested the site at a mobile viewport of 324px wide. The dish cards were wider than the available space, so the right side of the card and the Add to Cart button were getting cut off.

**Cause:** The `.dish-card` grid items were not shrinking enough to fit inside the available grid width on small screens, which caused the card to overflow horizontally.

**Fix:** Allowed `.dish-card` to shrink to the available grid width so that it fits properly on smaller screens.

**Checked:** Tested again at 324px wide and confirmed that the full dish card and Add to Cart button are visible. Also checked a wider viewport to make sure the normal layout still works.

**Time:** About 25 minutes.



### CC-04: "The buttons don't work on my tablet"

**Reproduced:** Tested the site on a tablet. The Add to Cart and star buttons did nothing, even though they worked on other screen sizes.

**Cause:** The tablet CSS had transparent `::after` overlays covering the buttons and blocking clicks.

**Fix:** Added `pointer-events: none` to the `.dish-card::after` and `.img-wrap::after` overlays so clicks can reach the buttons underneath.

**Checked:** Tested both buttons on the tablet and confirmed they work. Also checked the laptop/phone layout.

**Time:** About 50 minutes including understanding the concepts and finding the bugs and then rectifying them.




### CC-05: "The category bar scrolls away on my phone"

**Reproduced:** On a viewport smaller than 480px, scroll down through the menu.
The category/filter bar scrolls away instead of remaining visible.

**Cause:** The mobile `.view` rule used `overflow-x: hidden`.
This created an overflow context that interfered with the sticky positioning
of the `.filters` element.

**Fix:** Changed `overflow-x: hidden` to `overflow-x: clip` for `.view` on mobile.

**Checked:** Tested on the mobile viewport and confirmed that the filter/category bar remains visible while the menu scrolls. Also checked that horizontal overflow remains clipped.

**Time:** About 30 minutes.



