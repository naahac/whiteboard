/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=03302260cf80ddc31e5a5d3f9d8ea0e5">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
*/


var onAuthorize;
onAuthorize = function () {
    updateLoggedIn();
    $("#output").empty();
    var token = Trello.token();
    window.location.replace("/team?token=" + token);

    Trello.members.get("me", function (member) {
        $("#fullName").text(member.fullName);



        // SetTeamId(1,2);
       //alert(getTeamID());

        var $teams = $("<div>")
            .attr({/*onsubmit:'return CheckComplete()'*/ method:"post" })
            .text("loading teams")
            .appendTo("#outputTeams");

        var $members = $("<div>")
            .attr({/*onsubmit:'return CheckComplete()'*/ method:"post" })
            .text("loading members")
            .appendTo("#outputMembers");

        var $boards = $("<div>")
            .attr("id", "boards") /* we'll use this later */
            .text("Loading Boards...")
            .appendTo("#outputBoards");


        var $lists = $("<div>")
            .text("Loading Boards...");
          //  .appendTo("#outputLists");

        var $cards = $("<div>")
            .text("Loading Boards...")
            .appendTo("#outputCards");

        var $trenutniTeam="";

        var $trenutni = $("<div>")
            .text("trenutni board...")
            .appendTo("#outputTrenutni");


        //------------------------------------   TEAMS (projekti)   ---------------------------------------//
        //-------------------------------------------------------------------------------------------------//

        $(document).ready(function(){
            $("#teamForm").click(function(){
                alert("Submitted");
            });
        });




        Trello.get("members/me/organizations", function (teams) {
            $teams.empty();

            $.each(teams, function (ix, team) {
                //$teams.attr({action: "", id: "teamForm"});
                $("</br>")
                    .appendTo($teams);
                $("<form>")
                    .attr({"id":team.id})
                    .appendTo($teams);
                //$("<form>")
                  //  .attr({action:setTeamId(team.id, team.name)})
                  //  .appendTo($teams);
                $("<a>")
                  //  .attr({href: "/team",value: team.id})
                    .addClass("team")
                    .text(team.name)
                    .appendTo("#"+team.id);

                $("<button>")
                    .attr({type:"button", id:"teamForm", name:"teamForm", onClick:"location.href='/team?id="+team.id+"'"})
                    .text("submit")
                    .appendTo("#"+team.id);

                $("</br>")
                    .appendTo("#"+team.id);

            });


        });






        // Output a list of all of the boards that the member
        // is assigned to based on what they choose in select dropdown

        //teams


   /*     $('#boards').on("change", function () {

            //listi

            /*
             https://api.trello.com/1/
             boards/57fb57bae72552b760c1028a/lists?cards=open&card_fields=name&fields=name&key=03302260cf80ddc31e5a5d3f9d8ea0e5&token=4206467f056cb6a4a0a17e79e649e49c013266b098297b6ec3a919f728299479

             */

    /*        var res = "boards/" + $("#boards").val() + "/lists?cards=open&card_fields=name&fields=name";
            // alert(res);
            Trello.get(res, function (boards) {
                $lists.empty();
                $.each(boards, function (ix, list) {
                    $("<a>")
                        .attr({href: list.url, target: "trello"})
                        .addClass("list")
                        .text(list.name + " ")
                        .appendTo($lists);
                });
            });

            //karte
            var resource = "boards/" + $('#boards').val() + "/cards";
            //alert(resource);
            Trello.get(resource, function (cards) {
                $cards.empty();
                $.each(cards, function (ix, card) {
                    $("<a>")
                        .attr({href: card.url, target: "trello"})
                        .addClass("card")
                        .text(card.name + ", " + card.idShort)
                        .appendTo($cards);
                });
            });
        }); */


        //trenutno izbrana tabela(potrjena v bazi)

      /*  var trenutni_board = "57fb57ac2b4ee3c613f68f2c";
      // var foo = getParameterByName('foo');
        Trello.get("boards/" + trenutni_board + "/cards", function (cards) {
            $cards.empty();
            $.each(cards, function (ix, card) {
                $("<option>")
                    .attr({href: card.url, target: "trello"})
                    .addClass("card")
                    .text(card.name)
                    .appendTo($trenutni);
            });
        });
*/

        //------------------------       Projekt (TEAMS, boards, teammembers)   -------------------------------//
        //-----------------------------------------------------------------------------------------------------//

        /* https://api.trello.com/1/organizations/exampleorg/boards?key=[application_key]&token=[optional_auth_token] */


   /*     $(document).ready(function(){

            alert("hoho");
            //----------------------     BOARDS  ----------------------//
            // Output a list of all of the boards that the member
            // is assigned to
            var id = req.query.id;
            Trello.get("organizations/"+id+"/boards", function (boards) {
                $boards.empty();
                $.each(boards, function (ix, board) {
                    $("<option>")
                        .attr({href: board.url, target: "trello", value: board.id})
                        .addClass("board")
                        .text(board.name)
                        .appendTo($boards);
                });
            });
        });


*/



        if (getParameterByName('id')!=null) {

            //------- boards -----/
            Trello.get("organizations/"+getParameterByName('id')+"/boards", function (boards) {
                $boards.empty();
                $.each(boards, function (ix, board) {
                    $("<div>")
                        .attr({href: board.url, target: "trello", value: board.id, id: board.id})
                        .addClass("board")
                        .text(board.name)
                        .appendTo($boards);




                    Trello.get("boards/"+board.id+"/lists", function (lists) {
                        $lists.empty();
                        $.each(lists, function (ix, list) {
                            $("<a>")
                                .attr({href: list.id, target: "trello", value: list.id, id:list.id})
                                .addClass("list")
                                .text(list.name)
                                .appendTo("#"+board.id);



                            Trello.get("lists/"+list.id+"?fields=name&cards=open&card_fields=name", function (cards) {
                                $lists.empty();
                                $.each(cards.cards, function (ix, card) {
                                    $("<a>")
                                        .attr({href: card.id, target: "trello", value: card.id})
                                        .addClass("card")
                                        .text(card.name)
                                        .appendTo("#"+list.id);




                                });
                            });









                        });
                    });



                    $("</br>")
                        .appendTo($boards);



                });
            });



        };


        if (getParameterByName('id')!=null) {

            // ----------- members-----------//


            Trello.get("organizations/"+getParameterByName('id')+"?members=all&member_fields=username,fullName", function (organizations) {
                //?members=all&member_fields=username,fullName&fields=name
                $boards.empty();
                $.each(organizations.members, function (ix, member) {



                            $("<a>")
                                .attr({href: member.id, target: "trello", value: member.username})
                                .addClass("member")
                                .text(member.username)
                                .appendTo($members);


                });
            });




            //https://api.trello.com/1/boards/4eea4ffc91e31d1746000046?
            // lists=open&list_fields=name&fields=name,desc&key=[application_key]&token=[optional_auth_token]



        };








    });

};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);        
};
    
var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};
                          
Trello.authorize({
    interactive:false,
    success: onAuthorize
});

$("#connectLink")
.click(function(){
    Trello.authorize({
        type: "popup",
        success: onAuthorize
    })
});
    
$("#disconnect").click(logout);



function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

