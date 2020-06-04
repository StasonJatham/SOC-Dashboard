<template>
  <div class="text-center">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row :align="alignment" :justify="justify">
            <v-btn
              class="ma-1"
              outlined
              color="deep-purple darken-2"
              @click="updateDatabase()"
              v-if="started"
            >Update</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row :align="alignment" :justify="justify">
            <div v-if="show">
              <v-progress-circular
                :rotate="360"
                :size="500"
                :width="50"
                :value="value"
                color="deep-purple darken-2"
              >
                <p class="font-weight-bold display-1">Updating Database</p>
              </v-progress-circular>
            </div>
            <div v-if="finished">
              <p>Update is complete.</p>
              <nuxt-link to="/">Back Home</nuxt-link>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      interval: {},
      value: 0,
      show: false,
      started: true,
      finished: false,
      justify: "center",
      alignment: "center"
    };
  },
  methods: {
    updateTwitter: async function() {
      try {
        this.started = false;
        this.show = true;
        this.interval = setInterval(() => {
          if (this.value >= 100) {
            this.show = false;
            this.finished = true;
            clearInterval(this.interval);
          }
          this.value += Math.round(Math.random() * 10);
        }, 700);

        let response = await this.$axios.$get(
          "http://127.0.0.1:4004/api/twitter/update"
        );
        return {
          status: response.success
        };
      } catch (error) {
        console.log(error);
      }
    },

    freshTwitter: async function() {
      try {
        let response = await this.$axios.$get(
          "http://127.0.0.1:4004/api/twitter"
        );
        return {
          twitterData: response.twitterData
        };
      } catch (error) {
        console.log(error);
      }
    },
        updateDatabase: async function() {
      try {
        this.started = false;
        this.show = true;
        this.interval = setInterval(() => {
          if (this.value >= 100) {
            this.show = false;
            this.finished = true;
            clearInterval(this.interval);
          }
          this.value += Math.round(Math.random() * 10);
        }, 700);

        let tRes = await this.$axios.$get(
          "http://127.0.0.1:4004/api/twitter/update"
        );
        let fRes = await this.$axios.$get(
          "http://127.0.0.1:4004/api/feed/update"
        );

        return {
          tStatus: tRes.success,
          fStatus: fRes.success
        };
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

/twitter/update