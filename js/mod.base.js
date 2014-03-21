/*******************************
 * @Copyright:西安曲江智讯互动营销策划有限公司
 * @Author:Mr.Think
 * @Creation date:2013.05.27
 * @Description:万科
 *******************************/
KISSY.use('dom,gallery/slide/1.0/,event,ajax,overlay,component/plugin/drag', function(S,DOM,Slide,Event,IO,O,DragPlugin) {
	var shareTxt=['#菜鸟达人梦#天若有情天亦老，人不运动挂得早~今天是21天菜鸟跑步训练营的第1天，我累计跑步1公里，获得了“运动新星”徽章。V生活，为梦想，运动点亮达人路，快来给我加油鼓劲吧！不坚持，怎能圆我菜鸟达人梦！','#菜鸟达人梦#世上无难事，就怕有心人~今天是21天菜鸟跑步训练营的第2天，我已经累计跑步2公里，获得了“热身学徒”徽章。V生活，为梦想，运动点亮达人路，快来给我加油鼓劲吧！不坚持，怎能圆我菜鸟达人梦！','#菜鸟达人梦#君欲善跑步，必先利其鞋！今天是21天菜鸟跑步训练营的第3天，我已经累计跑步3公里，获得了“装备潮人”徽章。V生活，为梦想，运动点亮达人路，快来给我加油鼓劲吧！不坚持，怎能圆我菜鸟达人梦！','#菜鸟达人梦#革命尚未成功，菜鸟仍需努力~今天是21天菜鸟跑步训练营的第4天，我已经累计跑步4公里，获得了“开拓先锋”徽章。V生活，为梦想，运动点亮达人路，快来给我加油鼓劲吧！不坚持，怎能圆我菜鸟达人梦！','#菜鸟达人梦#春眠不觉晓，处处有人跑。今天是21天菜鸟跑步训练营的第5天，我已经累计跑步5公里，获得了“健康卫士”徽章。V生活，为梦想，运动点亮达人路，快来给我加油鼓劲吧！不坚持，怎能圆我菜鸟达人梦！','#菜鸟达人梦#马无夜草长不壮，人不跑步睡不香。今天是21天菜鸟跑步训练营的第6天，我已经累计跑步6公里，获得了“毅力勇士”徽章。V生活，为梦想，运动点亮达人路，快来给我加油鼓劲吧！不坚持，怎能圆我菜鸟达人梦！'];
	//首页徽章馆左右切换
	if(DOM.query('#J_HZSlide li').length>0){
		var J_HZSlide = new Slide('J_HZSlide',{
			navClass:'mi2-nav',
			contentClass:'mi2-list-panel',
			pannelClass:'mi2-list',
			selectedClass:'active',
			triggerSelector:'li',
			effect:'hSlide',
			timeout:5000,
			autoSlide:true
		});
		var J_HZPrev=DOM.get('.mi2-prev');
	    var J_HZNext=DOM.get('.mi2-next');
	    Event.on(J_HZPrev,'click',function(){
	    	J_HZSlide.previous();
	    });
	    Event.on(J_HZNext,'click',function(){
	    	J_HZSlide.next();
	    });
	}
	//首页21左右切换
	if(DOM.query('#J_MI4List li').length>2){
		var J_MI4Slide = new Slide('J_MI4Slide',{
			navClass:'mi4-nav',
			contentClass:'mi4-item-panel',
			pannelClass:'mi4-item',
			selectedClass:'active',
			triggerSelector:'li',
			effect:'hSlide',
			timeout:5000,
			autoSlide:true
		});
		var J_HZ4Prev=DOM.get('.mi4-prev');
	    var J_HZ4Next=DOM.get('.mi4-next');
	    Event.on(J_HZ4Prev,'click',function(){
	    	J_MI4Slide.previous();
	    });
	    Event.on(J_HZ4Next,'click',function(){
	    	J_MI4Slide.next();
	    });
	}
    //点亮徽章
    var baseDialog=new O.Dialog({
		width:240,
		headerContent:'点亮徽章',
		bodyContent:'',
		mask:{
			duration:.3,effect:'fade',easing:'backout'
		},
		align:{
			points:['cc','cc']
		},
        plugins: [
            new DragPlugin({
                handlers: ['.ks-stdmod-header']
            })
        ]
	});
    var J_lightThis=DOM.get('#J_lightThis');
    Event.on(J_lightThis,'click',function(){
    	var id=DOM.attr(this,'data-id');
    	//点亮
    	IO({
			url:'/sign/sign',
            type:'post',
			dataType:'json',
			data:{id:id},
			error:function(){
				baseDialog.set({bodyContent:'<p class="error-txt">点亮失败，请刷新重试！</p>'}).show();
			},
			success:function(data,textStatus){
				if(data.status==200){
					baseDialog.set({bodyContent:'<p class="suc-txt">恭喜你！点亮成功！</p><p class="dialog-share"></p>'}).show();
					//分享微博
			    	IO.post('/sign/shareWeibo',{text:shareTxt[0],pic:'http://cdn.w-i-t.cn/13_vanke0529/img/img-share-'+id+'.jpg'});
				}else if(data.status==302){
					baseDialog.set({bodyContent:'<p class="error-txt">你已点亮过此徽章哦～</p>'}).show();
				}else{
					baseDialog.set({bodyContent:'<p class="error-txt">点亮失败，请刷新重试！</p>'}).show();
				}
			}
		});
    });
    //画弹出
    var J_MI4List=DOM.query('#J_MI4List img');
    Event.on(J_MI4List,'click',function(){
    	var src=DOM.attr(this,'data-src');
    	baseDialog.set({width:630,headerContent:'21天体验营训练计划',bodyContent:'<img src="'+src+'" width="600" height="588" alt=""/>'}).show();
    });
    //徽章馆弹出
    var J_indexHZItem=DOM.query('#J_indexHZ li');
    Event.on(J_indexHZItem,'click',function(){
		var id=DOM.attr(this,'data-id');
		var ind=DOM.index(J_indexHZItem,this)+1;
    	IO({
			url:'/sign/getTask',
			dataType:'json',
			data:{id:id},
			error:function(){
			},
			success:function(data,textStatus){
				/*
				ajax 返回 要显示的详情
				|--status:状态
				|--name:名称
				|--detail:描述
				*/
				if(data.status==200){
					var html='<div class="dialog-detail"><img alt="" src="http://cdn.w-i-t.cn/13_vanke0529/img/bg-hz-big-'+ind+'.png" alt=""/><h5 class="t">'+data.name+'</h5><p class="p">'+data.detail+'</p></div>'
					baseDialog.set({width:490,headerContent:'徽章信息',bodyContent:html}).show();
				}else if(data.status=401){
					baseDialog.set({width:240,bodyContent:'<p class="error-txt">任务尚未开始，敬请期待！</p>'}).show();
				}
			}
		});
    });
    //排行前三名高亮
    var mb2ListSort=DOM.query('#J_mb2List .sort');
    S.each(mb2ListSort,function(ev,key){
    	if(key<3){
    		DOM.addClass(ev, 'sort-cur');
    	}
    });
    //排名上一页下一页
    var mb2listBox=DOM.get('#J_mb2List');
    var mb2pagePrev=DOM.get('.mb2-page-prev');
    var mb2pageNext=DOM.get('.mb2-page-next');
    var mb2pageCur=DOM.get('#J_mbwPageCur');
    var mb2pageCount=DOM.get('#J_mbwPageCount');
    function LoadMb2List(page){
    	IO({
			url:'/sign/signRanking',
			dataType:'json',
			data:{page:page},
			error:function(){},
			success:function(data,textStatus){
				/*
				ajax 返回数据：
				status:状态
				resdata:7条
				|---|--sort:排序数字
					|--name:用户名
					|--url:用户微博链接
					|--hzcount:徽章总数
				*/
				if(data.status==200){
					var htmlArr=[];
					S.each(data.resdata,function(v,k){
						htmlArr.push('<li><em class="sort">'+v.sort+'</em><a href="'+v.url+'" target="_blank">'+v.name+'</a><span>'+v.hzcount+'枚</span></li>');
					});
					//插入最新数据
					DOM.html(mb2listBox,htmlArr.join(''));
				}
			}
		});
    }
    //向后
    Event.on(mb2pageNext,'click',function(ev){
    	var pages=parseInt(DOM.text(mb2pageCount));
    	var pageCur=parseInt(DOM.text(mb2pageCur));
    	if(pageCur==1){
    		DOM.removeClass(mb2pagePrev,'mb2-page-disabled');
    		DOM.attr(mb2pagePrev,'disabled',false);
    	}
    	if(pageCur+1==pages){
    		DOM.addClass(this,'mb2-page-disabled');
    		DOM.attr(this,'disabled',true);
    	}
    	DOM.text(mb2pageCur,pageCur+1);
    	LoadMb2List(pageCur+1);
    });
    //向前
    Event.on(mb2pagePrev,'click',function(ev){
    	var pages=parseInt(DOM.text(mb2pageCount));
    	var pageCur=parseInt(DOM.text(mb2pageCur));
    	if(pages==pageCur){
    		DOM.removeClass(mb2pageNext,'mb2-page-disabled');
    		DOM.attr(mb2pageNext,'disabled',false);
    	}
    	if(pageCur==2){
    		DOM.addClass(this,'mb2-page-disabled');
    		DOM.attr(this,'disabled',true);
    	}
    	DOM.text(mb2pageCur,pageCur-1);
    	LoadMb2List(pageCur-1);
    });
    /*
    //首页运动一刻自动上下切换
    var J_IMGSlideItem=DOM.query('#J_IMGSlide li');
    if(J_IMGSlideItem.length>0){
    	var J_IMGSlide = new Slide('J_IMGSlide',{
			contentClass:'mi4-box',
			pannelClass:'mi4-item',
			effect:'vSlide',
			timeout:3000,
			autoSlide:true
		});
    }
    */
});