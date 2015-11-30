$(document).ready(function(){
  $('body').on('click', 'button', function(){
    var term = $('#keyword').val().toLowerCase().split(' ').join('_');
    displayImg(term);
  });

  function displayImg(phrase){
    var url = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags="+phrase+"&jsoncallback=?"
    $.getJSON(url, function(response){
        $area = $('#feed');
        $area.empty();
        var imgEl = translateFlickrImg(response);
        $area.append(imgEl);
        console.log(response, url, imgEl);
    });
  }

  function translateFlickrImg(json){
    var farm_id = json.photos.photo[0].farm;
    var server_id = json.photos.photo[0].server;
    var id = json.photos.photo[0].id;
    var secret = json.photos.photo[0].secret;
    return '<img src="https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+id+'_'+secret+'_c.jpg">';
  }
    
});

/*

API url: 

https://www.flickr.com/services/api/request.rest.html

AJAX request URLwith tags=cat (search term = cat):

https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=cat&jsoncallback=?

JSON Snippet:

jsonFlickrApi({
    "photos": {
        "page": 1,
        "pages": 46641,
        "perpage": 100,
        "total": "4664056",
        "photo": [
            {
                "id": "7790251192",
                "owner": "80992738@N00",
                "secret": "50b0af1b38",
                "server": "8440",
                "farm": 9,
                "title": "Friends",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },

info about creating photo url from json data: http://www.flickr.com/services/api/misc.urls.html

http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

Example Test:

http://farm9.staticflickr.com/8440/7790251192_50b0af1b38.jpg

*/
