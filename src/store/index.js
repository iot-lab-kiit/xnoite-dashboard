import { createStore } from 'vuex'

export default createStore({
  state: { 
    showSidebar: true,
    sidebarLinks: [],
    isMinimized: false,
    token:""
  },
  mutations: {    
    initializeStore(state) {
      if (localStorage.getItem('showSidebar')) {
        state.showSidebar = localStorage.getItem('showSidebar') == 'true' ? true : false;
      } else {
        state.showSidebar = true
      }
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
      } else {
        state.token = '';
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    displaySidebar(state,value) {
      localStorage.setItem('showSidebar', value);
      state.showSidebar = value;
    },
    toggleMinimize() {
      document.body.classList.toggle("sidebar-mini");
      const simulateWindowResize = setInterval(() => {
        window.dispatchEvent(new Event("resize"));
      }, 180);
      setTimeout(() => {
        clearInterval(simulateWindowResize);
      }, 1000);

      this.isMinimized = !this.isMinimized;
    },
  },
  actions: {
  },
  modules: {
  }
})
