// some known objects
var nc   =  !!(document.captureEvents  && !document.getElementById);
var nc6  =  !!(document.captureEvents  && document.documentElement);
var op6  =  !!(document.getElementById && !document.documentElement);
var op7  =  !!(window.opera && /Opera( |\/)7/i.exec(navigator.userAgent));
var ie   =  !!document.all;
var ie4  =  !!(document.all           && !document.documentElement);
var ie5  =  !!(document.all           && document.documentElement);
var dom  =  !!document.getElementById;
var mac  =  !!(navigator.userAgent.indexOf("Mac")!=-1);

// layers
function dRef(num)	{return (nc? document.layers[num] : (ie4? document.all[num]       : document.getElementById(num)))}
function dRefS(num)	{return (nc? document.layers[num] : (ie4? document.all[num].style : document.getElementById(num).style))}

var clothes = new Array("float1", "float2", "float3", "float4", "float5", "float6", "float7", "float8");

var remZIndex =  new Array();
var aktEl     =  0;
var xPos      =  0;
var yPos      =  0;
var pastX     =  0;
var pastY     =  0;
var diffX     =  0;
var diffY     =  0;

// register events within document and divs
function init() {
	if (nc) {
		document.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP); 
		for (var i = 0; i < clothes.length; i++) dRef(clothes[i]).captureEvents(Event.MOUSEDOWN); 
	} 
	document.onmousemove =  docMove;
	document.onmouseup   =  docUp;
	for (var j = 0; j < clothes.length; j++) dRef(clothes[j]).onmousedown =  divDown;
}
// mousemove in document
function docMove(e) {	
	pastX =  xPos;
	pastY =  yPos;
    xPos  =  document.captureEvents? e.pageX : window.event.x;
    yPos  =  document.captureEvents? e.pageY : window.event.y;
    
    if (aktEl) {
    	diffX =  (pastX != xPos)? pastX - xPos :  0;
    	diffY =  (pastY != yPos)? pastY - yPos :  0;
    	
    	if (diffX) dRefS(aktEl).left =  (findAktX(aktEl) - diffX) +  (dom? "px" : 0);
    	if (diffY) dRefS(aktEl).top  =  (findAktY(aktEl) - diffY) +  (dom? "px" : 0);
    }
	if (nc) routeEvent(e);
	return false;
}
// mousedown over div
function divDown(e) {	
	aktEl =  this.id;
	if (nc) routeEvent(e);
	if (aktEl != "" && aktEl != "") {
		remZIndex[remZIndex.length] =  aktEl;
		if (remZIndex.length > clothes.length) killEl(0, remZIndex);	
		for (var i = 0; i < remZIndex.length; i++) dRefS(remZIndex[i]).zIndex =  (100 + i);
	}
	return false;
}
// mouseUp over document
function docUp(e) {
	aktEl  =  0;
	if (nc) routeEvent(e);
}
function findAktX(id) {return (nc? dRefS(id).x : ((mac && ie)? dRefS(id).pixelLeft : dRef(id).offsetLeft));}
function findAktY(id) {return (nc? dRefS(id).y : ((mac && ie)? dRefS(id).pixelTop  : dRef(id).offsetTop));}
function killEl(el,arr) {
	var temp = new Array();
	for(var i in arr) {if(i != el) temp[temp.length] = arr[i];}
	return temp;
}
