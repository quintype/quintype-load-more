Quintype Load More Functionality for frontend apps

We are using the Libraries lodash and jquery

Creating private functions to make the code simpler and clean:
1) getStoriesFromResponse: Checking which API we are using api/v1/stories or api/v1/search and according to that returning stories array.
2) removeRepeatStories: This function will check for the story-id if it is already there then it will remove that story from the array 'stories'.

The Main quintypeLoadMore has two arguments storyTemplate and opts:
1. storyTemplate:
2. opts is an object
   opts.params:- The value of limit for the next coming stories after clicking on load-more.
   opts.offset:- This is the offset value.  
   opts.api:- By default the value of api is api/v1/stories.
   opts.storyIds:- Array having Ids Of first page loaded stories. Eventually we are copying whatever inside the story into a variable loadedStoryIds.

If the length of array stories is equal to 0 then add the class 'load-more-nomoreresults' to hide the load more button.

Else it will call the function removeRepeatStories. This function will remove all the repeated stories from the array 'stories'.
After the function call all the required stories are now inside the variable 'storiesToShow'.
After that by using map function now concatenate the all the new stories-ids to variable loadedStoryIds.
Now Append the variable storiesToShow with the current stories.
