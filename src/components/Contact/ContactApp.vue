<template>

  <div>
    <b-container align-h="center" id="contact-container">
      <b-row>
        <b-col>
          <h1>HIT ME UP</h1>
        </b-col>
      </b-row>
      <b-row v-for="contactInfoItem in contactInfo" :key="contactInfoItem.text" >
        <b-col>
          <p>{{ contactInfoItem.text }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a v-for="contactLink in contactLinks" :key="contactLink.icon" rel="noopener" class="contact-icon" :href="contactLink.src" target="_blank">
            <span class="fa" :class="contactLink.icon"/>
          </a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a rel="noopener" class="contact-icon" href="https://github.com/max-t-wheeler" target="_blank">
            <span class="fa fa-github"/>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>

export default {
  name: 'ContactApp',
  data () {
    return {
      contactInfo: [
        {
          text: 'Max T. Wheeler'
        },
        {
          text: 'max-t-wheeler@gmail.com'
        },
        {
          text: 'CT | MA | NY'
        }
      ],
      contactLinks: [
        {
          src: 'https://www.linkedin.com/in/max-wheeler-39557074/',
          icon: 'fa-linkedin'
        },
        {
          src: 'https://www.facebook.com/max.wheeler.9',
          icon: 'fa-facebook'
        },
        {
          src: 'https://soundcloud.com/the-dopest-kind',
          icon: 'fa-soundcloud'
        }
      ]
    }
  }
}

</script>

<style>

#contact-container {
  position: relative;
  top: 20%;
  text-align: center;
}

.contact-icon {
  font-size: 20px;
  color: black;
  text-decoration: none;
}

.contact-icon:hover, .contact-icon:active, .contact-icon:visited {
  color: black;
}

</style>
