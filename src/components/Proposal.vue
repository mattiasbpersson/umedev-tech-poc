<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="new_proposal.name"
            :rules="fieldRules"
            type="text"
            label="Presenter(s)"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="new_proposal.mail"
            :rules="emailRules"
            type="email"
            label="Contact email"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="new_proposal.title"
            :rules="fieldRules"
            type="text"
            label="Title of presentation"
            outlined
          ></v-text-field>

          <v-textarea
            outlined
            v-model="new_proposal.description"
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
            <v-list-item v-for="proposal in proposals" :key="proposal['.key']">
              <v-list-item-content>
                <v-list-item-title
                  v-html="proposal['.key']"
                ></v-list-item-title>
                <v-list-item-title v-html="proposal.title"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="proposal.name"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-html="proposal.mail"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  class="font-weight-light"
                  v-html="proposal.description"
                ></v-list-item-subtitle>
                <v-checkbox
                  v-model="proposal.approved"
                  :disabled="true"
                  :label="`Approved: ${proposal.approved}`"
                ></v-checkbox>
                <v-row justify="center">
                  <v-btn color="primary" @click="approve_proposal(proposal)">
                    Approve proposal
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '../firebase'
var proposals_db = db.ref('proposals')

export default Vue.extend({
  data: () => ({
    proposals: [],
    dialog: false,
    valid: true,
    new_proposal: {
      name: '',
      title: '',
      mail: '',
      description: '',
      approved: false
    },
    fieldRules: [
      v => !!v || 'Field is required',
      v => (v && v.length <= 100) || 'Field must be less than 100 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid'
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
      v =>
        (v && v.length <= 1000) ||
        'Description must be less than 1000 characters'
    ]
  }),
  firebase: {
    proposals: proposals_db
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('Submit:' + this.new_proposal)
        proposals_db.push(this.new_proposal)
        this.reset()
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    approve_proposal(proposal) {
      const key = proposal['.key']
      console.log(proposal)
      const data = { ...proposal }
      //delete proposal['.key']
      //delete proposal['.value']
      data.approved = true
      console.log(proposal)
      console.log(key)
      console.log(data)
      this.dialog = false
      db.ref('proposals/' + key).set(data, function(error) {
        if (error) {
          console.error(error)
        } else {
          console.log('Data updated')
        }
      })
    }
  }
})
</script>
