function notify(message){
    $("#notify").html(message).css("display", "block");
};

$(function(){
    // Attach UI events
    $("form#create").on('submit', function(event){
        $.ajax("/", {
            method: "put",
            data: {
                body: $(event.target.body).val()
            },

            success: function(response, statustext, xhr){
                notify(response);
            },

            error: function(xhr, statustext, error){
                notify(error);
            }
        });
        return false;
    });
});
