/*
 * Ken Burns Sliders Full Collection  v1.0
 *
 * Copyright 2012, LambertGroup
 * 
 */

(function($) {

	function animate_singular_text(elem,current_obj,options) {
		if (options.responsive) {
			newCss='';
			if (elem.css('font-size').lastIndexOf('px')!=-1) {
				fontSize=elem.css('font-size').substr(0,elem.css('font-size').lastIndexOf('px'));
				newCss+='font-size:'+fontSize/(options.origWidth/options.width)+'px;';
			}
			if (elem.css('font-size').lastIndexOf('em')!=-1) {
				fontSize=elem.css('font-size').substr(0,elem.css('font-size').lastIndexOf('em'));
				newCss+='font-size:'+fontSize/(options.origWidth/options.width)+'em;';
			}
			
			if (elem.css('line-height').lastIndexOf('px')!=-1) {
				lineHeight=elem.css('line-height').substr(0,elem.css('line-height').lastIndexOf('px'));
				newCss+='line-height:'+lineHeight/(options.origWidth/options.width)+'px;';
			}
			if (elem.css('line-height').lastIndexOf('em')!=-1) {
				lineHeight=elem.css('line-height').substr(0,elem.css('line-height').lastIndexOf('em'));
				newCss+='line-height:'+lineHeight/(options.origWidth/options.width)+'em;';
			}
			
			elem.wrapInner('<div class="newFS" style="'+newCss+'" />');
			
		}

		var theLeft=elem.attr('data-final-left');
		var theTop=elem.attr('data-final-top');
		if (options.responsive) {
			theLeft=parseInt(theLeft/(options.origWidth/options.width));
			theTop=parseInt(theTop/(options.origWidth/options.width));
		}
  
        var opacity_aux=1;
		if (current_obj.isVideoPlaying==true)
		   opacity_aux=0;
        elem.animate({
                opacity: opacity_aux,
                left:theLeft+'px',
                top: theTop+'px'
              }, elem.attr('data-duration')*1000, function() {
                if (current_obj.isVideoPlaying==true) {
                   var texts = jQuery(current_obj.currentImg.attr('data-text-id')).children();
				   texts.css("opacity",0);
		        }
              });			
	};
    
    
    
    
	function animate_texts(current_obj,options,bannerscollection_kenburns_the,bannerControls) {
		jQuery(current_obj.currentImg.attr('data-text-id')).css("display","block");
		var texts = jQuery(current_obj.currentImg.attr('data-text-id')).children();

		var i=0;
		currentText_arr=Array();
		texts.each(function() {
			currentText_arr[i] = jQuery(this);
            
            
		  var theLeft=currentText_arr[i].attr('data-initial-left');
		  var theTop=currentText_arr[i].attr('data-initial-top');
		  if (options.responsive) {
				theLeft=parseInt(theLeft/(options.origWidth/options.width));
				theTop=parseInt(theTop/(options.origWidth/options.width));
		  }		  

            currentText_arr[i].css("left",theLeft+'px');
            currentText_arr[i].css("top",theTop+'px'); 
            currentText_arr[i].css("opacity",parseInt(currentText_arr[i].attr('data-fade-start'))/100); 
            
            var currentText=currentText_arr[i];
            setTimeout(function() { animate_singular_text(currentText,current_obj,options);}, (currentText_arr[i].attr('data-delay')*1000));    
            	
            i++;
        });		
	};
		
	
	function initialPositioning(cur_i,options, bannerscollection_kenburns_container,origImgsDimensions,imgs) {
		if (cur_i==-1)
			cur_i=0;

		var cur_horizontalPosition=options.horizontalPosition;
	    if (jQuery(imgs[cur_i]).attr('data-horizontalPosition')!=undefined && jQuery(imgs[cur_i]).attr('data-horizontalPosition')!='') {
           cur_horizontalPosition=jQuery(imgs[cur_i]).attr('data-horizontalPosition');
        }		
		
		var cur_verticalPosition=options.verticalPosition;
	    if (jQuery(imgs[cur_i]).attr('data-verticalPosition')!=undefined && jQuery(imgs[cur_i]).attr('data-verticalPosition')!='') {
           cur_verticalPosition=jQuery(imgs[cur_i]).attr('data-verticalPosition');
        }	
		
		var cur_initialZoom=options.initialZoom;
	    if (jQuery(imgs[cur_i]).attr('data-initialZoom')!=undefined && jQuery(imgs[cur_i]).attr('data-initialZoom')!='') {
           cur_initialZoom=Number(jQuery(imgs[cur_i]).attr('data-initialZoom'));
        }
		
		var cur_finalZoom=options.finalZoom;
	    if (jQuery(imgs[cur_i]).attr('data-finalZoom')!=undefined && jQuery(imgs[cur_i]).attr('data-finalZoom')!='') {
           cur_finalZoom=Number(jQuery(imgs[cur_i]).attr('data-finalZoom'));
        }
		

		var origDim=origImgsDimensions[cur_i].split(";");
		if (options.responsive) {	
			origDim[0]=origDim[0]/(options.origWidth/options.width);
			origDim[1]=origDim[1]/(options.origWidth/options.width);
		}
		
		if (options.width100Proc && options.height100Proc) {
			if (origDim[1]*Math.min(cur_finalZoom,cur_initialZoom)<options.height) {
				newH=options.height/Math.min(cur_finalZoom,cur_initialZoom);
				newW=newH*(origDim[0]/origDim[1])
				origDim[0]=newW;
				origDim[1]=newH;
			}
		}
		
		
		
		var imgInside = jQuery('#contentHolderUnit_'+cur_i, bannerscollection_kenburns_container).find('img:first');
		var finalWidth=parseInt(cur_finalZoom*origDim[0]);
		var finalHeight=parseInt(cur_finalZoom*origDim[1]);
		
		imgInside.css('width',parseInt(cur_initialZoom*origDim[0])+'px');
		imgInside.css('height',parseInt(cur_initialZoom*origDim[1])+'px');


		var cur_left=0;
		switch(cur_horizontalPosition)
		{
		case 'left':
			cur_left=0;
			break;
		case 'center':
			cur_left=(options.width-parseInt(cur_initialZoom*origDim[0]))/2;
			break;	
		case 'right':
			cur_left=options.width-parseInt(cur_initialZoom*origDim[0]);
			break;				  
		default:
			cur_left=0;
		}	
		
		var cur_top=0;
		switch(cur_verticalPosition)
		{
		case 'top':
			cur_top=-2;
			break;
		case 'center':
			cur_top=(options.height-parseInt(cur_initialZoom*origDim[1]))/2;
			break;			
		case 'bottom':
			cur_top=options.height-parseInt(cur_initialZoom*origDim[1])+2;
			break;
		default:
			cur_top=0;
		}
		
		

		imgInside.css('left',parseInt(cur_left)+'px');
		imgInside.css('top',parseInt(cur_top)+'px');
		imgInside.css('opacity',options.initialOpacity);
		
		if (!jQuery.browser.msie) {
			imgInside.css("-webkit-transform-origin",cur_horizontalPosition+" "+cur_verticalPosition);
			imgInside.css("-moz-transform-origin",cur_horizontalPosition+" "+cur_verticalPosition);
			imgInside.css("-o-transform-origin",cur_horizontalPosition+" "+cur_verticalPosition);
			imgInside.css("transform-origin",cur_horizontalPosition+" "+cur_verticalPosition);
		}


	}
	
	
	function bannerscollection_kenburns_reset_animate_image(current_obj) {
			if (jQuery.browser.msie) {
				clearInterval(current_obj.msiInterval);
				current_obj.current_imgInside.css("filter",'progid:DXImageTransform.Microsoft.Matrix(FilterType="bilinear",M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)');
			} else {
			  current_obj.current_imgInside.css("-webkit-transition-duration","0s");
			  current_obj.current_imgInside.css("-moz-transition-duration","0s");
			  current_obj.current_imgInside.css("-o-transition-duration","0s");
			  current_obj.current_imgInside.css("transition-duration","0s");							

			  current_obj.current_imgInside.css("-webkit-transform","scale(1)");
			  current_obj.current_imgInside.css("-moz-transform","scale(1)");
			  current_obj.current_imgInside.css("-o-transform","scale(1)");
			  current_obj.current_imgInside.css("transform","scale(1)");

			}
	}
	
	
	function bannerscollection_kenburns_animate_image(current_obj,options, bannerscollection_kenburns_container,origImgsDimensions,imgs) {
		var cur_duration=options.duration;
		
	    var cur_horizontalPosition=options.horizontalPosition;
	    if (jQuery(imgs[current_obj.current_img_no]).attr('data-horizontalPosition')!=undefined && jQuery(imgs[current_obj.current_img_no]).attr('data-horizontalPosition')!='') {
           cur_horizontalPosition=jQuery(imgs[current_obj.current_img_no]).attr('data-horizontalPosition');
        }	
		var cur_verticalPosition=options.verticalPosition;
	    if (jQuery(imgs[current_obj.current_img_no]).attr('data-verticalPosition')!=undefined && jQuery(imgs[current_obj.current_img_no]).attr('data-verticalPosition')!='') {
           cur_verticalPosition=jQuery(imgs[current_obj.current_img_no]).attr('data-verticalPosition');
        }			
		
		if (jQuery(imgs[current_obj.current_img_no]).attr('data-duration')!=undefined && jQuery(imgs[current_obj.current_img_no]).attr('data-duration')!='') {
           cur_duration=Number(jQuery(imgs[current_obj.current_img_no]).attr('data-duration'));
        }		
		
		var cur_initialZoom=options.initialZoom;
	    if (jQuery(imgs[current_obj.current_img_no]).attr('data-initialZoom')!=undefined && jQuery(imgs[current_obj.current_img_no]).attr('data-initialZoom')!='') {
           cur_initialZoom=Number(jQuery(imgs[current_obj.current_img_no]).attr('data-initialZoom'));
        }	
		var cur_finalZoom=options.finalZoom;
	    if (jQuery(imgs[current_obj.current_img_no]).attr('data-finalZoom')!=undefined && jQuery(imgs[current_obj.current_img_no]).attr('data-finalZoom')!='') {
           cur_finalZoom=Number(jQuery(imgs[current_obj.current_img_no]).attr('data-finalZoom'));
        }
        
		
		current_obj.current_imgInside = jQuery('#contentHolderUnit_'+current_obj.current_img_no, bannerscollection_kenburns_container).find('img:first');

		var origDim=origImgsDimensions[current_obj.current_img_no].split(";");
		if (options.responsive) {	
			origDim[0]=origDim[0]/(options.origWidth/options.width);
			origDim[1]=origDim[1]/(options.origWidth/options.width);
		}		

			

				if (jQuery.browser.msie) {
					curZoom=1;
					zoomStep=0;
					cur_marginLeft=0;
					cur_marginTop=0;
					current_obj.msiInitialTime=(new Date).getTime();

				    current_obj.msiInterval=setInterval(function() {
						
						
						nowx = (new Date).getTime();
						if ( (nowx-current_obj.msiInitialTime) > (cur_duration*1000) ) {
							clearInterval(current_obj.msiInterval);
						} else {
							zoomStep=(nowx-current_obj.msiInitialTime)*Math.abs(cur_initialZoom-cur_finalZoom)/(cur_duration*1000);
							if (cur_initialZoom<=cur_finalZoom)
								curZoom=1+zoomStep;
							else
								curZoom=1-zoomStep;
						
							
							if (cur_horizontalPosition=='center') {
								cur_marginLeft=(1-curZoom)*cur_initialZoom*origDim[0]/2;	
							}
							if (cur_horizontalPosition=='right') {
								cur_marginLeft=(1-curZoom)*cur_initialZoom*origDim[0];
							}
							
							
							if (cur_verticalPosition=='center') {
								cur_marginTop=(1-curZoom)*cur_initialZoom*origDim[1]/2;	
							}
							if (cur_verticalPosition=='bottom') {
								cur_marginTop=(1-curZoom)*cur_initialZoom*origDim[1];
							}								
								
        	  				current_obj.current_imgInside.css({filter:'progid:DXImageTransform.Microsoft.Matrix(FilterType="bilinear",M11='+curZoom+', M12=0, M21=0, M22='+curZoom+', Dx=' + cur_marginLeft + ',Dy=' + cur_marginTop + ')'});
						}
    				}, 25);
				} else {
		
						current_obj.current_imgInside.css("-webkit-transition-duration",cur_duration+"s");
						current_obj.current_imgInside.css("-moz-transition-duration",cur_duration+"s");
						current_obj.current_imgInside.css("-o-transition-duration",cur_duration+"s");
						current_obj.current_imgInside.css("transition-duration",cur_duration+"s");	
						
						current_obj.current_imgInside.css("-webkit-transition-timing-function","ease");
						current_obj.current_imgInside.css("-moz-transition-timing-function","ease");
						current_obj.current_imgInside.css("-o-transition-timing-function","ease");
						current_obj.current_imgInside.css("transition-timing-function","ease");

						zoomVal=cur_finalZoom/cur_initialZoom;
						current_obj.current_imgInside.css("-webkit-transform","scale("+zoomVal+") rotate(0.1deg)");
						current_obj.current_imgInside.css("-moz-transform","scale("+zoomVal+") rotate(0.1deg)");
						current_obj.current_imgInside.css("-o-transform","scale("+zoomVal+")");
						current_obj.current_imgInside.css("transform","scale("+zoomVal+")");
						
						
						current_obj.current_imgInside.css("perspective","0");			
						current_obj.current_imgInside.css("-webkit-perspective","0");	


				}

	}
	
	
	//circ
	function the_arc(current_obj,options) {
			nowx = (new Date).getTime();
			if (!current_obj.mouseOverBanner && options.showCircleTimer) {	 
				current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
  	            
                current_obj.ctx.beginPath();
                current_obj.ctx.globalAlpha=options.behindCircleAlpha/100;
                current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 2 * Math.PI, false);
                current_obj.ctx.lineWidth = options.circleLineWidth+2;
                current_obj.ctx.strokeStyle = options.behindCircleColor;
                current_obj.ctx.stroke();
                

                current_obj.ctx.beginPath();
                current_obj.ctx.globalAlpha=options.circleAlpha/100;
                current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, ((current_obj.timeElapsed+nowx)-current_obj.arcInitialTime)/1000*2/options.autoPlay*Math.PI,  false);
                current_obj.ctx.lineWidth = options.circleLineWidth;
                current_obj.ctx.strokeStyle = options.circleColor;
                current_obj.ctx.stroke();
             }
    }
	
	
	
    // navigation
	function bannerscollection_kenburns_navigation(direction,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb){
		var navigateAllowed=true;
		if ((!options.loop && current_obj.current_img_no+direction>=total_images) || (!options.loop && current_obj.current_img_no+direction<0))
			navigateAllowed=false;				
		
		if (navigateAllowed && !current_obj.slideIsRunning) {
			current_obj.slideIsRunning=true;
	
			jQuery('.newFS', bannerscollection_kenburns_container ).contents().unwrap();
			current_obj.arcInitialTime=(new Date).getTime();
			current_obj.timeElapsed=0;			
			if (options.showCircleTimer) {
					clearInterval(current_obj.intervalID);

					current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
					current_obj.ctx.beginPath();
					current_obj.ctx.globalAlpha=options.behindCircleAlpha/100;
					current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 2 * Math.PI, false);
					current_obj.ctx.lineWidth = options.circleLineWidth+2;
					current_obj.ctx.strokeStyle = options.behindCircleColor;
					current_obj.ctx.stroke();            
					
					
					current_obj.ctx.beginPath();
					current_obj.ctx.globalAlpha=options.circleAlpha/100;
					current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0,  false);
					current_obj.ctx.lineWidth = options.circleLineWidth;
					current_obj.ctx.strokeStyle = options.circleColor;
					current_obj.ctx.stroke();	
							
					current_obj.intervalID=setInterval(function(){the_arc(current_obj,options)}, 125);
			}

		    if (!current_obj.bottomNavClicked) {
				current_obj.previous_current_img_no=current_obj.current_img_no;
			}
			current_obj.bottomNavClicked=false;

			jQuery(current_obj.currentImg.attr('data-text-id')).css("display","none");
			
			
			//deactivate previous
			if (options.skin=="opportune") {
               jQuery(bottomNavButs[current_obj.current_img_no]).removeClass('bottomNavButtonON');
            }
            //thumbs deactivate previous
            if (options.skin!="opportune") {
               jQuery(thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
			}

			bannerscollection_kenburns_playOver.css('display','none');
			
			
			//set current img
			if (current_obj.current_img_no+direction>=total_images) {
				current_obj.current_img_no=0;
			} else if (current_obj.current_img_no+direction<0) {
				current_obj.current_img_no=total_images-1;
			} else {
				current_obj.current_img_no+=direction;
			}


			if (options.skin=="opportune") {
			   jQuery(bottomNavButs[current_obj.current_img_no]).addClass('bottomNavButtonON');
			}
			
			
			//thumbs activate current
			if (options.skin!="opportune") {
			   jQuery(thumbsHolder_Thumbs[current_obj.current_img_no]).addClass('thumbsHolder_ThumbON');
			   //auto scroll carousel if needed
			   currentCarouselLeft=bannerscollection_kenburns_thumbsHolder.css('left').substr(0,bannerscollection_kenburns_thumbsHolder.css('left').lastIndexOf('px'));
			   if (current_obj.current_img_no===0 || current_obj.current_img_no===total_images-1) {
				  carouselScroll(0,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb,current_obj);
			   } else {
				 carouselScroll(1001,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb,current_obj);
			  }
            }			

			

			bannerscollection_kenburns_contentHolder.animate({
			    left:(-1)*current_obj.current_img_no*options.width+'px'
			  }, 800, 'easeOutQuad', function() {
			    // Animation complete.
				  current_obj.slideIsRunning=false;
				  bannerscollection_kenburns_reset_animate_image(current_obj);
				  current_obj.currentImg = jQuery(imgs[current_obj.current_img_no]);
				  bannerscollection_kenburns_animate_image(current_obj,options, bannerscollection_kenburns_container,origImgsDimensions,imgs);
				  
				  if (jQuery(imgs[current_obj.current_img_no]).attr('data-video')=='true')
					bannerscollection_kenburns_playOver.css('display','block');

				  //reinit content to stop videos
				  if (jQuery(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true')
				  		jQuery('#contentHolderUnit_'+current_obj.previous_current_img_no, bannerscollection_kenburns_container).html(jQuery(imgs[current_obj.previous_current_img_no]).html());
				  
				  //reposition previous image
				  initialPositioning(current_obj.previous_current_img_no,options, bannerscollection_kenburns_container,origImgsDimensions,imgs);

				  animate_texts(current_obj,options,bannerscollection_kenburns_the,bannerControls);
					
				  if (options.autoPlay>0 && total_images>1 && !current_obj.mouseOverBanner) {
					  clearTimeout(current_obj.timeoutID);
					  current_obj.timeoutID=setTimeout(function(){ bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb)},options.autoPlay*1000);
				  }						  
			});					

			
		} // if navigateAllowed
		
	};
	






    function carouselScroll(direction,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb,current_obj) {
		currentCarouselLeft=bannerscollection_kenburns_thumbsHolder.css('left').substr(0,bannerscollection_kenburns_thumbsHolder.css('left').lastIndexOf('px'));
		if (direction===1 || direction===-1) {
			current_obj.isCarouselScrolling=true;
			bannerscollection_kenburns_thumbsHolder.css('opacity','0.5');
			bannerscollection_kenburns_thumbsHolder.animate({
			    opacity: 1,
			    left: '+='+direction*current_obj.carouselStep
			  }, 500, 'easeOutCubic', function() {
			      // Animation complete.
				  disableCarouselNav(current_obj,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb);						  
				  current_obj.isCarouselScrolling=false;
			});				
		} else {
				if ( currentCarouselLeft != (-1) * Math.floor( current_obj.current_img_no/options.numberOfThumbsPerScreen )*current_obj.carouselStep) {
					current_obj.isCarouselScrolling=true;
					bannerscollection_kenburns_thumbsHolder.css('opacity','0.5');
					bannerscollection_kenburns_thumbsHolder.animate({
					    opacity: 1,
					    left: (-1) * Math.floor( current_obj.current_img_no/options.numberOfThumbsPerScreen )*current_obj.carouselStep
					  }, 500, 'easeOutCubic', function() {
					      // Animation complete.
						  disableCarouselNav(current_obj,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb);						  
						  current_obj.isCarouselScrolling=false;
					});
				}
		}
	
		
	};
	
	function disableCarouselNav(current_obj,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb) {
		currentCarouselLeft=bannerscollection_kenburns_thumbsHolder.css('left').substr(0,bannerscollection_kenburns_thumbsHolder.css('left').lastIndexOf('px'));
		if (currentCarouselLeft <0 ) {
			if (bannerscollection_kenburns_carouselLeftNav.hasClass('carouselLeftNavDisabled'))
				bannerscollection_kenburns_carouselLeftNav.removeClass('carouselLeftNavDisabled');
		} else {
			bannerscollection_kenburns_carouselLeftNav.addClass('carouselLeftNavDisabled');
		}		
		
		if (Math.abs(currentCarouselLeft-current_obj.carouselStep)<(thumbsHolder_Thumb.width()+thumbMarginLeft)*total_images) {
			if (bannerscollection_kenburns_carouselRightNav.hasClass('carouselRightNavDisabled'))
				bannerscollection_kenburns_carouselRightNav.removeClass('carouselRightNavDisabled');
		} else {
			bannerscollection_kenburns_carouselRightNav.addClass('carouselRightNavDisabled');
		}				
	};




			function rearangethumbs(current_obj,options,total_images,bannerscollection_kenburns_container,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb,bannerscollection_kenburns_thumbsHolderVisibleWrapper,bannerscollection_kenburns_thumbsHolderWrapper) {
						//thumbs
						
						if (options.skin!="opportune") {
							bannerscollection_kenburns_thumbsHolderWrapper.css("top",options.height+'px');
							bannerscollection_kenburns_thumbsHolderWrapper.css('margin-top',parseInt(options.thumbsWrapperMarginTop/(options.origWidth/options.width))+'px');
							bannerscollection_kenburns_thumbsHolderWrapper.css("height",parseInt(options.origthumbsHolderWrapperH/(options.origWidth/options.width))+'px');

							bgTopCorrection=0;

							bannerscollection_kenburns_carouselLeftNav.css('background-position','0px '+((bannerscollection_kenburns_thumbsHolderWrapper.height()-options.origthumbsHolderWrapperH)/2+bgTopCorrection)+'px');
							bannerscollection_kenburns_carouselRightNav.css('background-position','0px '+((bannerscollection_kenburns_thumbsHolderWrapper.height()-options.origthumbsHolderWrapperH)/2+bgTopCorrection)+'px');
							
							bannerscollection_kenburns_thumbsHolderVisibleWrapper.css('width',options.width-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width());
							options.origWidthThumbsHolderVisibleWrapper=options.origWidth-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width()	;				
							

							thumbsHolder_Thumbs.css('width',parseInt(options.origThumbW/(options.origWidthThumbsHolderVisibleWrapper/bannerscollection_kenburns_thumbsHolderVisibleWrapper.width()))+'px');
							thumbsHolder_Thumbs.css('height',parseInt(options.origThumbH/(options.origWidthThumbsHolderVisibleWrapper/bannerscollection_kenburns_thumbsHolderVisibleWrapper.width()))+'px');
							
							if (options.numberOfThumbsPerScreen >= total_images) {
								bannerscollection_kenburns_thumbsHolderVisibleWrapper.css('left',parseInt((bannerscollection_kenburns_thumbsHolderWrapper.width() - (thumbsHolder_Thumb.width()+thumbMarginLeft)*total_images)/2)+'px');
							}							
							
							
							var img_inside = jQuery('.thumbsHolder_ThumbOFF', bannerscollection_kenburns_container).find('img:first');
							
							img_inside.css('width',thumbsHolder_Thumbs.width()+'px');
							img_inside.css('height',thumbsHolder_Thumbs.height()+'px');
							img_inside.css("margin-top",parseInt((bannerscollection_kenburns_thumbsHolderWrapper.height()-thumbsHolder_Thumbs.height())/2)+"px");
							
							
							thumbMarginLeft=Math.floor( (bannerscollection_kenburns_thumbsHolderWrapper.width()-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width()-thumbsHolder_Thumb.width()*options.numberOfThumbsPerScreen)/(options.numberOfThumbsPerScreen-1) );
							thumb_i=-1;
							bannerscollection_kenburns_thumbsHolder.children().each(function() {
								thumb_i++;
								theThumb = jQuery(this);
								theThumb.css('background-position','center '+(options.thumbsOnMarginTop/(options.origWidth/options.width))+'px');
								if ( thumb_i<=0 ) {
									theThumb.css('margin-left',Math.floor( ( bannerscollection_kenburns_thumbsHolderWrapper.width()-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width()-(thumbMarginLeft+theThumb.width())*(options.numberOfThumbsPerScreen-1) - theThumb.width() )/2 )+'px');
								} else {
									theThumb.css('margin-left',thumbMarginLeft+'px');		
								}
							});

							current_obj.carouselStep=(thumbsHolder_Thumb.width()+thumbMarginLeft)*options.numberOfThumbsPerScreen;

						}				
			}






			function doResize(current_obj,options,total_images,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolderVisibleWrapper,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bottomNavButs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb,bannerscollection_kenburns_leftNav,bottomNavBut,bannerscollection_kenburns_bottomNav,bannerscollection_kenburns_thumbsHolderVisibleWrapper,bannerscollection_kenburns_thumbsHolderWrapper) {
					
					var bodyOverflow_initial=jQuery('body').css('overflow');
					jQuery('body').css('overflow','hidden');
					
					responsiveWidth=bannerscollection_kenburns_the.parent().parent().width();
					responsiveHeight=bannerscollection_kenburns_the.parent().parent().height();
					if (options.responsiveRelativeToBrowser) {
						responsiveWidth=jQuery(window).width();
						responsiveHeight=jQuery(window).height();
					}
					

					if (options.width100Proc) {
						options.width=responsiveWidth;
					}
					
					if (options.height100Proc) {
						options.height=responsiveHeight;
					}

					if (options.origWidth!=responsiveWidth || options.width100Proc) {
						if (options.origWidth>responsiveWidth || options.width100Proc) {
							options.width=responsiveWidth;
						} else if (!options.width100Proc) {
							options.width=options.origWidth;
						}
						if (!options.height100Proc)
							options.height=options.width/current_obj.bannerRatio;

						
						//set banner size
						bannerscollection_kenburns_container.width(options.width);
						bannerscollection_kenburns_container.height(options.height);
						
						bannerscollection_kenburns_contentHolderVisibleWrapper.width(options.width);
						bannerscollection_kenburns_contentHolderVisibleWrapper.height(options.height);
						
						bannerscollection_kenburns_contentHolder.width(options.width);
						bannerscollection_kenburns_contentHolder.height(options.height);
						
						bannerControls.css('margin-top',parseInt((options.height-bannerscollection_kenburns_leftNav.height())/2)+'px');

						
						bannerscollection_kenburns_reset_animate_image(current_obj);
						contentHolderUnit = jQuery('.contentHolderUnit', bannerscollection_kenburns_container);
						contentHolderUnit.width(options.width);
						contentHolderUnit.height(options.height);

						holderWidth=options.width*total_images;
						for (i=0; i<total_images; i++) {
							initialPositioning(i,options, bannerscollection_kenburns_container,origImgsDimensions,imgs);
							//reposition text
							jQuery(jQuery(imgs[i]).attr('data-text-id')).css('width',bannerscollection_kenburns_the.width()+'px');
							jQuery(jQuery(imgs[i]).attr('data-text-id')).css('left',parseInt(i*options.width));
							jQuery(jQuery(imgs[i]).attr('data-text-id')).css('top',bannerControls.css('top'));							
						}

						
	
						bannerscollection_kenburns_contentHolder.width(holderWidth);

						if (options.skin=="opportune") {
							bannerscollection_kenburns_bottomNav.css("left",parseInt((bannerscollection_kenburns_container.width()-bannerscollection_kenburns_bottomNav.width())/2)+'px');
							bannerscollection_kenburns_bottomNav.css("top",options.height+'px');
							if (options.width100Proc && options.height100Proc) {
								// nothing
							} else {
								bannerscollection_kenburns_bottomNav.css('margin-top',parseInt(options.thumbsWrapperMarginTop/(options.origWidth/options.width))+'px');
							}
						} else {
							rearangethumbs(current_obj,options,total_images,bannerscollection_kenburns_container,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb,bannerscollection_kenburns_thumbsHolderVisibleWrapper,bannerscollection_kenburns_thumbsHolderWrapper);
						}
						

		 
		 
					//playover
					bannerscollection_kenburns_playOver.css('left',parseInt((options.width-bannerscollection_kenburns_playOver.width())/2)+'px');
					bannerscollection_kenburns_playOver.css('top',parseInt((options.height-bannerscollection_kenburns_playOver.height())/2)+'px');	

					
					clearTimeout(current_obj.timeoutID);
					
					bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb);	 
						
						
					}
					

					jQuery('body').css('overflow',bodyOverflow_initial);
			}		


	
	$.fn.bannerscollection_kenburns = function(options) {

		var options = $.extend({},$.fn.bannerscollection_kenburns.defaults, options);

		return this.each(function() {
			var bannerscollection_kenburns_the = jQuery(this);
					responsiveWidth=bannerscollection_kenburns_the.parent().width();
					responsiveHeight=bannerscollection_kenburns_the.parent().height();
					if (options.responsiveRelativeToBrowser) {
						responsiveWidth=jQuery(window).width();
						responsiveHeight=jQuery(window).height();
					}			
					options.origWidth=options.width;
					if (options.width100Proc)
						options.width=responsiveWidth;
					
					options.origHeight=options.height;
					if (options.height100Proc) {
						options.height=responsiveHeight;
					}
						
					if (options.responsive && (options.origWidth!=responsiveWidth || options.width100Proc)) {
						if (options.origWidth>responsiveWidth || options.width100Proc) {
							options.width=responsiveWidth;
						} else {
							options.width=options.origWidth;
						}
						if (!options.height100Proc)
							options.height=options.width/(options.origWidth/options.origHeight);	
					}

				
			
			//the controllers
			var bannerscollection_kenburns_wrap = jQuery('<div></div>').addClass('bannerscollection_kenburns').addClass(options.skin);
			var bannerControls = jQuery('<div class="bannerControls">   <div class="leftNav"></div>   <div class="rightNav"></div>      </div>  <div class="contentHolderVisibleWrapper"><div class="contentHolder"></div></div>   <div class="playOver"></div>  <div class="thumbsHolderWrapper"><div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div></div> <canvas class="mycanvas"></canvas>');
			bannerscollection_kenburns_the.wrap(bannerscollection_kenburns_wrap);
			bannerscollection_kenburns_the.after(bannerControls);
			

			
			//the elements
			var bannerscollection_kenburns_container = bannerscollection_kenburns_the.parent('.bannerscollection_kenburns');
			var bannerControls = jQuery('.bannerControls', bannerscollection_kenburns_container);
			
			
			var bannerscollection_kenburns_contentHolderVisibleWrapper = jQuery('.contentHolderVisibleWrapper', bannerscollection_kenburns_container);
			var bannerscollection_kenburns_contentHolder = jQuery('.contentHolder', bannerscollection_kenburns_container);			
			
			
			var bottomNav_aux=jQuery('<div class="bottomNav"></div>');
			
			bannerscollection_kenburns_the.after(bottomNav_aux);
			 
			if (!options.showAllControllers)
				bannerControls.css("display","none");			
			

			
			
			var bannerscollection_kenburns_leftNav = jQuery('.leftNav', bannerscollection_kenburns_container);
			var bannerscollection_kenburns_rightNav = jQuery('.rightNav', bannerscollection_kenburns_container);
			bannerscollection_kenburns_leftNav.css("display","none");
			bannerscollection_kenburns_rightNav.css("display","none");			
			if (options.showNavArrows) {
				if (options.showOnInitNavArrows) {
					bannerscollection_kenburns_leftNav.css("display","block");
					bannerscollection_kenburns_rightNav.css("display","block");
				}
			}
			
			var bannerscollection_kenburns_bottomNav = jQuery('.bottomNav', bannerscollection_kenburns_container);
			var bannerscollection_kenburns_bottomOverThumb;
			if (options.skin=="opportune") {
				bannerscollection_kenburns_bottomNav.css("display","block");
				bannerscollection_kenburns_bottomNav.css("top",options.height+'px');
				if (options.width100Proc && options.height100Proc) {
					bannerscollection_kenburns_bottomNav.css("margin-top",options.thumbsWrapperMarginTop+'px');
				} else {
					bannerscollection_kenburns_bottomNav.css("margin-top",options.thumbsWrapperMarginTop/(options.origWidth/options.width)+'px');
				}
			}
			
			if (!options.showBottomNav) {
				bannerscollection_kenburns_bottomNav.css("display","none");
			}
			if (!options.showOnInitBottomNav) {
				bannerscollection_kenburns_bottomNav.css("left","-5000px");
			}
			



            //thumbs
			var bannerscollection_kenburns_thumbsHolderWrapper = jQuery('.thumbsHolderWrapper', bannerscollection_kenburns_container);
            var bannerscollection_kenburns_thumbsHolderVisibleWrapper = jQuery('.thumbsHolderVisibleWrapper', bannerscollection_kenburns_container);
			var bannerscollection_kenburns_thumbsHolder = jQuery('.thumbsHolder', bannerscollection_kenburns_container);
			
			var bannerscollection_kenburns_carouselLeftNav;
			var bannerscollection_kenburns_carouselRightNav;
			bannerscollection_kenburns_carouselLeftNav=jQuery('<div class="carouselLeftNav"></div>');
			bannerscollection_kenburns_carouselRightNav=jQuery('<div class="carouselRightNav"></div>');
			bannerscollection_kenburns_thumbsHolderWrapper.append(bannerscollection_kenburns_carouselLeftNav);
			bannerscollection_kenburns_thumbsHolderWrapper.append(bannerscollection_kenburns_carouselRightNav);
			bannerscollection_kenburns_carouselRightNav.css('right','0');
			
			bannerscollection_kenburns_thumbsHolder.css('width',bannerscollection_kenburns_carouselLeftNav.width()+'px');
			
			var thumbMarginLeft=0;
			
			if (!options.showBottomNav || !options.showOnInitBottomNav) {
				bannerscollection_kenburns_thumbsHolderWrapper.css("opacity",0);
				bannerscollection_kenburns_thumbsHolderWrapper.css("display","none");
			}
				
				
			if (options.skin!="opportune") {
					bannerscollection_kenburns_thumbsHolderWrapper.css('margin-top',parseInt(options.thumbsWrapperMarginTop/(options.origWidth/options.width))+'px');
			}

			
			
			if (options.enableTouchScreen) {
				bannerscollection_kenburns_contentHolder.css('cursor','url('+options.absUrl+'skins/hand.cur),url('+options.absUrl+'skins/hand.cur),move');
				bannerscollection_kenburns_container.css('cursor','url(skins/hand.cur),url(skins/hand.cur),move');
				bannerscollection_kenburns_contentHolder.css('left','0');
				bannerscollection_kenburns_contentHolder.draggable({ 
					axis: 'x',
					distance:10,
					start: function(event, ui) {
						origLeft=parseInt(jQuery(this).css('left'));
						bannerscollection_kenburns_playOver.css('display','none');
					},
					stop: function(event, ui) {
						if (!current_obj.slideIsRunning) {
							finalLeft=parseInt(jQuery(this).css('left'));
							direction=1;
							if (origLeft<finalLeft) {
								direction=-1;
							}	
							bannerscollection_kenburns_navigation(direction,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb);
						}
					}
				});
		
			}
			
			
			
			
			//the vars
			var bannerscollection_kenburns_playOver=jQuery('.playOver', bannerscollection_kenburns_container);
			bannerscollection_kenburns_playOver.css('left',parseInt((options.width-bannerscollection_kenburns_playOver.width())/2)+'px');
			bannerscollection_kenburns_playOver.css('top',parseInt((options.height-bannerscollection_kenburns_playOver.height())/2)+'px');			

			//var total_images=0;
			var current_obj = {
					current_img_no:0,
					currentImg:0,
					previous_current_img_no:0,
					slideIsRunning:false,
					mouseOverBanner:false,
					isVideoPlaying:false,
					bottomNavClicked:false,
					current_imgInside:'',
					carouselStep:0,
					timeoutID:'',
					intervalID:'',
					arcInitialTime:(new Date).getTime(),
					timeElapsed:0,
					canvas:'',
					ctx:'',
					bannerRatio:options.origWidth/options.origHeight,
					msiInterval:'',
					msiInitialTime:(new Date).getTime()
				};
			
							
				
			if (options.showCircleTimer) {	
				current_obj.canvas = jQuery('.mycanvas', bannerscollection_kenburns_container)[0];
				current_obj.canvas.width=2*options.circleRadius+4*options.circleLineWidth;
				current_obj.canvas.height=2*options.circleRadius+4*options.circleLineWidth;
				
				if (jQuery.browser.msie) {
					if (parseInt(jQuery.browser.version)<9) {
					   current_obj.canvas = G_vmlCanvasManager.initElement(current_obj.canvas);
					   if (!options.showCircleTimerIE8IE7 && options.showCircleTimer) {
						   options.showCircleTimer=false;
					   }
					}
				}
				current_obj.ctx = current_obj.canvas.getContext('2d');
			}
 				
			var origImgsDimensions=new Array();

			
			var previousBottomHovered=0;
			var i = 0;

			
			//set banner size
			bannerscollection_kenburns_container.width(options.width);
			bannerscollection_kenburns_container.height(options.height);
			
			bannerscollection_kenburns_contentHolderVisibleWrapper.width(options.width);
			bannerscollection_kenburns_contentHolderVisibleWrapper.height(options.height);
			
			bannerscollection_kenburns_contentHolder.width(options.width);
			bannerscollection_kenburns_contentHolder.height(options.height);

			bannerControls.css('margin-top',parseInt((options.height-bannerscollection_kenburns_leftNav.height())/2)+'px');
			


			
			//get images
			var theul=bannerscollection_kenburns_the.find('ul:first');
			
			var total_images=0;
			var imgs = theul.children();
			var contentHolderUnit;
			var holderWidth=0;
			var bottomNavBut;
			var bottomNavWidth=0;
			var bottomNavMarginTop=0;
			var imgInside;
			var thumbsHolder_Thumb;
			var thumbsHolder_MarginTop=0;
			imgs.each(function() {
	            current_obj.currentImg = jQuery(this);
	            if(!current_obj.currentImg.is('li')){
	            	current_obj.currentImg = current_obj.currentImg.find('li:first');
	            }

	            	
	            if(current_obj.currentImg.is('li')){
	            	total_images++;
	            	contentHolderUnit = jQuery('<div class="contentHolderUnit" rel="'+ (total_images-1) +'" id="contentHolderUnit_'+ (total_images-1) +'">'+current_obj.currentImg.html()+'</div>');
	            	contentHolderUnit.width(options.width);
	            	contentHolderUnit.height(options.height);
	            	bannerscollection_kenburns_contentHolder.append(contentHolderUnit);
	            	holderWidth=holderWidth+options.width;
	            	
	            	current_obj.current_img_no=total_images-1;
	            	imgInside = jQuery('#contentHolderUnit_'+current_obj.current_img_no, bannerscollection_kenburns_container).find('img:first');
	            	origImgsDimensions[total_images-1]=imgInside.width()+';'+imgInside.height();
	            	initialPositioning((total_images-1),options, bannerscollection_kenburns_container,origImgsDimensions,imgs);
	            	
		            //generate bottomNav
		            if (options.skin=="opportune") {
		                       bottomNavBut = jQuery('<div class="bottomNavButtonOFF" rel="'+ (total_images-1) +'"></div>');
		                       bannerscollection_kenburns_bottomNav.append(bottomNavBut);
		            
		            
		                       bottomNavWidth+=parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2))+bottomNavBut.width();
                               bottomNavMarginTop=parseInt((bannerscollection_kenburns_bottomNav.height()-parseInt(bottomNavBut.css('height').substring(0, bottomNavBut.css('height').length-2)))/2);
                               bottomNavBut.css('margin-top',bottomNavMarginTop+'px');
							   
                   }
                   

		            //thumbs generate thumbsHolder
              if (options.skin!="opportune") {
					image_name=jQuery(imgs[total_images-1]).attr('data-bottom-thumb');
					thumbsHolder_Thumb = jQuery('<div class="thumbsHolder_ThumbOFF" rel="'+ (total_images-1) +'"><img src="'+ image_name + '"></div>');
		            bannerscollection_kenburns_thumbsHolder.append(thumbsHolder_Thumb);
		            if (options.origThumbW==0) {

					   	if (options.numberOfThumbsPerScreen==0) {
							options.numberOfThumbsPerScreen=Math.floor((options.origWidth-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width())/thumbsHolder_Thumb.width());
						}
						options.origThumbW=thumbsHolder_Thumb.width();
						options.origThumbH=thumbsHolder_Thumb.height();
						options.origthumbsHolderWrapperH=bannerscollection_kenburns_thumbsHolderWrapper.height();
						thumbMarginLeft=Math.floor( (options.origWidth-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width()-thumbsHolder_Thumb.width()*options.numberOfThumbsPerScreen)/(options.numberOfThumbsPerScreen-1) );
                    }


		            bannerscollection_kenburns_thumbsHolder.css('width',bannerscollection_kenburns_thumbsHolder.width()+thumbMarginLeft+thumbsHolder_Thumb.width()+'px');
	            
		            thumbsHolder_MarginTop=parseInt((bannerscollection_kenburns_thumbsHolderWrapper.height()-parseInt(thumbsHolder_Thumb.css('height').substring(0, thumbsHolder_Thumb.css('height').length-2)))/2);

                }
           
                   
                   
		            
		            bannerscollection_kenburns_contentHolder.append(jQuery(current_obj.currentImg.attr('data-text-id')));
		    		jQuery(current_obj.currentImg.attr('data-text-id')).css('width',bannerscollection_kenburns_the.width()+'px');
		    		jQuery(current_obj.currentImg.attr('data-text-id')).css('left',parseInt((total_images-1)*options.width));
		    		jQuery(current_obj.currentImg.attr('data-text-id')).css('top',bannerControls.css('top'));		            
	            }	            

	        });		
			bannerscollection_kenburns_contentHolder.width(holderWidth);
			
			bannerscollection_kenburns_bottomNav.width(bottomNavWidth);
			if (options.showOnInitBottomNav) {
				bannerscollection_kenburns_bottomNav.css("left",parseInt((bannerscollection_kenburns_container.width()-bottomNavWidth)/2)+'px');
			}	
			

			//thumbs
        if (options.skin!="opportune") {
			bannerscollection_kenburns_thumbsHolderVisibleWrapper.css('width',options.origWidth-bannerscollection_kenburns_carouselLeftNav.width()-bannerscollection_kenburns_carouselRightNav.width());
			bannerscollection_kenburns_thumbsHolderVisibleWrapper.css('left',bannerscollection_kenburns_carouselLeftNav.width());
			
			current_obj.carouselStep=(thumbsHolder_Thumb.width()+thumbMarginLeft)*options.numberOfThumbsPerScreen;
			//disable left nav
			bannerscollection_kenburns_carouselLeftNav.addClass('carouselLeftNavDisabled');
			
			//disable right nav and center thumbs
			if (options.numberOfThumbsPerScreen >= total_images) {
				bannerscollection_kenburns_carouselRightNav.addClass('carouselRightNavDisabled');
				bannerscollection_kenburns_carouselLeftNav.css('display','none');
				bannerscollection_kenburns_carouselRightNav.css('display','none');
				bannerscollection_kenburns_thumbsHolderVisibleWrapper.css('left',parseInt((bannerscollection_kenburns_thumbsHolderWrapper.width() - (thumbsHolder_Thumb.width()+thumbMarginLeft)*total_images)/2)+'px');
			}
			
			bannerscollection_kenburns_thumbsHolderWrapper.css("top",options.height+'px');
		    

			var img_inside = jQuery('.thumbsHolder_ThumbOFF', bannerscollection_kenburns_container).find('img:first');
			img_inside.css("margin-top",thumbsHolder_MarginTop+"px");
			options.origthumbsHolder_MarginTop=thumbsHolder_MarginTop;

         }

		var thumbsHolder_Thumbs=jQuery('.thumbsHolder_ThumbOFF', bannerscollection_kenburns_container);
		rearangethumbs(current_obj,options,total_images,bannerscollection_kenburns_container,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb,bannerscollection_kenburns_thumbsHolderVisibleWrapper,bannerscollection_kenburns_thumbsHolderWrapper);		 
			
			//for youtube iframes
			jQuery("iframe", bannerscollection_kenburns_container).each(function(){
			      var ifr_source = jQuery(this).attr('src');
			      var wmode = "?wmode=transparent";
			      jQuery(this).attr('src',ifr_source+wmode);
			});
			
			
			
			
	        //initialize first number image
			current_obj.current_img_no=0;
			
	        
	        
			current_obj.currentImg = jQuery(imgs[0]);
			var firstImg=bannerscollection_kenburns_container.find('img:first');

			if (firstImg[0].complete) {
				jQuery('.myloader', bannerscollection_kenburns_container).css('display','none');
				bannerscollection_kenburns_animate_image(current_obj,options, bannerscollection_kenburns_container,origImgsDimensions,imgs);
				animate_texts(current_obj,options,bannerscollection_kenburns_the,bannerControls);						 
			} else {
			firstImg.load(function() {
				jQuery('.myloader', bannerscollection_kenburns_container).css('display','none');
				bannerscollection_kenburns_animate_image(current_obj,options, bannerscollection_kenburns_container,origImgsDimensions,imgs);
				animate_texts(current_obj,options,bannerscollection_kenburns_the,bannerControls);			  
			});
			}

			

			
			//pause on hover
			bannerscollection_kenburns_container.mouseenter(function() {
                current_obj.mouseOverBanner=true;
				clearTimeout(current_obj.timeoutID);
				nowx = (new Date).getTime();
				current_obj.timeElapsed=current_obj.timeElapsed+(nowx-current_obj.arcInitialTime);
				
				
				if (options.autoHideNavArrows && options.showNavArrows) {
					bannerscollection_kenburns_leftNav.css("display","block");
					bannerscollection_kenburns_rightNav.css("display","block");
				}
                if (options.autoHideBottomNav && options.showBottomNav) {
				    if (options.skin=="opportune") {
					   bannerscollection_kenburns_bottomNav.css("display","block");
					   bannerscollection_kenburns_bottomNav.css("left",parseInt((bannerscollection_kenburns_container.width()-bottomNavWidth)/2)+'px');
                     } else {
						 	if (options.thumbsWrapperMarginTop<0 && current_obj.isVideoPlaying) {
                       			//nothing
							} else {
								if (options.showBottomNav) {
									bannerscollection_kenburns_thumbsHolderWrapper
									.stop()
									.animate({
										opacity:1
									}, 500, 'swing', function() {
									 //complete
									});
								}								
							}
                     }
	
				}				
			});
			
			bannerscollection_kenburns_container.mouseleave(function() {
				current_obj.mouseOverBanner=false;
				nowx = (new Date).getTime();
				if (options.autoHideNavArrows && options.showNavArrows && !current_obj.isVideoPlaying) {
					bannerscollection_kenburns_leftNav.css("display","none");
					bannerscollection_kenburns_rightNav.css("display","none");
				}
				if (options.autoHideBottomNav && options.showBottomNav) {
				   if (options.skin=="opportune") {
       					bannerscollection_kenburns_bottomNav.css("display","none");
				   } else	 {
           				bannerscollection_kenburns_thumbsHolderWrapper
									.stop()
									.animate({
										opacity:0
									}, 300, 'swing', function() {
									 //complete
									});
				   }
				}	
                			
				if (options.autoPlay>0 && total_images>1 && !current_obj.isVideoPlaying) {
					clearTimeout(current_obj.timeoutID);

					
				    current_obj.arcInitialTime = (new Date).getTime();
					var new_delay = parseInt(options.autoPlay*1000-((current_obj.timeElapsed+nowx)-current_obj.arcInitialTime));
					current_obj.timeoutID=setTimeout(function(){ bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb)},new_delay);
				}
			});
			
			
			var contentHolderUnit=jQuery('.contentHolderUnit', bannerscollection_kenburns_contentHolder);
			if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('Android') == -1) {
				contentHolderUnit.css("z-index","1");
			} else if (navigator.userAgent.indexOf('Chrome') != -1 && navigator.userAgent.indexOf('Android') == -1) {
				contentHolderUnit.css("z-index","1");
			}
			contentHolderUnit.click(function() {
				var i=jQuery(this).attr('rel');
				if (jQuery(imgs[current_obj.current_img_no]).attr('data-video')=='true') {
					if (i!=current_obj.current_img_no) {
						current_obj.isVideoPlaying=false;
					} else {
						clearTimeout(current_obj.timeoutID);
						bannerscollection_kenburns_reset_animate_image(current_obj);
		
						imgInside = jQuery(this).find('img:first');
						imgInside.css('display','none');
						bannerscollection_kenburns_playOver.css('display','none');
						var texts = jQuery(current_obj.currentImg.attr('data-text-id')).children();
				        texts.css("opacity",0);
                        current_obj.isVideoPlaying=true;
						
						if (options.thumbsWrapperMarginTop<0) {
                       			bannerscollection_kenburns_thumbsHolderWrapper.css("display","none");
 								if (options.skin=="opportune") {
					   				bannerscollection_kenburns_bottomNav.css("display","none");								
								}					
						}
						if (options.showCircleTimer) {
								clearInterval(current_obj.intervalID);

								current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
								current_obj.ctx.beginPath();
								current_obj.ctx.globalAlpha=0;
								current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0, false);
								current_obj.ctx.lineWidth = options.circleLineWidth+2;
								current_obj.ctx.strokeStyle = options.behindCircleColor;
								current_obj.ctx.stroke();            
								
								
								current_obj.ctx.beginPath();
								current_obj.ctx.globalAlpha=0;
								current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0,  false);
								current_obj.ctx.lineWidth = options.circleLineWidth;
								current_obj.ctx.strokeStyle = options.circleColor;
								current_obj.ctx.stroke();	

						}						
					}
				}

				if (jQuery(imgs[current_obj.current_img_no]).attr('data-link')!=undefined && i==current_obj.current_img_no && jQuery(imgs[current_obj.current_img_no]).attr('data-link')!='') {
					var cur_target=options.target;
					if (jQuery(imgs[current_obj.current_img_no]).attr('data-target')!=undefined && jQuery(imgs[current_obj.current_img_no]).attr('data-target')!=''){
						cur_target=jQuery(imgs[current_obj.current_img_no]).attr('data-target');
					}
					
					if (cur_target=="_blank")
						window.open(jQuery(imgs[current_obj.current_img_no]).attr('data-link'));
					else
						window.location = jQuery(imgs[current_obj.current_img_no]).attr('data-link');
				}
			});
			
			
			bannerscollection_kenburns_playOver.click(function() {
				bannerscollection_kenburns_playOver.css('display','none');						
				clearTimeout(current_obj.timeoutID);
				bannerscollection_kenburns_reset_animate_image(current_obj);
				
				imgInside = jQuery('#contentHolderUnit_'+current_obj.current_img_no, bannerscollection_kenburns_container).find('img:first');
				imgInside.css('display','none');
				var texts = jQuery(current_obj.currentImg.attr('data-text-id')).children();
				texts.css("opacity",0);
				current_obj.isVideoPlaying=true;	
				
						if (options.thumbsWrapperMarginTop<0) {
                       			bannerscollection_kenburns_thumbsHolderWrapper.css("display","none");
								if (options.skin=="opportune") {
					   				bannerscollection_kenburns_bottomNav.css("display","none");								
								}								
						}					

						if (options.showCircleTimer) {
								clearInterval(current_obj.intervalID);

								current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
								current_obj.ctx.beginPath();
								current_obj.ctx.globalAlpha=0;
								current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0, false);
								current_obj.ctx.lineWidth = options.circleLineWidth+2;
								current_obj.ctx.strokeStyle = options.behindCircleColor;
								current_obj.ctx.stroke();            
								
								
								current_obj.ctx.beginPath();
								current_obj.ctx.globalAlpha=0;
								current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0,  false);
								current_obj.ctx.lineWidth = options.circleLineWidth;
								current_obj.ctx.strokeStyle = options.circleColor;
								current_obj.ctx.stroke();	

						}					
			});			
			
			
			
			//controllers
			bannerscollection_kenburns_leftNav.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					
					if (options.showBottomNav) {
						bannerscollection_kenburns_thumbsHolderWrapper.css("opacity",1);
						bannerscollection_kenburns_thumbsHolderWrapper.css("display","block");
						if (options.skin=="opportune") {
					   		bannerscollection_kenburns_bottomNav.css("display","block");								
						}						
					}

					
					clearTimeout(current_obj.timeoutID);
					bannerscollection_kenburns_navigation(-1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb);
				}
			});
			bannerscollection_kenburns_rightNav.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					
					if (options.showBottomNav) {
						bannerscollection_kenburns_thumbsHolderWrapper.css("opacity",1);
						bannerscollection_kenburns_thumbsHolderWrapper.css("display","block");
						if (options.skin=="opportune") {
					   		bannerscollection_kenburns_bottomNav.css("display","block");								
						}						
					}					
					
					clearTimeout(current_obj.timeoutID);
					bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb);
				}
			});
			
			
			
			
			
			
			
			
			
			
			
			var TO = false;
			jQuery(window).resize(function() {
				
				doResizeNow=true;
				if (navigator.userAgent.indexOf('Android') != -1) {
					if (options.windowOrientationScreenSize0==0 && window.orientation==0)
						options.windowOrientationScreenSize0=jQuery(window).width();
						
					if (options.windowOrientationScreenSize90==0 && window.orientation==90)
						options.windowOrientationScreenSize90=jQuery(window).height();	
						
					if (options.windowOrientationScreenSize_90==0 && window.orientation==-90)
						options.windowOrientationScreenSize_90=jQuery(window).height();						
					
					if (options.windowOrientationScreenSize0 && window.orientation==0 && jQuery(window).width()>options.windowOrientationScreenSize0)	
						doResizeNow=false;

					if (options.windowOrientationScreenSize90 && window.orientation==90 && jQuery(window).height()>options.windowOrientationScreenSize90)	
						doResizeNow=false;
						
					if (options.windowOrientationScreenSize_90 && window.orientation==-90 && jQuery(window).height()>options.windowOrientationScreenSize_90)	
						doResizeNow=false;												

				}

				
				if (options.responsive && doResizeNow) {
					 if(TO !== false)
						clearTimeout(TO);
					 
					
					 TO = setTimeout(function(){ doResize(current_obj,options,total_images,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolderVisibleWrapper,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bottomNavButs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb,bannerscollection_kenburns_leftNav,bottomNavBut,bannerscollection_kenburns_bottomNav,bannerscollection_kenburns_thumbsHolderVisibleWrapper,bannerscollection_kenburns_thumbsHolderWrapper) }, 300); //200 is time in miliseconds
				}
			});



			//bottom nav
			var bottomNavButs=jQuery('.bottomNavButtonOFF', bannerscollection_kenburns_container);
            if (options.skin=="opportune") {
			
			
			bottomNavButs.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					
					var currentBut=jQuery(this);
					var i=currentBut.attr('rel');
					//deactivate previous 
					jQuery(bottomNavButs[current_obj.current_img_no]).removeClass('bottomNavButtonON');
					current_obj.previous_current_img_no=current_obj.current_img_no;
					current_obj.bottomNavClicked=true;
					

					current_obj.current_img_no=i-1;
					clearTimeout(current_obj.timeoutID);
					
					bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb);

				}
			});
			
			bottomNavButs.mouseenter(function() {
				var currentBut=jQuery(this);
				var i=currentBut.attr('rel');
				
				
				
				if (options.showPreviewThumbs) {
					bannerscollection_kenburns_bottomOverThumb = jQuery('<div class="bottomOverThumb"></div>');
					currentBut.append(bannerscollection_kenburns_bottomOverThumb);
					var image_name=jQuery(imgs[i]).attr('data-bottom-thumb');
					var previous_image=jQuery(imgs[previousBottomHovered]).attr('data-bottom-thumb');
					var thumb_marginLeft=80; //80 thumb width, 4 border
					var thumb_marginLeftFinal=-80;
					if (previousBottomHovered>i) {
					   thumb_marginLeft=-80;
					   thumb_marginLeftFinal=80;
		             }
					var thumb_marginTop=-80;
					bannerscollection_kenburns_bottomOverThumb.html('');
                    bannerscollection_kenburns_bottomOverThumb.html('<div class="innerBottomOverThumb"><img src="'+ previous_image + '"style="margin:0px;" id="oldThumb"><img src="'+ image_name + '" style="margin-top:'+thumb_marginTop+'px; margin-left:'+thumb_marginLeft+'px;" id="newThumb"></div>');
                    jQuery('#newThumb')
                         .stop()
                         .animate({
                            marginLeft:'0px'
                          },150,function(){
                                bannerscollection_kenburns_bottomOverThumb.html('<div class="innerBottomOverThumb"><img src="'+ image_name + '"></div>'); //opera fix
                          });                    
                    jQuery('#oldThumb')
                         .stop()
                         .animate({
                            marginLeft:thumb_marginLeftFinal+'px'
                          },150,function(){
                                //
                          });
					previousBottomHovered=i;
				}
				
				currentBut.addClass('bottomNavButtonON');
			});
			
			bottomNavButs.mouseleave(function() {
				var currentBut=jQuery(this);
				var i=currentBut.attr('rel');

				if (options.showPreviewThumbs) {
					bannerscollection_kenburns_bottomOverThumb.remove();
				}				
				
				if (current_obj.current_img_no!=i)
					currentBut.removeClass('bottomNavButtonON');
			});			
			
            } //if (options.skin=="opportune") {





			//thumbs bottom nav
			thumbsHolder_Thumbs.mousedown(function() {
				arrowClicked=true;
				if (!current_obj.effectIsRunning) {
				    current_obj.isVideoPlaying=false;
					var currentBut=jQuery(this);
					var i=currentBut.attr('rel');
					//deactivate previous 
					jQuery(thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
					current_obj.previous_current_img_no=current_obj.current_img_no;
					current_obj.bottomNavClicked=true;
					
					current_obj.current_img_no=i-1;
					bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb);
				}
			});
			thumbsHolder_Thumbs.mouseup(function() {
				arrowClicked=false;
			});				
			
			thumbsHolder_Thumbs.mouseenter(function() {
				var currentBut=jQuery(this);
				var i=currentBut.attr('rel');
				
				currentBut.addClass('thumbsHolder_ThumbON');
			});
			
			thumbsHolder_Thumbs.mouseleave(function() {
				var currentBut=jQuery(this);
				var i=currentBut.attr('rel');

				if (current_obj.current_img_no!=i)
					currentBut.removeClass('thumbsHolder_ThumbON');
			});	
			
			
			//carousel controllers
			bannerscollection_kenburns_carouselLeftNav.click(function() {
				if (!current_obj.isCarouselScrolling) {
					currentCarouselLeft=bannerscollection_kenburns_thumbsHolder.css('left').substr(0,bannerscollection_kenburns_thumbsHolder.css('left').lastIndexOf('px'));

					if (currentCarouselLeft <0 ) 
						carouselScroll(1,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb,current_obj);
				}
			});
			
			
			bannerscollection_kenburns_carouselRightNav.click(function() {
				if (!current_obj.isCarouselScrolling) {
					currentCarouselLeft=bannerscollection_kenburns_thumbsHolder.css('left').substr(0,bannerscollection_kenburns_thumbsHolder.css('left').lastIndexOf('px'));
					if (Math.abs(currentCarouselLeft-current_obj.carouselStep)<(thumbsHolder_Thumb.width()+thumbMarginLeft)*total_images) 
						carouselScroll(-1,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,options,thumbMarginLeft,total_images,thumbsHolder_Thumb,current_obj);
				}
			});




			//first start autoplay
			if (options.skin=="opportune") {
			   jQuery(bottomNavButs[current_obj.current_img_no]).addClass('bottomNavButtonON');
			}
			//thumbs
			jQuery(thumbsHolder_Thumbs[current_obj.current_img_no]).addClass('thumbsHolder_ThumbON');
			
			
		 	
			
			if (options.autoPlay>0 && total_images>1) {
				if (options.showCircleTimer) {
					current_obj.intervalID=setInterval(function(){the_arc(current_obj,options)}, 125);
				}
                current_obj.timeoutID=setTimeout(function(){ bannerscollection_kenburns_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,bannerscollection_kenburns_the,bannerControls,bannerscollection_kenburns_contentHolder,bannerscollection_kenburns_container,bannerscollection_kenburns_playOver,origImgsDimensions,thumbsHolder_Thumbs,bannerscollection_kenburns_thumbsHolder,bannerscollection_kenburns_carouselLeftNav,bannerscollection_kenburns_carouselRightNav,thumbMarginLeft,thumbsHolder_Thumb)},options.autoPlay*1000);
				
			}

			if (jQuery(imgs[current_obj.current_img_no]).attr('data-video')=='true')
				bannerscollection_kenburns_playOver.css('display','block');
			
			
		});
	};

	
	//
	// plugin skins
	//
	$.fn.bannerscollection_kenburns.defaults = {
			skin: 'opportune',
			width:918,
			height:382,
			width100Proc:false,
			height100Proc:false,			
			autoPlay:16,
			loop:true,
			
			
			horizontalPosition:'center',
			verticalPosition:'center',
			initialZoom:1,
			finalZoom:0.8,
			
			duration:20,

			initialOpacity:1,
			
			target:"_blank",
			
			showCircleTimer:true,
			showCircleTimerIE8IE7:false,
			circleRadius:10,
			circleLineWidth:4,
			circleColor: "#FF0000",
			circleAlpha: 100,
			behindCircleColor: "#000000",
			behindCircleAlpha: 50,
			responsive:true,
			responsiveRelativeToBrowser:true,
			
			numberOfThumbsPerScreen:0,
				
			thumbsOnMarginTop:0,
			thumbsWrapperMarginTop:0,
			showAllControllers:true,
			showNavArrows:true,
			showOnInitNavArrows:true, // o1
			autoHideNavArrows:true, // o1
			showBottomNav:true,
			showOnInitBottomNav:true, // o2
			autoHideBottomNav:false, // o2
			showPreviewThumbs:true,
			enableTouchScreen:true,
			absUrl:'',
			
			origWidth:0,
			origHeight:0,
			origThumbW:0,
			origThumbH:0,
			origthumbsHolderWrapperH:0,
			origthumbsHolder_MarginTop:0,
			windowOrientationScreenSize0:0,
			windowOrientationScreenSize90:0,
			windowOrientationScreenSize_90:0
			
	};

})(jQuery);
