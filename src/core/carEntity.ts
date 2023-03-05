import { Cartesian3, ClockRange, Color, Entity, JulianDate, SampledPositionProperty, TimeInterval, TimeIntervalCollection } from "cesium";
import { samples } from "../assets/pathSample";
import { getWidget } from "../map";

type SamplePoint = {
  longitude: number
  latitude: number
  height: number
  time: Date
}

const timeStepInSeconds = 30;
const totalSeconds = timeStepInSeconds * (samples.length - 1);
const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z");
const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());
const updateClock = () => {
  const widget = getWidget();
  console.log(widget)
  widget.clock.startTime = start.clone();
  widget.clock.stopTime = stop.clone();
  widget.clock.currentTime = start.clone();
  // widget.timeline.zoomTo(start, stop);
  // Speed up the playback speed 50x.
  widget.clock.multiplier = 5000;
  // Start playing the scene.
  widget.clock.shouldAnimate = true;

  // 重復播放
  widget.clock.clockRange = ClockRange.LOOP_STOP;

}

const createSampleProperty = () => {
  updateClock();
  const sp = new SampledPositionProperty();
  // 利用 array map method 製作樣本點位的每一個時間點
  const times: JulianDate[] = samples.map((_, idx) => {
    return JulianDate.addSeconds(start, idx*timeStepInSeconds, new JulianDate)
  });

  // 利用 array map method 製作樣本點位的每一個 Cartesian3 座標
  const positions: Cartesian3[] = samples.map((p) => {
    return Cartesian3.fromDegrees(p.longitude, p.latitude, p.height);
  });

  sp.addSamples(times, positions);
  return sp;
}

// const opt: Entity.ConstructorOptions = {
// position: createSampleProperty()
// path: {...}
// }
export class Path extends Entity {
  constructor() {
    const add: Entity.ConstructorOptions = {
      position: createSampleProperty(),
      point: { pixelSize: 30, color: Color.GREEN },
      path: {
        width: 3,
      },
      availability: new TimeIntervalCollection([
        new TimeInterval({
          start: start.clone(),
          stop: stop.clone(),
        }),
      ]),
    };

    super(add);


  }
}

export class Car extends Entity {
  constructor() {
    const add: Entity.ConstructorOptions = {
      // position: new Path(),
      position: createSampleProperty(),
      model: {
        uri: new URL('../assets/ToyCar.glb', import.meta.url).href,
        scale: 10000000,
      },
      path: {
        width: 3,
      },
      availability: new TimeIntervalCollection([
        new TimeInterval({
          start: start.clone(),
          stop: stop.clone(),
        }),
      ]),
    };

    super(add);

  }
}





