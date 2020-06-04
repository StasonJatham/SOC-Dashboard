<template>
  <v-layout
    column
    justify-center
    align-center
  >


  <div v-for="vuln in vulns" :key="vuln.id" style="margin-bottom:10px">

       <v-card class="mx-auto" max-width="800px">
    <v-card-text>
      <div>{{ vuln.name }}</div>
      <p class="display-1 text--primary">
        {{ vuln.risk }}
      </p>
       <p>Confidence: {{ vuln.confidence }}</p>
      <p>Target: {{ vuln.url }}</p>
      <p>Case: {{ vuln.param }}</p>
      <div class="text--primary">
{{ vuln.description }}
      </div>
      <v-row>
        <v-col><p>Alert:</p></v-col> <v-col><p>{{ vuln.alert }}</p></v-col>
      </v-row>
      <v-row>
        <v-col><p>Method:</p></v-col> <v-col><p>{{ vuln.method }}</p></v-col>
      </v-row>

      <v-row>
        <p>{{ vuln.other }}</p>
      </v-row>      <v-row>
        <v-col><p>Evidence:</p></v-col> <v-col><p>{{ vuln.evidence }}</p></v-col>
      </v-row>      <v-row>
        <v-col><p>CWE:</p></v-col> <v-col><a>https://cwe.mitre.org/data/definitions/{{ vuln.cweid }}.html</a></v-col>
      </v-row>      <v-row>
        <v-col><p>Solution:</p></v-col> <v-col><p>{{ vuln.solution }}</p></v-col>
      </v-row>      
      <v-row>
        <v-col><p>Reference:</p></v-col> <v-col><p>{{ vuln.reference }}</p></v-col>
      </v-row>

            <v-row>
        <v-col><p>Attack:</p></v-col> <v-col><p>{{ vuln.attack }}</p></v-col>
      </v-row>


    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4">Learn More</v-btn>
      
    </v-card-actions>
  </v-card>

 
  </div>


  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('http://127.0.0.1:4004/api/vulns')
      return {
        vulns: response.vulns
      }
    } catch (error) {
      console.log(error)
    }
    
  },
};
</script>

<style>
  .Informational {
    color: gray;
  }

  .Low {
    color: green;
  }
</style>