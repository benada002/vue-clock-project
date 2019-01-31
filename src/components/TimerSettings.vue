<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <input type="text" name="breaks" v-model="breaks">
                <div class="error" v-if="!$v.breaks.required">Is required</div>
                <div class="error" v-if="!$v.breaks.integer">Must be an integer</div>
                <div
                  class="error"
                  v-if="!$v.breaks.minValue"
                >Must be at least {{$v.breaks.$params.minValue.min}}</div>
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
                <div class="error" v-if="!$v.time.$each[0].required">Is required</div>
                <div class="error" v-if="!$v.time.$each[0].integer">Must be an integer</div>
              </div>
              <div class="col-2 colon">:</div>
              <div class="col-5">
                <input type="text" name="time" id v-model="time[1]">
                <div class="error" v-if="!$v.time.$each[1].required">Is required</div>
                <div class="error" v-if="!$v.time.$each[1].integer">Must be an integer</div>
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
                <div class="error" v-if="!$v.breakTime.$each[0].required">Is required</div>
                <div class="error" v-if="!$v.breakTime.$each[0].integer">Must be an integer</div>
              </div>
              <div class="col-2 colon">:</div>
              <div class="col-5">
                <input type="text" name="breakTime" id v-model="breakTime[1]">
                <div class="error" v-if="!$v.breakTime.$each[1].required">Is required</div>
                <div class="error" v-if="!$v.breakTime.$each[1].integer">Must be an integer</div>
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
import { required, integer, between, minValue } from "vuelidate/lib/validators";
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
  validations: {
    time: {
      $each: { required, integer }
    },
    breakTime: {
      $each: { required, integer }
    },
    breaks: {
      required,
      integer,
      minValue: minValue(1)
    }
  },
  computed: {
    ...mapGetters("Timer", ["getTime", "getData"])
  },
  watch: {
    breaks(val) {
      if (!this.$v.breaks.$pending && !this.$v.breaks.$invalid) {
        val = Number.parseInt(val);
        this.$store.commit("Timer/TimerSettings", ["timerConfBreaks", val]);
        this.$store.commit("Timer/TimerSettings", ["lastTimerConfBreaks", val]);
      }
    },
    time(val) {
      if (!this.$v.time.$pending && !this.$v.time.$invalid) {
        this.setupTimer([["timerConfTime", "lastTimerConfTime"], val]);
      }
    },
    breakTime(val) {
      if (!this.$v.breakTime.$pending && !this.$v.breakTime.$invalid) {
        this.setupTimer([
          ["timerConfBreakTime", "lastTimerConfBreakTime"],
          val
        ]);
      }
    }
  },
  methods: {
    ...mapActions("Timer", ["setupTimer"]),
    oldTime(item) {
      const obj = this.$store.state.Timer;

      const min = Math.floor(obj[item] / 60);
      const sec =
        obj[item] - min * 60 < 1 && min < 1 ? 1 : obj[item] - min * 60;

      return [min.toString().padStart(2, 0), sec.toString().padStart(2, 0)];
    },
    validate() {
      if (this.$v.time.$invalid) {
        return (this.time = this.oldTime("timerConfTime"));
      }
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

.error {
  color: red;
  font-size: 10px;
}
</style>