

    $("#deleteEvents").click(function() {
        console.log("Alerts Deleted");
        $.ajax({
            url: "cloud/deleteEvents",
            type: "DELETE"

        }).done(function(){
            console.log("DELETED");
            location.reload();
        });
    });

    $("#deleteAlerts").click(function() {
        console.log("Alerts Deleted");
        var userId = $("#userID").html();
        //$.ajax({
        //    url: "cloud/deleteAlerts",
        //    type: "DELETE"
        //
        //}).done(function(){
        //    console.log("DELETED");
        //    location.reload();
        //});
        console.log(userId);
        $.ajax({
            url: "cloud/dismissallalerts",
            type: "PUT",
            data:{id:userId}

        }).done(function(){
            console.log("DELETED");
            location.reload();
        });

    });

    $("#sendEvent").click(function(){
        //console.log("Event Sent");
        var AlertType = $("#alertType").val();
        var detail = $("#alertDetails").val();
        var userlocation = $("#location").val();
        var address =  $("#address").val();
        var city  =  $("#city").val();
        var state =  $("#state").val();
        var rating = $("#alertRating").val();
        var userId = $("#userID").html();
        var userName = $("#username").html();
        console.log(userName);

        $.ajax({
            url:"https://emergencyservicecloud.herokuapp.com/cloud/event",
            type: "POST",
            data: {
                alertType: AlertType,
                details: detail,
                address: address,
                city: city,
                state: state,
                rating: rating,
                createdBy: userName,
                createdId: userId
            },
            statusCode: {
                    0: function() {
                        //Success message
                        console.log("sent")
                    },
                    200: function() {
                        //Success Message
                        console.log("sent")
                    }
                },
                xhrFields: {
                    withCredentials: true
                }
        }).done(function(){
            console.log("saved");
        });

        $.ajax({
            url:"https://communitycloud.herokuapp.com/cloud/receiveEvent",
            type: "POST",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: {
                alertType: AlertType,
                details: detail,
                address: address,
                city: city,
                state: state,
                rating: rating,
                createdBy: userName,
                createdId: userId
            },
            statusCode: {
                    0: function() {
                        //Success message
                        console.log("sent")
                    },
                    200: function() {
                        //Success Message
                        console.log("sent")
                    }
                },
                xhrFields: {
                    withCredentials: true
                }
        }).done(function(){
            console.log("SENT! To Community");
           // location.reload();

        });

        location.reload();
    });

    $(".close").click(function() {
        var userId = $("#userID").html();
        var eventId = $(this).parent().parent().find("#eventId").text();
        $(this).parent().parent().fadeOut();
        $.ajax({
            url:"https://emergencyservicecloud.herokuapp.com/cloud/dismissalert",
            type: "PUT",
            data: {
                id:userId,
                eventId:eventId
            }
        }).done(function(){
            console.log("saved");
        });
    });
