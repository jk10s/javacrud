!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo={type:"Topology",objects:{TGO:{type:"GeometryCollection",geometries:[{type:"Polygon",properties:{name:"Plateaux"},id:"TG.PL",arcs:[[0,1,2,3]]},{type:"Polygon",properties:{name:"Maritime"},id:"TG.MA",arcs:[[-2,4]]},{type:"Polygon",properties:{name:"Kara"},id:"TG.KA",arcs:[[5,6,7,8]]},{type:"Polygon",properties:{name:"Centre"},id:"TG.CE",arcs:[[-4,9,-6,10]]},{type:"Polygon",properties:{name:"Savanes"},id:"TG.SA",arcs:[[-8,11]]}]}},arcs:[[[9083,4502],[1,0],[30,-3],[26,-19],[54,-170],[-9,-228],[-12,-316],[3,-315],[4,-393],[1,-35],[2,-171],[2,-195],[3,-297],[3,-288],[4,-292],[-93,-11],[-388,1],[100,-141],[57,-33],[9,-2]],[[8880,1594],[-1,0],[-23,-4],[-45,-15],[-105,-65],[-31,-16],[-33,-11],[-93,-19],[-88,-12],[-30,-1],[-62,1],[-64,4],[-114,15],[-49,1],[-61,-2],[-116,-10],[-100,-15],[-356,-101],[-288,-110],[-45,8],[-163,21],[-21,5],[-17,7],[-61,41],[-7,3],[-12,4],[-32,6],[-26,3],[-26,5],[-21,5],[-17,8],[-12,8],[-16,7],[-24,4],[-90,5],[-21,4],[-8,7],[11,14],[-10,5],[-24,3],[-838,18],[-98,-8],[-51,-8],[-48,-10],[-24,-9],[-19,-14],[-20,-23],[-8,-24],[10,-95],[-21,-77],[-33,-44],[-22,-19],[-26,-14],[-36,-17],[-150,-53],[-49,-23],[-52,-33],[-33,-16],[-19,-7],[-179,-43],[-85,-12],[-206,-12],[-60,-3]],[[4512,861],[2,12],[32,25],[36,19],[3,18],[-65,25],[-47,4],[-143,-2],[-48,2],[-46,31],[-72,21],[-67,24],[-29,41],[45,101],[-5,32],[-44,32],[-75,27],[-89,19],[-88,7],[-34,18],[-149,106],[-62,19],[-50,11],[-16,19],[34,42],[108,70],[13,33],[-61,42],[-146,44],[-59,30],[75,9],[76,2],[216,22],[66,14],[98,68],[4,87],[-23,89],[18,78],[123,119],[48,92],[69,73],[6,43],[-82,130],[-34,18],[-189,-27],[-102,-7],[-93,5],[-162,55],[-83,87],[-25,98],[19,115],[19,25],[32,21],[52,20],[67,11],[82,9],[70,14],[29,26],[-2,54],[16,62],[66,40],[149,-9],[-15,38],[11,104],[-46,114],[4,119],[-4,9]],[[3945,3560],[105,7],[257,10],[80,12],[28,11],[40,12],[81,20],[46,7],[411,21],[53,6],[21,5],[18,6],[53,29],[25,3],[25,-2],[25,-5],[74,0],[492,24],[75,0],[57,-8],[217,-16],[42,-6],[52,-9],[76,-7],[82,-3],[95,2],[432,34],[154,18],[156,42],[5,2],[4,2],[4,6],[-28,13],[-12,7],[-3,10],[8,9],[70,55],[8,11],[4,11],[-3,49],[24,44],[4,38],[10,24],[25,32],[5,12],[0,39],[-4,12],[-8,10],[-13,8],[-38,14],[-17,7],[-13,8],[-9,10],[-4,10],[10,33],[-4,11],[-16,21],[-5,11],[-5,25],[-7,11],[-34,27],[-7,11],[-3,12],[3,86],[6,9],[22,18],[3,8],[-1,12],[1885,-9]],[[8880,1594],[76,-22],[46,-21],[10,-28],[-38,-83],[3,-34],[22,-35],[39,-40],[31,-48],[-21,-31],[-40,-21],[-77,-39],[-42,-45],[33,-22],[66,-21],[56,-40],[1,-15],[-9,-17],[-3,-18],[17,-20],[30,-17],[41,-15],[43,-14],[40,-9],[48,-2],[51,2],[37,-5],[7,-23],[13,-14],[85,-27],[33,-17],[6,-20],[-13,-42],[11,-18],[34,-10],[111,-22],[44,-13],[132,-82],[99,-149],[97,-146],[-107,-2],[-659,-61],[-106,-21],[37,-42],[-2,0],[-974,-63],[-813,-96],[-367,-62],[-41,-1],[-31,-3],[13,70],[-61,31],[-425,19],[-70,14],[-55,25],[-68,40],[-39,17],[-39,8],[-38,7],[-41,11],[-79,44],[-134,159],[-392,1],[-105,11],[-66,19],[-167,78],[-129,31],[-254,48],[-108,43],[-81,48],[-61,47],[-32,49],[7,41]],[[8140,6339],[-1,0],[-201,-62],[-96,-19],[-90,1],[-709,-76],[-99,-2],[-62,1],[-255,21],[-79,0],[-385,-20],[-175,-16],[-12,-3],[-14,-6],[-13,-8],[-21,-21],[-13,-24],[-3,-23],[10,-37],[-1,-73],[12,-20],[57,-47],[-4,-11],[-19,-12],[-88,-29],[-69,-28],[-74,-23],[-44,-10],[-41,-5],[-92,-4],[-192,-15],[-32,-1],[-32,1],[-33,2],[-83,12],[-32,2],[-66,2],[-33,2],[-163,23],[-13,8],[-11,10],[-5,12],[-19,8],[-30,5],[-66,-3],[-45,1],[-37,2],[-36,4],[-26,-3],[-22,-5],[-15,-8],[-13,-10],[-9,-9],[-18,-11],[-26,-11],[-108,-29],[-17,-5],[-12,-7],[-1,-1],[-10,-6],[-52,-21],[-36,-5],[-92,-7],[-29,-6],[-20,-8],[-16,-21],[-6,-11],[-7,-12],[-10,-10],[-16,-7],[-205,-52],[-28,-11],[-9,-10],[3,-10],[14,-7],[19,-6],[12,-8],[0,-12],[-22,-15],[-26,-7],[-35,-4],[-79,-1],[-28,-4],[-103,-36],[-107,-16],[-142,-15]],[[3334,5431],[113,62],[-64,97],[-248,162],[-1,0],[-68,62],[52,60],[87,62],[27,64],[0,31],[32,19],[116,40],[62,40],[-1,32],[-64,71],[5,39],[42,19],[58,13],[52,21],[21,25],[8,58],[48,101],[-32,46],[-93,32],[-152,19],[-4,3],[-1,1],[1,2],[34,23],[12,20],[-9,20],[-33,17],[-273,38],[-96,6],[-206,-4],[-116,-8],[-78,-13],[-25,-16],[-16,-40],[-20,-17],[-39,-12],[-235,-32],[-95,-7],[-95,4],[-24,26],[42,23],[-36,32],[1,28],[214,17],[80,12],[65,17],[20,21],[-45,21],[-73,2],[-131,-10],[-53,9],[-51,14],[-37,12],[-13,6],[-2,13],[24,55],[13,13],[258,-11],[123,3],[92,23],[71,-18],[94,-6],[83,9],[36,27],[-44,42],[-102,7],[-208,-20],[-160,6],[-82,42],[-3,58],[73,56],[137,-55],[86,-18],[92,4],[54,25],[14,35],[-12,36],[-24,29],[-34,20],[-37,15],[-26,22],[-8,36],[110,155],[2,22],[-23,80],[10,28],[41,30],[66,27],[36,12],[3,17],[-35,39],[-61,47],[-9,13],[10,19],[18,12],[3,13],[-31,19],[90,7],[80,-5],[57,5],[3,6]],[[2877,7815],[30,-9],[37,-19],[55,-33],[13,-10],[6,-12],[-1,-11],[-8,-22],[2,-12],[7,-10],[14,-8],[22,-5],[89,-6],[24,-4],[38,-13],[29,-5],[40,-2],[62,1],[82,-6],[48,1],[29,-1],[24,-4],[14,-6],[-3,-8],[-24,-16],[-5,-9],[5,-10],[9,-9],[15,-8],[18,-7],[47,-9],[21,-6],[18,-7],[43,-25],[20,-5],[29,-3],[41,0],[61,8],[78,8],[66,-1],[162,7],[29,-4],[46,-11],[30,-2],[51,5],[47,-4],[7,2],[6,14],[-6,24],[-62,66],[-4,10],[2,12],[9,12],[15,14],[15,25],[13,15],[28,16],[15,12],[8,12],[1,8],[-4,19],[3,60],[15,25],[20,23],[49,38],[151,81],[24,20],[13,24],[-14,28],[-8,10],[1,9],[24,8],[56,9],[157,-4],[32,-4],[26,-6],[13,-8],[11,-9],[13,-9],[20,-4],[28,0],[82,22],[96,20],[35,5],[115,-4],[27,-4],[40,-12],[24,-3],[27,3],[60,22],[32,8],[52,1],[41,0],[137,-9],[31,0],[37,9],[27,8],[92,54]],[[5969,8175],[437,-112],[735,-187],[542,-138],[66,-68],[0,-15],[6,-146],[10,-217],[6,-155],[40,-92],[-7,-25],[-12,-19],[1,-40],[-6,-20],[-32,-26],[-91,-53],[-21,-26],[16,-41],[52,-48],[76,-30],[88,17],[59,-57],[35,-201],[74,-79],[97,-58]],[[3945,3560],[-50,132],[4,74],[-3,38],[-47,74],[-19,93],[-27,49],[26,14],[40,12],[28,26],[-9,27],[-36,17],[-39,15],[-22,21],[6,26],[27,7],[39,2],[43,8],[171,59],[86,22],[226,39],[82,19],[39,30],[-20,49],[-19,7],[-62,4],[-20,7],[-3,9],[4,20],[-12,29],[1,23],[-11,20],[-197,63],[-66,75],[-90,73],[-336,61],[-134,37],[-124,44],[-87,39],[-206,54],[-204,110],[-150,124],[-33,73],[-11,25],[35,19],[65,5],[60,-9],[55,-45],[54,23],[34,33],[-27,8],[54,7],[47,-3],[52,-6],[67,-4],[56,11],[18,26],[8,31],[26,25]],[[8140,6339],[27,-15],[410,-165],[318,-129],[106,-71],[41,-48],[27,-54],[9,-248],[7,-217],[7,-184],[8,-266],[2,-60],[8,-23],[26,-22],[132,-65],[22,-19],[-19,-35],[-169,-108],[-8,-16],[0,-35],[-25,-48],[14,-9]],[[2877,7815],[19,33],[-16,41],[-41,13],[-57,5],[-65,16],[-50,51],[27,141],[-9,67],[38,26],[14,33],[25,30],[126,36],[-105,34],[-49,9],[-225,-15],[-72,0],[45,40],[-54,32],[-87,30],[-58,36],[7,17],[18,21],[-3,22],[-50,19],[-53,5],[-46,-6],[-49,-9],[-58,-5],[-49,2],[-136,21],[-14,-6],[-14,-13],[-21,-12],[-40,-1],[-14,7],[-262,186],[-81,33],[-272,66],[-42,19],[-60,44],[-41,19],[-46,11],[-161,20],[-46,12],[-32,12],[-37,9],[-118,6],[-61,6],[-57,11],[-45,14],[-52,41],[3,41],[32,51],[17,28],[27,83],[39,34],[73,36],[105,27],[44,16],[9,21],[-26,39],[-4,19],[111,200],[25,18],[41,17],[45,11],[36,13],[12,25],[15,71],[-16,61],[-78,47],[-171,25],[-97,-1],[-174,-18],[-94,-3],[-94,9],[-105,22],[-85,30],[-38,33],[262,-20],[267,-21],[629,-50],[1170,-91],[448,-35],[574,-45],[11,-3],[7,-4],[2,-6],[-7,-9],[-3,-8],[-8,-9],[-18,-7],[83,-8],[-62,-85],[641,86],[322,24],[494,4],[667,5],[-132,-123],[-15,-39],[12,-22],[43,-40],[8,-21],[-80,-59],[-10,-21],[-8,-46],[-16,-20],[-67,-37],[-279,-101],[-73,-67],[41,-179],[-4,-77],[-75,-111],[-72,-205],[4,-45],[42,-30],[388,-99],[488,-125],[295,-75]]],transform:{scale:[.00019486547444745453,.0005034993018014945],translate:[-.16610917099996,6.100490848286995]}},m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();