/**
 * Created by cyb on 2018/5/12.
 */
(function(){
  var workListInfo = [
      {
        name: 'ConnectOwls',
        picNum: 7,
        imgUrlList: [            //TODO  优化1： 预览图为大图，添加用于预览的缩略图，减少首页加载时间
          './styles/img/1/1.gif',
          './styles/img/1/2.gif',
          './styles/img/1/3.jpg',
          './styles/img/1/4.jpg',
          './styles/img/1/5.jpg',
          './styles/img/1/6.jpg',
          './styles/img/1/7.jpg'
        ],
        workInfo: 'Branding design for Éclavour Skincare Cosmetic.'
      },
      {
        name: 'ConnectOwls',
        picNum: 7,
        imgUrlList: [
          './styles/img/2/1.jpg'
        ],
        workInfo: 'Branding design for Éclavour Skincare Cosmetic.'
      },
      {
        name: 'ConnectOwls',
        picNum: 7,
        imgUrlList: [
          './styles/img/1/1.gif'
        ],
        workInfo: 'Branding design for Éclavour Skincare Cosmetic.'
      },
      {
        name: 'ConnectOwls',
        picNum: 7,
        imgUrlList: [
          './styles/img/1/1.gif'
        ],
        workInfo: 'Branding design for Éclavour Skincare Cosmetic.'
      }
    ],
    $workList = document.getElementById('work_list');

  var Tool = function(targetDom, list){
    this.list = list || [];
    this.len = this.list.length - 1;
    this.targetDom = targetDom;
    this.htmlCont = '';
    this.index = 0;
    this.$cont = document.getElementById('work_cont');
    this.$prev = document.getElementById('prev');
    this.$next = document.getElementById('next');
    this.$back = document.getElementById('back');
    this.$contWrap = document.getElementById('work_cont_wrap');
  }

  Tool.prototype = {
    handleList: function(){
      var that = this;
      this.list.map(function(item, index){
        var imgUrl = item && Array.isArray(item.imgUrlList) && item.imgUrlList[0];
        var mask = '<div class="work_mask"><div class="work_title">' + item.name + '</div></div>';
        var imgWrap = '<div class="img_wrap" style="background-image: url(' + imgUrl + ');"></div>';
        var fragment = '<li class="work_item">' + imgWrap + mask + '</li>';
        that.htmlCont += fragment;
      });
      return that.htmlCont;
    },
    initCont: function(){
      this.targetDom.innerHTML = this.handleList();
    },
    initNavi: function(){
      var that = this;
      this.$back.addEventListener('click', function(e){
        that.$contWrap.style.display = 'none';
      })
      this.$next.addEventListener('click', this.nextWork.bind(this));
      this.$prev.addEventListener('click', this.PrevWork.bind(this));
      var items = document.getElementsByClassName('work_item');
      for(var i = 0, len = items.length; i < len; i ++){
        (function(i){
          items[i].addEventListener('click', function(){
            that.initPage(i);
          })
        })(i)
      }
    },
    initPage: function(num){
      this.index = num;
      var pageCont = '';
      var imgList = '';
      var info = '<h2 class="info_title">' + this.list[num].name.toUpperCase() + '</h2><div class="work_description"><p>' + this.list[num].workInfo + '</p> </div>'
      Array.isArray(this.list[num].imgUrlList) && this.list[num].imgUrlList.map(function(item, index){
        var frag = '<li><img src="' + item + '" alt=""/></li>';
        imgList += frag;
      });
      pageCont += '<div class="work_page"><div class="work_info">' + info + '</div><div class="img_list"> <ul>' + imgList + '</ul></div></div>';
      this.$cont.innerHTML = pageCont;
      this.$contWrap.style.display = 'block';
      window.scrollTo(0,0);
      this.changeStatus();
    },
    nextWork: function(){
      if(this.index >= this.len){
        // console.error('超出作品数量');
        return false;
      } else {
        this.index += 1;
        this.initPage(this.index);
        this.changeStatus()
      }

    },
    PrevWork: function(){
      if(this.index <= 0 ){
        // console.error('没有index为0的作品');
        return false;
      } else {
        this.index -= 1;
        this.initPage(this.index);
        this.changeStatus()
      }
    },
    changeStatus: function(){
      if(this.index <= 0){
        this.$prev.className = 'prev';
        this.$next.className = 'next is_act';
      } else if(this.index >= this.len){
        this.$prev.className = 'prev is_act';
        this.$next.className = 'next';
      } else {
        this.$prev.className = 'prev is_act';
        this.$next.className = 'next is_act';
      }
    }
  }

  var myTool = new Tool($workList, workListInfo);
  myTool.initCont();
  myTool.initNavi();
})()