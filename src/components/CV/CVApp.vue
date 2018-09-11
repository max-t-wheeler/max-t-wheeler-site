<template>

  <div>
    <b-container align-h="center" id="cv-container" :class="screenType">
      <div v-if="screenType !== 'monitor'">
        <b-row v-for="cvSection in cvContents" :key="cvSection.header" class="cv-section-content">
          <b-col cols="12" class="cv-section" :class="screenType">
            <h1>{{cvSection.header}}</h1> <br>
            <p v-for="detail in cvSection.details" :key="detail.text" :class="detail.type">{{detail.text}}</p>
          </b-col>
        </b-row>
      </div>
      <div v-if="screenType === 'monitor'" id="cv-slider">
        <b-row>
          <b-col cols="2">
            <b-btn class="cv-slider-arrow" v-on:click="onSlideLeft(currentSlide)">
              <span class="glyphicon glyphicon-chevron-left"></span>
            </b-btn>
          </b-col>
          <b-col cols="8">
              <div v-for="cvSection in cvContents" :key="cvSection.header" v-if="cvSection.display" class="cv-section-content">
                <h1>{{cvSection.header}}</h1> <br>
                <p v-for="detail in cvSection.details" :key="detail.text" :class="detail.type">{{detail.text}}</p>
              </div>
          </b-col>
          <b-col cols="2">
            <b-btn class="cv-slider-arrow" v-on:click="onSlideRight(currentSlide)">
              <span class="glyphicon glyphicon-chevron-right"></span>
            </b-btn>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>

</template>

<script>

export default {
  props: ['screenType'],
  name: 'CVApp',
  data () {
    return {
      currentSlide: 0,
      cvContents: [
        {
          display: true,
          header: 'Education',
          details: [
            {
              type: 'cv-organization',
              text: 'Rensselaer Polytechnic Institute'
            },
            {
              type: 'cv-description',
              text: 'B.S. in Physics and Mathematics (2015)'
            }
          ]
        },
        {
          display: false,
          header: 'Experience',
          details: [
            {
              type: 'cv-organization',
              text: 'FactSet Research Systems, Inc.'
            },
            {
              type: 'cv-organization',
              text: 'Portfolio & Quant, Analytics Solutions'
            },
            {
              type: 'cv-description',
              text: 'Product Developer (2016-)'
            },
            {
              type: 'cv-organization',
              text: 'Barncat Productions'
            },
            {
              type: 'cv-description',
              text: 'Chief Technical Officer, Head of Public Relations, Studio Musician (2015-2016)'
            },
            {
              type: 'cv-organization',
              text: 'Rensselaer Polytechnic Institute Department of Mathematics'
            },
            {
              type: 'cv-description',
              text: 'Research Student (2014-2015)'
            },
            {
              type: 'cv-description',
              text: 'Teaching Assistant, Introduction to Differential Equations (2013-2014)'
            }
          ]
        },
        {
          display: false,
          header: 'Affiliations',
          details: [
            {
              type: 'cv-organization',
              text: 'Pi Mu Epsilon, Kappa'
            },
            {
              type: 'cv-description',
              text: 'Secretary (2014-2015)'
            },
            {
              type: 'cv-organization',
              text: 'Delta Tau Delta, Upsilon'
            },
            {
              type: 'cv-description',
              text: 'Recording Secretary (2013-2014)'
            }
          ]
        },
        {
          display: false,
          header: 'Accolades',
          details: [
            {
              type: 'cv-description',
              text: 'Rensselaer Medalist (2010)'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onSlideLeft (slide) {
      for (let i = 0; i < this.cvContents.length; ++i) {
        this.cvContents[i].display = false;
      }

      if (this.currentSlide === 0) {
        this.currentSlide = this.cvContents.length - slide - 1;
      } else {
        this.currentSlide = slide - 1;
      }

      this.cvContents[this.currentSlide].display = true;
    },
    onSlideRight (slide) {
      for (let i = 0; i < this.cvContents.length; ++i) {
        this.cvContents[i].display = false;
      }
      this.currentSlide = (slide + 1) % this.cvContents.length;
      this.cvContents[this.currentSlide].display = true;
    }
  }
}

</script>

<style>

#cv-container {
  position: relative;
  top: 10%;
  text-align: center;
}

#cv-container.monitor {
  top: 30%;
  overflow: hidden;
}

#cv-slider {
  position: relative;
  top: 50%;
}

.cv-slider-arrow, .cv-slider-arrow:hover, .cv-slider-arrow:active, .cv-slider-arrow:focus, .cv-slider-arrow:visited {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  position: fixed;
  top: 40%;
}

.cv-organization {
  font-weight: bold;
}

</style>
