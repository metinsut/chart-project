<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <div id="chartdiv"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const data = require('../assets/data2.json');
export default {
  name: 'home',
  data () {
    return {
      jsondata : [],
      dataobject : [],
      dataProvider : []
    }
  },
  created(){
    this.setupdata();
    this.setupjsonobject();
    this.setupdataProvider();
    console.log(this.dataProvider);
    // fetch('https://www.barchartmarketdata.com/data-samples/getHistoryUSFuturesEOD.json')
    // .then((res) => { return res.json() })
    // .then((data) => { console.log(data); })
  },
  mounted(){
    this.runchart();
  },
  methods:{
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
          "open": x.open,
          "high": x.high,
          "low": x.low,
          "close": x.close
        })
      })
    },
    runchart(){
      var chart = AmCharts.makeChart( "chartdiv", {
        "type": "serial",
        "theme": "light",
        "dataDateFormat":"YYYY-MM-DD",
        "valueAxes": [ {
          "position": "left"
        } ],
        "graphs": [ {
          "id": "g1",
          "proCandlesticks": true,
          "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
          "closeField": "close",
          "fillColors": "#7f8da9",
          "highField": "high",
          "lineColor": "#7f8da9",
          "lineAlpha": 1,
          "lowField": "low",
          "fillAlphas": 0.9,
          "negativeFillColors": "#db4c3c",
          "negativeLineColor": "#db4c3c",
          "openField": "open",
          "title": "Price:",
          "type": "candlestick",
          "valueField": "close"
        } ],
        "chartScrollbar": {
          "graph": "g1",
          "graphType": "line",
          "scrollbarHeight": 30
        },
        "chartCursor": {
          "valueLineEnabled": true,
          "valueLineBalloonEnabled": true
        },
        "categoryField": "date",
        "categoryAxis": {
          "parseDates": true
        },
        "dataProvider": this.dataProvider,
        "export": {
          "enabled": true,
          "position": "bottom-right"
        }
      } );

      chart.addListener( "rendered", zoomChart );
      zoomChart();

      // this method is called when chart is first inited as we listen for "dataUpdated" event
      function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes( chart.dataProvider.length - 50, chart.dataProvider.length - 1 );
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chartdiv {
 width		: 100%;
 height		: 80vh;
 font-size	: 11px;
}
</style>
