 function Lun() {
    this.show = function (conf) {
    var html = `<div class="slider" id="slider">
                <div class="slide"><img src="img/b5.png" alt=""></div>
                <div class="slide"><img src="img/b1.png" alt=""></div>
                <div class="slide"><img src="img/b2.png" alt=""></div>
                <div class="slide"><img src="img/b3.png" alt=""></div>
                <div class="slide"><img src="img/b4.png" alt=""></div>
                <div class="slide"><img src="img/b5.png" alt=""></div>
                <div class="slide"><img src="img/b1.png" alt=""></div>
                </div>
                <span id="left"><</span>
                <span id="right">></span>
                <ul class="nav" id="navs">
                    <li class="active">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>`;
  
//定义变量
    $(conf).html(html);
    var $box = $('#box'),
    $left = $('#left'),
    $right = $('#right'),
    slider = $('#slider').get(0),
    $nav = $('#navs').children(),
    timer,
    index=1,
    isMoving=false;

    //鼠标划上去，取消定时，左右按钮透明度改变
    $box.mouseover(function () {
         if(timer){
            clearInterval(timer);
        }
        $left.css({
           opacity:0.6,
           animation: "opacity 1s"
        })
        $right.css({
          opacity:0.6,
          animation: "opacity 1s"
        })
  
      })
  
    //鼠标滑下来，定时器启动，透明度改变
    $box.mouseout(function () {
        timer = setInterval(next,2000);
        $left.css({
             opacity: 0,
             transition: "opacity 1s"
        })
        $right.css({ 
           opacity: 0,
           transition: "opacity 1s"
        })
      })
  
  
  //点击左右按钮，触发函数
    $right.click(function(){next()});
    $left.click(function(){prev()});
  
    for (var i = 0; i < $nav.length; i++) {
        (function (i) {
          $nav[i].onclick = function () {
            index = i + 1;
            navmove();
            animate(slider, {
              left: -1200 * index
            });
          }
        })(i);
      }
  
  
 //点击有按钮 
   function next() {
        if (isMoving) {
          return;
        }
        isMoving = true;
        index++;
        navmove();
        animate(slider, {
          left: -1200 * index
        }, function () {
          if (index == 6) {
            slider.style.left = '-1200px';
            index = 1;
          }
          isMoving = false;
        });
  
      }
  //点击左按钮
      function prev() {
        if (isMoving) {
          return;
        }
        isMoving = true;
        index--;
        navmove();
        animate(slider, {
          left: -1200 * index
        }, function () {
  
          if (index == 0) {
            slider.style.left = '-6000px';
            index = 5;
          }
          isMoving = false;
        });
        console.log(index)
  
      }
  
  
      function navmove() {
        for (var i = 0; i < $nav.length; i++) {
          $nav[i].className = "";
        }
        if (index > 5) {
          $nav[0].className = "active";
        } else if (index <= 0) {
          $nav[4].className = "active";
        } else {
          $nav[index - 1].className = "active";
        }
      }
  

      //定时器
      timer = setInterval(next, 2000);
  
      function getStyle(obj, attr){
        if(obj.currentStyle){ 
          return obj.currentStyle[attr];
        } else {
          return getComputedStyle(obj, null)[attr];
        }
      }
  

      function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
          var isStop = true;
          for(var attr in json){
              var now = 0;
              if(attr == 'opacity'){
                  now = parseInt(getStyle(obj,attr)*100);
            }else{
              now = parseInt(getStyle(obj,attr));
            }
  
            var speed = (json[attr] - now) / 10;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            var time = now + speed;
            if(attr == 'opacity'){
              obj.style[attr] = time / 100;
            }else{
              obj.style[attr] = time + 'px';
            }
            if(json[attr] !== time){
              isStop = false;
            }
          }
  
          if(isStop){
            clearInterval(obj.timer);
            callback&&callback();
        }
        }, 25)
      }
    }
  
  }