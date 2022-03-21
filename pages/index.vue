<template>
  <div class="container-fluid">
    <div class="row min-vh-100 d-flex align-items-center bg-light">
      <div class="col-lg-12 p-5">
        <h1>Nuxt WP Blog</h1>
      </div>
    </div>

<!-- simple json cms  -->
   <div class="row min-vh-100 d-flex align-items-center px-5">
      <div class="col-lg-12 p-3 m-3 border rounded">
        <h3>New posts</h3>
        <button @click="refreshPosts">Refresh</button>
      </div>
      <div class="col-lg-4 p-0" v-for="(post, index) in simplePosts" :key="index">
        <div
          class="bg-light p-5 rounded-lg border m-3"
          style="min-height: 250px">
          <h4>{{ post.title }}</h4>
          <p>{{ post.description }}</p>
          <router-link :to="`/blog/${post.slug}`">
            <div class="btn btn-outline-dark mt-3">Read more</div>
          </router-link>
        </div>
      </div>
    </div>

<!-- n2 -->
    <div class="row min-vh-100 d-flex align-items-center p-5">
      <div class="col-lg-12 p-3 m-3 border rounded">
        <h3>New posts</h3>
        <button @click="refreshN2">Refresh</button>
      </div>
      <!-- <div v-if="$fetchState.pending">Placeholder</div> -->
      <div
        class="col-lg-4 p-0"
        v-for="(article, index) in articles"
        :key="index"
      >
        <div
        class="bg-light p-5 rounded-lg border m-3"
        style="min-height: 250px">
          <h4>{{ article.title.rendered }}</h4>
          <router-link :to="`/blog/${article.slug}`">
            <div class="btn btn-outline-dark mt-3">Read more</div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- <div>
      <p v-if="$fetchState.pending">Fetching mountains...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div v-else>
      <div>
        <h1>Nuxt Mountains</h1>
        <ul>
          <li v-for="(mountain, index) of mountains" :key="index">
            {{ mountain.title }}
          </li>
        </ul>
        <button @click="fetch">Refresh</button>
      </div>
    </div>
  </div> -->

  </div>
</template>

<style>
body {
  font-family: "Helvetica Neue", helvetica, sans-serif;
}

h1 {
  font-size: 120px;
}
</style>

<script>
import axios from 'axios' 

export default {
  data() {
    return {
      posts: [],
      articles: [],
      simplePosts: [],
      error: []
    };
  },
  computed: {
    // for vuex call
    posts() {
      return this.$store.state.posts;
    },
  },

  // using async fetch
  // async fetch() {
  //     // Fetch a random list of articles
  //     this.articles = await fetch("https://n2speechtherapy.com/wp-json/wp/v2/posts"
  //     ).then((res) => res.json());
  //     // You will be able to access articles anywhere with this.articles and loop them v-for inside your template
  //   },


  // asyncData ({ params }) { 
  //   return axios.get(`https://n2speechtherapy.com/wp-json/wp/v2/posts/${params.id}`) 
  //   .then(response => { 
  //     return { 
  //       posts: response.data 
  //     } 
  //   })
  //   .catch((error) => { 
  //     return { error: error } }) 
  //   }, 

  methods: {
    // async getPosts() {
    //   try {
    //   let posts = await fetch( 'https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=12&_embed=1'
    //   ).then(res => res.json())
    //   this.posts = posts
    //     .filter(el => el.status === "publish")
    //     .map(({ id, slug, title, excerpt, date, tags, content }) => ({
    //       id,
    //       slug,
    //       title,
    //       excerpt,
    //       date,
    //       tags,
    //       content
    //     }))
    //     // with vuex
    //   // commit("updatePosts", posts)
    //   console.log(posts)
    // } catch (err) {
    //   console.log(err)
    // }
    // },
    
    async simpleCMS() {
      try {
      let simplePosts = await fetch( 'https://simplejsoncms.com/api/5o75gfy0v5o'
      ).then(res => res.json())
      this.simplePosts = simplePosts.posts
      console.log(simplePosts)
      } catch (err) {
        console.log(err)
      }
    },

     async n2() {
      try {
      let articles = await fetch( 'https://n2speechtherapy.com/wp-json/wp/v2/posts'
      ).then(res => res.json())
      this.articles = articles
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))
      console.log(articles)
      } catch (err) {
        console.log(err)
      }
    },

      refreshPosts() {
      // this.articles = await fetch(
      //   "https://n2speechtherapy.com/wp-json/wp/v2/posts"
      // ).then((res) => res.json());
      // this.$nuxt.refresh();
      this.simpleCMS();
      // this.getPosts();
      console.log("articles get called");
    },
     
     refreshN2() {
      // this.n2();
      this.$store.dispatch("getPosts")
      console.log("n2 got called");
    },
    
  },
  created() {
    this.$store.dispatch("getPosts");
    // this.n2();
    // this.getPosts();
    this.simpleCMS();
    // this.timer = setInterval(this.refreshN2, 5000); 
  },
};
</script>


