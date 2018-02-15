<template>

  <div>
    <b-container align-h="center" id="media-container">
      <h1>Not for laptop speakers</h1>
      <div id="media-players">
        <div v-for="player in mediaPlayers" :key="player.name" class="media-player">
          <b-row class="justify-content-md-center">
            <b-col md="6">
              <span v-html='player.embedref'></span>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>

</template>

<script>

export default {
  name: 'MediaApp',
  data () {
    return {
      mediaPlayers: [
        {
          name: 'bandcamp-dub',
          embedref: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=916923795/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=3453975111/transparent=true/" seamless><a href="http://barncatboys.bandcamp.com/album/siblings-and-friends">Siblings and Friends by Siblings and Friends</a></iframe>'
        },
        {
          name: 'soundlcoud-cheerio',
          embedref: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/345594317&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"></iframe>'
        },
        {
          name: 'bandcamp-gross',
          embedref: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=3621861420/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=493506869/transparent=true/" seamless><a href="http://barncatboys.bandcamp.com/album/keepin-it-clean">Keepin it Clean by Serge Dean</a></iframe>'
        }
      ]
    }
  }
}

</script>

<style>

#media-container {
  position: relative;
  top: 10%;
  text-align: center;
  overflow: hidden;
}

#media-player {
  width: 100%;
}

</style>
