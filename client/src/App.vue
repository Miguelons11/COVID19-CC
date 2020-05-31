<template>
  <div id="app">
    <div class="container">
        <div class="pb-2 mt-4 mb-2 border-bottom">
            <h1 style="color:white"><strong>COVID19 INFO</strong></h1>
        </div>
        <div class="col-lg-12" style="width=100%">
          <div class="btn-group  btn-group-justified" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" v-on:click="cambiarVista(0)">Spain</button>
          <button type="button" class="btn btn-secondary" v-on:click="cambiarVista(1)">Europe</button>
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
            <div class="card col-lg" style="width: 100%; margin-top:20px; background-color: #212020; border: 3px solid #E3E4E5; ">
                <div class="card-body">
                  <!--<SpainProvincesMap @mapClick="onMapClick"/>-->
                </div>
            </div>
          </div>
        </div>
        <!------------------------------------------------------------------------------------------------------->
        <!--------------------- CARD EUROPE------------------------------------------------------>
        <div class="card" style="width: 100%; margin-top:20px;" v-if="europe">
          <div class="card-body">
            <h3 class="card-title">EUROPE STATS</h3>
            <div class="row col-lg-12">  
              <div class="card col-lg-6" style="width: 100%; margin-top:20px;">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              <div class="card col-lg-6" style="width: 100%; margin-top:20px;">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            <div class="row col-lg-12">  
              <div class="card col-lg-6" style="width: 100%; margin-top:20px;">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              <div class="card col-lg-6" style="width: 100%; margin-top:20px;">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            <div class="card col-lg-12" style="width: 100%; margin-top:20px;">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
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
                  <!-- <MapChart
                  id = "mapa3"
                  :countryData="global_mapCurados"
                  highColor="#0F6100"
                  lowColor="#aaaaaa"
                  countryStrokeColor="#909090"
                  defaultCountryFillColor="#dadada"
                  v-if="mapaCurados"
                  />
                  <MapChart
                  id = "mapa1"
                  :countryData="global_mapInfectados"
                  highColor="#007ff0"
                  lowColor="#d1e9ff"
                  countryStrokeColor="#909090"
                  defaultCountryFillColor="#dadada"
                  v-if="mapaInfectados"
                  /> -->
                </div> 
            </div>
          </div>
        </div>
        <!-------------------------------------------------------------------------------------------------------> 
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
      europe: false,
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
        self.spain_fechaResumen = moment(new Date(self.spain_summary[self.spain_summary.length - 1].date)).format("DD/MM/YYYY");
        response.data.forEach(element => {
            self.aux.push(element.date);
            self.aux.push(element.confirmed);
            self.spain_infectados_array.push(self.aux);
            self.aux = [];
            
            self.aux.push(element.date);
            self.aux.push(element.recovered);
            self.spain_curados_array.push(self.aux);
            self.aux = [];

            self.aux.push(element.date);
            self.aux.push(element.deaths);
            self.spain_muertos_array.push(self.aux);
            self.aux = [];

        });
      });

      axios.get('http://localhost:4000/covid/confirmed/Spain')
      .then(function(response){
         self.spain_infectados = response.data.confirmed;
      });
      axios.get('http://localhost:4000/covid/death/Spain')
      .then(function(response){
        self.spain_muertos = response.data.deaths;
      });
      axios.get('http://localhost:4000/covid/recovered/Spain')
      .then(function(response){
        self.spain_curados = response.data.recovered;
      });

      axios.get('http://localhost:4000/covid/global/deaths')
      .then(function(response){
         self.global_muertos = response.data.deaths;
      });
      axios.get('http://localhost:4000/covid/global/recovered')
      .then(function(response){
        self.global_curados = response.data.recovered;
      });
      axios.get('http://localhost:4000/covid/global/confirmed')
      .then(function(response){
        self.global_infectados = response.data.confirmed;
      });

       axios.get('http://localhost:4000/covidsummary/summaryGlobal')
      .then(function (response) {
       
        self.global_summary = response.data;
        self.fecha_global = self.global_summary[0].date;

        self.global_summary.map(function(element){
          if(element.country == "France"){
            self.global_mapMuertos["FR"] = element.deaths;
            self.global_mapCurados["FR"] = element.recovered;
            self.global_mapInfectados["FR"] = element.confirmed;

          }else if(element.country == "United Kingdom"){
            self.global_mapMuertos["GB"] = element.deaths;
            self.global_mapCurados["GB"] = element.recovered;
            self.global_mapInfectados["GB"] = element.confirmed;
          }else {
            self.global_mapMuertos[element.country_iso2s[0]] = element.deaths;
            self.global_mapCurados[element.country_iso2s[0]] = element.recovered;
            self.global_mapInfectados[element.country_iso2s[0]] = element.confirmed;
          }
        });
      });

  },
  methods: {
    cambiarVista : function(n){
      var self = this;
      if(n==0){
        self.spain = true;
        self.europe = false;
        self.world = false;      
      }
      else if(n==1){
        self.spain = false;
        self.europe = true;
        self.world = false;
      }else{
        self.spain = false;
        self.europe = false;
        self.world = true;
      }
    },
    cambiarMapa : function(n){
      var self = this;
      if(n==0){
        self.mapaMuertos = true;
        self.mapaCurados = false;
        self.mapaInfectados = false;      
      }
      else if(n==1){
        self.mapaMuertos = false;
        self.mapaCurados = true;
        self.mapaInfectados = false;
      }else{
        self.mapaMuertos = false;
        self.mapaCurados = false;
        self.mapaInfectados = true;
      }
    },
    onMapClick(e) {      
      console.log(e.title);
    }
  },
   computed: {
     }
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
