<template>
  <div fill-height fluid>
    <v-app-bar color="deep-purple darken-2" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Wallabe</v-toolbar-title>

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

    <v-row>
      <iframe
        src="https://attack.mitre.org/matrices/enterprise/"
        width="100%"
        height="500px"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </v-row>
    <v-row>
      <v-col>
        <iframe
          src=" https://attack.mitre.org/tactics/pre/"
          width="100%"
          height="500px"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col>
        <iframe
          src="https://attack.mitre.org/techniques/pre/"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col>
                <iframe
        src="https://attack.mitre.org/beta/mitigations/enterprise/"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
      </v-col>
    </v-row>





  </div>
</template>

<script>
export default {
  data() {
    return {
      spider: "Enter the Target e.g. https://www.cancom.de"
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
  
