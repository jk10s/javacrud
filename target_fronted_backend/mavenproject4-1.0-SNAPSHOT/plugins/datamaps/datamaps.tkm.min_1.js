!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo={type:"Topology",objects:{tkm:{type:"GeometryCollection",geometries:[{type:"MultiPolygon",properties:{name:"Balkan"},id:"TM.BA",arcs:[[[0]],[[1]],[[2,3,4]]]},{type:"Polygon",properties:{name:"Ahal"},id:"TM.AL",arcs:[[5,6,7,-4,8]]},{type:"Polygon",properties:{name:"Tashauz"},id:"TM.DA",arcs:[[9,-9,-3,10]]},{type:"Polygon",properties:{name:"Chardzhou"},id:"TM.LE",arcs:[[11,-6,-10,12]]},{type:"Polygon",properties:{name:"Mary"},id:"TM.MA",arcs:[[13,-7,-12]]}]}},arcs:[[[468,4724],[-6,0],[-1,31],[-21,112],[-11,35],[-5,20],[-1,13],[1,35],[-2,35],[-6,60],[-2,31],[3,28],[7,26],[12,17],[17,5],[4,-9],[1,-4],[0,-6],[-21,-21],[-3,-53],[9,-104],[9,-109],[16,-107],[-3,-17],[0,-7],[3,-11]],[[750,5810],[4,-1],[3,8],[3,-29],[1,-7],[15,-32],[-4,-15],[-9,-15],[-11,-10],[-10,0],[-4,10],[-8,41],[-5,17],[-3,17],[3,15],[9,11],[8,6],[4,-10],[4,-6]],[[2883,8049],[0,-1],[2,-52],[4,-25],[18,-71],[19,-88],[6,-18],[4,-10],[7,-9],[7,-5],[6,-2],[9,0],[3,-3],[3,-7],[1,-11],[-1,-9],[-4,-16],[-2,-7],[1,-9],[2,-9],[7,-11],[5,-5],[15,-10],[5,-5],[9,-14],[21,-47],[22,-33],[3,-5],[81,-295],[9,-45],[3,-9],[5,-13],[17,-30],[21,-26],[40,-74],[10,-39],[29,-169],[32,-118],[-6,-42],[-30,-126],[21,-22],[20,-17],[5,-9],[3,-8],[12,-53]],[[3327,6472],[-84,-63],[-38,-40],[-4,-10],[-2,-9],[0,-12],[2,-10],[2,-10],[9,-23],[2,-10],[9,-78],[59,-323],[1,-14],[-3,-10],[-6,-8],[-8,-9],[-45,-24],[-17,-14],[-4,-6],[-5,-14],[-215,-1011],[-3,-31],[-1,-19],[-2,-11],[-3,-9],[-20,-49],[-3,-13],[-1,-10],[3,-28],[-1,-13],[-2,-7],[-5,-6],[-12,-7],[-5,-5],[-5,-9],[-3,-10],[-1,-11],[-7,-121],[1,-20],[2,-9],[5,-9],[3,-4],[4,-4],[4,0],[4,0],[8,-1],[11,-5],[40,-28],[11,-5],[8,-1],[36,16],[14,2],[10,-3],[9,-5],[9,-7],[7,-1],[7,3],[20,11],[11,3],[5,-3],[5,-8],[8,-43],[3,-11],[15,-33],[11,-16],[68,-67],[60,-87]],[[3308,4080],[-2,-3],[-15,-37],[-8,-13],[-23,-22],[-9,-13],[-13,-10],[-15,3],[-27,17],[-106,29],[-11,5],[-24,21],[-28,32],[-7,2],[-33,-8],[-57,-36],[-11,-3],[-10,6],[-8,10],[-10,9],[-12,5],[-65,-4],[-25,-14],[-24,-24],[-45,-60],[-4,-18],[19,-32],[4,-23],[-3,-24],[-7,-21],[-11,-12],[-60,-15],[-12,2],[-22,14],[-3,2],[-29,5],[-100,-27],[-11,1],[-10,5],[-19,15],[-12,5],[-36,0],[-10,6],[-28,23],[-43,14],[-21,0],[-139,-43],[-45,-3],[-17,-10],[-52,-59],[-15,-11],[-14,-17],[-8,-2],[-32,-16],[-16,-12],[-6,-21],[-9,-5],[-40,-11],[-14,-7],[-6,-10],[-8,-24],[-5,-10],[-7,-4],[-10,-3],[-9,-7],[-4,-17],[-5,-14],[-33,-54],[-106,-107],[-21,-34],[-9,-22],[-4,-20],[-3,-26],[-11,-41],[0,-27],[3,-8],[8,-11],[3,-8],[1,-9],[-1,-32],[-2,-18],[-10,-33],[-2,-20],[-3,-10],[-18,-22],[-33,-32],[-9,-12],[-14,-9],[-17,-27],[-11,-8],[-15,0],[-43,14],[-16,-4],[-119,-102],[-25,-12],[-16,0],[-16,3],[-15,-1],[-13,-13],[-13,-19],[-13,-8],[-14,-1],[-192,25],[-10,164],[-7,52],[-13,52],[-4,26],[-4,57],[-25,175],[-12,375],[2,21],[10,44],[7,63],[17,100],[-3,36],[9,41],[1,56],[-4,96],[-1,10],[-6,18],[-3,12],[-2,13],[-2,27],[-10,79],[-1,29],[6,105],[8,53],[11,43],[33,76],[12,47],[-7,39],[11,13],[5,23],[4,27],[7,21],[7,19],[9,26],[3,18],[-7,-3],[-1,27],[-9,14],[-25,12],[0,3],[-3,11],[-1,3],[-3,3],[-9,5],[-2,1],[-4,9],[-3,10],[-2,13],[-1,14],[-8,25],[-8,9],[-28,1],[-17,7],[-6,2],[-8,-5],[-3,-8],[-3,-2],[-8,11],[-6,19],[-14,62],[-4,13],[-7,-10],[2,-20],[6,-22],[6,-12],[0,-8],[-11,9],[-11,20],[-4,24],[7,35],[-6,24],[1,13],[4,8],[20,19],[-21,3],[0,28],[16,59],[-15,-12],[-19,-21],[-12,-21],[10,-9],[7,-144],[-8,20],[-18,33],[-8,19],[-3,24],[-1,26],[-5,20],[-15,2],[4,16],[2,21],[-1,18],[-7,8],[-4,-9],[-11,-41],[-7,-13],[-2,30],[3,39],[14,74],[-20,-27],[12,45],[3,18],[-5,-3],[-14,-6],[7,28],[-2,11],[-8,-7],[-12,-23],[-5,10],[-8,-7],[-30,-3],[-14,-16],[-6,1],[0,25],[-5,0],[-5,-13],[-8,-13],[-9,-9],[-11,-1],[3,8],[6,28],[-4,0],[-10,-1],[-5,1],[-1,-2],[-6,-7],[-3,-1],[-2,3],[-5,12],[-2,3],[-10,-5],[-18,-13],[-11,0],[0,10],[5,9],[-2,5],[-6,2],[-9,1],[-8,2],[-11,12],[-7,4],[-14,-1],[-34,-15],[-15,-11],[26,-23],[8,-4],[-13,-29],[-4,-17],[-2,-21],[1,-22],[8,-55],[-2,-31],[-6,-16],[-8,3],[-17,185],[-4,16],[-30,65],[-2,22],[6,26],[7,12],[20,28],[3,12],[3,17],[3,15],[14,16],[9,25],[26,102],[19,56],[24,37],[27,-8],[-15,-12],[-11,-14],[-20,-40],[-3,-11],[-7,-38],[-2,-4],[-15,-23],[4,-33],[27,-5],[77,22],[44,-2],[14,-7],[9,-17],[6,-20],[7,-18],[10,-11],[12,-5],[29,-3],[12,-9],[7,1],[3,13],[-1,13],[-2,9],[-4,6],[-8,3],[10,33],[8,-4],[10,-21],[11,-17],[13,0],[21,29],[14,7],[6,-4],[17,-13],[6,-1],[8,12],[-2,13],[-8,12],[-7,8],[-16,9],[-30,11],[-12,16],[11,5],[6,10],[1,14],[-6,20],[-10,13],[-9,3],[-34,-5],[-2,8],[-1,26],[-2,13],[-6,16],[-7,13],[-9,7],[5,-44],[0,-19],[-5,0],[-25,58],[-19,26],[-19,6],[3,-7],[7,-29],[-4,4],[-12,9],[-4,5],[1,-25],[13,-25],[1,-22],[-24,24],[-3,46],[12,101],[-8,-7],[-9,-2],[-8,2],[-8,7],[0,8],[23,17],[37,74],[22,35],[-4,7],[-4,14],[-2,5],[6,5],[7,3],[14,2],[10,4],[0,10],[-5,9],[-3,3],[8,16],[11,15],[10,17],[5,24],[-4,-3],[-2,-1],[-1,-1],[-3,-4],[-12,17],[-10,4],[-26,-3],[-12,6],[-16,21],[-11,10],[-12,5],[-12,0],[-12,-5],[-12,-10],[-29,-48],[-12,-7],[-3,-2],[-11,-13],[-5,-2],[-6,2],[-12,13],[-6,2],[-8,6],[-46,52],[-12,-7],[-10,-15],[-11,-8],[-51,-9],[4,12],[5,9],[5,8],[6,7],[-48,-23],[-27,-5],[-22,10],[-11,39],[-10,13],[-12,-16],[-1,-14],[6,-18],[11,-26],[3,-16],[5,-74],[4,-11],[20,-38],[7,-9],[27,-71],[22,-30],[6,-7],[0,-8],[-33,26],[9,-10],[20,-35],[-5,-8],[-23,32],[-9,18],[-20,69],[-10,17],[-25,16],[-8,21],[-5,27],[-4,51],[-6,14],[-68,78],[-24,36],[-10,28],[5,57],[5,31],[6,20],[5,23],[-8,24],[-19,37],[9,12],[-3,13],[-15,21],[-13,50],[2,50],[24,225],[10,44],[16,43],[42,83],[21,57],[4,47],[-6,8],[-19,6],[-4,9],[2,12],[5,24],[0,4],[-3,4],[9,8],[11,7],[5,-1],[2,12],[-2,14],[-2,12],[-2,7],[16,98],[27,99],[5,45],[-10,91],[0,52],[8,-8],[17,-13],[6,-10],[3,-15],[-1,-16],[-3,-14],[-1,-14],[8,-25],[30,-55],[6,-22],[8,-50],[6,-18],[22,-22],[2,-5],[18,0],[8,2],[8,7],[-11,-18],[-18,-9],[-12,-10],[5,-21],[5,-7],[11,-13],[6,-11],[1,-12],[0,-15],[2,-13],[8,-5],[32,-3],[13,1],[16,10],[32,48],[11,6],[-12,-35],[-3,-20],[8,-8],[53,9],[6,7],[1,14],[0,17],[2,12],[11,21],[7,7],[9,-6],[0,-7],[-5,-24],[0,-12],[6,-26],[10,-20],[14,-14],[16,-4],[4,-3],[10,-13],[8,-2],[8,2],[6,5],[10,11],[25,16],[10,16],[3,27],[-1,56],[3,21],[17,50],[4,3],[9,0],[6,-3],[7,-6],[6,-7],[2,-7],[2,-5],[10,-6],[3,-3],[0,-8],[-2,-8],[-2,-7],[-1,-4],[4,-27],[3,-10],[8,-7],[-6,-19],[-4,-9],[-5,-8],[8,-23],[11,-52],[10,-24],[7,-6],[7,-2],[6,-4],[4,-14],[-2,-9],[-10,-29],[-2,-11],[11,-32],[27,0],[32,9],[41,-9],[11,16],[11,20],[31,24],[7,2],[7,-2],[19,-15],[18,-3],[14,6],[13,10],[22,8],[6,8],[3,10],[2,10],[-4,1],[-19,13],[-6,9],[40,-3],[21,5],[21,17],[43,-2],[2,-3],[-3,-9],[-7,-31],[-2,-7],[3,-4],[21,-14],[107,-4],[-14,12],[-15,7],[9,17],[27,10],[11,17],[-70,-2],[-9,2],[-5,12],[-2,28],[-3,23],[-13,36],[-4,34],[-7,22],[-2,11],[1,9],[3,6],[2,6],[-1,10],[-5,3],[-7,-2],[-6,3],[-1,14],[2,6],[6,1],[6,0],[5,3],[18,29],[9,11],[14,3],[20,-12],[43,-49],[12,0],[19,-18],[2,-19],[-8,-21],[-13,-24],[26,-9],[81,22],[24,12],[11,3],[12,31],[30,22],[6,8],[27,62],[7,21],[2,21],[-2,22],[-7,18],[-17,32],[-23,51],[-8,7],[0,9],[15,-4],[17,-12],[31,-29],[-5,11],[-14,17],[-6,8],[-6,14],[-3,7],[-1,6],[1,9],[3,8],[4,4],[2,-4],[-12,23],[-19,7],[-20,5],[-17,11],[-1,39],[-24,38],[-141,153],[-62,38],[-12,12],[-26,37],[-33,26],[-14,15],[-4,7],[-7,22],[-16,33],[-6,7],[-25,7],[-14,13],[-10,17],[-10,19],[-13,42],[-8,45],[-3,52],[-1,113],[-4,47],[-7,44],[-12,42],[-33,80],[-6,23],[-3,11],[-8,4],[-8,2],[-5,5],[-3,16],[2,12],[4,12],[2,14],[0,8],[-4,26],[-1,16],[9,30],[1,15],[0,22],[-3,26],[-4,25],[-7,21],[-22,30],[-33,30],[-36,15],[-30,-13],[-30,23],[-216,-50],[-41,-31],[-14,-4],[-55,3],[-39,29],[-29,-17],[-27,-34],[-17,-26],[-70,-78],[-17,-38],[-81,-249],[-12,-27],[-10,-11],[-6,-14],[-5,-31],[-4,-34],[3,-20],[8,4],[22,40],[11,10],[35,-5],[16,-11],[9,-20],[-1,-17],[-11,-27],[-2,-14],[0,-13],[4,-26],[0,-15],[-2,-29],[-47,-168],[-4,-27],[-8,-37],[-2,-12],[2,-13],[8,-33],[7,-54],[5,-82],[5,-22],[37,-109],[4,-23],[-4,-27],[-15,-38],[0,-29],[-5,0],[-4,12],[-11,14],[-4,10],[-1,14],[5,40],[0,30],[-2,27],[-5,26],[-7,24],[-3,7],[-9,15],[-3,5],[-1,15],[2,25],[-1,13],[-15,77],[-1,13],[-9,11],[-11,49],[-12,12],[-9,2],[-6,8],[-3,13],[-1,17],[-1,12],[-4,8],[-12,16],[-8,8],[-18,4],[-7,6],[-25,45],[-12,13],[-13,8],[-9,14],[-2,32],[3,3],[14,37],[3,11],[0,15],[0,28],[1,9],[4,14],[0,8],[-2,8],[-3,5],[-4,3],[-1,2],[-6,27],[-4,10],[-5,8],[-5,2],[-11,-2],[-5,4],[-7,15],[-4,6],[-11,7],[-11,18],[-6,4],[-17,7],[-9,19],[29,41],[107,149],[94,129],[0,1],[151,173],[110,54],[40,33],[155,85],[46,14],[124,31],[108,27],[169,42],[53,-10],[51,-25],[109,-101],[119,-110],[71,-65],[83,-77],[119,-152],[17,-30],[7,-25],[-1,-22],[-2,-23],[-2,-28],[4,-27],[8,-23],[73,-138],[32,-60],[45,-113],[45,-111],[22,-37],[24,-30],[44,-43],[11,-17],[9,-22],[20,-67],[12,-22],[14,-16],[20,-15],[22,-11],[88,7],[42,23],[65,13],[63,43],[24,3],[48,-7],[114,-8],[131,-10],[146,-11]],[[5686,5683],[30,-4],[325,37]],[[6041,5716],[-4,-205],[-8,-21],[-7,-26],[-45,-15],[-90,-40],[-23,-42],[-44,-357],[-5,-21],[-7,-24],[-12,-9],[-44,-10],[-12,-7],[-6,-17],[-4,-20],[-14,-134],[-4,-22],[-6,-21],[-11,-7],[-12,-1],[-38,5],[87,-531],[14,-59],[177,-269],[28,-60],[57,-167],[5,-29],[-7,-12],[-12,-7],[-29,-6],[-12,-4],[-5,-8],[2,-18],[34,-146],[6,-38],[-7,-15],[-12,-8],[-15,-1],[-7,-38],[1,-68],[51,-297],[3,-3],[4,-3],[10,-4],[8,0],[13,1],[16,-2],[14,4],[63,-6],[10,-3],[5,-2],[4,-4],[3,-5],[7,-13],[36,-95],[2,-2],[3,2],[7,7],[10,7],[21,12],[4,2],[21,1],[31,-11],[11,-8],[4,-4],[3,-6],[4,-8],[2,-7],[1,-7],[2,-15],[-1,-16],[0,-8],[-3,-15],[-5,-20],[-7,-18],[-9,-18],[-4,-6],[-18,-17],[-17,-8],[-10,-2],[-10,-1],[-11,2],[-10,4],[-5,2],[-7,7],[-7,8],[-7,14],[-4,9],[0,65],[-5,29],[-8,30],[-16,45],[-10,21],[-14,20],[-5,4],[-5,4],[-31,8],[-10,0],[-15,-5],[-32,-2],[-5,-1],[-5,-4],[2,-8],[130,-316],[26,-61],[163,-406],[34,-118],[2,-382],[2,-391],[5,-67],[8,-6],[8,-8],[31,-3],[5,-9],[3,-64],[-2,-7],[-3,-3],[-3,-3],[-6,-9],[-3,-3],[-4,-2],[-6,-7],[-3,-4],[-4,-4],[-3,-2],[-10,-4],[-22,1],[-13,-4],[-5,-5],[-4,-7],[-6,-16],[0,-9],[0,-8],[12,-35],[4,-10],[11,-19],[9,-14],[28,-46],[11,-11],[4,-4],[3,-6],[-1,-6],[-2,-4],[-15,-22],[-5,-10],[-2,-6],[-1,-8],[-6,-97],[-2,-18],[-2,-12],[-22,-38],[-6,-8],[-25,-24],[-6,-9],[-8,-17],[-7,-11]],[[6321,530],[-5,3],[-8,2],[-6,5],[-4,7],[-5,11],[0,5],[3,14],[0,6],[-11,15],[-2,0],[-1,0],[-9,12],[6,14],[1,4],[-7,9],[-5,4],[-6,0],[-37,-11],[-9,-5],[-18,40],[-9,29],[-2,35],[3,8],[9,14],[3,9],[-1,24],[1,7],[4,31],[0,13],[-4,9],[4,30],[0,21],[-3,20],[-3,46],[-5,23],[-6,22],[-7,19],[-11,20],[-13,17],[-14,12],[-17,4],[-10,7],[8,15],[15,18],[8,14],[1,12],[-3,26],[2,16],[5,6],[6,4],[6,7],[3,14],[0,12],[1,13],[3,11],[3,9],[8,15],[1,8],[-1,6],[-2,40],[-11,81],[-10,26],[-2,12],[0,31],[-2,13],[-3,14],[-2,8],[-5,8],[-5,6],[-7,5],[2,9],[1,3],[2,6],[-10,37],[4,64],[15,105],[-4,20],[-1,16],[3,14],[4,10],[4,12],[3,15],[1,16],[-1,16],[-3,12],[-6,20],[-6,45],[-28,6],[-35,9],[-72,-2],[-84,-2],[-150,-4],[-98,-3],[-112,-3],[-23,19],[-15,38],[-20,80],[-15,36],[-75,136],[-32,74],[-27,83],[-20,42],[-27,17],[-58,15],[-26,23],[-46,58],[-101,49],[-8,0],[-6,-5],[-8,-19],[-5,-8],[-7,-2],[-9,11],[-5,22],[-4,24],[-5,21],[-11,19],[-11,2],[-22,-13],[-6,1],[-6,4],[-6,7],[-4,7],[-12,4],[-2,10],[2,11],[1,8],[1,4],[3,4],[1,7],[-5,9],[-13,21],[-44,55],[-8,18],[-14,90],[-2,27],[3,15],[4,12],[3,12],[-2,11],[-4,14],[2,29],[-3,18],[-14,27],[-14,20],[-16,7],[-40,-27],[-15,2],[-94,100],[-23,35],[-7,6],[-21,5],[-9,4],[-10,11],[-28,19],[-55,18],[-42,35],[-4,-9],[-1,-19],[-10,-18],[-7,-3],[-7,-1],[-15,4],[-8,0],[-5,-6],[-5,-8],[-6,-5],[-16,-3],[-16,4],[-30,18],[-35,46],[-12,9],[-14,-2],[-11,-11],[-8,-19],[-6,-21],[-10,-22],[-12,-9],[-64,-9],[-10,4],[-18,19],[-9,7],[-55,12],[-12,6],[-12,15],[-3,15],[0,18],[-2,24],[-3,10],[-11,30],[0,10],[1,10],[0,9],[-5,9],[-12,8],[-12,4],[-23,3],[-47,16],[-110,78],[-24,10],[-12,-2],[-12,-4],[-11,-1],[-11,7],[-4,8],[-6,19],[-5,8],[-6,2],[-12,-4],[-2,0],[-4,1],[-9,8],[-8,11],[-10,9],[-10,0],[-11,-4],[-34,-1],[-36,15],[-12,3],[-12,-3],[-11,-5],[-11,-2],[-101,59],[-18,34],[14,69],[2,22],[-4,23],[-15,31],[-8,40],[-23,36],[-8,18],[-13,46],[-16,40],[-3,11],[-1,10],[-2,9],[-7,7],[-15,7],[-8,2],[-8,-2],[-12,-8],[-6,-10]],[[3327,6472],[4,-16],[3,-6],[3,-4],[4,-3],[26,-9],[5,-3],[3,-4],[6,-9],[5,-9],[2,-5],[4,-4],[4,-4],[5,-2],[7,-1],[44,8],[5,2],[5,5],[26,39],[16,13],[44,25],[285,-7],[83,16],[172,71],[76,-11],[13,3],[3,6],[2,7],[-3,33],[1,7],[1,7],[2,6],[3,4],[3,3],[6,1],[56,-1],[47,-17],[31,-19],[280,-99],[35,-68],[10,-12],[42,-42],[52,-17],[177,-4],[384,0],[9,-2],[4,-6],[1,-15],[0,-419],[2,-17],[5,-12],[41,-68],[4,-4],[6,-2],[14,5],[9,5],[7,6],[4,4],[3,5],[8,16],[3,5],[4,4],[7,1],[9,-1],[20,-7],[9,-1],[7,1],[15,13],[4,2],[5,-1],[6,-4],[8,-14],[4,-8],[3,-8],[2,-12],[4,-46],[6,-31],[2,-6],[2,-6],[4,-6],[7,-9],[7,-11],[2,-5],[2,-14],[3,-12],[2,-5],[22,-4],[91,20]],[[6029,7958],[0,-25],[-3,-226],[-4,-20],[-10,-26],[-510,-1],[-6,-1],[4,-846],[1,-15],[4,-8],[9,-4],[140,-6],[9,-5],[4,-13],[1,-17],[4,-394],[5,-419],[3,-240],[6,-9]],[[2883,8049],[25,-2],[157,-12],[67,-20],[86,-25],[14,11],[21,56],[14,22],[33,23],[15,15],[8,13],[1,9],[-5,6],[-35,12],[-11,7],[-10,10],[-15,25],[-14,32],[-9,36],[-4,36],[1,46],[-3,38],[-8,34],[-15,36],[-13,47],[1,41],[5,42],[2,49],[-16,103],[1,51],[20,38],[67,44],[29,30],[26,54],[0,1],[39,100],[57,77],[66,45],[67,4],[100,-24],[33,9],[39,26],[13,5],[48,-4],[14,5],[15,15],[-2,13],[-9,14],[-5,20],[6,17],[27,12],[10,16],[28,90],[7,31],[-2,20],[-15,45],[-4,35],[12,13],[19,12],[18,29],[6,15],[8,13],[13,8],[15,4],[16,-1],[14,-6],[10,-14],[16,-33],[11,-9],[12,2],[25,15],[13,3],[15,-4],[70,-46],[24,-24],[18,-33],[7,-47],[-2,-24],[-4,-22],[0,-20],[8,-18],[12,-4],[45,10],[9,7],[2,11],[-3,11],[-8,10],[-28,46],[-53,117],[-18,61],[-22,46],[-25,27],[-88,56],[-13,17],[-4,25],[6,19],[13,13],[27,16],[37,31],[13,6],[17,-1],[76,-42],[36,-11],[37,-3],[29,11],[15,38],[9,111],[13,30],[17,-14],[152,-244],[47,-60],[49,-31],[32,-7],[20,1],[21,8],[20,13],[18,3],[17,-15],[45,-64],[10,-22],[6,-25],[9,-100],[9,-23],[20,-15],[36,-5],[17,-8],[28,-42],[17,-9],[37,-2],[149,32],[61,-8],[31,5],[32,-4],[22,-34],[20,-42],[24,-31],[32,-17],[16,-13],[8,-17],[-2,-22],[-12,-12],[-14,-8],[-11,-12],[-7,-60],[14,-65],[2,-51],[-42,-23],[-13,-5],[-8,-12],[-1,-18],[8,-18],[10,-6],[37,1],[73,-38],[21,-25],[16,-34],[8,-17],[11,-16],[33,-27],[10,-12],[9,-15],[7,-18],[1,-19],[-8,-16],[-11,-3],[-14,9],[-24,21],[-27,12],[-22,-3],[-19,-18],[-18,-36],[6,-46],[22,-58],[47,-92],[6,-24],[-10,-17],[-29,-20],[-12,-15],[-9,-18],[-6,-23],[-8,-105],[5,-31],[19,-27],[77,-55],[68,-49],[43,-44],[38,-54],[20,-20],[24,-10],[43,2],[85,40],[141,12],[50,-17],[33,-49],[5,6],[5,7],[9,22]],[[8650,2235],[-1,0],[-164,-1],[-143,1],[-196,1],[-167,0],[-168,-1],[-20,7],[-5,35],[-9,603],[28,35],[12,20],[28,63],[95,183],[-8,57],[-95,172],[-243,406],[-47,41],[-161,93],[-73,39],[-63,81],[-225,352],[-577,882],[-134,200],[-108,159],[-24,35],[-141,18]],[[6029,7958],[4,10],[3,-3],[2,-12],[4,-12],[41,10],[13,0],[72,-72],[29,-17],[27,2],[24,17],[20,30],[13,41],[17,14],[7,46],[10,28],[16,10],[26,-4],[68,-25],[61,-37],[158,-163],[13,-21],[52,-122],[6,-22],[2,-26],[2,-92],[4,-20],[-6,-9],[8,-26],[22,-110],[8,-60],[6,-28],[8,-17],[23,-36],[8,-18],[14,-80],[10,-28],[26,-49],[4,-12],[6,-30],[1,-3],[4,-9],[15,-16],[33,-14],[58,-48],[7,-11],[2,-56],[5,-24],[18,-51],[6,-24],[2,-26],[1,-35],[3,-26],[21,-67],[3,-28],[-4,-24],[-6,-23],[-3,-29],[2,-30],[13,-73],[7,-35],[51,-91],[7,-6],[41,-58],[82,-85],[96,-98],[115,-117],[232,-237],[97,-100],[45,-62],[76,-152],[42,-63],[78,-81],[99,-102],[113,-117],[21,-16],[21,-6],[18,6],[54,40],[22,3],[16,-15],[22,-40],[40,-75],[148,-181],[90,-76],[104,-53],[47,-44],[94,-124],[66,-88],[95,-94],[70,-69],[116,-115],[47,-23],[49,6],[18,15],[34,40],[20,12],[24,-3],[71,-50],[46,-11],[20,-16],[44,-51],[45,-19],[23,-15],[21,-29],[33,-61],[71,-49],[22,-10],[54,0],[27,-11],[25,-18],[24,-25],[8,-36],[7,-27],[-26,-74],[-39,-74],[-24,-65],[-3,-51],[6,-103],[-3,-52],[-16,-88],[-2,-46],[9,-37],[14,-18],[11,-18],[3,-21],[-11,-27],[-13,-20],[-11,-22],[-1,-24],[17,-20],[-12,-11],[-12,-16],[-11,-18],[-6,-7],[-7,-2],[-9,7],[-10,23],[-7,5],[-17,-3],[-49,-24],[-18,3],[-14,16],[-12,17],[-5,4],[-6,5],[-7,3],[-10,12],[-7,3],[-24,-2],[-8,2],[-14,10],[-12,18],[-20,39],[-12,16],[-158,88],[-14,15],[-5,8],[-5,13],[-12,39],[-6,5],[-14,5],[-10,7],[-2,-19],[-5,-34],[-9,-11],[-29,0],[-12,-4],[-9,-8],[-7,-13],[-7,-21],[-9,-26],[-7,-28],[-3,-29],[5,-56],[1,-29],[-4,-27],[-9,-18],[-20,-30],[-32,-67],[-25,-19],[-10,-1],[-299,-11],[-52,-26],[-127,-102],[-21,-23],[-13,-33],[-3,-51],[13,-99],[3,-51],[-9,-45],[-26,-70]],[[8650,2235],[-76,-207],[-11,-42],[-9,-51],[-3,-27],[1,-26],[3,-27],[10,-50],[2,-27],[-4,-52],[-8,-48],[-12,-46],[-55,-128],[-15,-26],[-23,-28],[-24,-13],[-52,-19],[-13,-8],[-10,-10],[-9,-16],[-11,-53],[-7,-9],[-8,4],[-12,7],[-29,7],[-26,-7],[-25,-19],[-47,-53],[-9,-17],[-5,-21],[0,-23],[6,-62],[0,-17],[-67,40],[-20,6],[-11,-2],[-12,-3],[-21,-10],[-66,-59],[-28,-11],[-87,-8],[-14,-4],[-13,-11],[-10,-16],[-17,-34],[-10,-14],[-57,-40],[-61,-20],[-154,5],[-14,-4],[-11,-18],[-3,-22],[5,-17],[7,-17],[3,-23],[4,-17],[36,-49],[10,-20],[5,-6],[18,-10],[3,-7],[0,-9],[-5,-12],[-19,-22],[-54,-26],[-19,-28],[-1,-20],[2,-67],[2,-16],[12,-14],[2,-14],[-7,-41],[-3,-49],[-4,-25],[-10,-15],[-14,-5],[-29,-4],[-14,-5],[-47,-34],[-64,-77],[-3,-3],[-44,-33],[-19,-28],[-9,-19],[-9,-13],[-10,-10],[-51,-34],[-12,-4],[-6,1],[-21,14],[-8,-1],[-7,-3],[-7,-1],[-7,7],[-47,65],[-19,-2],[-22,-32],[-69,-142],[-11,-9],[-7,14],[-14,47],[-4,20],[1,53],[-1,22],[-5,24],[-7,20],[-10,16],[-39,26],[-20,20],[-72,108],[-18,20],[-21,16],[-41,1],[-85,-45],[-42,-5],[-95,22],[-46,28],[-32,55],[-46,64],[-6,4]]],
transform:{scale:[.0014209532033859142,.0007651305902590257],translate:[52.43767061734431,35.14064687100006]}},m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();