<template>
  <div>
    <div class="container">
      <div class="row position-relative">
        <div id="counter" class="container d-flex justify-content-center">
          <div class="row d-flex align-content-center">
            <p class="col-12">
              {{breaks}}
              <br>
              <small>Breaks</small>
            </p>
            <p
              class="col-12"
            >{{end ? 'End' : !Timerbreak ? getTime('timerConfTime') : getTime('timerConfBreakTime')}}</p>
          </div>
        </div>
        <canvas id="timer" class height="400" width="400"></canvas>
      </div>
    </div>
    <div class="container stbtn">
      <div class="row d-flex justify-content-center">
        <div :class="timerRun ? 'col-6 d-flex' : 'col-12'">
          <button
            @click="pauseTimer"
            class="btn flex-fill"
            style="position: relative; z-index: 9999999;"
            v-if="!pause && timerRun"
          >Pause</button>
          <button
            @click="startTimer"
            class="btn btn-success flex-fill"
            style="position: relative; z-index: 9999999;"
            v-if="pause || !timerRun"
          >Start Timer</button>
        </div>
        <div v-if="timerRun" class="col-6 d-flex">
          <button
            @click="restart()"
            class="btn btn-danger flex-fill"
            style="position: relative; z-index: 9999999;"
          >Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Timer",

  data() {
    return {
      chartEle: null,
      timerChart: null
    };
  },

  computed: {
    ...mapGetters("Timer", ["getTime", "getData"]),
    ...mapState("Timer", {
      Timerbreak: "break",
      breaks: "timerConfBreaks",
      end: "end",
      pause: "pause",
      timerRun: "timerRun"
    })
  },

  props: {
    label: String,
    run: Boolean
  },

  watch: {
    getData(val) {
      this.timerChart.data.datasets[0].data = val;
      this.timerChart.update();
    }
  },

  methods: {
    ...mapActions("Timer", ["startTimer", "pauseTimer", "restart"])
  },

  mounted() {
    this.chartEle = document.querySelector("#timer");
    this.timerChart = new Chart(this.chartEle, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: this.getData,
            borderColor: "rgba(255, 99, 132, 0)",
            backgroundColor: ["#303F9F", "#E5E5E5"]
          }
        ]
      },
      options: {
        cutoutPercentage: 95,
        tooltips: {
          enabled: false
        },
        hover: {
          mode: null
        },
        animation: {
          duration: 70
        }
      }
    });
    console.log(this.getTime());
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
  font-size: 30px;
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
#timer {
  position: relative;
  width: 100%;
  max-width: 100%;
}
#counter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  p {
    font-size: 2em;
    width: 50%;
    margin-bottom: 0;
  }
}

.stbtn {
  margin-top: 20px;
}
</style>