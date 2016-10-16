$(function(){
    var api = {
        url: 'https://query.yahooapis.com/v1',
        publicWeather: `/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    };

    var $weatherForcast = $('#weatherForcast');
    var $forcast_image = $weatherForcast.children('.forcast_image');
    var $current_forcast = $weatherForcast.find('.forcast .current_forcast');
    var $future_forcast = $weatherForcast.find('.forcast .future_forcast');
    
    if (!$weatherForcast) {
        return;
    }
    requestForcast(api, (response) => {  
        if (response.error) {
            $('.loading_status').text(response.error);
        } else if (response.data) {
            var channel = response.data.channel;
            
            $forcast_image.attr('href', channel.image.link)
                        .children('img')
                        .attr({
                            'src': channel.image.url,
                            'width': channel.image.width,
                            'height': channel.image.height
                        });
  
            $current_forcast.children('.date').text(channel.item.condition.date)
            $current_forcast.children('.condition_temp').text(channel.item.condition.temp)
            $current_forcast.children('.condition_text').text(channel.item.condition.text);
            
            var $eachForcast = $future_forcast.children('.table');

            channel.item.forecast.forEach((thisDay, index) => {
                var cell = `<div class="cell">
                                <span class="date">` + thisDay.date + `</span>
                                <span class="day">` + thisDay.day + `</span>
                                <span class="high">` + thisDay.high + `&nbsp;\/&nbsp;` + thisDay.low +`</span>
                                <span class="text">` + thisDay.text + `</span>
                            </div>`;
                       
                $eachForcast.append($(cell));
            });
            
            $('.loading_status').text('Yeah data loaded');
            $weatherForcast.css('display', 'block')
        }
        
        //this will be used to show loading status
        if (response.data === undefined) {
            $('.loading_status').text(response);
        }
    });
    
    /**
    * @param: api
    * @param: callback
    */
    function requestForcast(api, callback) {
        var requestUrl = api.url + api.publicWeather;
        var response = {
            error: undefined,
            data: undefined
        };
        
        callback('Forcast loading...'); 
        
        $.get(requestUrl, (data) => {
            if (data) {
                response.data = data.query.results
                return callback(response);
            }
        })
        .done(() => {
            console.log('done');
        })
        .fail(() => {
            response.error = 'failed to load forcast';
            return callback(response);
        });
    }
});