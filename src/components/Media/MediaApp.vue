<template>

  <div>
    <b-container align-h="center" id="media-container">
      <h1>Sounds I Make</h1>
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
          name: 'bandcamp-monkey',
          embedref: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=734807793/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=4110217143/transparent=true/" seamless><a href="https://barncatboys.bandcamp.com/album/baby-songs">Baby Songs by Barncat Productions</a></iframe>'
        },
        {
          name: 'bandcamp-dub',
          embedref: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=916923795/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=3453975111/transparent=true/" seamless><a href="http://barncatboys.bandcamp.com/album/siblings-and-friends">Siblings and Friends by Siblings and Friends</a></iframe>'
        },
        {
          name: 'soundlcoud-cheerio',
          embedref: '<iframe width="100%" height="120px" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/713985979&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
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
