<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <div id="chartdiv" style="width: 100%; height: 80vh;"></div>
        <h6>Tüm kayıtlar aynı tarihte.</h6>
        <ul v-for="list in dataobject">
          <li>{{list.tradingDay}} ~ {{list.tickPrice}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const data = require('../assets/data.json');
export default {
  name: 'vchart',
  data () {
    return {
      jsondata : [],
      dataobject : [],
      dataProvider : []
    }
  },
  created () {
    this.setupdata();
    this.setupjsonobject();
    this.setupdataProvider();
    console.log(this.dataProvider);
    // fetch('https://www.barchartmarketdata.com/data-samples/getHistoryUSFuturesTick.json')
    // .then((res) => { return res.json() })
    // .then((data) => { console.log(data); })
  },
  mounted(){
    this.runchart();
  },
  methods: {
    setupdata(){
      this.jsondata = data;
    },
    setupjsonobject(){
      this.dataobject = this.jsondata.results;
    },
    setupdataProvider(){
      this.dataobject.forEach((x) => {
        this.dataProvider.push({
          "date": x.tradingDay,
          "value": x.tickPrice
        })
      })
    },
    runchart () {
      var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "mouseWheelZoomEnabled":true,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
          "id": "v1",
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth":true
        }],
        "balloon": {
          "borderThickness": 1,
          "shadowAlpha": 0
        },
        "graphs": [{
          "id": "g1",
          "balloon":{
            "drop":true,
            "adjustBorderColor":false,
            "color":"#ffffff"
          },
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "value",
          "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartScrollbar": {
          "graph": "g1",
          "oppositeAxis":false,
          "offset":30,
          "scrollbarHeight": 80,
          "backgroundAlpha": 0,
          "selectedBackgroundAlpha": 0.1,
          "selectedBackgroundColor": "#888888",
          "graphFillAlpha": 0,
          "graphLineAlpha": 0.5,
          "selectedGraphFillAlpha": 0,
          "selectedGraphLineAlpha": 1,
          "autoGridCount":true,
          "color":"#AAAAAA"
        },
        "chartCursor": {
          "pan": true,
          "valueLineEnabled": true,
          "valueLineBalloonEnabled": true,
          "cursorAlpha":1,
          "cursorColor":"#258cbb",
          "limitToGraph":"g1",
          "valueLineAlpha":0.2,
          "valueZoomable":true
        },
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
          "parseDates": true,
          "dashLength": 1,
          "minorGridEnabled": true
        },
        "export": {
          "enabled": true
        },
        "dataProvider": this.dataProvider
      });

      chart.addListener("rendered", zoomChart);

      zoomChart();

      function zoomChart() {
        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
      }
    }
  }
}
</script>


<style scoped>

</style>
