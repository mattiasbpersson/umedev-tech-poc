<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="proposal.name"
            :rules="fieldRules"
            type="text"
            label="Presenter(s)"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="proposal.mail"
            :rules="emailRules"
            type="email"
            label="Contact email"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="proposal.title"
            :rules="fieldRules"
            type="text"
            label="Title of presentation"
            outlined
          ></v-text-field>

          <v-textarea
            outlined
            v-model="proposal.description"
            :rules="descriptionRules"
            type="text"
            name="description"
            label="Description of presentation"
          ></v-textarea>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Submit
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
          </v-btn>
        </v-col>
        <v-col>
          <v-list>
            <v-list-item
              v-for="proposal in proposals"
              :key="proposal.id"
              @click="sendEmail"
            >
              <v-list-item-content>
                <v-list-item-title v-html="proposal.title"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="proposal.name"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="proposal.mail"></v-list-item-subtitle>
                <v-list-item-subtitle class="font-weight-light" v-html="proposal.description"></v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { db } from '../firebase'
var proposals_db = db.ref('proposals')

export default Vue.extend({
  data: () => ({
    proposals: [],
    valid: true,
    proposal: {
      name: "",
      title: "",
      mail: "",
      description: "",
    },
    fieldRules: [
      v => !!v || "Field is required",
      v => (v && v.length <= 100) || "Field must be less than 100 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid"
    ],
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length <= 1000) ||
        "Description must be less than 1000 characters"
    ],
  }),
  firebase: {
    proposals: proposals_db,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //console.log("Submit:" + this.proposal);
        proposals_db.push(this.proposal)
        this.reset()
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    sendEmail() {
      //console.log("Submit:" + this.proposal);
    }
  }
});
</script>
