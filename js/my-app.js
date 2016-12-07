// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    swipeBackPage: false,
    swipeBackPageThreshold: 1,
    swipePanel: "left",
    swipePanelCloseOpposite: true,
    pushState: true,
    pushStateRoot: undefined,
    pushStateNoAnimation: false,
    pushStateSeparator: '#!/',
    template7Pages: true
});

// Export selectors engine
var $$ = Dom7;
// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false
});


$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

$$(document).on('pageInit', function (e) {

    $(".swipebox").swipebox();
    $("#ContactForm").validate({
        submitHandler: function (form) {
            ajaxContact(form);
            return false;
        }
    });

    $("#RegisterForm").validate();
    $("#LoginForm").validate();
    $("#ForgotForm").validate();

    $('a.backbutton').click(function () {
        parent.history.back();
        return false;
    });


    $(".posts li").hide();
    size_li = $(".posts li").size();
    x = 4;
    $('.posts li:lt(' + x + ')').show();
    $('#loadMore').click(function () {
        x = (x + 1 <= size_li) ? x + 1 : size_li;
        $('.posts li:lt(' + x + ')').show();
        if (x == size_li) {
            $('#loadMore').hide();
            $('#showLess').show();
        }
    });


    $("a.switcher").bind("click", function (e) {
        e.preventDefault();

        var theid = $(this).attr("id");
        var theproducts = $("ul#photoslist");
        var classNames = $(this).attr('class').split(' ');


        if ($(this).hasClass("active")) {
            // if currently clicked button has the active class
            // then we do nothing!
            return false;
        } else {
            // otherwise we are clicking on the inactive button
            // and in the process of switching views!

            if (theid == "view13") {
                $(this).addClass("active");
                $("#view11").removeClass("active");
                $("#view11").children("img").attr("src", "images/switch_11.png");

                $("#view12").removeClass("active");
                $("#view12").children("img").attr("src", "images/switch_12.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_13_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_11");
                theproducts.removeClass("photo_gallery_12");
                theproducts.addClass("photo_gallery_13");

            }

            else if (theid == "view12") {
                $(this).addClass("active");
                $("#view11").removeClass("active");
                $("#view11").children("img").attr("src", "images/switch_11.png");

                $("#view13").removeClass("active");
                $("#view13").children("img").attr("src", "images/switch_13.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_12_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_11");
                theproducts.removeClass("photo_gallery_13");
                theproducts.addClass("photo_gallery_12");

            }
            else if (theid == "view11") {
                $("#view12").removeClass("active");
                $("#view12").children("img").attr("src", "images/switch_12.png");

                $("#view13").removeClass("active");
                $("#view13").children("img").attr("src", "images/switch_13.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_11_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_12");
                theproducts.removeClass("photo_gallery_13");
                theproducts.addClass("photo_gallery_11");

            }

        }

    });


})

myApp.onPageInit('autocomplete', function (page) {
    var fruits = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');
    var autocompleteDropdownSimple = myApp.autocomplete({
        input: '#autocomplete-dropdown',
        openIn: 'dropdown',
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            // Find matched items
            for (var i = 0; i < fruits.length; i++) {
                if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
        }
    });
});

var app = angular.module('laApp', []);
/*app.run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
        // Check for network connection
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                    title: 'No Internet Connection',
                    content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                })
                .then(function(result) {
                     if(!result) {
                        ionic.Platform.exitApp();
                     }
                });
            }
        }
    });
})*/


app.controller('loginCtrl', function($scope, $location,$http) {


    //$scope.myUrl = $location.absUrl();

    /*
    * webservice path
    * */

    var path = "http://icaninfotech.co.in/loyala/";

    /* user current location*/

    /* Get location start */

    var onSuccess = function(position) {
        localStorage.setItem("cLatitude", position.coords.latitude);
        localStorage.setItem("cLongitude", position.coords.longitude);
    };

    // onError Callback receives a PositionError object
    function onError(error) {
        //alert('code: '+ error.code    + '\n' + 'message: ' + error.message + '\n');
       // myApp.alert('Start your GPS Location','','');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    /* Get location end */

    /* End location */

    $("#RegisterForm").validate();
    $("#LoginForm").validate();
    $("#ForgotForm").validate();


    /*
    *  signin function
    *  narendra
    *  6-12-2016
    *
    * */

    var connectionString = "No network connection";

    $scope.signInData = {};
    $scope.signIn=function () {


       // $$(document).on('ajaxStart', function (e) {
            myApp.showPreloader();
       // });
       // $scope.loaderView = true;
        var userName = $scope.signInData.userName;
        var pass = $scope.signInData.PassWord;

        if(Boolean(userName)==true && Boolean(pass)==true){
            $http({
                method: 'POST',
                url: path+'login.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: {email:userName,password:pass}

            }).success(function (response) {
                console.log(response);


                if(response['success'] == 0){

                    //$scope.wrongEmail = true;
                    $scope.emailValidation  = response['message'];
                   // $scope.loaderView = false;
                   // $$(document).on('ajaxComplete', function () {
                        myApp.hidePreloader();
                        myApp.alert($scope.emailValidation,'','');
                   // });
                }else{

                    //$scope.wrongEmail = false;
                    console.log(response['Result'][0]['id']);
                    window.localStorage['nCustomerId']=response['Result'][0]['id'];
                    window.location.href="main.html";

                    myApp.hidePreloader();
                }

            }).error(function(error){
                myApp.alert(connectionString,'','');
                myApp.hidePreloader();

            });
        }else{
            myApp.hidePreloader();
        }
    }


    /*
    *  signUp function
    *  Narendra
    *  6-12-2016
    * */

    $scope.signUpData = {};
    $scope.signUp = function () {

            var firstName = $scope.signUpData.firstName;
            var lastName = $scope.signUpData.lastName;
            var email = $scope.signUpData.email;
            var password = $scope.signUpData.pass;
            var phoneNumber = $scope.signUpData.phoneNumber;
             myApp.showPreloader();

            if(Boolean(firstName)==true && Boolean(lastName)==true && Boolean(email)==true && Boolean(password)==true && Boolean(phoneNumber)==true){
                $http({
                    method: 'POST',
                    url: path+'register.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data: {email:email,password:password,fname:firstName,lname:lastName,phone:phoneNumber}

                }).success(function (response) {
                    console.log(response);
                    console.log(response['id']);
                    console.log(response['success']);

                    if(response['success'] == 0){

                       // $scope.exitEmail = true;
                        $scope.emailValidation = response['message'];
                        myApp.alert($scope.emailValidation,'','');
                        myApp.hidePreloader();
                        //ionicToast.show(response['message'] ,'middle', false, 2500);
                        //$cordovaToast.show('this is a test', 'long', 'center');
                    }else{
                        //$scope.exitEmail = false;
                        window.localStorage['nCustomerId']=response['id'];
                        window.location.href="main.html";

                        myApp.hidePreloader();
                    }

                }).error(function(error){
                    myApp.alert(connectionString,'','');
                    myApp.hidePreloader();

                });
            }else{

                myApp.hidePreloader();
            }

        }


        /*
        * Forgot password function
        * narendra
        * 6-12-2016
        * */

        $scope.forgot = {};
        $scope.forgotPassword = function(){

            var email = $scope.forgot.email;
            //alert(email);

            if(Boolean(email)==true){
                $http({
                    method: 'POST',
                    url: path+'forgotpassword.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data: {email:email}

                }).success(function (response) {
                    console.log(response);


                    if(response['success'] == 0){

                        $scope.wrongEmail = true;
                        $scope.emailValidation  = response['message'];

                    }else{
                        $scope.wrongEmail = false;
                        $scope.wrongEmail1 = true;
                        $scope.emailValidation1  = response['message'];

                    }

                })
            }


        }



});

app.controller('mainCtrl',function($scope,$location,$http){

    /*
     * webservice path
     * */

    var path = "http://icaninfotech.co.in/loyala/";

    /*
    * Create Post popup
    * Narendra
    * 6-12-2016
    * */

    /*Category List */
    myApp.showPreloader();


    $http({
        method: 'POST',
        url: path+'categorylist.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: {}

    }).success(function (response) {
        console.log(response);
        $scope.categoryList = response['Result'];


            myApp.hidePreloader();

    })
    /* End category list*/


    /* POST list API */
    //myApp.showPreloader();

    $http({
        method: 'POST',
        url: path+'postlists.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: {}

    }).success(function (response) {
        console.log(response);
        $scope.postList = response['Result'];
        myApp.hidePreloader();
    })

    /* End post List */

    var imageApi = 'http://icaninfotech.co.in/loyala/imageApi.php';
    $scope.postData = {};
    $scope.createPost = function () {

        /*  image upload api  */
        myApp.showPreloader();

        if(Boolean(window.localStorage['images']) == true) {

            var orderItemsObj = JSON.parse(window.localStorage['images']);

            for(var itemsLoop = 0; itemsLoop<orderItemsObj.length; itemsLoop++) {

                var imageSource = orderItemsObj[itemsLoop].file;

                var imgFolder = orderItemsObj[itemsLoop].folder;

                var imageName = orderItemsObj[itemsLoop].imagename;

                var id = orderItemsObj[itemsLoop].id;

                var userfile = imageName;

                var fd = new FormData();

                fd.append("file", imageSource);	//image
                fd.append("imagename",imageName);	//name


                $http.post(imageApi, fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity

                }).success(function (response11) {
                    console.log(response11);

                    myApp.hidePreloader();
                });

            }
        }

        /* End Image Upoad API */

        var postTitle123 = $scope.postData.title;
        var postDesc = $scope.postData.desc;
        var category = $scope.postData.category;
        var lat = window.localStorage['cLatitude'];
        var long = window.localStorage['cLongitude'];


        if(Boolean(postTitle123) == true && Boolean(postDesc) == true){

            $http({
                method: 'POST',
                url: path+'insertpost.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: {title:postTitle123,desc:postDesc,image:userfile,lat:lat,long:long,user_id:window.localStorage['nCustomerId'],category:category}

            }).success(function (response) {
                console.log(response);
                localStorage.removeItem('images');
                window.location.href="main.html";

                myApp.hidePreloader();
            })

        }
    }

    /* POST IMAGE UPLOAD*/

    $scope.setFile = function(element) {

        var customerid = window.localStorage['nCustomerId'];
        $scope.items = [];
        $scope.newUpload = true;
        $scope.getImage = false;


        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {


            $scope.image_source=event.target.result;

            var imageSource = event.target.result;
            $scope.image_source = imageSource;
            var seconds = new Date().getTime();
            var imageName = seconds+".jpg";

            $scope.items.push({
                file: imageSource,
                imagename: imageName,
                nCustomerId: customerid,
            });

            var wishData=JSON.stringify($scope.items);	//first stored as string

            window.localStorage['images'] = wishData;


            var userWishData = JSON.parse(window.localStorage['images']);		//second retrieved as object
            console.log(userWishData);
            $scope.items = userWishData[0];
            $scope.defaultImage = false;
            $scope.ChangetImage = true;

        }

        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    }


    /* END POST IMAGE UPLOAD */

    /* Blog View function call */


        $scope.viewBlog = function (blogId) {

            //window.location="#!/blog-single.html?postid="+blogId;
           // window.location="#/!/blog-single.html?postid="+blogId;
            //var postId = $location.search().postid;
           // alert(postId);

            /* POST view in sigle view */
            window.location.href="blog-single.html?postid="+blogId;
            window.localStorage['postid']=blogId;
           /* $http({
                method: 'POST',
                url: path+'postdetails.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: {id:blogId}

            }).success(function (response) {
                console.log(response);
                //$scope.viewDetail = response;

            })*/

            /* post view end */
       }

    /* END */



});



app.controller('blogSingleCtrl',function ($scope,$location,$http) {

    /*
     * webservice path
     * */

    var path = "http://icaninfotech.co.in/loyala/";
    var imagepath = "http://www.icaninfotech.co.in/loyala/images";

    //alert('hhh');
    /*
     * Create Post View
     * Narendra
     * 6-12-2016
     * */

    // var postId = $location.search().postid;
    var postId = window.localStorage['postid'];
    //alert(window.localStorage['postid']);

    /* POST view in sigle view */
        myApp.showPreloader();

        $http({
            method: 'POST',
            url: path+'postdetails.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: {id:postId}

        }).success(function (response) {
            console.log(response);

            $scope.postImage = imagepath+'/'+response['Result']['0']['image'];
            //alert($scope.postImage);
            $scope.title = response['Result']['0']['title'];
            $scope.desc = response['Result']['0']['desc'];
            myApp.hidePreloader();

        })

    /* post view end */

    $scope.goBack = function () {

        window.location="main.html";
        //alert('df');
    }

});