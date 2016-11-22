var _ = require("lodash");

var quintypeLoadMore = function(container, params, offset, api, storyTemplate, storyIds) {
var loadedStoryIds = JSON.parse(storyIds.replace(/&quot;/g,'"'));
console.log(loadedStoryIds);
var moreStoriesTemplate ,stories;
var api_search='/api/v1/search?';
moreStoriesTemplate = require("./templates");
moreStoriesTemplate = moreStoriesTemplate[storyTemplate];
var loadButton = container.find('.load-more-button');
var loadImage  = container.find('.load-image');
params = _.extend({limit: 20}, params);
container.find(".load-more-button").click(function() {
  loadImage.show();
  $.get(api, _.extend(params,{offset: offset}), function(response){
    if (api.indexOf(api_search)!=-1){ //check for search api
      stories=response.results.stories;
     }
    else{
      stories = response.stories;
     }

  if(stories.length > 0) {
    var storiesToShow = _.filter(stories, function(story) {
    return !_.includes(loadedStoryIds, story.id);
    })
    loadedStoryIds = loadedStoryIds.concat(_.map(storiesToShow, "id"));
    offset = offset + params.limit;
    if(stories.length != 0 && storiesToShow.length < 1){
      container.find(".load-more-button").trigger("click")
    }
    container.find(".load-more-results").append(moreStoriesTemplate.render({stories: storiesToShow}));
    }
    else {
      loadButton.hide();
    }
      loadImage.hide();
    });
  });
 }

module.exports = quintypeLoadMore;
