<template>
  <main>
    <v-row>
      <v-col>
        <iframe
          id="ifrm"
          src="https://threatmap.fortiguard.com/"
          width="100%"
          height="400"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col>
        <iframe
          id="ifrm2"
          src="https://threatmap.checkpoint.com/"
          width="100%"
          height="400"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="text-center">Security Twitter</h1>
        <v-card class="mx-auto" max-width="100%" tile v-resize="onResize">
          <v-expansion-panels
            :accordion="true"
            :multiple="true"
            class="overflow-y-auto"
            v-bind:style="{ maxHeight: windowSize.y + 'px' }"
            dense
          >
            <v-expansion-panel v-for="tweet in twitterData" :key="tweet.id" v-ripple>
              <v-expansion-panel-header
                expand-icon=" "
                v-if="new Date(tweet.created_at).toDateString() === new Date().toDateString()"
              >
                <v-badge
                  style="margin-right:10px"
                  color="red"
                  content="Today!"
                  offset-x="20"
                  offset-y="20"
                >
                  @{{ tweet.username }} -
                  <p class="truncated">{{ tweet.full_text }}</p>
                </v-badge>
              </v-expansion-panel-header>

              <v-expansion-panel-header expand-icon=" " v-else>
                <div>
                  @{{ tweet.username }} -
                  <p class="truncated">{{ tweet.full_text }}</p>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <p>{{ new Date(tweet.created_at).toUTCString() }}</p>
                <p>{{ tweet.full_text }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider></v-divider>
        </v-card>
      </v-col>
      <v-col>
        <h1 class="text-center">Security RSS Feeds</h1>
        <v-card class="mx-auto" max-width="100%" tile v-resize="onResize">
          <v-expansion-panels
            :accordion="true"
            :multiple="true"
            class="overflow-y-auto"
            v-bind:style="{ maxHeight: windowSize.y + 'px' }"
            dense
          >
            <v-expansion-panel dense v-for="rss in rssData" :key="rss.id" v-ripple>
              <v-expansion-panel-header
                expand-icon=" "
                v-if="new Date(rss.isoDate).toDateString() === new Date().toDateString()"
              >
                <v-badge
                  style="margin-right:10px"
                  color="red"
                  content="Today!"
                  offset-x="20"
                  offset-y="20"
                >
                  {{ rss.title }} -
                  <p class="truncated">{{ rss.content }}</p>
                </v-badge>
              </v-expansion-panel-header>

              <v-expansion-panel-header expand-icon=" " v-else>
                <div>
                  {{ rss.title }} -
                  <p class="truncated">{{ rss.content }}</p>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <p>{{ rss.link }}</p>
                <p>{{ new Date(rss.isoDate).toUTCString() }}</p>
                <p>{{ rss.content }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider></v-divider>
        </v-card>
      </v-col>

      <v-col>
        <h1 class="text-center">Shodan Search for {{ target }}</h1>
        <v-card class="mx-auto" max-width="100%" tile v-resize="onResize">
          <v-expansion-panels
            :accordion="true"
            :multiple="true"
            class="overflow-y-auto"
            v-bind:style="{ maxHeight: windowSize.y + 'px' }"
            dense
          >
            <v-expansion-panel dense v-for="shda in shodandata.matches" :key="shda.id" v-ripple>
              <v-expansion-panel-header expand-icon=" ">
                <v-list-item-title>
                  <span>{{ shda.org }}</span>
                  <br />
                  <p v-for="hostn in shda.hostnames" :key="hostn.id">{{ hostn }}</p>
                </v-list-item-title>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <p>{{ shda.ip }}</p>
                <p>{{ shda.os }}</p>
                <p>{{ shda.isp }}</p>
                <p>{{ shda.http }}</p>
                <p>{{ shda.port }}</p>
                <p>{{ shda.location.country_name }}</p>
                <p>{{ shda.domains }}</p>
                <p>{{ shda.data }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="mx-auto text-center" color="deep-purple darken-2" dark max-width="600">
          <v-card-text>
            <v-sheet color="deep-purple darken-1">
              <v-sparkline
                :value="twitternumbers"
                :labels="twitterlabels"
                color="deep-purple darken-4"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
                :auto-draw="true"
                :auto-draw-duration="3000"
              ></v-sparkline>
            </v-sheet>
          </v-card-text>
          <v-card-text>
            <div class="display-1 font-weight-thin">Twitter Alerts</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto text-center" color="deep-purple darken-2" dark max-width="600">
          <v-card-text>
            <v-sheet color="deep-purple darken-1">
              <v-sparkline
                :value="feednumbers"
                :labels="feedlabels"
                color="deep-purple darken-4"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
                :auto-draw="true"
                :auto-draw-duration="3000"
              ></v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="display-1 font-weight-thin">Total Alerts</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay :value="overlay">
      <div>
        <v-progress-circular indeterminate :size="200" :width="20" color="deep-purple darken-2">
          <p class="font-weight-bold">Updating Database</p>
        </v-progress-circular>
      </div>
    </v-overlay>
  </main>
</template>


<script>
export default {
  data() {
    return {
      target: "CANCOM",
      twitterlabels: [],
      twitternumbers: [],
      feedlabels: [],
      feednumbers: [],
      show: true,
      overlay: false,
      windowSize: {
        x: 0,
        y: 0
      },

      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ]
    };
  },
  mounted() {
    this.onResize();
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
          window.location.reload();
        }, 12000);
    }
  },
  methods: {
    onResize() {
      this.windowSize = {
        x: window.innerWidth - 50,
        y: window.innerHeight - 50
      };
    },
    updateDatabase: async function() {
      try {
        this.overlay = true;
        this.started = false;
        this.show = true;
        this.interval = setInterval(() => {
          if (this.value >= 100) {
            this.show = false;
            this.finished = true;
            clearInterval(this.interval);
          }
          this.value += Math.round(Math.random() * 10);
        }, 800);

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
    feedChart: async function() {
      try {
        let response = await this.$axios.$get(
          "http://127.0.0.1:4004/api/feedchart"
        );

        var labelArray = [];
        var numberArray = [];
        for (var key in response.data) {
          await labelArray.push(key);
          await numberArray.push(response.data[key]);
        }
        this.feedlabels = labelArray;
        this.feednumbers = numberArray;
      } catch (error) {
        console.log(error);
      }
    },
    twitterChart: async function() {
      try {
        let response = await this.$axios.$get(
          "http://127.0.0.1:4004/api/twitterchart"
        );
        var labelArray = [];
        var numberArray = [];
        for (var key in response.data) {
          await labelArray.push(key);
          await numberArray.push(response.data[key]);
        }
        this.twitterlabels = labelArray;
        this.twitternumbers = numberArray;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.feedChart();
    this.twitterChart();
    setInterval(() => this.updateDatabase(), 1000 * 60 * 60 * 3); // run database update every 3 hours
  },
  async asyncData({ $axios }) {
    try {
      let twitterResponse = await $axios.$get(
        "http://127.0.0.1:4004/api/twitter"
      );

      // /shodan/:search
      let rssResponse = await $axios.$get("http://127.0.0.1:4004/api/feed");
      let shodanresponse = await $axios.$get(
        "http://127.0.0.1:4004/api/shodan?target=cancom"
      );
      return {
        twitterData: twitterResponse.data,
        rssData: rssResponse.data,
        shodandata: shodanresponse.data
      };
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.truncated {
  overflow: hidden;
  display: block;
  width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.limit {
  word-wrap: break-word;
}
</style>

