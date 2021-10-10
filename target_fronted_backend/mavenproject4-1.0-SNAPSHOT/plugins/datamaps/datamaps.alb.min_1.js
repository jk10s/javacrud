!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo={type:"Topology",objects:{alb:{type:"GeometryCollection",geometries:[{type:"Polygon",properties:{name:"Durrës"},id:"AL.DU",arcs:[[0,1,2,3]]},{type:"Polygon",properties:{name:"Fier"},id:"AL.FI",arcs:[[4,5,6,7,8,9]]},{type:"Polygon",properties:{name:"Shkodër"},id:"AL.SD",arcs:[[10,11,12]]},{type:"Polygon",properties:{name:"Kukës"},id:"AL.KK",arcs:[[13,14,-11,15]]},{type:"MultiPolygon",properties:{name:"Vlorë"},id:"AL.VR",arcs:[[[16]],[[17,18,-8]]]},{type:"Polygon",properties:{name:"Korçë"},id:"AL.KE",arcs:[[19,20,21,22]]},{type:"Polygon",properties:{name:"Berat"},id:"AL.BE",arcs:[[-21,23,-6,24]]},{type:"Polygon",properties:{name:"Elbasan"},id:"AL.EB",arcs:[[25,-22,-25,-5,26,27]]},{type:"Polygon",properties:{name:"Gjirokastër"},id:"AL.GK",arcs:[[-20,28,-18,-7,-24]]},{type:"Polygon",properties:{name:"Dibër"},id:"AL.DB",arcs:[[29,-28,30,-1,31,-14]]},{type:"Polygon",properties:{name:"Lezhë"},id:"AL.LZ",arcs:[[-32,-4,32,-12,-15]]},{type:"Polygon",properties:{name:"Durrës"},id:"AL.DU",arcs:[[-27,-10,33,-2,-31]]}]}},arcs:[[[3238,6394],[200,-111],[222,-78]],[[3660,6205],[-7,-35],[-6,-19],[-16,-17],[-73,-63],[-46,-26],[-97,-42],[-50,-9],[-43,3],[-54,20],[-25,5],[-13,-10],[-6,-13],[-12,-13],[-27,-8],[-233,-42],[-164,-51],[-59,-13],[-48,-7],[-67,1],[-35,9],[-23,20],[-13,17],[-14,10],[-15,7],[-26,10],[-19,15],[-12,16],[-18,55],[-16,19],[-22,8],[-29,-16],[-17,-18],[-27,-15],[-34,-8],[-115,14],[-147,-15],[-11,-187],[4,-39],[32,-33],[31,-14],[55,-10],[12,-16],[1,-25],[-11,-56],[5,-42],[-5,-38],[-16,-37],[-34,-24],[-147,-57],[-112,-92],[-106,34],[-154,29],[-140,-8],[-1,0]],[[1435,5379],[-15,54],[-59,58],[-84,40],[-90,16],[-124,0],[-103,8],[-72,30],[-26,63],[0,136],[-20,30],[-83,34],[-16,38],[75,-43],[125,3],[93,46],[-24,85],[133,33],[139,50],[109,69],[45,88],[-14,55],[-39,21],[-61,8],[-78,17],[-81,35],[-91,67],[-62,36],[491,-30],[159,22]],[[1662,6448],[17,-6],[178,-43],[20,20],[11,5],[20,4],[86,4],[125,23],[33,-1],[95,-26],[24,-10],[48,-27],[31,-14],[41,-12],[71,-3],[88,4],[176,25],[70,23],[37,21],[7,13],[14,12],[33,11],[28,-1],[30,-9],[51,-27],[52,-22],[42,-14],[148,-4]],[[2307,4704],[-9,-20],[2,-14],[11,-22],[26,-29],[47,-27],[81,-22],[138,-17],[202,7],[56,-5],[59,-21],[40,-10],[43,1],[23,3],[76,-14],[-7,-63],[-44,-39],[-4,-12],[13,-79],[0,-16],[-25,-59],[-1,-18],[5,-19],[13,-20],[51,-46],[49,-22],[34,-12],[227,-29]],[[3413,4080],[28,-16],[7,-8],[7,-13],[-17,-15],[-14,-8],[-182,2],[-57,-7],[-28,15],[-25,18],[-15,5],[-13,1],[-62,-14],[-85,-13],[-42,-10],[-26,-7],[-14,-17],[-26,-22],[-2,-10],[5,-9],[2,-7],[-20,-15],[-1,-12],[4,-12],[-2,-11],[-25,-4],[-28,2],[-131,0],[-9,-35],[2,-14],[15,-25],[27,-28],[106,-63],[21,-23],[-7,-32],[-27,-32],[-3,-11],[0,-13],[5,-24],[7,-16],[24,-14],[73,-16],[47,-8],[47,-14],[28,-11],[36,-69],[154,-80],[29,-26],[-11,-29],[-47,-21],[-43,-15],[-37,-9],[-11,-5],[5,-3],[27,-2],[29,-9],[28,-21],[82,-102],[62,-36],[135,-42],[78,-13],[51,-15],[20,-8],[31,-59]],[[3625,2950],[-79,-5],[-27,-7],[-28,-16],[-34,-30],[-37,-23],[-38,-20],[-170,-62],[-38,-21],[-161,-147],[-20,-14],[-12,-8],[-79,7]],[[2902,2604],[-76,8],[-56,-4],[-42,6],[-35,14],[-12,13],[0,13],[10,13],[8,16],[1,16],[-16,36],[-3,12],[7,10],[9,34],[0,20],[-12,10],[-21,6],[-84,8],[-9,5],[-1,4],[6,4],[10,4],[8,11],[3,16],[-8,30],[-20,17],[-35,20],[-22,6],[-23,3],[-14,-2],[-15,-3],[-16,1],[-28,8],[-35,13],[-28,6],[-23,2],[-23,-2],[-21,1],[-38,8],[-159,51],[-105,0],[-75,6],[-42,10],[-53,-2],[-29,4],[-19,7],[-17,32],[-12,13],[4,7],[-4,4],[-10,5],[-25,3],[-28,0],[-43,-6],[-37,1],[-25,4],[-14,12],[-4,9],[2,10],[-1,8],[-17,10],[-34,11],[-133,31],[-55,7],[-52,2],[-29,6],[-11,17],[5,13],[-5,12],[-22,11],[-63,18],[-36,13],[-21,12],[-2,9],[2,7],[0,9],[-14,6],[-29,-1],[-134,-27],[-56,-3],[-87,24],[-120,22],[-80,8],[-82,3],[-91,-14],[-140,-6],[-1,0]],[[245,3365],[-2,2],[28,39],[76,33],[91,30],[71,34],[50,51],[23,56],[6,197],[18,54],[50,35],[104,14],[59,12],[-15,28],[-41,32],[-20,20],[25,27],[40,27],[38,20],[16,5],[-45,38],[-86,50],[-55,43],[48,18],[85,15],[111,71],[92,30],[-78,-39],[47,-78],[-46,-66],[0,-70],[42,0],[18,47],[-1,-10],[8,-11],[10,-26],[74,45],[296,64],[95,51],[9,82],[-59,65],[-74,60],[-34,65],[-19,-85],[-70,-77],[-145,-99],[-2,15],[-33,19],[61,28],[65,47],[40,60],[-12,69],[-28,16],[-92,17],[-32,12]],[[1052,4547],[61,70],[12,5],[17,6],[17,-1],[30,7],[3,10],[-6,10],[-23,17],[5,1],[13,1],[29,3],[19,-2],[21,-8],[45,-29],[34,-7],[23,6],[21,11],[31,23],[27,8],[28,2],[25,-5],[24,-3],[86,-1],[56,3],[46,13],[97,35],[56,15],[42,9],[20,-2],[42,-9],[43,-3],[6,-2],[6,-3],[8,-4],[56,0],[17,-3],[9,-6],[30,-2],[31,5],[97,26],[29,6],[15,0],[11,-2],[8,-4],[3,-9],[-1,-6],[-14,-24]],[[3198,9382],[-35,-33],[-16,-11],[-22,-12],[-21,-10],[-20,-12],[-15,-14],[-24,-32],[-19,-14],[-52,-21],[-10,-10],[9,-12],[89,-48],[16,-20],[12,-28],[6,-84],[-8,-27],[4,-39],[21,-52],[73,-113],[21,-45],[1,-28],[-12,-11],[-4,-9],[1,-15],[-4,-12],[-13,-27],[-18,-23],[11,-14],[38,-11],[79,-20],[142,-7],[29,17],[15,4],[20,3],[24,2],[30,5],[34,11],[81,37],[37,11],[35,5],[334,-6],[96,41],[132,-8],[74,-11],[639,-135],[135,3],[40,-3],[33,-12],[23,-15],[29,-13],[50,-6],[169,-31],[41,-56],[-58,-50],[-99,-35],[-71,-20],[-50,-17],[-41,-19],[-151,-95],[-18,-26],[28,-26],[11,-23],[-32,-44],[-82,-50],[-2,-6],[64,2],[44,7],[38,11],[32,2],[39,-13],[47,-33],[131,-53]],[[5358,7923],[-227,-94],[-359,-79],[-66,-19],[-49,-24],[-47,-67],[-53,-34],[-52,-19],[-85,-23],[-126,-54],[-40,-24],[-65,-54],[-31,-11],[-44,-5],[-217,3],[-50,8],[-30,12],[-23,15],[-5,14],[7,13],[48,19],[11,9],[-1,13],[-13,14],[-109,61],[-24,16],[-42,49],[-16,35],[-10,16],[-33,13],[-36,1],[-59,-7],[-66,-17],[-53,-28],[-57,-23],[-39,-20],[-29,-11],[-43,-6],[-47,1],[-86,13],[-44,15],[-39,8],[-35,-1],[-108,-24],[-173,-4],[65,-62],[6,-13],[-6,-12],[-20,-12],[-41,-17],[-46,-16],[-51,-9],[-73,13],[-102,37],[-44,12],[-48,2],[-206,-14],[-45,1],[-51,12],[-20,6],[-9,11],[4,14],[21,15],[17,11],[7,8],[-7,6],[-17,3],[-63,0],[-35,3],[-32,8],[-21,8],[-17,4],[-20,2],[-95,-6],[-61,-12],[26,-14],[29,-37],[19,-68],[-66,-31],[-79,-11],[-98,18],[-193,52],[-76,13],[-51,-4],[-44,-26],[-17,-37],[21,-41],[340,-118],[17,-36],[0,-1]],[[1511,7285],[-361,65],[-80,24],[-103,20],[-382,-54],[-5,35],[4,87],[-45,35],[-52,22],[-14,13],[4,14],[-3,22],[7,17],[22,17],[13,24],[-36,76],[29,12],[46,3],[34,12],[29,56],[-41,23],[-2,0],[-51,50],[-21,64],[7,65],[27,57],[103,99],[-13,32],[-14,7],[-85,45],[-322,105],[-89,43],[-56,53],[16,35],[48,23],[119,56],[540,367],[5,17],[-4,46],[12,24],[52,54],[30,19],[288,146],[75,54],[111,32],[92,46],[78,55],[68,62],[0,1],[31,50],[68,25],[81,20],[70,35],[31,40],[32,86],[32,46],[94,67],[148,76],[57,22],[101,40],[131,27],[129,-29],[86,-72],[48,-84],[5,-33],[5,-34],[-10,4],[-26,-18],[-42,-40],[-10,-23],[-10,-50],[3,-22],[19,-31],[98,-103],[185,-62],[95,-22],[103,-5],[53,7]],[[7206,7315],[-2,0],[-48,2],[-97,-13],[-93,-8],[-349,28],[-116,-1],[-62,-6],[1,-10],[17,-10],[15,-10],[-22,-15],[-58,-16],[-79,-12],[-138,-9],[8,25],[-36,48],[-158,105],[-33,63],[8,11],[-113,4],[-82,-15],[-36,-19],[-32,-22],[-47,-22],[-59,-16],[-102,-11],[-61,4],[-43,16],[-17,17],[-4,16],[3,12],[0,12],[-2,9],[-42,23]],[[5327,7495],[74,60],[16,10],[18,6],[17,5],[16,6],[15,10],[24,11],[107,40],[16,10],[8,17],[-6,32],[1,26],[6,23],[17,18],[11,17],[-1,21],[-49,60],[-25,21],[-68,22],[-166,13]],[[3198,9382],[36,5],[213,55],[52,22],[1,1],[140,42],[275,-3],[143,18],[202,117],[121,38],[145,-36],[117,-55],[281,-68],[95,-53],[1,0],[1,-1],[158,-166],[31,-19],[75,-32],[28,-26],[-1,-27],[-59,-39],[-7,-21],[27,-21],[88,-33],[32,-20],[13,-25],[-9,-45],[8,-24],[49,-54],[46,-23],[67,-4],[384,4],[87,-6],[696,-224],[94,-44],[45,-21],[108,-65],[213,-202],[61,-88],[14,-59],[1,-106],[35,-62],[177,-204],[26,-66],[28,-43],[0,-42],[-60,-61],[-46,-26],[-40,-13],[-35,-19],[-27,-40],[2,-24],[28,-40],[-3,-25],[-144,-38],[-5,-56]],[[142,2777],[-5,-4],[-39,4],[-18,24],[-31,33],[-24,22],[-25,22],[16,21],[39,5],[22,-22],[19,-9],[20,-6],[33,-9],[23,-17],[-16,-32],[-14,-32]],[[2902,2604],[88,-65],[22,-27],[5,-19],[-15,-30],[-34,-29],[-46,-30],[-82,-41],[-39,-13],[4,-10],[22,-17],[164,-77],[101,-65],[25,-11],[22,-8],[68,-9],[7,-3],[-2,-5],[-17,-10],[-45,-16],[-10,-5],[5,-10],[15,-15],[48,-33],[28,-28],[24,-41],[-2,-19],[-10,-12],[-33,-15],[13,-14],[15,-10],[186,-74],[103,-113],[7,-32],[28,-26],[80,-54],[54,-59],[118,-140],[36,-24],[44,-12],[74,0],[110,16],[35,3],[34,-1],[142,-19],[39,-2],[60,-13],[442,-198],[95,-33],[64,-11],[32,-1],[32,-9],[125,-61],[104,-37],[28,-18],[36,-67],[21,-25],[54,-35],[52,-27],[24,-25],[9,-56],[72,-6],[77,0],[41,-6],[43,-12],[31,-20],[17,-24],[-17,-81],[61,-42],[11,-15],[1,-1]],[[5848,557],[-7,1],[-56,4],[-47,-9],[-40,-25],[14,-13],[33,-14],[19,-26],[-9,-17],[-35,-40],[-7,-10],[14,-11],[42,-24],[9,-10],[22,-29],[30,-14],[17,-18],[-17,-36],[-77,-43],[-105,-27],[-85,-38],[-17,-72],[-49,13],[-49,8],[-48,0],[-45,-8],[-45,-22],[-6,-25],[2,-24],[-19,-18],[-89,-10],[-115,24],[-161,66],[-258,62],[-224,33],[-189,28],[-91,-26],[-17,-3],[-6,-19],[-38,0],[-31,48],[19,55],[89,101],[-96,18],[-28,12],[85,85],[103,165],[12,40],[-36,69],[-59,19],[-88,3],[-124,20],[-8,9],[-2,13],[-6,14],[-23,12],[-77,20],[-56,10],[-96,1],[-43,14],[0,20],[83,48],[55,25],[57,18],[-97,42],[-265,231],[-36,41],[-39,35],[-47,15],[-180,2],[-89,8],[-61,15],[45,20],[-153,47],[-24,-21],[-8,-10],[-7,-16],[-18,30],[-27,14],[-35,10],[-39,16],[-7,13],[-41,39],[-46,33],[-21,-7],[-55,26],[-372,54],[-311,84],[-181,74],[-318,48],[-186,64],[-536,270],[-63,46],[-27,27],[-76,148],[-42,41],[-197,88],[-69,42],[-10,13],[0,4],[-31,6],[0,22],[149,35],[92,4],[88,-27],[201,-111],[53,-36],[75,-79],[31,-48],[13,-45],[52,-15],[119,13],[118,25],[53,23],[37,301],[-16,49],[-144,37],[-194,88],[-154,100],[-28,71],[38,-21],[16,-25],[15,-28],[45,6],[43,0],[109,-56],[70,17],[37,62],[11,80],[-70,63],[-149,35],[-136,-17],[-29,-92],[-40,52],[-391,259],[-29,27]],[[7626,1471],[-2,1],[-1,1],[-108,49],[-83,53],[-267,128],[-37,23],[-31,64],[-143,160],[-10,20],[-5,21],[4,18],[16,16],[29,17],[58,27],[15,10],[-14,6],[-29,3],[-50,2],[-80,9],[-13,8],[-105,146],[-9,25],[52,92],[-4,51],[-16,26],[-34,25],[-95,51],[-19,25],[2,28],[18,23],[15,16],[20,12],[53,24],[-100,9]],[[6653,2660],[-71,67],[-1,22],[22,132],[-9,34],[-22,23],[-55,26],[-11,10],[-4,16],[3,12],[13,28],[11,9],[29,17],[34,45],[0,10],[-11,11],[2,10],[-7,7],[-37,17],[-29,6],[-64,4],[-23,3],[-26,7],[-24,2],[-28,-2],[-32,1],[-29,9],[-43,22],[-25,35],[-34,21],[-14,22],[-89,66],[-48,67],[-122,128],[-28,24],[-69,37]],[[5812,3608],[44,37],[218,27],[428,23],[89,18],[75,27],[48,35],[85,77],[-152,148],[-65,45],[-177,103],[-33,29],[-64,89],[139,32],[16,19],[18,35],[13,53],[14,27],[34,45],[36,18],[37,11],[199,31],[34,3],[45,7],[224,60],[44,9],[25,0],[32,-2],[207,-34],[59,-3],[29,11],[20,19],[20,61],[-2,18],[-20,52],[-3,54],[-3,10]],[[7525,4802],[44,-9],[77,-4],[71,2],[15,-1],[50,-4],[61,-21],[58,-53],[108,-216],[109,-191],[82,-77],[75,-28],[58,-22],[142,-14],[99,18],[188,70],[110,12],[5,0],[297,-19],[280,-37],[94,-41],[46,-62],[3,-88],[10,-157],[-35,-70],[-97,-52],[55,-20],[21,-25],[11,-27],[25,-24],[161,-69],[149,-81],[58,-47],[36,-58],[8,-65],[-20,-60],[-60,-116],[-10,-38],[-2,-27],[-9,-26],[-29,-34],[-39,-18],[-52,-14],[-51,-19],[-39,-34],[-73,-8],[-60,-19],[-33,-30],[4,-41],[-17,-19],[-18,-16],[-54,-35],[-141,-43],[-125,14],[-129,28],[-151,-2],[-75,-22],[-30,-28],[-22,-32],[-46,-34],[-50,-12],[-117,-13],[-50,-23],[-10,-31],[25,-91],[3,-34],[-19,-41],[-25,-27],[-62,-52],[-87,-98],[-17,-18],[-44,-18],[-62,-14],[-61,-20],[-44,-32],[-26,-75],[12,-67],[-1,-68],[-63,-79],[-31,-11],[-83,-11],[-26,-19],[-3,-20],[18,-37],[2,-16],[27,-62],[-8,-15],[-85,-108],[-23,-23],[-42,-13],[-140,-30]],[[6653,2660],[-245,-15],[-100,3],[-51,-10],[-7,-23],[11,-29],[2,-27],[-16,-34],[-48,-19],[-54,-10],[-162,-17],[-68,-18],[-27,-11],[-10,-10],[-3,-7],[-17,-15],[-20,-38],[-39,2],[-121,14],[-51,13],[-66,27],[-392,228],[-15,13],[-130,80],[-28,12],[-43,3],[-88,2],[-56,9],[-39,14],[-39,32],[-53,25],[-110,16],[-8,-19],[-2,-10],[-7,-11],[-7,-6],[-21,-2],[-29,6],[-58,17],[-41,3],[-121,-10],[-223,51],[-128,0],[-117,10],[-181,51]],[[3413,4080],[122,20],[451,-24],[138,41],[48,7],[48,-8],[16,-3],[18,-15],[-20,-23],[-2,-10],[0,-11],[18,-31],[3,-16],[0,-14],[-19,-31],[0,-14],[27,-11],[78,-11],[90,-5],[67,-11],[51,-20],[137,-102],[50,-23],[62,-17],[129,-15],[63,-15],[41,-14],[-52,-38],[129,-26],[49,-6],[85,-1],[49,-4],[42,-13],[23,-24],[12,-10],[45,-8],[181,2],[220,32]],[[6853,5582],[-2,-7],[30,-100],[70,-130],[26,-49],[71,-84],[208,-131],[89,-77],[29,-74],[-4,-59],[40,-45],[115,-24]],[[2307,4704],[119,-10],[18,9],[19,13],[1,30],[6,25],[17,34],[47,21],[132,29],[35,15],[19,14],[11,36],[180,6],[174,-7],[111,10],[72,13],[26,13],[2,8],[-18,5],[-33,5],[-16,10],[-5,8],[135,52],[269,49],[121,12],[249,57],[40,17],[171,87],[70,50],[82,44],[44,13],[36,1],[25,-10],[37,-8],[48,-4],[35,4],[32,10],[89,41],[37,11],[93,4],[93,80],[125,47],[57,13],[302,37],[26,11],[14,11],[34,37]],[[5488,5657],[33,17],[15,4],[20,4],[36,4],[20,4],[21,7],[18,10],[84,30],[41,11],[46,8],[52,2],[51,-3],[62,-12],[82,-1],[45,4],[41,7],[36,13],[55,32],[31,6],[24,-2],[25,-15],[21,2],[17,8],[22,5],[34,2],[68,-10],[72,-7],[79,12],[53,4],[-13,-29],[1,-33],[15,-44],[31,-34],[125,-80],[2,-1]],[[7626,1471],[-211,-45],[-141,-7],[-298,20],[-103,-12],[-88,-23],[-187,10],[-107,-22],[-75,-39],[-64,-53],[-47,-59],[-24,-59],[-93,-9],[-282,-4],[-68,-10],[29,-26],[84,-201],[29,-20],[134,-60],[260,-195],[23,-57],[-46,-66],[-98,-46],[-96,5],[-99,27],[-210,37]],[[7206,7315],[-2,-18],[45,-83],[10,-47],[4,-22],[-36,-29],[-131,-56],[-56,-33],[-45,-44],[-16,-35],[44,-239],[29,-71],[119,-154],[1,-22],[0,-7],[-30,-34],[-48,-22],[-76,-20],[-81,-15],[-275,-27],[21,-47],[-16,-89],[39,-50],[63,-12],[43,-20],[61,-51],[11,-10],[18,-25],[12,-54],[11,-18],[40,-15],[94,-7],[42,-13],[67,-42],[28,-33],[7,-7],[-1,-45],[-40,-56],[-54,-45],[-73,-41],[-81,-22],[-81,12],[-20,-65]],[[5488,5657],[-426,67],[-77,26],[-214,102],[-158,-1],[-31,-19],[-60,-26],[-39,-3],[-35,9],[-48,35],[-41,20],[-95,25],[-103,39],[-18,14],[-10,13],[-6,11],[-32,20],[-9,10],[-7,14],[-14,22],[-117,78],[-110,54],[-66,25],[-47,12],[-65,1]],[[3238,6394],[-45,83],[4,24],[-18,25],[-27,19],[-85,42],[-11,13],[8,12],[17,9],[21,41],[-15,141],[23,55],[19,-2],[46,-10],[65,-20],[123,-14],[80,5],[101,14],[88,20],[18,-5],[34,-29],[22,-10],[39,-12],[114,-15],[36,5],[19,13],[2,13],[5,8],[19,8],[69,22],[36,4],[59,0],[196,-16],[50,7],[37,14],[22,17],[23,40],[23,15],[42,13],[540,97],[45,30],[3,19],[-3,47],[-26,23],[-242,92],[-9,11],[13,8],[37,6],[57,2],[70,6],[69,13],[50,29],[72,33],[62,20],[94,69],[-2,47]],[[1662,6448],[50,7],[110,114],[39,0],[3,-36],[22,-20],[39,-3],[56,12],[-45,89],[-28,23],[-47,-22],[-26,27],[-166,66],[116,89],[-10,104],[-30,111],[1,60],[103,-16],[53,43],[5,70],[-46,63],[-36,-1],[-314,57]],[[1052,4547],[-2,0],[-40,37],[4,18],[24,16],[61,251],[-29,54],[-32,22],[-25,26],[4,22],[123,24],[20,38],[0,45],[9,38],[229,164],[40,64],[-3,13]]],transform:{scale:[.00017756158005800113,.00030181021032104206],translate:[19.26124108200011,39.637013245]}},m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",
m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();