function notify(message){
    load("/notify", "#notify", { message: message });
};

// GET a url and show the result in an element
function load(url, container, data){

    // default container element is the main display
    if (typeof container == "undefined") { container = "#display" };

    $.ajax(url, {
        success: function(response){
            $(container).html(response);
        },
        data: (typeof data === "undefined" ? undefined : data)
    });
};

// Perform an AJAX call with standardized handlers
function call(params){
    if( typeof params.success === "undefined") {
        params.success = function(response, statustext, xhr){
            $("#notify").html(response);
        };
    }
    $.ajax(params);
    load('/list');
};

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
                load("/list", "#display");
            },

            error: function(xhr, statustext, error){
                notify(error);
            }
        });
        return false;
    });

    // Load page components
    load("/list");
    load("/create", "#control");

});
