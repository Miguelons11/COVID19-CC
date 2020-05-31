<template>
    <div class="card col-lg-6" style="width: 100%; margin-top:20px;background-color: #212020 ; border: 3px solid #E3E4E5; margin-left: 10px;">
        <div class="card-body">
            <apexchart type="line" :options="options" :series="datos.series" />
        </div>
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import 'jquery-ui-dist/jquery-ui';

export default {
	name: "resumenMuertos",
	props: ["muertos", "curados"],
	data: function() {
		return {
			aux: [],
			aux1: [],
			arraySeries: [],
			arraySeries1: [],
		};
	},
	components: {
		apexchart: VueApexCharts
	},
	computed: {
		datos: function() {
			return {
				series: [
					{
						name: "Curados",
						data: this.curados
					},
										{
						name: "Muertos",
						data: this.muertos
					}
				]
			};
		},
		options: function() {
			return {
				chart: {
					stacked: false,
					zoom : {
						enabled : false
					}
				},

				dataLabels: {
					enabled: false
				},
				markers: {
					size: 0,
					style: "full",
				},
				colors: ['#00FB39',"#FB0000"],

				xaxis: {
					type: "datetime",
					labels:{
						style: {
							colors : "#E3E4E5"
						}
					},
				},
				fill:{
					colors: ["#FFFFFF"]
				},
				yaxis : {
					labels:{
						style: {
							colors : "#E3E4E5"
						}
					},
				}
			};
		},
        
	},
	methods: {
		actualizarGrafico() {
            var self = this;
            self.dataSummary.forEach(element =>{
                self.aux.push(element.date);
                self.aux.push(element.confirmed);
                self.arraySeries.push(this.aux);
                self.aux = [];
            });

            self.arraySeries.shift();
		}
	}
};
</script>
