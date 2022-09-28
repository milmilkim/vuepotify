<template>
  <div v-if="profileData" class="myProfile">
    <ul>
      <li><img width="100px" :src="profileData.images[0].url" /></li>
      <li>{{ profileData.display_name }}</li>
      <li>{{ myEmail }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
//   import { mapState } from 'vuex';
//   import axios from 'axios';
//   export default {
//     data() {
//       return {
//         profileData: null,
//       };
//     },

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MyProfile extends Vue {
  public profileData: any = null

  public get myEmail(): string {
    return this.profileData?.email
  }

  async getMyProfile(): Promise<void> {
    let res = null
    try {
      res = await this.$axios.$get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + this.$accessor.login.userToken,
        },
      })

      this.profileData = res
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  mounted() {
    this.getMyProfile()
  }
}

//     mounted() {
//       this.getMyProfile();
//     },

//     computed: {
//       ...mapState('login', ['userToken']),
//       // myEmail() {
//       //   return this.profileData.email;
//       // },
//     },

//     methods: {
//       async getMyProfile() {
//         let res = null;
//         try {
//           res = await axios.get('https://api.spotify.com/v1/me', {
//             headers: {
//               Authorization: 'Bearer ' + this.userToken,
//             },
//           });
//           this.profileData = res.data;
//         } catch (err) {
//           console.error(err);
//         }
//       },
//     },
//   };
</script>

<style lang="scss" scoped>
.myProfile {
  display: flex;
  justify-content: center;

  img {
    border-radius: 50px;
  }
  ul {
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0;
  }
}
</style>
