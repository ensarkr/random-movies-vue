<script setup lang="ts">
import type { movieDetailT } from '@/typings/tmdb';


const { isItCurrent, movieDetails } = defineProps<{
  movieDetails: movieDetailT & { status: "loaded"; color: string };
  isItCurrent: boolean;
}>()

const getCurrentVideoLink = () => {
  const trailers = movieDetails.videos.filter((e) =>
    e.name.toLowerCase().includes("trailer")
  );

  if (trailers.length > 0) {
    return `https://www.youtube.com/embed/${trailers[0].key}`;
  } else {
    return `https://www.youtube.com/embed/${movieDetails.videos[0].key}`;
  }
};

const bottomBorderStyle = isItCurrent
  ? { borderBottom: `1px solid ${movieDetails.color}` }
  : {};


</script>

<template>
  <div class=main>
    <div class=header>
      <img class=image :src="`https://image.tmdb.org/t/p/w500/${movieDetails.posterPath}`" />
      <div class=titles>
        <h1 class=title>{{ movieDetails.title }}</h1>
        <p class=text>{{ movieDetails.releaseDate }}</p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28.5" :style="{
            fill: 'rgba(255, 255, 255, 1)', verticalAlign: 'bottom'
          }">
            <path
              d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z">
            </path>
          </svg>
          {{ movieDetails.voteAverage.toString().slice(0, 3) }}
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28.5" :style="{
            fill: 'rgba(255, 255, 255, 1)', verticalAlign: 'bottom'
          }">
            <path
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z">
            </path>
          </svg>
          {{ movieDetails.popularity }}
        </p>

        <p v-if="movieDetails.genres.length > 0">
          <span v-for="(item, index) in movieDetails.genres" :key="index">
            {{ item + (movieDetails.genres.length - 1 !== index ? " - " : "") }}
          </span>
        </p>
      </div>
    </div>
    <div class=body>
      <span v-if="movieDetails.overview !== null && movieDetails.overview.length > 0">
        <h2 class=subTitle :style="bottomBorderStyle">
          Overview
        </h2>
        <p class=text>{{ movieDetails.overview }}</p>
      </span>
      <span v-if="movieDetails.videos.length > 0">
        <h2 class=subTitle style="bottomBorderStyle">
          Trailer
        </h2>
        <div class=trailer>
          <iframe v-if="isItCurrent" allow="fullscreen;" height="100%" width="100%" :src="getCurrentVideoLink()">
          </iframe>
        </div>
      </span>
      <span v-if="movieDetails.cast.length > 0">
        <h2 class=subTitle} :style="bottomBorderStyle">
          Cast
        </h2>
        <ul>
          <li v-for="(item, index) in movieDetails.cast.slice(0, 8)" :key="index">
            {{ item.name }}{{ " " }}
            {{ item.character !== undefined &&
              item.character.length > 0 ?
              (" - " + item.character) : "" }}
            {{ item.department !== undefined &&
              item.department.length > 0 ?
              (" - " + item.department) : "" }}
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<style scoped>
.main {
  box-sizing: border-box;
  padding: 15px;
  overflow: hidden;

  display: flex;
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
}


.header {
  display: flex;
  text-wrap: wrap;
}

.image {
  min-width: 200px;
  width: 200px;
  aspect-ratio: 2/3;
  height: min-content;
  border-radius: 5px;
}

.titles {
  flex-grow: 1;
  padding: 10px;
}

.title {
  margin: 0 0 0.5rem 0;
}

.subTitle {
  margin: 2rem 0 0.5rem 0;
}

.text {
  margin: 0;
}

.trailer {
  width: 100%;
  aspect-ratio: 16/9;
}

.trailer iframe {
  border: 0;
}

.body ul {
  margin: 0;
  list-style-type: square;
}

@media screen and (max-width: 1350px) {}

@media screen and (max-width: 1060px) {
  .title {
    font-size: 1.5rem;
  }

  .subTitle {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 450px) {
  .titles {
    padding: 0;
  }

  .header {
    flex-wrap: wrap;
  }

  .image {
    width: 100%;
  }
}
</style>
