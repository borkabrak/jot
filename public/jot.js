function notify(message){
    $("#notify").html(message).css("display", "block");
};

function load(url, container){
    // GET a url and show the result in an element
    $.ajax(url, {
        success: function(response){
            $(container).html(response);
        }
    });
}

$(function(){
    // Attach UI events
    $(document).on('submit',"form#create", function(event){
        $.ajax("/", {
            method: "put",
            data: {
                body: $(event.target.body).val()
            },

            success: function(response, statustext, xhr){
                notify(response);
                load("/list", "#main");
            },

            error: function(xhr, statustext, error){
                notify(error);
            }
        });
        return false;
    });

    // Load page components
    load("/list", "#main");
    load("/menu", "#menu");

});
