"use strict";

jQuery(document).ready(function () {
    jQuery.ajax({
        type: "get",
        url: "templates.html",
        dataType: "html"
    }).done(function (result) {
        var $templatesContainer = jQuery("<div>" + result + "</div>");
        flashcardsTemplates.login = $templatesContainer.find("#login-template").html();
        var sessionID = Cookies.get("sessionid");
        if (sessionID) {
            flashcardsApp.showMenu();
        } else {
            flashcardsApp.showLogin();
        }
    });
});

window.flashcardsApp = {
    showLogin: function showLogin() {
        var html = Mustache.render(flashcardsTemplates.login, {});
        jQuery("#main-view-container").html(html);
        jQuery("#main-view-container button").click(function (e) {
            e.preventDefault();
            var email = jQuery("#login-email").val();
            var phone = jQuery("#login-phone").val();

            function loginCompleted(err, result) {
                console.log("loginCompleted");
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    console.log(result);
                }
            }

            if (email) {
                flashcardsServices.execute("user", "loginEmail", { email: email }, loginCompleted);
            } else if (phone) {
                flashcardsServices.execute("user", "loginPhone", { phone: phone }, loginCompleted);
            }
        });
    },

    showMenu: function showMenu() {}
};

/*'
Create a cookie, valid across the entire site:

Cookies.set('name', 'value');
Create a cookie that expires 7 days from now, valid across the entire site:

Cookies.set('name', 'value', { expires: 7 });
Create an expiring cookie, valid to the path of the current page:

Cookies.set('name', 'value', { expires: 7, path: '' });
Read cookie:

Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined
Read all visible cookies:

Cookies.get(); // => { name: 'value' }
Delete cookie:

Cookies.remove('name');
Delete a cookie valid to the path of the current page:

Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // fail!
Cookies.remove('name', { path: '' }); // removed!
*/