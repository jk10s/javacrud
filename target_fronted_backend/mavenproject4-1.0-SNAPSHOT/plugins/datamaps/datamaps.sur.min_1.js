!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo={type:"Topology",objects:{sur:{type:"GeometryCollection",geometries:[{type:"MultiPolygon",properties:{name:"Nickerie"},id:"SR.NI",arcs:[[[0]],[[1,2,3]]]},{type:"Polygon",properties:{name:"Brokopondo"},id:"SR.BR",arcs:[[4,5]]},{type:"Polygon",properties:{name:"Marowijne"},id:"SR.MA",arcs:[[6,7,8,9]]},{type:"Polygon",properties:{name:"Para"},id:"SR.PR",arcs:[[10,-8,11,-6,12,13,14]]},{type:"Polygon",properties:{name:"Sipaliwini"},id:"SR.SI",arcs:[[-5,-12,-7,15,-2,16,-13]]},{type:"Polygon",properties:{name:"Commewijne"},id:"SR.CM",arcs:[[-9,-11,17,18,19]]},{type:"Polygon",properties:{name:"Coronie"},id:"SR.CR",arcs:[[20,-17,-4,21]]},{type:"Polygon",properties:{name:"Paramaribo"},id:"SR.PM",arcs:[[-19,22,23]]},{type:"Polygon",properties:{name:"Saramacca"},id:"SR.SA",arcs:[[24,-14,-21,25]]},{type:"Polygon",properties:{name:"Wanica"},id:"SR.WA",arcs:[[-23,-18,-15,-25,26]]}]}},arcs:[[[2255,9250],[-5,-11],[-11,7],[-13,31],[-17,36],[-19,44],[11,33],[23,40],[5,21],[10,28],[19,36],[3,-16],[0,-42],[-7,-44],[-12,-31],[-9,-32],[11,-46],[0,-27],[11,-27]],[[3880,8336],[-588,40],[-983,-149],[-143,-8],[-120,-17]],[[2046,8202],[-2,4],[-10,15],[-25,8],[-28,-2],[-20,-12],[-5,-23],[13,-23],[25,-29],[-6,-16],[-17,-10],[-21,-3],[-21,6],[-13,13],[-4,19],[-4,167],[-8,7],[-15,-1],[-25,6],[-35,-14],[-22,0],[-10,22],[9,27],[20,25],[119,117],[25,38],[10,56],[3,52],[7,38],[23,50],[33,33],[22,21],[79,29],[33,26],[23,29],[16,34],[59,259],[11,227],[17,79],[6,60],[29,97],[28,66],[65,105],[10,27],[14,21],[20,14],[56,9],[17,11],[13,11],[13,5],[11,7],[32,34],[13,11],[24,8],[25,5],[26,26],[18,6],[68,-17],[152,-35],[89,-10],[122,0],[191,-8],[106,-6],[42,-16],[76,-47],[19,-8]],[[3587,9852],[0,-23],[5,-399],[7,-60],[37,-82],[27,-41],[10,-21],[5,-55],[6,-25],[62,-122],[89,-106],[6,-16],[5,-24],[-6,-30],[-7,-11],[-13,-2],[-29,17],[-16,5],[-15,-3],[-15,-12],[-12,-13],[-14,-10],[-16,-2],[-16,3],[-14,-2],[-4,-15],[10,-24],[81,-81],[12,-19],[7,-23],[-3,-34],[-11,-23],[-13,-17],[-12,-12],[-11,-15],[-2,-26],[-9,-15],[-6,-15],[3,-10],[17,-7],[39,-8],[22,-9],[15,5],[6,12],[8,36],[9,16],[11,8],[14,1],[16,-8],[19,-25],[15,-26],[16,-41],[13,-23],[1,-23],[-12,-22],[-18,-11],[-26,-28]],[[7880,7532],[165,-62],[66,-58],[29,-51],[8,-19],[4,-26],[-2,-25],[-10,-25],[-32,-50],[-12,-25],[-6,-27],[-4,-59],[-6,-29],[-12,-28],[-28,-53],[-11,-26],[-5,-25],[-7,-55],[-8,-26],[-38,-73],[-8,-25],[-3,-27],[5,-211],[-10,-55],[-11,-27],[-16,-26],[-46,-51],[-83,-73],[-20,-26],[-12,-30],[-4,-27],[0,-30],[4,-28],[11,-53],[43,-126],[4,-25],[1,-52],[-4,-21],[-55,-143],[-64,-106],[-13,-28],[-16,-52],[-12,-25],[-18,-20],[-23,-10],[-24,14],[-41,64],[-29,23],[-17,6],[-22,-3],[-19,-16],[-15,-21],[-30,-49],[-20,-24],[-23,-17],[-24,-8],[-80,-9],[-28,-7],[-28,-11],[-27,-16],[-105,-98],[-25,-19],[-159,-80],[-25,-7],[-26,-2],[-26,6],[-23,11],[-21,19],[-13,23],[-17,80],[-49,843],[-8,33],[-15,38],[-32,55],[-29,35],[-2,1],[-2,2],[-1,16],[18,461],[-41,392],[-29,90],[-32,72],[-249,381]],[[6283,7771],[85,94],[118,85],[82,81],[87,140],[9,22],[1,15],[-3,16],[-10,14],[-13,15],[-11,21],[5,23],[24,35],[64,12],[731,6],[50,-7],[17,-19],[11,-22],[8,-145],[7,-26],[15,-24],[22,-20],[130,-87],[23,-21],[19,-24],[14,-24],[8,-25],[3,-26],[-11,-50],[0,-22],[13,-22],[19,-17],[19,-21],[8,-23],[4,-25],[0,-95],[-8,-38],[-2,-19],[7,-18],[16,-11],[16,0],[20,13]],[[9180,8087],[-1,1],[-58,57],[-22,13],[-34,16],[-88,30],[-137,90],[-33,18],[-446,163]],[[8361,8475],[81,111],[13,25],[10,25],[6,30],[4,32],[1,51],[-12,82],[-37,86]],[[8427,8917],[-61,86],[-50,99],[-76,110],[-19,40],[-21,72],[-19,38],[-21,51],[-3,18],[-8,62],[3,30],[10,27],[48,55],[17,34],[-18,191],[17,52],[13,29]],[[8239,9911],[76,-13],[495,-68],[301,-65],[235,-45],[205,-65],[176,-49],[56,-6],[31,-10],[62,4],[14,-20],[25,-9],[15,-24],[-4,-25],[59,-111],[14,-42],[-23,-27],[-59,-109],[-28,-47],[-13,-95],[-34,-186],[-26,-93],[-31,-56],[-44,-52],[-43,-36],[-23,-24],[-10,-23],[-14,-45],[-104,-158],[-48,-54],[-193,-136],[-103,-104],[-23,-31]],[[7420,9174],[-88,-41],[-29,-52],[-5,-6],[-1,-23],[1,-2],[9,4],[25,-3],[7,3],[12,8],[16,6],[15,-1],[3,-7],[-3,-11],[-1,-10],[9,-4],[8,-11],[2,-24],[-5,-134],[46,-15],[49,-1],[937,67]],[[8361,8475],[-35,11],[-24,-35],[-144,-270],[-30,-77],[-15,-22],[-87,-74],[-18,-23],[-10,-18],[-52,-183],[-25,-138],[-41,-114]],[[6283,7771],[-18,-12],[-28,-5],[-13,-8],[-19,-28],[-12,-14],[-11,-11],[-5,-13],[-8,-30],[-10,-13],[-14,-9],[-27,-8],[-10,-6],[-26,-12],[-44,-24],[-74,-30],[-106,-22],[-28,8],[-25,21],[-18,54],[-7,35],[-2,31],[-7,26],[-14,25],[-31,29],[-28,19],[-28,13],[-156,49],[-49,7],[-52,-3],[-57,-11],[-119,-34],[-27,-2],[-26,2],[-115,29],[-5,43],[2,80],[74,542],[129,381]],[[5269,8870],[32,-36],[10,-30],[25,-26],[-2,-24],[-14,-24],[-24,-24],[-18,-39],[-1,-33],[10,-30],[6,-39],[18,-12],[21,-5],[110,28],[31,-2],[96,-25],[744,57],[30,8],[15,10],[20,7],[15,-7],[14,-13],[17,-12],[13,4],[8,13],[5,14],[13,14],[21,0],[37,16],[18,11],[7,13],[4,30],[6,14],[11,15],[12,17],[4,17],[-1,16],[-12,15],[-36,28],[-11,16],[-1,16],[17,32],[6,34],[7,17],[21,17],[14,16],[8,18],[-3,17],[-9,16],[-13,12],[-9,14],[6,16],[28,20],[42,9],[24,11],[11,14],[0,16],[-6,16],[-13,25]],[[6653,9188],[237,-27],[83,2],[261,50],[63,-3],[123,-36]],[[9180,8087],[-28,-39],[-28,-96],[-16,-16],[-38,-26],[-11,-15],[-6,-27],[-8,-15],[-133,-147],[-46,-70],[-15,-37],[-6,-42],[21,-95],[-5,-35],[-11,-13],[-66,-45],[-11,-23],[4,-25],[16,-33],[0,-296],[8,-32],[20,-13],[25,-7],[24,-13],[29,-44],[0,-41],[-8,-46],[2,-59],[31,-78],[4,-28],[0,-98],[-11,-41],[-49,-88],[-7,-60],[43,-258],[74,-152],[22,-103],[2,-61],[-15,-41],[-27,-45],[10,-41],[28,-32],[31,-20],[82,-22],[25,-20],[10,-49],[-7,-36],[-33,-83],[-11,-37],[4,-59],[23,-40],[84,-74],[15,-23],[26,-83],[17,-22],[34,-27],[16,-17],[61,-110],[46,-24],[10,-21],[9,2],[18,-29],[24,-46],[25,-30],[14,-8],[28,-13],[83,-24],[26,-17],[51,-73],[25,-26],[50,-170],[57,-85],[2,-15],[26,5],[27,8],[26,4],[22,-9],[34,-34],[15,-30],[-4,-37],[-19,-54],[-20,-100],[8,-181],[-40,-96],[-89,-90],[-11,-33],[-6,-42],[-17,-47],[-26,-41],[-1,-1],[-82,-57],[-63,-97],[-90,-106],[-34,-54],[-51,-121],[57,8],[27,-34],[6,-55],[-6,-50],[-6,-6],[-11,-6],[-11,-8],[-6,-13],[6,-2],[23,-16],[5,-6],[15,-58],[4,-34],[-11,-15],[-28,-16],[13,-33],[27,-30],[13,-4],[1,-33],[-17,-73],[-8,-14],[-34,-48],[-9,-28],[-1,-25],[4,-16],[15,-16],[33,-26],[-30,-16],[-16,-19],[-39,-112],[-19,-36],[-178,-236],[-86,-171],[-96,-236],[-40,-58],[-117,-114],[-29,-12],[-37,-5],[-54,-1],[-26,-14],[-25,-13],[-66,-164],[-28,-20],[-48,-5],[-82,24],[-35,-6],[-40,-47],[-46,-14],[-47,-9],[-48,-1],[-48,7],[-28,14],[-6,19],[2,23],[-3,26],[-22,54],[14,45],[7,3],[13,0],[11,3],[4,15],[-3,14],[-10,25],[-4,14],[-1,48],[-11,11],[-33,19],[-54,20],[-41,-2],[-38,-20],[-42,-22],[-121,-35],[-94,33],[-241,229],[-10,22],[8,33],[47,47],[16,32],[-13,24],[-44,-5],[-100,-39],[-49,-30],[-94,-79],[-89,-41],[-21,-8],[-19,3],[-19,19],[9,46],[-12,22],[-84,-7],[-196,-147],[-57,3],[-28,35],[-39,14],[-44,-3],[-42,-17],[-41,-39],[-14,-45],[-6,-44],[-20,-36],[-70,-30],[-88,2],[-95,11],[-91,2],[-139,-12],[-47,6],[-52,0],[-91,-41],[-193,-48],[-48,10],[-26,20],[-28,53],[-19,21],[-23,12],[-173,42],[-41,19],[-134,108],[-54,29],[-58,6],[-30,-10],[-15,-13],[-19,-42],[-26,-102],[-1,-106],[-13,-42],[-72,-105],[-18,-19],[-30,-13],[-27,2],[-22,13],[-22,10],[-31,-7],[-31,-38],[-38,-69],[-29,-71],[-7,-44],[28,-19],[108,-6],[45,-11],[46,-41],[23,-94],[33,-51],[66,-45],[21,-18],[88,-111],[83,-70],[19,-27],[8,-30],[-4,-22],[-9,-22],[-8,-31],[3,-106],[14,-96],[-13,-86],[-78,-79],[-161,-47],[-155,31],[-153,61],[-158,40],[-118,-7],[-39,4],[-46,19],[-88,55],[-48,20],[-47,5],[-72,-17],[-45,-5],[-36,7],[-128,46],[-8,27],[-15,24],[-21,17],[-52,16],[-20,12],[-18,16],[-13,21],[-93,47],[-240,4],[-67,26],[-236,327],[-18,71],[-18,52],[-24,106],[-31,46],[-22,12],[-57,10],[-23,11],[-10,21],[1,87],[-27,53],[-88,75],[-18,43],[15,34],[5,25],[-12,24],[-41,36],[-11,21],[-8,33],[5,23],[12,27],[3,26],[-20,22],[-50,-36],[-35,-11],[-16,22],[13,81],[-4,17],[-62,70],[-12,22],[-2,41],[12,31],[7,28],[-17,31],[-51,-28],[-19,14],[-15,94],[-24,44],[-64,65],[-12,32],[9,23],[17,31],[6,26],[-24,11],[-84,-13],[-8,-5],[-16,45],[42,86],[-17,16],[-29,-5],[-49,-23],[-23,-5],[-29,11],[-11,22],[-8,23],[-20,10],[-10,24],[-32,124],[22,24],[39,30],[26,33],[-11,36],[-82,8],[-31,18],[20,31],[13,22],[-2,19],[-7,21],[-4,29],[8,8],[34,-2],[8,10],[-2,18],[-12,30],[-3,19],[-23,53],[-42,38],[-22,44],[37,70],[-8,4],[-2,1],[0,2],[-5,8],[-16,-15],[-22,-14],[-24,-8],[-25,4],[-27,19],[5,16],[15,19],[7,29],[-26,55],[-6,27],[2,29],[14,49],[3,29],[-9,28],[-15,20],[-6,20],[20,30],[4,15],[6,83],[-8,33],[-61,123],[-77,-59],[-66,-11],[-65,19],[-78,33],[3,-43],[-17,-21],[-69,-18],[-6,-8],[-18,-16],[-18,-10],[-8,10],[-6,13],[-15,7],[-19,3],[-20,1],[-14,11],[-31,18],[-32,6],[-24,-47],[-22,-3],[-27,7],[-76,41],[0,1],[-42,22],[-69,14],[-21,8],[-12,10],[-8,13],[-10,28],[-5,25],[1,20],[12,43],[2,16],[-5,30],[-1,15],[37,71],[4,42],[-40,44],[-51,29],[-10,5],[-5,7],[-26,4],[-12,5],[-11,11],[-3,9],[-3,8],[-19,36],[-12,42],[-9,17],[-94,58],[-119,49],[-41,25],[-28,44],[-14,51],[-7,109],[-10,45],[-52,109],[-124,178],[-40,46],[-162,124],[-59,72],[-24,85],[-32,204],[-31,103],[4,49],[34,51],[214,213],[27,40],[16,48],[5,60],[-7,40],[-13,36],[-8,38],[10,43],[24,37],[28,31],[23,31],[18,79],[45,107],[42,67],[39,122],[44,62],[19,42],[4,45],[-21,42],[-66,82],[-32,99],[-41,26],[-41,20],[-18,33],[17,81],[39,55],[45,46],[33,40],[50,81],[18,17],[31,8],[23,-7],[24,-11],[31,-6],[60,8],[28,22],[37,68],[66,62],[82,39],[92,5],[96,-41],[108,38],[56,10],[63,3],[13,-8],[37,-35],[17,-8],[31,3],[42,12],[193,20],[62,16],[26,10],[19,10],[21,8],[34,5],[22,-4],[19,-8],[20,-2],[25,14],[-90,78],[-11,27],[3,32],[8,27],[36,81],[17,68],[16,33],[27,15],[44,-2],[31,-9],[21,-25],[13,-48],[38,16],[39,21],[30,28],[12,33],[-19,48],[-81,97],[-17,41]],[[3880,8336],[230,9],[41,19],[31,21],[51,41],[43,44],[38,22],[49,14],[142,11],[241,-12],[150,10],[23,8],[43,82],[45,13],[11,7],[20,37],[16,16],[59,34],[33,10],[8,9],[3,25],[-23,41],[-1,12],[4,10],[32,20],[100,31]],[[7420,9174],[13,6],[16,18],[-22,32],[-48,21],[-98,30],[-44,32],[-37,39],[-29,44],[-8,16]],[[7163,9412],[-15,32],[-17,52],[30,14],[40,34]],[[7201,9544],[67,22],[23,53],[2,53],[13,19],[54,0],[81,-55],[50,-10],[32,7],[20,12],[19,4],[55,-32],[20,-4],[21,4],[24,9],[19,11],[14,16],[16,14],[29,6],[23,-5],[25,-12],[43,-30],[-11,19],[-16,19],[-20,16],[-20,11],[-32,6],[-22,-3],[-23,-18],[-28,-17],[-56,-5],[-38,24],[-34,7],[-39,-22],[-37,2],[-37,30],[-38,19],[-142,39],[-50,24],[-43,27],[-18,26],[-9,25],[-14,16],[16,25],[22,14],[67,26],[78,13],[99,6],[76,0],[588,-19],[45,-10],[105,-12],[19,-3]],[[5317,9198],[-5,-12],[-33,-34],[-38,-9],[-67,-7],[-20,-8],[-14,-9],[-7,-13],[-5,-17],[2,-15],[5,-16],[9,-18],[19,-29],[65,-69],[9,-7],[18,-20],[14,-45]],[[3587,9852],[26,-11],[47,-11],[115,-11],[266,-60],[155,-40],[125,-5],[116,-29],[83,-23],[76,-19],[165,-35],[101,-33],[60,-16],[51,-9],[95,-32],[154,-14],[45,-48],[35,-20],[14,-32],[0,-206],[1,0]],[[7163,9412],[-105,33],[-42,27],[-17,19],[-15,22],[-11,25],[-18,67],[-6,87],[2,36],[2,10]],[[6953,9738],[20,-6],[21,0],[26,-3],[34,-3],[28,9],[32,13],[39,4],[42,-30],[49,-35],[19,-35],[-29,-70],[-37,-40],[4,2]],[[6895,9775],[-1,-5],[-158,-324],[-69,-72],[-21,-15],[-6,-27],[-2,-57],[15,-87]],[[5317,9198],[18,0],[12,37],[5,38],[-2,81],[-8,42],[-42,90],[-27,59],[38,48],[-25,22],[-30,-2],[-28,-1],[-35,28],[-8,48],[11,36],[40,50],[17,25],[32,33],[24,24],[36,27],[44,16],[58,15],[59,3],[223,9],[124,10],[101,2],[594,-29],[145,-27],[68,-46],[39,-16],[52,-16],[17,-9],[26,-20]],[[6895,9775],[26,-21],[24,-14],[8,-2]]],transform:{scale:[.0004081741923192357,.000417848483948404],translate:[-58.067691202999924,1.833506775000075]}},m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),
d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();