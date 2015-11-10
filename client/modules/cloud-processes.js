

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
        $.ajax({
            url: "cloud/deleteAlerts",
            type: "DELETE"

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
            url:"http://emergencyservicecloud.herokuapp.com/cloud/event",
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
            }
        }).done(function(){
            console.log("saved");
        });

        $.ajax({
            url:"http://communitycloud.herokuapp.com/cloud/receiveEvent",
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
            }
        }).done(function(){
            console.log("SENT! To Community");
            location.reload();

        });


    });

    $(".close").click(function() {
        var userId = $("#userID").html();
        var eventId = $(this).parent().parent().find("#eventId").text();
        $(this).parent().parent().fadeOut();
        $.ajax({
            url:"http://emergencyservicecloud.herokuapp.com/cloud/dismissalert",
            type: "PUT",
            data: {
                id:userId,
                eventId:eventId
            }
        }).done(function(){
            console.log("saved");
        });
    });
