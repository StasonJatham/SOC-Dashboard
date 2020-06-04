<template>
  <div fill-height fluid>
    <v-app-bar color="deep-purple darken-2" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Exploit</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>


      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-container>
            <div>
        <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.key"
          :style="{backgroundColor: network.color}"
          :url="sharing.url"
          :title="sharing.title"
          :description="sharing.description"
          :quote="sharing.quote"
          :hashtags="sharing.hashtags"
          :twitterUser="sharing.twitterUser"
        >
          <i :class="network.icon"></i>
          <span>{{ network.name }}</span>
        </ShareNetwork>
      </div>
      <v-row>
        <v-col>
          <h1 class="display-4 font-weight-bold text-center">Exploit.to</h1>

          <p
            class="display-1 font-weight-bold text-center pt-3 mt-5"
          >Monitoring Current Security Feeds, hourly.</p>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-row">
        <v-col>
          <div></div>
        </v-col>
        <v-col class="d-flex flex-column">
          <v-btn class="ma-1" outlined color="deep-purple darken-2" to="/show" nuxt>Dashboard</v-btn>
        </v-col>
        <v-col class="d-flex flex-column">
          <v-btn class="ma-1" outlined color="deep-purple darken-2" to="/mitre" nuxt>Matrix</v-btn>
        </v-col>
        <v-col>
          <div></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharing: {
        url: "http://exploit.to",
        title: "Monitoring Security Feeds, hourly",
        description:
          "Exploit.to is a site to monitor security Twitter and RSS feeds, hourly",
        quote: "Stay fresh, hourly",
        hashtags: "security,exploit,feed,rss,hacking,cyber"
      },
      networks: [
        {
          network: "baidu",
          name: "Baidu",
          icon: "fas fah fa-lg fa-paw",
          color: "#2529d8"
        },
        {
          network: "buffer",
          name: "Buffer",
          icon: "fab fah fa-lg fa-buffer",
          color: "#323b43"
        },
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333"
        },
        {
          network: "evernote",
          name: "Evernote",
          icon: "fab fah fa-lg fa-evernote",
          color: "#2dbe60"
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2"
        },
        {
          network: "flipboard",
          name: "Flipboard",
          icon: "fab fah fa-lg fa-flipboard",
          color: "#e12828"
        },
        {
          network: "hackernews",
          name: "HackerNews",
          icon: "fab fah fa-lg fa-hacker-news",
          color: "#ff4000"
        },
        {
          network: "instapaper",
          name: "Instapaper",
          icon: "fas fah fa-lg fa-italic",
          color: "#428bca"
        },
        {
          network: "line",
          name: "Line",
          icon: "fab fah fa-lg fa-line",
          color: "#00c300"
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5"
        },
        {
          network: "odnoklassniki",
          name: "Odnoklassniki",
          icon: "fab fah fa-lg fa-odnoklassniki",
          color: "#ed812b"
        },
        {
          network: "pinterest",
          name: "Pinterest",
          icon: "fab fah fa-lg fa-pinterest",
          color: "#bd081c"
        },
        {
          network: "pocket",
          name: "Pocket",
          icon: "fab fah fa-lg fa-get-pocket",
          color: "#ef4056"
        },
        {
          network: "quora",
          name: "Quora",
          icon: "fab fah fa-lg fa-quora",
          color: "#a82400"
        },
        {
          network: "reddit",
          name: "Reddit",
          icon: "fab fah fa-lg fa-reddit-alien",
          color: "#ff4500"
        },
        {
          network: "skype",
          name: "Skype",
          icon: "fab fah fa-lg fa-skype",
          color: "#00aff0"
        },
        {
          network: "sms",
          name: "SMS",
          icon: "far fah fa-lg fa-comment-dots",
          color: "#333333"
        },
        {
          network: "stumbleupon",
          name: "StumbleUpon",
          icon: "fab fah fa-lg fa-stumbleupon",
          color: "#eb4924"
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc"
        },
        {
          network: "tumblr",
          name: "Tumblr",
          icon: "fab fah fa-lg fa-tumblr",
          color: "#35465c"
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2"
        },
        {
          network: "viber",
          name: "Viber",
          icon: "fab fah fa-lg fa-viber",
          color: "#59267c"
        },
        {
          network: "vk",
          name: "Vk",
          icon: "fab fah fa-lg fa-vk",
          color: "#4a76a8"
        },
        {
          network: "weibo",
          name: "Weibo",
          icon: "fab fah fa-lg fa-weibo",
          color: "#e9152d"
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366"
        },
        {
          network: "wordpress",
          name: "Wordpress",
          icon: "fab fah fa-lg fa-wordpress",
          color: "#21759b"
        },
        {
          network: "xing",
          name: "Xing",
          icon: "fab fah fa-lg fa-xing",
          color: "#026466"
        }
      ]
    };
  },
  methods: {
    async runSpider() {
      try {
        let data = { spider: this.spider };
        let response = await this.$axios.$post(
          "http://localhost:4004/api/spider",
          data
        );
      } catch (error) {
        console.log(error);
      }
    },
    async runPassive() {
      console.log("test");
      try {
        let data = new FormData();
        data.append("spider", this.spider);

        let response = await this.$axios.$post(
          "http://localhost:4004/api/spider",
          data
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>







