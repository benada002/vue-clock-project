<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <input type="text" name="breaks" id v-model="breaks">
              </div>
            </div>
          </div>
          <p>Breaks</p>
        </div>
        <div class="col-12 col-md-4">
          <div class="container">
            <div class="row">
              <div class="col-5">
                <input type="text" name="time" id v-model="time[0]">
              </div>
              <div class="col-2 colon">:</div>
              <div class="col-5">
                <input type="text" name="time" id v-model="time[1]">
              </div>
            </div>
          </div>
          <p>Timer</p>
        </div>
        <div class="col-12 col-md-4">
          <div class="container">
            <div class="row">
              <div class="col-5">
                <input type="text" name="breakTime" id v-model="breakTime[0]">
              </div>
              <div class="col-2 colon">:</div>
              <div class="col-5">
                <input type="text" name="breakTime" id v-model="breakTime[1]">
              </div>
            </div>
          </div>
          <p>Break time</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TimerSettings",
  data: () => {
    return {
      breaks: 0,
      time: [],
      breakTime: []
    };
  },
  computed: {
    ...mapGetters("Timer", ["getTime", "getData"])
  },
  watch: {
    breaks(val) {
      val = Number.parseInt(val);
      this.$store.commit("Timer/TimerSettings", ["timerConfBreaks", val]);
      this.$store.commit("Timer/TimerSettings", ["lastTimerConfBreaks", val]);
    },
    time(val) {
      this.setupTimer([["timerConfTime", "lastTimerConfTime"], val]);
    },
    breakTime(val) {
      this.setupTimer([["timerConfBreakTime", "lastTimerConfBreakTime"], val]);
    }
  },
  methods: {
    ...mapActions("Timer", ["setupTimer"]),
    twoNumbers(val) {
      return Array.prototype.forEach.call(val, ele =>
        ele.toString().padStart(2, "0")
      );
    }
  },
  mounted() {
    this.breaks = this.$store.state.Timer.lastTimerConfBreaks;
    this.time = this.getTime("lastTimerConfTime").split(":");
    this.breakTime = this.getTime("lastTimerConfBreakTime").split(":");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-family: "Roboto";
  font-weight: 600;
  color: #303f9f;
  text-align: center;
  padding: 1px 0px;
  max-width: 100%;
  width: 100%;
}
input {
  border: 0;
  text-align: center;
  max-width: 100%;
}

.colon {
  color: #303f9f;
  font-size: 40px;
}
</style>