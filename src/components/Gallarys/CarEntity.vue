<script setup lang="ts">
import CesiumButtonVue from "../CesiumButton.vue";
import { getWidget } from "../../map";
import { Car, Path } from "../../core/carEntity";
let show = false;
let car: Car;

let removeCallback: CallableFunction;

const listener = () => {
  const widget = getWidget();
  widget.defaultDataSourceDisplay.update(widget.clock.currentTime);
}

const on = () => {
  // 開啟時 註冊隨著時間每秒更新
  const widget = getWidget();
  // removeCallback 為移除 event 時使用的 function
  removeCallback = widget.clock.onTick.addEventListener(listener)

  // 開啟時時 講 show  attr 改為 false
  car.show = true;
}

const off = async () => {
  const widget = getWidget();
  // 關閉時 移除註冊的 Event
  removeCallback();
  // 關閉時 講 show  attr 改為 false
  car.show = false;
  // 等待畫面更新 entity
  await widget.updateDefaultDisplay();
}

const trigger = async () => {
  show = !show;
  const widget = getWidget();
  const { entities } = widget;

  car ??= entities.add(new Car());

  // await widget.updateDefaultDisplay();
  // 根據 trigger 開關做事件的註冊
  show ? on() : await off();

  console.log(car)

};
</script>
<template>
  <CesiumButtonVue @click="trigger">car</CesiumButtonVue>
</template>
