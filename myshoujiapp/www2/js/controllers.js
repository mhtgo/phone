angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$rootScope,$http,$ionicSlideBoxDelegate,GoodlistRow,NewListRow,LoveListRow,$ionicSideMenuDelegate) {

      // $scope.mylunbo=Lunbo.all();

      $http.post($rootScope.URLAdmin+'/Handler/OfflineCourseHandler.ashx?action=indexshow','').success(function (result) {
        // console.log(result);

        $scope.mylunbo=result.data.bannerList;
        // console.log($scope.mylunbo);

        //更新轮播图
        $ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
        //让轮播图循环播放
        $ionicSlideBoxDelegate.$getByHandle("slideimgs").loop("true");


        $scope.mylist=[[result.data.goodList[0],result.data.goodList[1]],[result.data.goodList[2],result.data.goodList[3]]];

        $scope.mynewlist=[[result.data.newList[0],result.data.newList[1]],[result.data.newList[2],result.data.newList[3]]];

        $scope.mylovelist=result.data.chooseList;
      });
      // $scope.mylist=GoodlistRow.all();
      // $scope.mynewlist=NewListRow.all();
      // $scope.mylovelist=LoveListRow.all();
      //

      $scope.jump1=function (id) {
        window.location="#/tab/homestudent/"+id;
      };

      $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $rootScope.searchTxt={
        mytext:''
      };

      $scope.tzlist=function () {
        if($rootScope.searchTxt.mytext){
          window.location='#/tab/courselist';
        }
      }


})

.controller('CourselistCtrl', function($scope,$rootScope,$http,CourseLists) {


  $scope.listEl=[];

  $scope.nowPage=1;
  $scope.searchText='';
  $scope.CategoryTwo='';
  $scope.CpriceId='';

  $scope.loadmore=true;
  $scope.getCourselist=function () {

    var data={
      'searchText':$scope.searchText,
      'CategoryTwo':$scope.CategoryTwo,
      'CpriceId':$scope.CpriceId,
      'pageStart':$scope.nowPage
    };

    $http.post($rootScope.URLAdmin+'/Handler/OfflineCourseHandler.ashx?action=courseshow',data)
      .success(function (result) {
         // console.log(result);
        $scope.list=result.data.list.length;
        $scope.size=result.data.pageSize;
        $scope.Cprice=result.data.list.Cprice;
        $scope.listEl = $scope.listEl.concat(result.data.list);
        $scope.nowPage = result.data.pageStart;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });

  };
  $scope.getCourselist();
  $scope.loadMore=function () {
    console.log($scope.nowPage);
    $scope.nowPage++;
    if ($scope.list=$scope.size) {
      $scope.loadmore=true;
      $scope.getCourselist();
    }else if($scope.list<$scope.size){
      $scope.loadmore = false;
    }
};
//课程目录
  $http.post($rootScope.URLAdmin+'/Handler/OfflineCourseHandler.ashx?action=getcategory','')
    .success(function (result) {
      $scope.courseListBtns=result.data;
      // console.log($scope.courseListBtns);
    });


  $scope.priceBtns=[
    {sysId:0, title:"全部"},
    {sysId:1, title:"免费"},
    {sysId:2, title:"收费"}
  ];


  //点击search 事件
  $scope.searchlist=function (searchText,CategoryTwo,CpriceId) {
    $scope.listEl=[];
    $scope.loadmore = false;
    $scope.searchText=searchText;
    $scope.CategoryTwo=CategoryTwo;
    $scope.CpriceId=CpriceId;
    $scope.nowPage=0;
    var data={
      'searchText':$scope.searchText,
      'CategoryTwo':$scope.CategoryTwo,
      'CpriceId':$scope.CpriceId,
      'pageStart': $scope.nowPage
    };

    $http.post($rootScope.URLAdmin+'/Handler/OfflineCourseHandler.ashx?action=courseshow',data)
      .success(function (result) {
        console.log(result);
        $scope.listEl=[];
        $scope.listEl = $scope.listEl.concat(result.data.list);
     });

      $scope.row1show();
      $scope.fontcolor={color:"#0083CB"};
  };



  $scope.courseSerch2 = function(searchText,CategoryTwo,CpriceId){

    $scope.listEl=[];
    $scope.loadmore = false;
    $scope.searchText=searchText;
    $scope.CategoryTwo=CategoryTwo;
    $scope.CpriceId=CpriceId;
    $scope.nowPage=1;
    var data={
      'searchText':$scope.searchText,
      'CategoryTwo':$scope.CategoryTwo,
      'CpriceId':$scope.CpriceId,
      'pageStart': $scope.nowPage
    };

    $http.post($rootScope.URLAdmin+'/Handler/OfflineCourseHandler.ashx?action=courseshow',data)
      .success(function (result) {
        console.log(result);
        $scope.listEl=[];
        $scope.listEl = $scope.listEl.concat(result.data.list);
      });

    $scope.on2=false;
    $scope.fontcolor2={color:"#0083CB"};


  };

  $scope.myKeyup = function(e){
    var keycode = window.event?e.keyCode:e.which;
    if(keycode==0 || keycode==13){
      $scope.searchlist($scope.txt,'','');
      $scope.txt = '';
    }
  };



  //点击事件
  $scope.on1=false;
  $scope.fontcolor={color:"#555"};
  $scope.fontcolor2={color:"#555"};

  $scope.row1show=function () {
    $scope.on1=!$scope.on1;
    $scope.on2=false;
    $scope.fontcolor2={color:"#555"};
    if($scope.on1==true){
      $scope.fontcolor={color:"#0083CB"};
    }else {
      $scope.fontcolor={color:"#555"};
    }
  };

  $scope.row2show=function () {
    $scope.on2=!$scope.on2;
    $scope.on1=false;
    $scope.fontcolor={color:"#555"};
    if($scope.on2==true){
      $scope.fontcolor2={color:"#0083CB"};
    }else {
      $scope.fontcolor2={color:"#555"};
    }
  };



  $scope.quit=function (a) {
    window.location="#/tab/homestudent/a"
  };

  if($rootScope.searchTxt && $rootScope.searchTxt.mytext){
    console.log($rootScope.searchTxt.mytext);
    $scope.searchlist($rootScope.searchTxt.mytext,'','');
    $scope.on1=false;
    $scope.loadmore=false;
  }


})

.controller('PersonalCtrl', function($scope,$http,$rootScope,$ionicPopup,shareData) {


  $rootScope.hideTabs = false;
  $http.post($rootScope.URLAdmin+'/Handler/UserHandler.ashx?action=isLogin')
    .success(function (result) {
      if(result.success){
          window.location="#/tab/information";
      }
    });

  $scope.shareData=shareData;

  $scope.data={
    userName:'',
    userPwd:''
  };

  $scope.tj=function () {

    $http.post($rootScope.URLAdmin+'/Handler/UserHandler.ashx?action=login',$scope.data)
      .success(function (result) {
        if(result.success){
          window.location="#/tab/information";

        }else {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '你输入的账户信息不对，请先注册'
          })
        }
      })
  }

})

.controller('InformationRegisterCtrl', function($scope,$http,$rootScope) {

  $rootScope.hideTabs = false;
      $http.post($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=returnuserinfo')
        .success(function (result) {
          console.log(result);
          $scope.name = result.userName;
          $scope.email = result.email;
          $scope.phone = result.phone;
        });

  $scope.quit=function(){
    $http.post($rootScope.URLAdmin+'/Handler/UserHandler.ashx?action=quit')
      .success(function (result) {
        window.location="#/tab/personal";

    })
  }
})

.controller('Homestudent', function($scope,$http,$rootScope,StudyList,PingjiaList,$ionicModal,$stateParams,$sce) {

        //定义变量
        $scope.myId={
          courseId : $stateParams.id
        };
       $scope.myId2={
         courseId : $stateParams.id,
         evaluate :""
       };



        $scope.name='收藏';
        $scope.goshowping='购买';

        //判断是否登录
        $http.post($rootScope.URLAdmin+'/Handler/UserHandler.ashx?action=isLogin')
          .success(function (result) {
            if(result.success){
                $scope.mask2 = true;
                $scope.footer = true;
              //请求课程数据（已登录）
              $http.post($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=learnshow',$scope.myId)
                .success(function (data) {
                  console.log(data);
                  $scope.mian=data.data.CDlist;

                  $scope.pingjialist=data.data.evaluate.list;



                  $scope.zang=data.data.ifColected;
                  if( $scope.zang){
                    $scope.name='已收藏';
                    $scope.is=true;
                  }else {
                    $scope.name='收藏';
                    $scope.is=false;
                  }
                  // $scope.video1=document.getElementById("video1");
                  // window.plugins.html5Video.initialize({
                  //   '$scope.video1':"video/mov_aaa.mp4"
                  // });

                  //默认视屏
                  $scope.video2=$rootScope.URLAdmin+ $scope.mian[0].Vlist[0].Vurl;
                  $scope.newUrl = $sce.trustAsResourceUrl($scope.video2);

                  //视屏点击事件
                  $scope.video=function (you) {
                    $scope.src=you;
                    $scope.video2=$rootScope.URLAdmin+$scope.src.Vurl;
                    $scope.newUrl = $sce.trustAsResourceUrl($scope.video2);

                    // window.plugins.html5Video.initialize({
                    //   "video1":URLAdmin+$rootScope.URLAdmin+$scope.src.Vurl
                    // })
                  }

                });
            }else{
              $scope.mask2 = false;
              $scope.footer = false;
              //请求课程数据（未登录）
              $http.post($rootScope.URLAdmin+'/Handler/OfflineCourseHandler.ashx?action=learnshow',$scope.myId)
                .success(function (data) {
                  $scope.mian=data.data.CDlist;
                  $scope.pingjialist=data.data.evaluate.list;
                });
            }
          });

        //收藏事件
        $scope.setid=function() {
          $http.post($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=collection',$scope.myId)
            .success(function (data) {
              $scope.zang=data.ifColected;
              if( $scope.zang){
                $scope.name='已收藏';
                $scope.is=true;
              }else {
                $scope.name='收藏';
                $scope.is=false;
              }
            })
        };
        //点击评论
        $scope.pinglun=function() {
          $http.post($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=addcoursecomments',$scope.myId2)

        };


        $scope.fontcolor3={color:"#387EF5"};
        $scope.show1=true;
        $scope.data=function () {
          $scope.show1=true;
          $scope.show2=false;
          $scope.fontcolor4={color:"#555"};
          if($scope.show1=true){
            $scope.fontcolor3={color:"#387EF5"}
          }else {
            $scope.fontcolor3={color:"#555"}
          }
        };
        $scope.data2=function () {
          $scope.show2=true;
          $scope.show1=false;
          $scope.fontcolor3={color:"#555"};
          if($scope.show2=true){
            $scope.fontcolor4={color:"#387EF5"}
          }else {
            $scope.fontcolor4={color:"#555"}
          }
        };

        //模态框
        $ionicModal.fromTemplateUrl('my-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

        $scope.tz =function (id) {
          // console.log(id);
          window.location='#/tab/courseliststudent/'+id;
        };
       $scope.tz2 =function (id) {
                // console.log(id);
                window.location='#/tab/mycoursestudent/'+id;
              };

        $scope.tz4=function (id) {
          window.location='#/tab/mycoursestudent/'+id
        };



    $scope.pay=function(){
      var charge={"id":"ch_ez9a5O9GSCy5fj5afHTGmvHG","object":"charge","created":1442542657,"livemode":false,"paid":false,"refunded":false,"app":"app_ir1uHKe9aHaL9SWn","channel":"upacp","order_no":"123456789","client_ip":"127.0.0.1","amount":100,"amount_settle":0,"currency":"cny","subject":"Your Subject","body":"Your Body","extra":{},"time_paid":null,"time_expire":1442546257,"time_settle":null,"transaction_no":null,"refunds":{"object":"list","url":"/v1/charges/ch_ez9a5O9GSCy5fj5afHTGmvHG/refunds","has_more":false,"data":[]},"amount_refunded":0,"failure_code":null,"failure_msg":null,"metadata":{},"credential":{"object":"credential","upacp":{"tn":"201509181017374044084","mode":"00"}},"description":null};
      try{
        pingpp.createPayment(charge, function(result){
          CommonJs.AlertPopup('suc: '+result);  //"success"
        }, function(result) {
          CommonJs.AlertPopup('err: ' + result);  //"fail"|"cancel"|"invalid"
        });
      }
      catch(e){
        alert(e);
      }
    }

})

.controller('RegisterCtrl', function($scope,$http,$rootScope,$ionicPopup) {

  $scope.infor={
    userName: '',
    email:'',
    phone: '',
    userPwd:'',
    userPwdd:''
  };

  /*注册页面判断*/
  $scope.register=function(infor){
    var email_yz  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var photo_yz = /^1\d{10}$/;
    if(!!infor.userName && !!infor.email && !! infor.phone && !! infor.userPwd && !!infor.passwordt){
      if(!email_yz.test(infor.email)){
        $ionicPopup.alert({
          title: '提示信息!',
          template: '邮箱格式不正确，请重新输入'
        });
      }else if(photo_yz.test(infor.photo)) {
        $ionicPopup.alert({
          title: '提示信息!',
          template: '请输入正确手机号码'
        });
      }else if(infor.userPwd!=infor.passwordt){
        $ionicPopup.alert({
          title: '提示信息!',
          template: '两次密码不相同，请重新输入'
        });
      }else{
        //注册信息提交
        var myInfor={
          userName:$scope.infor.userName,
          email:$scope.infor.email,
          phone:$scope.infor.phone,
          userPwd:$scope.infor.userPwd,
          nickname:'',
          userPic:''
        };
        console.log(myInfor);
        //注册请求
        $http.post($rootScope.URLAdmin+'/Handler/UserHandler.ashx?action=add', myInfor)
          .success(function(response){
            if(response.err){
              $ionicPopup.alert({
                title: '提示信息!',
                template: response.err
              });
            }else{
              console.log(response);
              $ionicPopup.alert({
                title: '提示信息!',
                template: '注册成功！'
              });
              window.location="#/tab/personal"
            }

          });

      }
    }else{
      $ionicPopup.alert({
        title: '提示信息!',
        template: '请输入内容'
      });

    };
  }

  })

.controller('MycourseCtrl', function($scope,$http,$rootScope) {

  $http.get($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=mycollection')
    .success(function (data) {
      console.log(data);
      $scope.sett2=data.data;
      $scope.sett=data.data;
    });

  $scope.data = {
    showDelete: false
  };

  $scope.onItemDelete = function(n,id) {
    $scope.sett.splice($scope.sett.indexOf(n), 1);
    $scope.myid={
      courseId:id
    };
    $http.post($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=deletecollection',$scope.myid)
  };

  $scope.onItemDelete2 = function(n,id) {
    $scope.sett2.splice($scope.sett2.indexOf(n), 1);
    $scope.myid={
      courseId:id
    };
    $http.post($rootScope.URLAdmin+'/Handler/OnCourseHandler.ashx?action=deletecollection',$scope.myid)
  };

  //分享课程
  $scope.share = function(itemID) {
    window.plugins.socialsharing.share('给你分享一个很棒的课程', null, null,$rootScope.URLAdmin+'/www/index.html#/tab/lesslistStudy/'+itemID);
  };


  $scope.Color1={color:"#387EF5"};
  $scope.Myshow=true;
  $scope.settShow=function(){
    $scope.Myshow=true;
    $scope.Myshow2=false;
    $scope.Color2={color:"#000000"};
    if($scope.Myshow=true){
      $scope.Color1={color:"#387EF5"}
    }
  };
  $scope.sett2Show=function(){
    $scope.Myshow2=true;
    $scope.Myshow=false;
    $scope.Color1={color:"#000000"};
    if($scope.Myshow2=true){
      $scope.Color2={color:"#387EF5"}
    }
  }

})




.directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function() {
        $rootScope.hideTabs=attributes.hideTabs;
      });

      scope.$on('$ionicView.beforeLeave', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
});
