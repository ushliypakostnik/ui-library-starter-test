<template>
  <main
    role="main"
    class="dashboards"
    :class="{ 'dashboards--min': !isMenuOpen }"
  >
    <aside class="dashboards__sidebar">
      <button type="button" class="dashboards__toggle" @click="toggle">
        Toggle
      </button>
      <ul class="dashboards__menu">
        <li
          v-for="(item, index) in dashboards"
          :key="`menuitem${index}`"
          class="dashboards__menu-item"
        >
          <router-link :to="`/${item.path}`">{{ item.name }}</router-link>
        </li>
      </ul>
    </aside>
    <div class="dashboards__content">
      <Dashboard
        v-if="dashboard"
        :api="api"
        :id="dashboard.id"
        :widgets="dashboard.widgets"
      />
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import common from '../../mixins/common';

import Dashboard from '..//Dashboard';

export default {
  name: 'Dashboards',

  mixins: [common],

  components: {
    Dashboard,
  },

  computed: {
    ...mapGetters(['dashboards', 'dashboard', 'isMenuOpen']),
  },

  watch: {
    $route() {
      this.checkDashboard();
    },
  },

  mounted() {
    this.getDashboards(this.api);
    this.checkDashboard();
  },

  methods: {
    ...mapActions([
      'getDashboards',
      'getDashboard',
      'nullifyDashboard',
      'setMenu',
    ]),

    toggle() {
      this.setMenu(!this.isMenuOpen);
    },

    checkDashboard() {
      console.log('Route: ', this.$router.currentRoute.path);
      this.nullifyDashboard();
      if (this.$router.currentRoute.path !== '/')
        this.getDashboard({
          api: this.api,
          dashboard: this.$router.currentRoute.path,
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "~/src/stylus/_stylebase.styl";

$sidebar-width = 400px
$sidebar-width--min = 80px

$effect = $effects.duration

$name = '.dashboards'

{$name}
  width 100%
  position relative
  padding-left $sidebar-width
  transition padding-left $effect

  &--min
    padding-left $sidebar-width--min

    {$name}__sidebar
      width $sidebar-width--min

    {$name}__menu
      display none

  &__sidebar
    width $sidebar-width
    transition width $effect
    height 100%
    position: fixed
    left 0
    top 0
    bottom 0
    padding: 60px 20px 40px
    background $colors.primary

  &__menu
    list-style none

  &__menu-item
    color $colors.stone
    margin-bottom: 20px
    $text("maria")

    a
      text-decoration none

      &:hover
        text-decoration underline

  &__content
    width: 100%
    min-height 100vh
    background $colors.sky
    padding 20px

  &__toggle
    position absolute
    right 20px
    top 20px
</style>
