export default {
  namespaced: true,
  state: {
    timerConfBreaks: 3,
    timerConfBreakTime: 5,
    timerConfTime: 5,
    lastTimerConfBreaks: 3,
    lastTimerConfBreakTime: 5,
    lastTimerConfTime: 5,
    pause: false,
    break: false,
    end: false,
    timerRun: false
  },

  getters: {
    getTime(state) {
      return item => {
        const min = Math.floor(state[item] / 60);
        const sec = state[item] - min * 60;

        return `${min.toString().padStart(2, "0")}:${sec
          .toString()
          .padStart(2, "0")}`;
      };
    },
    getData(state) {
      if (state.break) {
        let timePercent = Math.floor(
          (state.timerConfBreakTime * 100) / state.lastTimerConfBreakTime
        );

        let percent = 100 - timePercent;

        if (state.timerConfTime === 0) {
          percent = 0;
          timePercent = 100;
        }

        return [timePercent, percent];
      }

      let timePercent = Math.floor(
        (state.timerConfTime * 100) / state.lastTimerConfTime
      );

      let percent = 100 - timePercent;

      if (state.timerConfTime === 0 && !state.end) {
        percent = 0;
        timePercent = 100;
      }

      return [percent, timePercent];
    }
  },

  mutations: {
    TimerDecrement(state, payload) {
      state[payload]--;
    },

    TimerSettings(state, payload) {
      state[payload[0]] = payload[1];
    }
  },

  actions: {
    setupTimer({ commit }, item) {
      const time =
        Number.parseInt(item[1][0]) * 60 + Number.parseInt(item[1][1]);

      if (Array.isArray(item[0])) {
        item[0].forEach(ele => {
          commit("TimerSettings", [ele, time]);
        });
        return;
      }

      commit("TimerSettings", [item, time]);
    },

    timer({ state, commit }, item) {
      commit("TimerSettings", ["pause", false]);
      return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          if (state.timerRun && !state.pause) {
            commit("TimerDecrement", item);

            if (state[item] === 0) {
              clearInterval(interval);
              return resolve(true);
            }
          } else {
            clearInterval(interval);
            reject("pause Timer");
          }
        }, 1000);
      });
    },

    async startTimer({ commit, state, dispatch }) {
      if (state.timerConfBreaks === 0) {
        return;
      }

      commit("TimerSettings", ["end", false]);
      commit("TimerSettings", ["timerRun", true]);

      while (state.timerConfBreaks > 0) {
        try {
          if (!state.break) {
            await dispatch("timer", "timerConfTime");
            commit("TimerSettings", ["timerConfTime", state.lastTimerConfTime]);
            commit("TimerSettings", ["break", true]);
          } else {
            await dispatch("timer", "timerConfBreakTime");
            commit("TimerSettings", [
              "timerConfBreakTime",
              state.lastTimerConfBreakTime
            ]);
            commit("TimerSettings", ["break", false]);
            commit("TimerDecrement", "timerConfBreaks");
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }

      commit("TimerSettings", ["break", false]);
      await dispatch("timer", "timerConfTime");
      commit("TimerSettings", ["end", true]);
      commit("TimerSettings", ["timerRun", false]);

      setTimeout(() => {
        commit("TimerSettings", ["timerConfBreaks", state.lastTimerConfBreaks]);
        commit("TimerSettings", ["timerConfTime", state.lastTimerConfTime]);
        commit("TimerSettings", [
          "timerConfBreakTime",
          state.lastTimerConfBreakTime
        ]);
        commit("TimerSettings", ["end", false]);
      }, 3000);
    },

    pauseTimer({ commit }) {
      commit("TimerSettings", ["pause", true]);
    },

    restart: ({ state, commit }) => {
      commit("TimerSettings", ["timerRun", false]);
      commit("TimerSettings", ["break", false]);
      commit("TimerSettings", ["pause", false]);
      commit("TimerSettings", ["timerConfTime", state.lastTimerConfTime]);
      commit("TimerSettings", [
        "timerConfBreakTime",
        state.lastTimerConfBreakTime
      ]);
      commit("TimerSettings", ["timerConfBreaks", state.lastTimerConfBreaks]);
    }
  }
};
