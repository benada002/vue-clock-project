<template>
  <div id="app" class="container">
    <div class="row d-flex justify-content-center">
      <TimerSettings class="col-12" v-if="!timerRun" label="Pause" run="false"/>
      <Timer class="col-12 col-md-6 col-lg-4"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TimerSettings from "./components/TimerSettings.vue";
import Timer from "./components/Timer.vue";

export default {
  name: "app",
  components: {
    TimerSettings,
    Timer
  },
  computed: {
    ...mapState("Timer", {
      Timerbreak: "break",
      breaks: "timerConfBreaks",
      end: "end",
      pause: "pause",
      timerRun: "timerRun"
    })
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  font-family: "Roboto";
  font-size: 40px;
  font-weight: 700;
  width: auto;
  color: #3f51b5;
}
input:disabled {
  background-color: rgba(235, 235, 228, 0);
}
</style>
