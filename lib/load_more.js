var _ = require("lodash");

function getStoriesFromResponse(api, response) {
  if (api.indexOf("/api/v1/search")!=-1){
    return response.results.stories;
  }
  else{
    return response.stories;
  }
}

var quintypeLoadMore = function(container, params, offset, api, storiesTemplate, storyIds) {
  var $ = require("jquery");
  var loadedStoryIds = JSON.parse(storyIds.replace(/&quot;/g,'"'));
  var loadButton = container.find('.load-more-button');
  params = _.extend({limit: 20}, params);

  container.find(".load-more-button").click(function() {
    container.addClass("load-more-loading");

    $.get(api, _.extend(params,{offset: offset}), function(response){
      var stories = getStoriesFromResponse(api, response);

      if(stories.length == 0) {
        container.addClass("load-more-done");
      } else {
        var storiesToShow = _.filter(stories, function(story) {
          return !_.includes(loadedStoryIds, story.id);
        })
        loadedStoryIds = loadedStoryIds.concat(_.map(storiesToShow, "id"));
        offset = offset + params.limit;
        container.find(".load-more-results").append(storiesTemplate.render({stories: storiesToShow}));
      }

      container.removeClass("load-more-loading");
    });
  });
}

module.exports = quintypeLoadMore;
