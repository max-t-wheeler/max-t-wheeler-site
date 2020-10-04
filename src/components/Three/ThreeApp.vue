<template>
  <div>
    <b-container fluid id="three-container">
      <b-row v-if="screenType === 'phone'">
        <b-col>
          <h1 id="three-phone-message">ROTATE ME</h1>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col id="three-navpane" md="2" sm="3">
          <h2 id="three-navpane-title" :class="screenType">Animations</h2>
          <input type="text" id="three-search-bar" placeholder="Search" onfocus="this.value=''" v-model="searchedText"/>
          <three-navpane-menu id="three-navpane-menu" :class="[screenAspectRatio, screenType]" :screenType="screenType" :searchedText="searchedText"/>
        </b-col>
        <b-col md="10" sm="9" id='three-display'>
          <canvas id='three-canvas'></canvas>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navpane from './Navpane/Navpane';

export default {
  props: ['screenType', 'screenAspectRatio'],
  name: 'ThreeApp',
  components: {
    'three-navpane-menu': Navpane
  },
  data () {
    return {
      searchedText: ''
    }
  }
}
</script>

<style>

#three-phone-message {
  position: relative;
  top: 70%;
  text-align: center;
}

#three-navpane {
  height: 90vh;
  background: none;
  overflow: hidden;
  position: relative;
}

#three-navpane-title {
  position: relative;
}

#three-search-bar {
  position: relative;
  width: 100%;
}

#three-navpane-menu {
  height: 87%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  margin-top: 10px;
}
::-webkit-scrollbar {
  background: transparent;
}

#three-navpane-menu.tablet, #three-navpane-menu.phone {
  height: 80%;
}

#three-navpane-menu.widescreen {
  height: 75%;
}

#three-display {
  height:90vh;
  overflow: hidden;
}

#three-display.tablet, #three-display.phone {
  height:85vh;
}

</style>
