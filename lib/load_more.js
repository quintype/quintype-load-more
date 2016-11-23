var _ = require("lodash");

var $ = require("jquery");

function getStoriesFromResponse(api, response) {
  if (api.indexOf('/api/v1/search?')!=-1){ //check for search api
    return response.results.stories;
  }
  else{
    return response.stories;
  }
}

function removeRepeatStories(stories, storyIds) {
  return _.filter(stories, function(story) {
    return !_.includes(storyIds, story.id);
  })
}

function quintypeLoadMore(container, params, offset, api, storyTemplate, storyIds) {
  var loadedStoryIds = _.clone(storyIds);
  var loadButton = container.find('.load-more-button');

  params = _.extend({limit: 20}, params);
  loadButton.click(function() {
    container.addClass("load-more-loading");
    $.get(api, _.extend(params,{offset: offset}), function(response){
      var stories = getStoriesFromResponse(api, response);

      if(stories.length == 0) {
        container.addClass("load-more-nomoreresults");
      }
      else {
        var storiesToShow = removeRepeatStories(stories, loadedStoryIds);
        loadedStoryIds = loadedStoryIds.concat(_.map(storiesToShow, "id"));
        offset = offset + params.limit;
        container.find(".load-more-results").append(storyTemplate.render({stories: storiesToShow}));
        container.removeClass("load-more-loading");

        if(stories.length != 0 && storiesToShow.length < 1){
          loadButton.trigger("click")
        }
      }
    });
  });
}

$.prototype.quintypeLoadMore = function(storyTemplate, opts) {
  opts = opts || {};
  quintypeLoadMore(this, opts.apiParams || {}, opts.offset || 0, opts.api || "/api/v1/stories", storyTemplate, opts.storyIds || []);
}
