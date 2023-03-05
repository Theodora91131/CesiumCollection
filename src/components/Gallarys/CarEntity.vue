<script setup lang="ts">
import CesiumButtonVue from "../CesiumButton.vue";
import { getWidget } from "../../map";
import { Car } from "../../core/carEntity";
import * as Cesium from "cesium"
let show = false;
let car: Car;

const trigger = async () => {
  show = !show;
  const widget = getWidget();
  const { entities } = widget;
 // const timeSpan = 30;
  //const totalSeconds = timeSpan * (flightData.length - 1);
 // const start = Cesium.JulianDate.fromIso8601("2020-10-13T21:10:00Z");
 // const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
       
  //widget.clock.startTime = start.clone();
 // widget.clock.stopTime = stop.clone();
 // widget.clock.currentTime = start.clone();
  //widget.timeline.zoomTo(start, stop);
 // widget.clock.multiplier = 50;
  //widget.clock.shouldAnimate = true;
 
  car ??= entities.add(new Car());
  car.show = show;
  await widget.updateDefaultDisplay();
  console.log(car)
  
};
</script>
<template>
  <CesiumButtonVue @click="trigger">car</CesiumButtonVue>
</template>
