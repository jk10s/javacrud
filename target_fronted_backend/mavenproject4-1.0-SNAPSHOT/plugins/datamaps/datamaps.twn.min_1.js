!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo={type:"Topology",objects:{twn:{type:"GeometryCollection",geometries:[{type:"Polygon",properties:{name:"Kaohsiung City"},id:"TW.KH.KC",arcs:[[0,1,2,3,4,5,6]]},{type:"MultiPolygon",properties:{name:"Pingtung"},id:"TW.TW.PT",arcs:[[[7]],[[8,9,-3]]]},{type:"MultiPolygon",properties:{name:"Tainan City"},id:"TW.TW.TN",arcs:[[[10]],[[11]],[[12]],[[13]],[[-5,14,15]]]},{type:"Polygon",properties:{name:"Hsinchu City"},id:"TW.TW.HS",arcs:[[16,17,18]]},{type:"Polygon",properties:{name:"Hsinchu"},id:"TW.TW.HH",arcs:[[19,20,21,-19,22,23]]},{type:"MultiPolygon",properties:{name:"Yilan"},id:"TW.TW.IL",arcs:[[[24]],[[25,26,-20,27,28,29]]]},{type:"Polygon",properties:{name:"Keelung City"},id:"TW.TW.CL",arcs:[[30,31]]},{type:"Polygon",properties:{name:"Miaoli"},id:"TW.TW.ML",arcs:[[-22,32,33,-17]]},{type:"Polygon",properties:{name:"Taipei City"},id:"TW.TP.TC",arcs:[[34]]},{type:"MultiPolygon",properties:{name:"New Taipei City"},id:"TW.TW.TP",arcs:[[[-31,35,-29,36,37],[-35]],[[38]]]},{type:"Polygon",properties:{name:"Taoyuan"},id:"TW.TW.TY",arcs:[[-28,-24,39,-37]]},{type:"Polygon",properties:{name:"Changhua"},id:"TW.TW.CG",arcs:[[40,41,42,43]]},{type:"MultiPolygon",properties:{name:"Chiayi"},id:"TW.TW.CH",arcs:[[[44]],[[45]],[[46]],[[47]],[[48]],[[49]],[[50,-6,-16,51,52],[53]]]},{type:"Polygon",properties:{name:"Chiayi City"},id:"TW.TW.CS",arcs:[[-54]]},{type:"Polygon",properties:{name:"Hualien"},id:"TW.TW.HL",arcs:[[54,55,-1,56,57,-26]]},{type:"Polygon",properties:{name:"Nantou"},id:"TW.TW.NT",arcs:[[-57,-7,-51,58,-41,59]]},{type:"Polygon",properties:{name:"Taichung City"},id:"TW.TW.TG",arcs:[[-21,-27,-58,-60,-44,60,-33]]},{type:"Polygon",properties:{name:"Yunlin"},id:"TW.TW.YL",arcs:[[-59,-53,61,-42]]},{type:"MultiPolygon",properties:{name:"Taitung"},id:"TW.TW.TT",arcs:[[[62]],[[63]],[[64]],[[-9,-2,-56,65]]]},{type:"MultiPolygon",properties:{name:"Penghu"},id:"TW.TW.PH",arcs:[[[66]],[[67]],[[68]],[[69]],[[70]],[[71]],[[72]],[[73]],[[74]],[[75]],[[76]],[[77]],[[78]],[[79]],[[80]],[[81]],[[82]],[[83]]]},{type:"MultiPolygon",properties:{name:"Kinmen"},id:"TW.FK.KM",arcs:[[[84]],[[85]],[[86]]]},{type:"MultiPolygon",properties:{name:"Lienchiang"},id:"TW.FK.LK",arcs:[[[87]],[[88]],[[89]],[[90]],[[91]]]}]}},arcs:[[[7259,3416],[19,-45],[-29,-39],[-55,-19],[-14,-25],[10,-31],[55,-28],[62,-40],[27,-59],[4,-20]],[[7338,3110],[-154,-30],[-63,-32],[-39,-30],[-77,-39],[-8,-45],[22,-46],[-26,-39],[-73,-31],[-9,-53],[22,-78],[-30,-103],[-1,-87],[-42,-46],[-84,-57],[-23,-76],[14,-63],[29,-36],[60,-50],[13,-39],[-38,-3]],[[6831,2127],[-1,0],[-51,7],[-42,-2],[-84,-52],[-58,43],[-74,69],[-71,-14],[-65,-46],[-129,52],[-92,-35],[-63,-56],[-78,-22],[-175,9],[-17,-38],[-13,-56],[-26,-62],[6,-55],[-2,-74],[-55,-166],[-2,-56],[28,-59],[3,-64],[-80,-161]],[[5690,1289],[-25,9],[-16,-1],[-18,-5],[-21,0],[-128,80],[-119,134],[125,-120],[-14,57],[-21,31],[-17,25],[-52,48],[-89,65],[-34,33],[-16,37],[22,36],[11,33],[-15,45],[-26,44],[-49,60],[-45,80],[-10,35],[1,23],[15,28],[3,19],[-5,10],[-13,7],[-13,11],[-6,18],[-28,38],[-7,15],[-21,107]],[[5059,2291],[61,28],[1,-3],[39,-68],[47,-19],[154,-17],[81,7],[83,-8],[41,11],[34,21],[64,20],[62,35],[23,42],[30,41],[52,55],[60,51],[64,42],[73,56],[63,65],[98,133],[103,118],[22,51]],[[6314,2952],[0,1],[-9,51],[-15,36],[2,38],[35,28],[67,-6],[58,5],[121,57],[44,41],[78,48],[75,33],[42,40],[35,53],[83,52],[182,74]],[[7112,3503],[43,-8],[57,-18],[41,-45],[6,-16]],[[5585,1005],[3,-3],[2,0],[2,-5],[13,-15],[-4,-3],[1,-4],[-26,-15],[-4,-2],[-16,-10],[-30,-21],[0,2],[0,-1],[-8,25],[13,20],[0,1],[27,28],[21,0],[6,3]],[[6831,2127],[33,-52],[8,-38],[52,-10],[55,-29],[-28,-107],[-1,-41],[-20,-39],[-96,-32],[-47,-21],[-75,-13],[-53,-35],[-23,-52],[-36,-51],[-30,-59],[-8,-115],[12,-51],[20,-48],[10,-56],[0,-41],[25,-40],[46,-43],[-24,-30],[-53,-25],[-20,-31],[-5,-36],[27,-30],[33,-13],[31,-35],[-1,-45],[5,-47],[32,-47],[45,-38],[100,-37],[44,3]],[[6889,743],[9,-406],[-16,-57],[-25,-47],[-33,-20],[-39,-29],[1,-66],[14,-71],[-3,-47],[-44,54],[-67,40],[-77,28],[-78,15],[-3,-52],[-23,-18],[-33,6],[-36,25],[-2,18],[12,55],[-54,73],[-5,19],[1,16],[4,26],[0,84],[5,25],[24,28],[6,23],[-196,406],[-16,22],[-54,54],[-43,77],[-20,22],[-80,51],[-32,14],[-11,3],[-10,6],[-10,29],[-6,11],[-43,22],[-99,38],[-44,24],[-47,33],[-22,11],[-4,1]],[[4744,2552],[-6,-10],[-22,16],[-17,32],[3,10],[7,0],[9,-9],[6,-15],[21,-17],[-1,-7]],[[4749,2767],[-28,-55],[-1,1],[39,105],[2,-2],[4,0],[-13,-40],[-3,-9]],[[4783,2867],[-1,0],[36,76],[5,1],[2,-14],[-42,-63]],[[4846,3042],[-3,-20],[-1,1],[6,82],[5,-1],[-7,-62]],[[5059,2291],[-9,49],[-18,28],[-38,31],[46,26],[26,47],[-10,41],[-62,7],[-12,-14],[-11,-27],[-17,-20],[-33,1],[-13,17],[5,55],[-8,19],[-40,14],[-22,-16],[-19,-23],[-26,-6],[-29,20],[-7,27],[6,27],[12,18],[29,12],[36,4],[31,7],[10,24],[-14,12],[-92,18],[0,16],[77,0],[-8,21],[-42,28],[-27,25],[7,32],[24,11],[27,7],[13,19],[-8,31],[-13,25],[9,23],[13,29],[23,21],[-5,17],[5,18],[33,70],[15,13],[26,5],[-37,20],[15,31]],[[4927,3151],[52,-15],[87,-10],[71,-14],[61,21],[25,39],[57,28],[65,40],[46,37],[60,36],[76,27],[150,22],[83,4],[71,-19],[39,-19],[20,-32],[18,-40],[97,-79],[9,-58],[-17,-111],[16,-36],[44,-27],[37,0],[53,19],[49,5],[36,-9],[82,-8]],[[7107,6267],[-2,-2],[-45,-9],[-43,14],[-27,29],[-42,20],[-67,21]],[[6881,6340],[11,31],[54,88],[22,23],[7,12],[0,13],[-7,14],[-11,17],[15,23],[17,14]],[[6989,6575],[82,-27],[148,-37],[53,-22],[38,-30],[18,-28],[-9,-28],[-23,-11],[-51,-6],[-58,-19],[-34,-33],[-22,-44],[-24,-23]],[[8275,6e3],[-23,-50],[-14,-36],[6,-34],[-37,-45],[-137,-109],[-43,-81]],[[8027,5645],[-28,6],[-104,-8],[-7,-4]],[[7888,5639],[-6,37],[-45,61],[-33,24],[-13,35],[-49,30],[-123,-24],[-47,3],[-67,-3],[-75,-16],[-40,7],[8,39],[13,36],[-10,31],[-9,22],[9,25],[8,26],[3,30],[-7,41],[-38,25],[-120,45],[-59,34],[-37,35],[-44,85]],[[6989,6575],[1,1],[14,17],[6,30],[9,22],[20,22],[26,17],[25,7],[-2,9],[6,23],[22,46],[20,26]],[[7136,6795],[32,-9],[134,8],[45,-24],[39,-67],[49,-15],[43,-10],[40,-15],[67,-17],[36,-32],[-12,-45],[34,-29],[65,-16],[41,-23],[31,-24],[37,-5],[38,2],[33,-27],[26,-35],[43,-17],[33,-20],[4,-39],[15,-56],[-18,-59],[-46,-50],[6,-34],[50,-30],[61,-29],[54,-7],[40,-22],[72,-32],[47,-17]],[[9643,6575],[2,-1],[19,-2],[10,-12],[6,-5],[-7,-18],[-38,1],[-13,6],[-4,5],[-1,0],[-12,16],[10,-3],[24,11],[1,2],[2,0],[1,0]],[[9181,5399],[-10,0],[-110,13],[-181,85],[-38,-6],[-23,-46],[-48,-35],[-64,0],[-81,24],[-148,30],[-64,24],[-25,16]],[[8389,5504],[-57,36],[-48,0],[-47,-18],[-38,-4],[-37,19],[-43,20],[-48,8],[-15,29],[7,43],[-36,8]],[[8275,6e3],[5,12],[38,12],[32,-5],[34,10],[22,30],[-31,95],[53,31],[30,6]],[[8458,6191],[57,13],[48,14],[37,25],[49,27],[65,25],[38,21],[-4,15],[-10,25],[-1,32],[19,38],[46,31],[38,17],[128,41],[132,62],[61,15],[50,28],[30,38],[32,32],[36,15],[35,10],[45,22],[16,29],[-25,28],[14,22],[110,18],[36,19],[82,34],[59,10],[33,-15],[7,-9]],[[9721,6873],[-117,-45],[-55,-37],[-183,-175],[-29,-37],[-23,-52],[-15,-59],[-5,-59],[2,-57],[33,-119],[-2,-31],[-14,-30],[2,-63],[33,-48],[64,-31],[76,-11],[0,-14],[-32,3],[-31,-2],[-25,-7],[-18,-10],[25,-39],[14,-50],[-9,-44],[-58,-26],[-5,-19],[8,-23],[17,-21],[5,-21],[-24,-19],[-61,-27],[-69,-63],[-3,-24],[4,-54],[-11,-21],[-13,-17],[-7,-25],[-6,-49],[-5,-13],[-10,-10],[-5,-10],[10,-13],[2,-2]],[[9176,7220],[-3,-91],[2,-24],[36,-29],[-4,-19],[-24,-15],[-40,-11],[-50,5],[-104,34],[-29,16],[-36,27],[-28,27],[-17,27],[-28,28],[-6,22],[31,17],[71,24],[43,22]],[[8990,7280],[14,-7],[7,-8],[17,-13],[38,-11],[110,-21]],[[7888,5639],[-37,-20],[-18,-44],[-47,-15],[-53,0],[-41,-23],[-45,-34],[-58,-25],[-114,-71],[-67,-22],[-87,-36],[-54,16],[-48,43],[-60,19],[-97,6],[-54,-26],[-8,-57],[-52,-22],[-119,-4],[-114,51],[-64,9],[-73,28],[-148,86],[-61,42],[-47,39],[-91,110]],[[6231,5689],[72,62],[18,32],[9,51],[21,43],[58,80],[16,48],[15,21],[67,15],[18,17],[12,20],[13,19],[41,34],[45,26],[55,11],[71,-10],[-10,42],[27,28],[37,30],[18,44],[8,14],[35,14],[4,10]],[[8767,6837],[-57,0],[-48,9],[-36,24],[-37,34],[-57,35],[-39,51],[16,57],[-12,48],[-56,43],[-38,32],[16,23],[18,19],[21,35],[35,30],[107,50],[29,19],[39,15],[37,-9],[21,-17],[-6,-28],[4,-26],[16,-25],[16,-27],[24,-78],[39,-26],[16,-34],[-16,-51],[1,-39],[46,-20],[36,-24],[-19,-33],[-75,-74],[-41,-13]],[[9176,7220],[340,-64],[32,-16],[-16,-28],[-5,-23],[7,-40],[24,-66],[26,-32],[21,-7],[69,8],[35,-3],[41,-8],[37,-15],[20,-19],[-86,-34]],[[8458,6191],[-24,42],[-88,65],[-14,43],[-7,40],[30,29],[15,40],[-83,95],[-50,16],[-72,-3],[-51,22],[13,51],[-10,40],[-52,39],[-11,39],[11,45],[-2,47],[36,31],[128,30],[33,27],[10,32],[-5,31],[-50,57],[-42,18],[-40,7],[-31,22],[-47,23],[-61,24],[-42,35]],[[7952,7178],[111,16],[46,14],[61,39],[18,8],[22,3],[30,0],[35,-9],[18,-20],[12,-21],[15,-12],[34,11],[-35,43],[-57,45],[-30,15],[9,21],[17,11],[19,7],[8,7],[20,40],[32,45],[64,45],[95,38],[108,19],[106,-10],[44,-25],[98,-109],[36,-57],[11,4],[27,5],[30,3],[22,-5],[-2,-6],[-10,-10],[-10,-14],[1,-17],[10,-9],[23,-13]],[[9999,8308],[-21,-11],[-3,22],[24,-11]],[[7136,6795],[88,109],[68,64],[71,46],[181,47],[42,21],[36,25],[45,18],[88,25],[197,28]],[[6350,4717],[0,-28],[-42,-11],[-12,-23],[6,-31],[-20,-35],[-16,-43],[-1,-44],[-11,-51],[-9,-104],[20,-49],[36,-25],[38,-11],[55,-22],[-10,-28],[-37,-12],[-25,-17],[-23,-12]],[[6299,4171],[-10,-6],[-118,19],[-57,-1],[-120,47],[-193,17],[-114,34],[-66,14],[-74,3],[-216,-20],[-74,34]],[[5257,4312],[7,11],[16,55],[12,23],[69,53],[20,22],[27,60],[40,60],[57,125],[26,36],[30,24],[24,13],[22,8],[15,11],[6,23],[12,21],[50,32],[12,23],[6,78],[9,22],[26,20],[112,102]],[[5855,5134],[57,-14],[39,-28],[26,-49],[10,-58],[44,-42],[117,-28],[43,-27],[31,-39],[20,-31],[0,-30],[12,-26],[42,-6],[54,-28],[0,-11]],[[4899,3136],[-18,-10],[-3,9],[23,24],[9,18],[11,12],[6,-4],[1,-9],[-14,-15],[-15,-25]],[[4921,3235],[-9,-9],[2,14],[20,30],[8,3],[-4,-15],[-17,-23]],[[4969,3305],[-1,0],[0,34],[5,-3],[1,-22],[-5,-9]],[[4983,3381],[-5,-14],[-1,3],[-2,-2],[-5,16],[12,-3],[1,0]],[[4970,3428],[-5,-11],[-10,14],[-3,3],[16,-3],[0,-2],[2,-1]],[[4677,3420],[-31,-13],[37,43],[137,109],[104,105],[25,6],[-89,-114],[-44,-35],[-29,-28],[-37,-29],[-29,-16],[-44,-28]],[[6540,3817],[60,-5],[66,-21],[40,-9],[51,-21],[-4,-41],[-29,-41],[12,-37],[26,-51],[4,-45],[11,-30],[75,-10],[251,-2],[9,-1]],[[4927,3151],[38,2],[32,12],[14,-4],[-8,25],[-22,-13],[-18,4],[-24,1],[-1,26],[25,43],[36,2],[53,0],[-36,81],[-41,63],[19,28],[0,16],[-30,11],[4,14],[17,16],[9,20],[39,41],[-84,-5],[-2,68]],[[4947,3602],[10,1],[1,0],[104,10],[81,-37],[60,0],[39,24],[16,38],[21,23],[52,7],[68,44],[44,19],[37,29],[161,73],[70,16],[124,18],[68,3],[52,-36],[49,-46],[124,-36],[36,4],[82,19],[46,-26],[23,-31],[62,5],[116,19],[38,10],[0,27],[4,38],[5,0]],[[5628,3578],[-37,-32],[9,-44],[60,-18],[69,-35],[72,-13],[66,21],[45,4],[29,17],[-25,53],[-24,31],[-40,17],[-55,17],[-77,-6],[-92,-12]],[[9181,5399],[7,-6],[9,-11],[7,-12],[2,-8],[-14,-19],[-57,-43],[-62,-67],[-45,-29],[-15,-15],[7,-17],[-8,-11],[-66,-39],[-24,-19],[-28,-47],[-28,-94],[-73,-84],[-14,-34],[2,-37],[17,-40],[15,-17],[13,-9],[8,-10],[1,-25],[-11,-28],[-36,-45],[-7,-27],[-4,-49],[-32,-126],[-62,-133],[-79,-311],[-47,-76],[-109,-498]],[[8448,3413],[-34,8],[-106,-41],[-38,-42],[17,-54],[6,-53],[-36,-53],[-33,-41],[-27,-52],[-23,-65],[-37,-60],[-47,-103],[-31,-47],[1,-53],[-9,-48],[-63,-29],[-81,9],[-115,75],[-90,125],[-56,12],[-62,7],[-49,37],[-60,22],[-77,22],[-49,64],[-11,57]],[[7259,3416],[60,27],[30,22],[-17,48],[15,21],[15,32],[51,29],[72,13],[73,2],[52,37],[13,66],[39,40],[75,22],[44,24],[16,40],[31,98],[13,65],[-10,56],[-11,42],[-31,31],[-21,31],[55,73],[3,29],[25,55],[37,65],[31,68],[15,78],[6,58],[-18,35],[-20,26],[23,59],[50,82],[79,81],[2,30],[-14,35],[-51,26],[-28,24],[-3,77],[36,22],[66,17],[51,19],[-3,28],[-13,49]],[[8097,5198],[27,15],[13,16],[33,13],[30,29],[13,40],[29,38],[74,37],[24,48],[4,32],[45,38]],[[6540,3817],[-26,27],[-81,-6],[-67,-17],[-57,20],[-39,37],[9,44],[19,40],[-10,60],[10,56],[20,36],[-19,57]],[[6350,4717],[42,-1],[176,-20],[41,6],[49,36],[75,112],[36,65],[63,24],[99,-11],[59,2],[57,59],[29,15],[89,-52],[34,7],[26,43],[46,30],[65,-1],[49,15],[77,59],[50,22],[44,6],[86,36],[61,2],[61,8],[110,34],[45,2],[47,-8],[131,-9]],[[5855,5134],[6,6],[7,25],[32,22],[22,49],[27,95],[91,125],[28,77],[33,42],[130,114]],[[4947,3602],[45,40],[-2,128],[7,95],[28,77],[43,59],[12,78],[23,68],[12,23],[61,64],[10,21],[7,11],[55,34],[9,12]],[[8774,109],[-8,-10],[-11,7],[8,11],[11,-8]],[[8728,244],[-54,-14],[-72,23],[-67,38],[-38,29],[11,21],[0,20],[-10,18],[-17,17],[192,0],[0,-14],[-5,-8],[-8,-19],[-4,-23],[9,-20],[46,-27],[20,-20],[-3,-21]],[[8492,1636],[-1,-8],[-7,2],[-17,0],[-9,1],[-5,5],[-26,8],[-27,38],[-14,33],[5,5],[99,6],[11,-5],[7,-15],[-7,-31],[-9,-13],[-4,-13],[4,-13]],[[8448,3413],[-45,-206],[-22,-37],[-69,-74],[-26,-38],[-20,-48],[-15,-89],[2,-79],[-10,-75],[-48,-78],[-20,-16],[-47,-27],[-21,-18],[-10,-17],[-17,-46],[-47,-65],[-29,-102],[-21,-46],[-100,-116],[-13,-21],[-137,-92],[-32,-30],[-5,-21],[7,-49],[-2,-22],[-12,-25],[-21,-27],[-47,-47],[-46,-35],[-158,-84],[-106,-93],[-26,-11],[-21,-22],[-51,-105],[-26,-39],[-79,-79],[-32,-47],[-19,-96],[-47,-131],[-93,-131],[-14,-45],[-16,-126],[2,-115]],[[3141,2877],[-17,-7],[-13,12],[-15,37],[10,9],[37,10],[27,-5],[1,-17],[-2,-13],[-12,-8],[-16,-18]],[[3130,2971],[-17,-25],[-22,6],[-20,19],[-2,19],[12,9],[31,-4],[18,-24]],[[3610,2996],[-5,-1],[0,1],[-1,0],[-10,10],[4,2],[-1,3],[16,1],[3,1],[5,0],[4,-6],[-2,-3],[6,-7],[-11,-1],[-1,0],[-7,0]],[[3621,3015],[-4,0],[2,5],[3,-4],[-1,-1]],[[3746,3031],[4,-1],[22,0],[-4,-8],[4,-2],[-10,-12],[-8,-14],[-5,12],[-6,10],[2,14],[1,0],[0,1]],[[3728,3036],[-1,-6],[2,0],[0,-4],[-5,1],[-5,1],[1,1],[-4,1],[5,0],[7,6]],[[3346,3047],[-18,-6],[12,14],[6,-8]],[[2894,3150],[-3,-1],[-1,1],[-3,3],[4,2],[3,-1],[0,-4]],[[2856,3163],[-3,-2],[-1,1],[-3,4],[5,2],[1,-2],[1,-3]],[[2895,3164],[-1,-8],[-3,0],[-4,12],[8,-4]],[[3417,3262],[-8,-1],[-8,0],[-30,-13],[-3,2],[3,11],[11,11],[7,5],[16,2],[14,-7],[-2,-10]],[[3335,3314],[1,-18],[5,-12],[7,-5],[7,-5],[-6,-12],[-12,-9],[1,-7],[5,-8],[-14,-5],[-32,3],[-15,5],[14,24],[-2,33],[-9,-5],[-19,-5],[-6,18],[20,40],[16,3],[27,-29],[6,-1],[6,-5]],[[2849,3359],[7,-2],[3,1],[13,-4],[-3,-4],[3,-9],[-6,-7],[-20,-4],[-3,4],[-8,4],[10,18],[2,0],[2,3]],[[3424,3551],[-25,-13],[-4,-1],[-3,-2],[-7,0],[-13,-4],[-23,-10],[-2,4],[-10,1],[-3,14],[2,1],[-1,0],[1,0],[5,3],[18,-4],[3,2],[10,4],[3,1],[1,0],[22,9],[24,-4],[2,-1]],[[3615,3769],[-6,-10],[40,10],[30,-3],[22,1],[16,21],[46,-67],[13,-31],[-6,-24],[-19,16],[-25,13],[-28,4],[-39,-17],[-27,-3],[-14,-6],[-7,-11],[-11,-32],[-7,-9],[-45,-21],[-48,-6],[-47,15],[-48,38],[13,19],[26,-25],[39,-6],[42,9],[35,22],[-24,7],[-19,10],[-15,12],[-14,17],[-6,-7],[0,-3],[-1,-1],[-11,-4],[-2,31],[2,31],[18,0],[21,-4],[72,36],[46,12],[-12,-34]],[[3223,3697],[-37,0],[6,16],[12,10],[19,4],[24,2],[22,6],[6,16],[1,37],[32,81],[30,24],[42,-29],[-25,-11],[-17,-28],[-27,-66],[-1,-18],[6,-15],[-3,-10],[-29,-4],[-22,-1],[-15,-2],[-12,-4],[-12,-8]],[[3555,3836],[-22,-5],[-11,11],[-8,27],[-20,23],[-42,33],[54,32],[33,-14],[31,-21],[13,-23],[-24,-18],[10,-27],[-14,-18]],[[3581,4072],[-3,-7],[-1,3],[-1,0],[-11,20],[3,4],[-5,7],[17,11],[11,17],[6,7],[4,-6],[0,-2],[25,-11],[-4,-14],[-22,-10],[-19,-19]],[[81,5593],[-52,-12],[-29,9],[49,77],[13,11],[21,4],[20,0],[19,-10],[17,-14],[-1,-25],[-13,-16],[-16,-1],[-11,-9],[-5,-9],[-12,-5]],[[621,5800],[46,-98],[-10,-67],[-38,-36],[-66,33],[-50,13],[-80,-7],[-70,-34],[-38,-47],[-33,-14],[-39,15],[-26,1],[-23,8],[-12,16],[4,6],[22,21],[6,10],[2,16],[-1,19],[-7,33],[-17,33],[-2,16],[15,7],[74,29],[99,-51],[68,6],[11,68],[22,42],[74,12],[69,-50]],[[3267,6860],[-28,-11],[-13,9],[7,24],[23,11],[17,-2],[2,-15],[-8,-16]],[[4601,9064],[-2,-18],[-19,-15],[-17,-7],[-23,-9],[24,43],[24,-4],[2,7],[11,3]],[[4485,9070],[-20,-16],[-23,26],[35,10],[26,-11],[-18,-9]],[[4453,9489],[10,-4],[44,19],[27,0],[0,-14],[-28,-24],[-54,-22],[-16,-2],[-25,13],[-7,18],[4,21],[11,16],[10,1],[0,-10],[3,-6],[21,-6]],[[4663,9624],[-2,-10],[-4,-7],[5,-9],[-1,-7],[-12,9],[-15,16],[-10,5],[-24,-9],[-9,3],[-13,-3],[-14,-12],[-12,-39],[-11,5],[-5,12],[5,33],[5,12],[11,5],[26,7],[6,7],[22,10],[25,-3],[13,-15],[8,-4],[6,-6]],[[5938,9970],[-11,-3],[-6,1],[-5,2],[-7,-3],[-7,-7],[-11,-16],[-3,4],[-12,2],[-6,2],[-12,5],[11,13],[-5,11],[9,4],[22,14],[26,-11],[6,-10],[11,-8]]],
transform:{scale:[.0003871236732673101,.0004484579316931754],translate:[118.20899498800023,21.904608466000084]}},m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();