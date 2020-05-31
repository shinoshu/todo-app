<template>
  <v-tabs @change="$emit('selected', $event)">
    <v-tab>すべて</v-tab>
    <v-tab>重要</v-tab>
    <v-tab>未完了</v-tab>
    <v-tab>完了</v-tab>
  </v-tabs>
</template>
