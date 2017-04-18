
var age18=[];
var agebetween=[];
var age65=[];
var finaldata=[];

var head=[];
var ll=[];
var ul=[];
var ua=[];
var la=[];
var torso=[];
var finaldata=[];

d3.csv("dataset_final.csv", function(csv){
    data=csv;
    
                  data.forEach(function(d) {
                   
                    d.date = d.date;
                    d.team = d.team;
                    d.player = d.player;
                    d.injury= d.injury;
//                     console.log(d.date);
               });
               
                var teams = d3.map(data, function(d){return d.team;}).keys();   
//                var inj = d3.map(data, function(d){return d.injury;}).keys();
//                console.log(inj);
               // var injuries = ["head", "ua", "la","torso","ul","ll"];
                var injuries = ["ll","ul","torso","la", "ua", "head"];
                var cols= ["team"];
                cols.push.apply(cols,injuries);
//                console.log(cols);
               
                var injuriesPerTeam = d3.nest()
                  .key(function(d) { return d.team; })
                  .key(function(d) { return d.injury; })
                  .rollup(function(v) { return v.length; })
                  .entries(data);
                
                var total_injuries = d3.nest()
                  .key(function(d) { return d.team; })
                  .rollup(function(v) { return v.length; })
                  .entries(data);
//                 console.log(total_injuries);
//                var maximum_injuries= d3.max(total_injuries,function(d){return d.value});
                
//                console.log(maximum_injuries);
                
                var json = injuriesPerTeam;
                var flatData =[];
                 injuriesPerTeam.forEach(function(o) { // go through elements
                         
                        var obj = {};
                        obj.team=o.key;
//                     console.log(o.values);
                    for (var i = 0; i < o.values.length; i++) { 
                        // make a since we need to get two objs per element
                         // an object which will be over written for every iteration
                        obj[o.values[i].key] = o.values[i].values; // set property name and value
//                        console.log(o.values[i]);
                    }
                         flatData.push(obj); // finally push it in the array
                    
                     
                });           
                
                //insert missing keys:
                flatData.forEach(function(d)
                {
                    for (var j=0;j<injuries.length;j++)
                        {
                        //   console.log(injuries[j]);
                            var result = d[injuries[j]]  === undefined;
                            if (result==true)
                                d[injuries[j]] = 0;                            
                        }
                    
                })
                
                data = flatData;
//    console.log(flatData);

    
    
    
    for (var i=0; i<data.length; i++){
        head.push({
            "x":data[i].team,
            "y":parseInt(data[i].head)
        });  
        ul.push({
            "x":data[i].team,
            "y":parseInt(data[i].ul)
        });
        ll.push({
            "x":data[i].team,
            "y":parseInt(data[i].ll)
        });
        ua.push({
            "x":data[i].team,
            "y":parseInt(data[i].ua)
        });
        la.push({
            "x":data[i].team,
            "y":parseInt(data[i].la)
        });
        torso.push({
            "x":data[i].team,
            "y":parseInt(data[i].torso)
        });
    }
    
    finaldata.push({
        "key":"Head",
        "values":head
    });
    finaldata.push({
        "key":"Upper Leg",
        "values":ul
    });
    finaldata.push({
        "key":"Lower Leg",
        "values":ll
    });
    finaldata.push({
        "key":"Upper Arm",
        "values":ua
    });
    finaldata.push({
        "key":"Lower Arm",
        "values":la
    });
    finaldata.push({
        "key":"Torso",
        "values":torso
    });
    
    var barColor = [
        "#574C66",
        "#E1D6D1",
        "#F65E53",
        "#AEC0D0",
        "#EFA065",
        "#F5CB85",
    ];

    nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
            .reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
            .rotateLabels(0) //Angle to rotate x-axis labels.
            .stacked(true)
            .color(barColor);



        d3.select('#round-chart svg')
            .datum(finaldata)
            .transition().duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
    

// // 2nd view begins --------------------------->>>>

// var color_pos = ["#FE5A4B", "#C54657","#79CEB8", "#7B62E9", "#FFC33F"];
// var dataPerPosition = d3.nest()
//   .key(function(d) { return d.position; })
//   .rollup(function(v) { return v; })
//   .entries(csv);
// var flatData2 = [];
// var ind=0;
// var injuries = {"ll":"1","ul":"2","torso":"3","la":"4", "ua":"5", "head":"6"};
// dataPerPosition.forEach(function(o) { // go through elements
//             var obj = {};
//             obj.name=o.key;
//             obj.color=color_pos[ind];

//        data = []
//         for (var i = 0; i < o.values.length; i++) { 
//            small_obj = {}
//            small_obj.x = parseInt(o.values[i].duration);
//            small_obj.y = parseInt(injuries[o.values[i].injury]);
//            small_obj.p_name = o.values[i].player;
//            small_obj.t_name = o.values[i].long_name;
//            small_obj.notes = o.values[i].notes;
//            data.push(small_obj); 
//        }
             
//        obj.data = data;
//        ind++;
//        flatData2.push(obj); // finally push it in the array
//                });
//        drawScatter(flatData2);

// RadarChart Starts
        drawRadar();

}); 
// end of csv read


function drawScatter(data){
   var temp = [data];

   Highcharts.chart('boxes', {
       chart: {
           type: 'scatter',
           zoomType: 'xy'
       },
       title: {
           text: ' '
       },
       // subtitle: {
       //     text: 'Source: Heinz  2003'
       // },
       xAxis: {
           title: {
               enabled: true,
               text: 'Duration (days)'
           },
           startOnTick: true,
           endOnTick: true,
           showLastLabel: true
       },
       yAxis: {
           title: {
               text: ' '
           },
           // 
           // {"ll":"1","ul":"2","torso":"3","la":"4", "ua":"5", "head":"6"}
            categories: ['111111','LL','UL','Torso','LA','UA','Head']
       },
       legend: {
           layout: 'vertical',
           align: 'left',
           verticalAlign: 'top',
           x: 1000,
           y: 10,
           floating: true,
           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
           borderWidth: 1
       },

       plotOptions: {
           // tooltip: { 
           //     headerFormat: '<b></b>', 
           //     pointFormat: ' <b>Test {point.test}</b><br/> r{point.revision}<br/> {point.y}% change<br/> {series.name}' } }
           
           scatter: {
               marker: {
                   radius: 5,
                   states: {
                       hover: {
                           enabled: true,
                           lineColor: 'rgb(100,100,100)'
                       }
                   }
               },
               states: {
                   hover: {
                       marker: {
                           enabled: false
                       }
                   }
               },
               tooltip: {
                   useHTML:true,
                   headerFormat: '',
                   pointFormat: 'Team: <b>{point.t_name}</b><br><b>{point.p_name} </b>got injured for {point.x} days.<br>Reason: \'{point.notes}\'<br> '
               }
           }
       },

       series: data


               
   });

}



function drawRadar(data){
  Highcharts.chart('chart', {

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: ' ',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['Upper Arm', 'Lower Arm', 'Upper Leg', 'Lower Leg',
                    'Head', 'Torso'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },



        series: [{
            name: 'Player Injury History',
            data: data
        }]

    });

}
$("#json-one").change(function() {
      
    var $dropdown = $(this);
    var key = $dropdown.val();

    d3.csv("dataset_final.csv", function(csv){

          data=csv;
    
          data.forEach(function(d) {
                   
          d.date = d.date;
          d.team = d.team;
          d.player = d.player;
          d.injury= d.injury;
          });

    //    Sankey Chart Start
          var sankeyDataset = [
                                  ['Head','C',1],
                                  ['UA','C',1],
                                  ['LA','C',1],
                                  ['UL','C',1],
                                  ['LL','C',1],
                                  ['Torso','C',1],

                                  ['Head','D',1],
                                  ['UA','D',1],
                                  ['LA','D',1],
                                  ['UL','D',1],
                                  ['LL','D',1],
                                  ['Torso','D',1],

                                  ['Head','LW',1],
                                  ['UA','LW',1],
                                  ['LA','LW',1],
                                  ['UL','LW',1],
                                  ['LL','LW',1],
                                  ['Torso','LW',1],

                                  ['Head','RW',1],
                                  ['UA','RW',1],
                                  ['LA','RW',1],
                                  ['UL','RW',1],
                                  ['LL','RW',1],
                                  ['Torso','RW',1],

                                  ['Head','G',1],
                                  ['UA','G',1],
                                  ['LA','G',1],
                                  ['UL','G',1],
                                  ['LL','G',1],
                                  ['Torso','G',1]
                              ];

        csv.forEach(function(d){

          if(d.long_name==key)
          {  
            if(d.injury == 'head' && d.position =='C'){
              sankeyDataset[0][2] ++;
            } else if (d.injury == 'ua' && d.position =='C') {
              sankeyDataset[1][2] ++;
            } else if (d.injury == 'la' && d.position =='C') {
              sankeyDataset[2][2] ++;
            } else if (d.injury == 'ul' && d.position =='C') {
              sankeyDataset[3][2] ++;
            } else if (d.injury == 'll' && d.position =='C') {
              sankeyDataset[4][2] ++;
            } else if (d.injury == 'torso' && d.position =='C') {
              sankeyDataset[5][2] ++;
            } else if(d.injury == 'head' && d.position =='D'){
              sankeyDataset[6][2] ++;
            } else if (d.injury == 'ua' && d.position =='D') {
              sankeyDataset[7][2] ++;
            } else if (d.injury == 'la' && d.position =='D') {
              sankeyDataset[8][2] ++;
            } else if (d.injury == 'ul' && d.position =='D') {
              sankeyDataset[9][2] ++;
            } else if (d.injury == 'll' && d.position =='D') {
              sankeyDataset[10][2] ++;
            } else if (d.injury == 'torso' && d.position =='D') {
              sankeyDataset[11][2] ++;
            } else if(d.injury == 'head' && d.position =='LW'){
              sankeyDataset[12][2] ++;
            } else if (d.injury == 'ua' && d.position =='LW') {
              sankeyDataset[13][2] ++;
            } else if (d.injury == 'la' && d.position =='LW') {
              sankeyDataset[14][2] ++;
            } else if (d.injury == 'ul' && d.position =='LW') {
              sankeyDataset[15][2] ++;
            } else if (d.injury == 'll' && d.position =='LW') {
              sankeyDataset[16][2] ++;
            } else if (d.injury == 'torso' && d.position =='LW') {
              sankeyDataset[17][2] ++;
            } else if(d.injury == 'head' && d.position =='RW'){
              sankeyDataset[18][2] ++;
            } else if (d.injury == 'ua' && d.position =='RW') {
              sankeyDataset[19][2] ++;
            } else if (d.injury == 'la' && d.position =='RW') {
              sankeyDataset[20][2] ++;
            } else if (d.injury == 'ul' && d.position =='RW') {
              sankeyDataset[21][2] ++;
            } else if (d.injury == 'll' && d.position =='RW') {
              sankeyDataset[22][2] ++;
            } else if (d.injury == 'torso' && d.position =='RW') {
              sankeyDataset[23][2] ++;
            } else if(d.injury == 'head' && d.position =='G'){
              sankeyDataset[24][2] ++;
            } else if (d.injury == 'ua' && d.position =='G') {
              sankeyDataset[25][2] ++;
            } else if (d.injury == 'la' && d.position =='G') {
              sankeyDataset[26][2] ++;
            } else if (d.injury == 'ul' && d.position =='G') {
              sankeyDataset[27][2] ++;
            } else if (d.injury == 'll' && d.position =='G') {
              sankeyDataset[28][2] ++;
            } else if (d.injury == 'torso' && d.position =='G') {
              sankeyDataset[29][2] ++;
            };
          }
        });

        // 2nd view begins --------------------------->>>>

        var color_pos = ["#FE5A4B", "#C54657","#79CEB8", "#7B62E9", "#FFC33F"];
        var dataPerPosition = d3.nest()
          .key(function(d) { return d.position; })
          .rollup(function(v) { return v; })
          .entries(csv);
        var flatData2 = [];
        var ind=0;
        var injuries = {"ll":"1","ul":"2","torso":"3","la":"4", "ua":"5", "head":"6"};
        dataPerPosition.forEach(function(o) {


         // go through elements
                    var obj = {};
                    obj.name=o.key;
                    obj.color=color_pos[ind];

               data = []
                for (var i = 0; i < o.values.length; i++) { 

                  if (o.values[i].long_name == key) {
                     small_obj = {}
                     small_obj.x = parseInt(o.values[i].duration);
                     small_obj.y = parseInt(injuries[o.values[i].injury]);
                     small_obj.p_name = o.values[i].player;
                     small_obj.t_name = o.values[i].long_name;
                     small_obj.notes = o.values[i].notes;
                     data.push(small_obj); 

                  }
                   
               }
                     
               obj.data = data;
               ind++;
               flatData2.push(obj); // finally push it in the array
                       });






               drawScatter(flatData2);








        // console.log(sankeyDataset);
            drawAlbertSankey(sankeyDataset);




    }); //the end of csv reading





});






$("#json-one").change(function() {
      
        var $dropdown = $(this);
       
        $.getJSON("data.json", function(data) {
        
          var key = $dropdown.val();
       
          var vals = [];
                    
          switch(key) {

            case "Sharks":
              vals = data.Sharks.split(",");
              break;

            case "Oilers":
              vals = data.Oilers.split(",");
              break;

            case "Islanders":
              vals = data.Islanders.split(",");
              break;

            case "Blue Jackets":
              vals = data["Blue Jackets"].split(",");
              break;

            case "Thrashers":
              vals = data.Thrashers.split(",");
              break;

            case "Rangers":
              vals = data.Rangers.split(",");
              break;

            case "Stars":
              vals = data.Stars.split(",");
              break;

            case "Canucks":
              vals = data.Canucks.split(",");
              break;

            case "Maple Leafs":
              vals = data["Maple Leafs"].split(",");
              break;

            case "Hurricanes":
              vals = data.Hurricanes.split(",");
              break;

            case "Coyotes":
              vals = data.Coyotes.split(",");
              break;

            case "Jets":
              vals = data.Jets.split(",");
              break;

            case "Sabres":
              vals = data.Sabres.split(",");
              break;

            case "Flames":
              vals = data.Flames.split(",");
              break;

            case "Capitals":
              vals = data.Capitals.split(",");
              break;

            case "Lightning":
              vals = data.Lightning.split(",");
              break;

            case "Penguins":
              vals = data.Penguins.split(",");
              break;

            case "Predators":
              vals = data.Predators.split(",");
              break;

            case "Flyers":
              vals = data.Flyers.split(",");
              break;

            case "Wild":
              vals = data.Wild.split(",");
              break;

            case "Red Wings":
              vals = data["Red Wings"].split(",");
              break;

            case "Senators":
              vals = data.Senators.split(",");
              break;

            case "Blackhawks":
              vals = data.Blackhawks.split(",");
              break;

            case "Devils":
              vals = data.Devils.split(",");
              break;

            case "Ducks":
              vals = data.Ducks.split(",");
              break;

            case "Avalanche":
              vals = data.Avalanche.split(",");
              break;

            case "Canadiens":
              vals = data.Canadiens.split(",");
              break;

            case "Kings":
              vals = data.Kings.split(",");
              break;

            case "Blues":
              vals = data.Blues.split(",");
              break;

            case "Panthers":
              vals = data.Panthers.split(",");
              break;

            case "Bruins":
              vals = data.Bruins.split(",");
              break;

            case 'base':
              vals = ['Please Select Player'];
          }

          
          var $jsontwo = $("#json-two");
          $jsontwo.empty();
          $.each(vals, function(index, value) {
            $jsontwo.append("<option>" + value + "</option>");
          });
      
        });

});
$("#json-two").change(function() {
      
        var $dropdown = $(this);
        keyString = $dropdown.val();

        d3.csv("dataset_final.csv", function(csv){

          data=csv;
    
                  data.forEach(function(d) {
                   
                    d.date = d.date;
                    d.team = d.team;
                    d.player = d.player;
                    d.injury= d.injury;
               });

          var inj_cat= ['Upper Arm', 'Lower Arm', 'Upper Leg', 'Lower Leg',
                   'Head', 'Torso']

          player_Selected = keyString;
          var injuriesPerPlayer = [0,0,0,0,0,0];
          var tabularData = [["Date","Description","Duration (Days)"]];
          csv.forEach(function(d){
                 if(d.player == player_Selected){
                    small_arr = [];
                    small_arr.push(d.date);
                    // var n = d.notes;

                    small_arr.push(capitalizeFirstLetter(d.notes));
                    small_arr.push(d.duration);
                    tabularData.push(small_arr);



                     if (d.injury=="ua")
                       injuriesPerPlayer[0]++;
                     else if (d.injury=="la")
                       injuriesPerPlayer[1]++;
                     else if (d.injury=="ul")
                       injuriesPerPlayer[2]++;
                     else if (d.injury=="ll")
                       injuriesPerPlayer[3]++;
                     else if (d.injury=="head")
                       injuriesPerPlayer[4]++;
                     else if (d.injury=="torso")
                       injuriesPerPlayer[5]++;

                 }
               });

          drawTable(tabularData);
          drawRadar(injuriesPerPlayer);

        }); 

});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawTable(data){
  $("#tableResult tr").remove(); 
  var tableResult = d3.select("#tableResult")
                    .append("table")

                    .selectAll("tr")
                        .data(data).enter()
                        .append("tr")

                    .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; });
}



// sankey chart starts

function drawAlbertSankey(Sdata){
    google.charts.load("current", {packages:["sankey"]});
  google.charts.setOnLoadCallback(drawChart);
   function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Number');

    Sdata.forEach(function(d)
    {
      data.addRow(d);
    });
    var colors = [ '#F65E53', '#E1D6D1',
                  '#F5CB85', '#EFA065', '#AEC0D0', '#574C66'];

    var options = {
      height: 300,
      sankey: {
        node: {
          colors: colors
        },
        link: {
          colorMode: 'gradient',
          colors: colors
        }
      }
    };
    // Set chart options


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    chart.draw(data, options);
   }
}

   