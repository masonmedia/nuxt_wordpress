<template>
  <main class="post individual">
    <h1>{{ post.title }}</h1>
    <section v-html="post.content"></section>
  </main>
</template>

<script>
export default {
    data() {
        return {
            slug: this.$route.params.slug,
            simplePosts: []
        }
    },
    computed: {
        posts() {
            return this.$store.state.posts;
        },
        post() {
            return this.posts.find(el => el.slug == this.slug)
        }
    },
    methods: {
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
    }
}
</script>
