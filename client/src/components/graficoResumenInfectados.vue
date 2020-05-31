<template>
    <div class="card col-lg" style="width: 100%; margin-top:20px;background-color: #212020; border: 3px solid #E3E4E5">
        <div class="card-body">
            <apexchart type="line" :options="options" :series="datos.series" />
        </div>
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import 'jquery-ui-dist/jquery-ui';

export default {
	name: "resumenInfectados",
	props: ["dataSummary"],
	data: function() {
		return {
			aux: [],
			arraySeries: [],
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
						name: "Infectados",
						data: this.dataSummary
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
					style: "full"
				},
				//colors: ['#0165fc'],

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
	}
};
</script>
