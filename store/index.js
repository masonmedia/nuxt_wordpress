export const state = () => ({
    posts: []
})

export const mutations = {
    updatePosts: (state, posts) => {
        state.posts = posts
    }
}

export const actions = {
    async getPosts({ commit }) {
    // async getPosts({ state, commit }) {
        // this line was causing posts to not refresh or get most current new content from API
    //   if (state.posts.length) return
      try {
        let posts = await fetch( `https://n2speechtherapy.com/wp-json/wp/v2/posts`
        // let posts = await fetch( `https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
        )
        .then(res => res.json())
        posts = posts
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
        commit("updatePosts", posts)
        console.log(posts)
      } catch (err) {
        console.log(err)
      }
   }
}
