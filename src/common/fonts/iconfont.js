(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-logo" viewBox="0 0 1024 1024">'+""+'<path d="M674.0659958497288 367.2948245389835c11.762854537480312 50.71097289491512 25.094089679957996 97.10889912608742 33.066691088694654 144.2910156597585 20.781043016215225 122.59508395729478-68.61665146863514 199.57643198591595-152.13291868474536 214.34534934964125-98.93867649858444 17.513583422470692-195.1326869384234-48.88119552241818-218.0049040946351-151.08733161474711C307.0649342803432 441.40080812510945 371.629935852735 321.0275966915609 499.5836535437707 271.49290925039384c7.841903024986873-3.006062826244968 15.683806049973747-6.273522419989499 26.531771901205595-10.455870699982496-4.574443431242345-17.121488271221345-8.756791711235346-34.63507169369202-13.85402867747681-51.88725834866315-35.5499603799405-119.9811162822992 78.68042701736827-229.89845701586515 197.35455946216968-198.13874976466838 32.54389755369553 8.62609332748556 63.519414502393694 26.793168668705157 91.88096377609621 45.74443431242344 28.75364442495187 19.212662411217835 31.236913716197723 54.63192440740856 11.109362618731407 80.24880762236569-19.60475756246719 24.96339129620822-53.45563895366051 27.70805735495362-81.6864898436133 8.62609332748556-14.376822212475934-9.802378781233594-30.32202502994925-18.820567259968495-46.79002138242167-23.525709074960623-36.72624583368854-10.325172316232717-64.17290642114257 12.67774322372878-60.5133516761487 50.71097289491512 2.0911741399965 22.218725237462813 9.018188478734906 44.17605370742606 15.161012514974624 65.87198540988975 1.176285453748031 4.31304666374278 8.62609332748556 9.671680397483811 13.461933526227469 9.933077164983372 225.45471196837266 13.984727061226591 417.58133608055095 302.4360599969937 237.87105842460184 572.1975240565424C752.3543277158478 1027.4523608591282 448.74198226510583 1070.7135258803055 247.98926482544192 914.3982589155676-35.887624679083046 693.3872919946876 15.47684013458121 255.8091032004201 343.26838657903227 107.46643764441842c16.860091503721783-7.580506257487312 36.464849066188954-13.2005367587279 54.501226023658774-12.67774322372878 24.832692912458434 0.7841903024986874 42.99976825367802 22.741518772461934 46.92071976617148 47.704910068670166 3.790253128743656 24.44059776120909-8.756791711235346 46.52862461492212-32.0211040186964 59.07566945490111-32.80529432119509 17.77498018997025-68.61665146863514 32.15180240244618-97.23959750983727 55.15471794240768-117.6285453748031 95.14842336984074-162.71948776847762 219.70398308338224-126.77743223728775 366.4782680343867 35.15786522869114 143.50682535725977 127.4309241560367 237.217566505853 274.7280026420401 265.1870206283062 136.18771586727203 25.878279982456693 295.90114080950485-28.23085088995274 360.59684076564645-182.1935469471951 51.36446481366402-122.07229042229565 16.729393119972-254.33905477707427-112.53130840856163-324.78548361820646-11.240061002481184-6.012125652489936-24.048502609959744-9.14888686248469-37.37973775243743-14.11542544497637z m-117.8899421423027 5.227935349991248c-35.28856361244093 10.717267467482058-63.12731935114434 27.838755738703416-84.43115590235867 54.501226023658774-33.85088139119335 42.476974718678896-37.510436136187224 113.31549871106036-8.364696559986 155.40037827848988 18.036376957469813 26.00897836620646 46.005831079923 37.118340984937845 75.67436419112337 29.929929878699898 30.452723413699033-7.319109489987751 47.966306836169714-26.4010735174558 51.4951631974138-59.46776460615046 1.6990789887471562-15.945202817473312 2.352570907496062-32.93599270494487-1.04558706999825-48.489100371168846-9.671680397483811-43.26116502117759-21.5652333187139-86.13023489110584-33.328087856194216-131.8746692035293z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)