<template>

  <div>
    <b-container align-h='center' id='home-container'>
    </b-container>
  </div>

</template>

<script>

export default {
  name: 'HomeApp',
  data () {
    return {
      attributes: [
        {
          text: 'addict',
          size: 1
        },
        {
          text: 'artist',
          size: 5
        },
        {
          text: 'dreamer',
          size: 3
        },
        {
          text: 'engineer',
          size: 4
        },
        {
          text: 'fighter',
          size: 1
        },
        {
          text: 'geek',
          size: 2
        },
        {
          text: 'glutton',
          size: 3
        },
        {
          text: 'heartbreaker',
          size: 1
        },
        {
          text: 'lover',
          size: 1
        },
        {
          text: 'mathematician',
          size: 4
        },
        {
          text: 'musician',
          size: 5
        },
        {
          text: 'nerd',
          size: 3
        },
        {
          text: 'poet',
          size: 3
        },
        {
          text: 'realist',
          size: 3
        },
        {
          text: 'romantic',
          size: 2
        },
        {
          text: 'scientist',
          size: 4
        },
        {
          text: 'taoist',
          size: 2
        }
      ]
    }
  },
  mounted () {

    let appContainer = document.querySelector('.application');
    let homeContainer = document.getElementById('home-container')
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;

    appContainer.style.overflow = 'hidden';

    function moveAttributes () {
      var elems = document.querySelectorAll('.home-attribute');
      var t = 0;
      var id = setInterval(frame, 5);
      function frame () {
        if (t === 35000000) {
          clearInterval(id);
        } else {
          for (let i = 0; i < elems.length; ++i) {
            elems[i].style.top = containerWidth / 5 + Math.cos(i + t / 1000) * containerWidth / 5 + 'px';
            elems[i].style.left = containerHeight / 15 + Math.sin(i + t / 1000) * containerHeight / 2 + 'px';
          }
          t++;
        }
      }
    }

    for (let i = 0; i < this.attributes.length; ++i) {

      let elem = document.createElement('div');

      elem.classList.add('home-attribute')
      elem.textContent = this.attributes[i].text;
      elem.style.fontSize = 10 * this.attributes[i].size + 'px';
      elem.style.zIndex = i;

      homeContainer.appendChild(elem);
    }

    moveAttributes();

  }
}

</script>

<style>

.home-attribute {
  backface-visibility: hidden;
  filter: blur(0);
  float:left;
  position: relative;
  -webkit-backface-visibility: hidden;
}

</style>
