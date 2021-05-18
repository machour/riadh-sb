// Imports for configuring Vuetify
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
//import "@/scss/variables.scss";
import "vuetify/dist/vuetify.min.css";

// this was the only thing here by default
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

// THIS is my decorator
export const decorators = [
  (story, context) => {
    // instantiate Vuetify instance with any component/story level params
    // wrap the passed component within the passed context
    const wrapped = story(context);
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      vuetify,
      components: { wrapped },
      props: {
        dark: {
          type: Boolean,
          default: context.args.dark,
        },
      },
      watch: {
        dark: {
          immediate: true,
          handler(val) {
            this.$vuetify.theme.dark = val;
          },
        },
      },
      template: `<v-app>
          <v-container fluid>
            <wrapped />
          </v-container>
        </v-app>`,
    });
  },
];
