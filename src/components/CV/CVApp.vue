<template>

  <div>
    <b-container align-h="center" id="cv-container">
      <div v-if="screenType !== 'monitor'">
        <b-row>
          <b-col cols="12" class="cv-section" :class="screenType">
            <h1>Experience</h1> <br>
            <p class="cv-organization">FactSet Research Systems. Inc.</p>
            <p class="cv-description">Product Developer (2016-)</p>
            <p class="cv-description">Portfolio and Quant, Analytics Solutions</p>
            <p class="cv-organization">Barncat Productions</p>
            <p class="cv-description">Chief Technical Officer, Head of Public Relations, Studio Musician (2015-2016)</p>
            <p class="cv-organization">Rensselaer Polytechnic Institute Department of Mathematics</p>
            <p class="cv-description">Research Student (2014-2015)</p>
            <p class="cv-description">Teaching Assistant, Introduction to Differential Equations (2013-2014)</p>
          </b-col>
          <b-col cols="12" class="cv-section" :class="screenType">
            <h1>Education</h1> <br>
            <p class="cv-organization">Rensselaer Polytechnic Institute</p>
            <p class="cv-description">B.S. in Physics and Mathematics (2015)</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="cv-section" :class="screenType">
            <h1>Affliations</h1> <br>
            <p class="cv-organization">Pi Mu Epsilon, Kappa</p>
            <p class="cv-description">Secretary (2014-2015)</p>
            <p class="cv-organization">Delta Tau Delta, Upsilon</p>
            <p class="cv-description">Recording Secretary (2013-2014)</p>
          </b-col>
          <b-col cols="12" class="cv-section" :class="screenType">
            <h1>Accolades</h1> <br>
            <p class="cv-description">Rensselaer Medalist (2010)</p>
          </b-col>
        </b-row>
      </div>
      <div v-if="screenType === 'monitor'">
        <b-row>
          <b-col cols="6" class="cv-section" :class="screenType">
            <h1>Education</h1> <br>
            <p class="cv-organization">Rensselaer Polytechnic Institute</p>
            <p class="cv-description">B.S. in Physics and Mathematics (2015)</p>
          </b-col>
          <b-col cols="6" class="cv-section" :class="screenType">
            <h1>Affliations</h1> <br>
            <p class="cv-organization">Pi Mu Epsilon, Kappa</p>
            <p class="cv-description">Secretary (2014-2015)</p>
            <p class="cv-organization">Delta Tau Delta, Upsilon</p>
            <p class="cv-description">Recording Secretary (2013-2014)</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" class="cv-section" :class="screenType">
            <h1>Experience</h1> <br>
            <p class="cv-organization">FactSet Research Systems. Inc.</p>
            <p class="cv-description">Product Developer (2016-)</p>
            <p class="cv-description">Portfolio and Quant, Analytics Solutions</p>
            <p class="cv-organization">Barncat Productions</p>
            <p class="cv-description">Chief Technical Officer, Head of Public Relations, Studio Musician (2015-2016)</p>
            <p class="cv-organization">Rensselaer Polytechnic Institute Department of Mathematics</p>
            <p class="cv-description">Research Student (2014-2015)</p>
            <p class="cv-description">Teaching Assistant, Introduction to Differential Equations (2013-2014)</p>
          </b-col>
          <b-col cols="6" class="cv-section" :class="screenType">
            <h1>Accolades</h1> <br>
            <p class="cv-description">Rensselaer Medalist (2010)</p>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>

</template>

<script>

export default {
  props: ['screenType'],
  name: 'CVApp'
}

</script>

<style>

#cv-container {
  position: relative;
  top: 10%;
  text-align: center;
}

.cv-section.monitor {
  position: relative;
  left: 10%;
  text-align: left;
}

.cv-organization {
  font-weight: bold;
}

</style>
