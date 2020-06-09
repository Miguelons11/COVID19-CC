<template>
  <div id="app">
    <div class="container">
        <div class="pb-2 mt-4 mb-2 border-bottom">
            <h1 style="color:white"><strong>COVID19 INFO</strong></h1>
        </div>
        <div class="col-lg-12" style="width=100%">
          <div class="btn-group  btn-group-justified" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" v-on:click="cambiarVista(0)">Spain</button>
          <button type="button" class="btn btn-secondary" v-on:click="cambiarVista(2)">World</button>
          </div>
        </div>
        <!--------------------- CARD ESPAÑA------------------------------------------------------>
        <div class="card" style="width: 100%; margin-top:20px ;background-color: #212020 " v-if="spain">
          <div class="card-body">
            <h3 class="card-title" style="color:white">SPAIN STATS AT {{spain_fechaResumen}}</h3>
            <div class="row col-lg-12">  
              <div class="card col-lg" style="width: 100%; margin-top:20px;background-color: #212020;border: 3px solid #E3E4E5; ">
                <div class="card-body">
                  <h5 style="color:white" class="card-title">INFECTADOS</h5>
                  <h3 style="color:#008FFB"><strong>{{spain_infectados.toLocaleString("es-ES")}}</strong></h3>
                </div>
              </div>
              <div class="card col-lg" style="width: 100%; margin-top:20px;background-color: #212020; border: 3px solid #E3E4E5; margin-left: 10px; ">
                <div class="card-body">
                  <h5 style="color:white" class="card-title">MUERTOS</h5>
                  <h3 style="color:#FB0000"><strong>{{spain_muertos.toLocaleString("es-ES")}}</strong></h3>
                  <h5 style="color:white" class="card-title">CURADOS</h5>
                  <h3 style="color:#00FB39" ><strong>{{spain_curados.toLocaleString("es-ES")}}</strong></h3>
                </div>
              </div>
            </div>
            <div class="row col-lg-12">  
              <graficoinfectados  :dataSummary=spain_infectados_array></graficoinfectados>
              <graficomuertos  :muertos=spain_muertos_array :curados=spain_curados_array></graficomuertos>
            </div>
          </div>
        </div>
        <!------------------------------------------------------------------------------------------------------->
        <!--------------------- CARD WORLD------------------------------------------------------>
       <div class="card" style="width: 100%; margin-top:20px ;background-color: #212020 " v-if="world">
          <div class="card-body">
            <h3 class="card-title" style="color:white">WORLD STATS AT {{spain_fechaResumen}}</h3>
            <div class="row col-lg-12">  
              <div class="card col-lg" style="width: 100%; margin-top:20px;background-color: #212020;border: 3px solid #E3E4E5; ">
                <div class="card-body">
                  <h5 style="color:white" class="card-title">INFECTADOS</h5>
                  <h3 style="color:#008FFB"><strong>{{global_infectados.toLocaleString("es-ES")}}</strong></h3>
                </div>
              </div>
              <div class="card col-lg" style="width: 100%; margin-top:20px;background-color: #212020; border: 3px solid #E3E4E5; margin-left: 10px; ">
                <div class="card-body">
                  <h5 style="color:white" class="card-title">MUERTOS</h5>
                  <h3 style="color:#FB0000"><strong>{{global_muertos.toLocaleString("es-ES")}}</strong></h3>
                  <h5 style="color:white" class="card-title">CURADOS</h5>
                  <h3 style="color:#00FB39" ><strong>{{global_curados.toLocaleString("es-ES")}}</strong></h3>
                </div>
              </div>
            </div>
             <div class="card col-lg-12" style="width: 100%; margin-top:20px; background-color: #212020; border: 3px solid #E3E4E5; ">
                <div class="card-body">
                  
                  <!-- <div class="row" style="margin-bottom:20px;">
                    <button class="btn btn-danger" v-on:click="cambiarMapa(0)">See deaths stats</button>
                    <button class="btn btn-primary" v-on:click="cambiarMapa(2)">See confirmed stats</button>
                    <button class="btn btn-success" v-on:click="cambiarMapa(1)">See recovered stats</button>
                  </div> -->
                  <MapChart
                  id = "mapa2"
                  :countryData="global_mapMuertos"
                  highColor="#ff0000"
                  lowColor="#aaaaaa"
                  countryStrokeColor="#909090"
                  defaultCountryFillColor="#dadada"
                   v-if="mapaMuertos"
                  />
                </div> 
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import graficoResumenInfectados from './components/graficoResumenInfectados';
import graficoResumenMuertos from './components/graficoResumenMuertos';
import moment from 'moment'
//import SpainProvincesMap from "./components/SpainProvincesMap";
import MapChart from 'vue-map-chart'


export default {
  name: 'App',
  data: function(){
    return {
      mensaje : "",
      prueba: [],
      spain: true,
      world: false,
      spain_summary : [],
      spain_infectados: 0,
      spain_muertos: 0,
      spain_curados: 0,
      spain_fechaResumen : "",
      aux: [],
      spain_infectados_array: [],
      spain_curados_array: [],
      spain_muertos_array:[],
      showModal : false,
      global_summary : [],
      global_infectados:0,
      global_muertos:0,
      global_curados:0,
      global_mapMuertos : {},
      global_mapInfectados : {},
      global_mapCurados : {},
      mapaMuertos :  true,
      mapaCurados :  false,
      mapaInfectados : false,
      count : 0
    }
  },
  components:{
    graficoinfectados : graficoResumenInfectados,
    graficomuertos : graficoResumenMuertos,
    //SpainProvincesMap : SpainProvincesMap
    MapChart : MapChart
  },
  created(){
    var self = this;
    axios.get('http://localhost:4000/covid/summary/Spain')
      .then(function (response) {
        console.log(response);
        self.spain_summary = response.data;
        self.spain_fechaResumen = moment(new Date(self.spain_summary[self.spain_summary.length - 1].date.value)).format("DD/MM/YYYY");
        response.data.forEach(element => {
            self.aux.push(element.date.value);
            self.aux.push(element.confirmed);
            self.spain_infectados_array.push(self.aux);
            self.aux = [];
            
            self.aux.push(element.date.value);
            self.aux.push(element.recovered);
            self.spain_curados_array.push(self.aux);
            self.aux = [];

            self.aux.push(element.date.value);
            self.aux.push(element.deaths);
            self.spain_muertos_array.push(self.aux);
            self.aux = [];

        });
      });

      axios.get('http://localhost:4000/covid/confirmed/Spain')
      .then(function(response){
         self.spain_infectados = response.data[0].confirmed;
      });
      axios.get('http://localhost:4000/covid/death/Spain')
      .then(function(response){
        self.spain_muertos = response.data[0].deaths;
      });
      axios.get('http://localhost:4000/covid/recovered/Spain')
      .then(function(response){
        self.spain_curados = response.data[0].recovered;
      });

      axios.get('http://localhost:4000/covid/global/deaths')
      .then(function(response){
         self.global_muertos = response.data[0].deaths;
      });
      axios.get('http://localhost:4000/covid/global/recovered')
      .then(function(response){
        self.global_curados = response.data[0].recovered;
      });
      axios.get('http://localhost:4000/covid/global/confirmed')
      .then(function(response){
        self.global_infectados = response.data[0].confirmed;
      });

       axios.get('http://localhost:4000/covidsummary/summaryGlobal')
      .then(function (response) {
       
       console.log(response.data);
        self.global_summary = response.data;
        self.fecha_global = self.global_summary[0].date.value;

        self.global_summary.map(function(element){
          if(element.country == "US"){
            self.global_mapMuertos["US"] = element.deaths;
            self.global_mapCurados["US"] = element.recovered;
            self.global_mapInfectados["US"] = element.confirmed;

          }else {
            self.global_mapMuertos[element.country_iso2s] = element.deaths;
            self.global_mapCurados[element.country_iso2s] = element.recovered;
            self.global_mapInfectados[element.country_iso2s] = element.confirmed;
          }
        });
      });

  },
  methods: {
    cambiarVista : function(n){
      var self = this;
      if(n==0){
        self.spain = true;
        self.world = false;      
      }else{
        self.spain = false;
        self.world = true;
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
