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