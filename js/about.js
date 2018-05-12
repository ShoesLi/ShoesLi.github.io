/**
 * Created by cyb on 2018/5/10.
 */

(function(){
  var $menu = document.getElementById('menu'),
    $body = document.getElementsByTagName('body')[0],
    $box = document.getElementById('box'),
    $img_bask = document.getElementsByClassName('img_bask')[0],
    $closeBtn = document.getElementById('close_btn'),
    $img = document.getElementById('img');

  $menu && $menu.addEventListener('click', function(){
    if($box.className.indexOf('show_box') !== -1){
      $box.className = 'mobild_navi_box';
    } else {
      $box.className = 'mobild_navi_box show_box';
    }
  });
  $img && $img.addEventListener('click',function(){
    $img_bask.style.display = 'block';
    $body.style.overflow = 'hidden';
  });
  $closeBtn && $closeBtn.addEventListener('click',function(){
    $img_bask.style.display = 'none';
    $body.style.overflow = 'auto';
  })

})()