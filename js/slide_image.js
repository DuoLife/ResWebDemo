/**
 * Created by chenshenhai
 */
var slideImages = function() {
    function getObj(id) {
        return document.getElementById(id);
    }

    function forEachArr (arr, callback, _this) {
        if(arr.forEach) {
            arr.forEach(callback, _this);
        } else {
            for(var i = 0, l = arr.length; i < l; i ++) {
                callback.call(_this, arr[i], i, arr);
            }
        }
    }

    function setImgOpacity(elem, num){
        if(elem.filters){
            elem.style.filter = 'alpha(opacity = '+num+')';
        } else {
            elem.style.opacity = num / 100;
        }
    }

    function ImgeShow (elem) {
        elem.style.display = 'block';
        //setImgOpacity(elem, 100);
        //setInterval(setImgOpacity(elem, 100), 1000);
//        for(var i=0; i<=20; i++) {
//            (function(){
//                var num = i * 5;
//                setInterval(function(){
//                    setImgOpacity(elem, num)
//                }, 50);
//            })(i);
//        }
        //setImgOpacity(elem, 100);
        //var level = 0;
//            if(level <= 100) {
//                setImgOpacity(elem, level);
//                level++;
//            }

    }

    function ImgeHide (elem) {
        elem.style.display = 'none';
        //setImgOpacity(elem, 0);
        //setInterval(setImgOpacity(elem, 0), 1000);
//        for(var i=0; i<=20; i++) {
//            (function(){
//                var num = 100 - i * 5;
//                setInterval(function(){
//                    setImgOpacity(elem, num)
//                }, 50);
//            })(i);
//        }
        //setImgOpacity(elem, 0)
        //var level = 100;
//            if(level >= 0) {
//                setImgOpacity(elem, level);
//                level--;
//            }

    }

    return {
        slideStart : function(ImgNum, ImgList, selectList, selImgTitle, time ) {
            var self = this;
            var aimImgNum = 0;
            var curImgNum = 0;
            //添加图片序号按钮
            var DocFrag = document.createDocumentFragment();
            this.num = [];
            this.title = getObj(selImgTitle);
            for(var i=0; i<ImgNum; i++){
                (this.num[i] = DocFrag.appendChild(document.createElement('li'))).innerHTML = i+1;
            }
            //alert(this.num.length);
            getObj(selectList).appendChild(DocFrag);
            this.img = getObj(ImgList).getElementsByTagName('a');
            this.title.innerHTML = self.img[0].firstChild.title;
            this.num[0].className = 'cur';

            forEachArr(this.img, function(elem, Num){
                if(Num != 0) {
                    ImgeHide(elem);
                    //setImgOpacity(elem, 0);
                }
            });

            forEachArr(this.num, function(elem, num){
                elem.onclick = function() {
                    self.imgChange(num, curImgNum);
                    curImgNum = num;
                    aimImgNum = num;
                }
            });

            //向左轮播
            getObj('slide_left').onclick = function(){
                if(curImgNum == 0) {
                    aimImgNum = self.num.length - 1;
                }  else {
                    aimImgNum --;
                }
                self.imgChange(aimImgNum, curImgNum);
                curImgNum = aimImgNum;
            };

            //向右轮播
            getObj('slide_right').onclick = function(){
                if(curImgNum == self.num.length - 1) {
                    aimImgNum = 0;
                }  else {
                    aimImgNum ++;
                }
                self.imgChange(aimImgNum, curImgNum);
                curImgNum = aimImgNum;
            };


            //自动轮播
            var autoSlide = setInterval(function(){
                if(aimImgNum < self.num.length -1) {
                    aimImgNum ++;
                } else {
                    aimImgNum = 0;
                }
                self.imgChange(aimImgNum, curImgNum);
                curImgNum = aimImgNum;
            }, 4000);

            getObj(selectList).onmouseover = function() {
                clearInterval(autoSlide);
            };
            getObj(selectList).onmouseout = function() {
                autoSlide = setInterval(function(){
                    if(aimImgNum < self.num.length - 1) {
                        aimImgNum ++;
                    } else {
                        aimImgNum = 0;
                    }
                    self.imgChange(aimImgNum, curImgNum);
                    curImgNum = aimImgNum;
                }, 2000);
            }

            getObj(ImgList).onmouseover = function() {
                clearInterval(autoSlide);
            };
            getObj(ImgList).onmouseout = function() {
                autoSlide = setInterval(function(){
                    if(aimImgNum < self.num.length - 1) {
                        aimImgNum ++;
                    } else {
                        aimImgNum = 0;
                    }
                    self.imgChange(aimImgNum, curImgNum);
                    curImgNum = aimImgNum;
                }, 2000);
            }
        },
        imgChange : function(aimNum, curNum) {
            if(aimNum == curNum) {
                return;
            }
            var self = this;
            //var level = 100;

            var level = 100;

            ImgeHide(self.img[curNum]);
            ImgeShow(self.img[aimNum]);



            forEachArr(self.num, function(elem, elemNum){
                if(elemNum != aimNum) {
                    self.num[elemNum].className = '';

                } else {
                    getObj('selectList').style.background = '';
                    self.num[elemNum].className = 'cur';
                }
            });
            this.title.innerHTML = self.img[aimNum].firstChild.title;
        }
    }


}();