function notify(message){
    load("/notify", "#notify", { message: message });
};

function load(url, container, data){
    // GET a url and show the result in an element
    $.ajax(url, {
        success: function(response){
            $(container).html(response);
        },
        data: (typeof data === "undefined" ? undefined : data)
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
                load("/list", "#display");
            },

            error: function(xhr, statustext, error){
                notify(error);
            }
        });
        return false;
    });

    // Load page components
    load("/list", "#display");
    load("/create", "#control");

});
