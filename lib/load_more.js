var _ = require("lodash");

function quintypeLoadMore (container, params, offset,api,storyTemplate) {
  var api ,moreStoriesTemplate ,stories;
  var api_search='/api/v1/search?';
  moreStoriesTemplate = require("./templates");
  moreStoriesTemplate=moreStoriesTemplate[storyTemplate];
  var loadButton= container.find('.load-more-button');
  var loadImage = container.find('.load-image');
  params = _.extend({limit: 20}, params);
  container.find(".load-more-button").click(function() {
    loadImage.show();
    $.get(api, _.extend(params, {offset: offset}), function(response){
      if (api.indexOf(api_search) !=-1){ //check for search api
        stories=response.results.stories;
      }
      else {
        stories = response.stories;
        }
      if(stories.length > 0) {
        offset = offset + params.limit;
        container.find(".load-more-results").append(moreStoriesTemplate.render({stories: stories}));
      }
      else{
        loadButton.hide();
      }
      loadImage.hide();
    });
  });
}

$('#load-more-form').submit(function(e) {
  e.preventDefault();
  quintypeLoadMore($(this));
});

console.log("here");

module.exports = quintypeLoadMore;
