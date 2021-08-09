import { createStore } from 'vuex'

export default createStore({
  state: { 
    showSidebar: true,
    sidebarLinks: [],
    isMinimized: false,
  },
  mutations: {    
    initializeStore(state) {
      if (localStorage.getItem('showSidebar')) {
        state.showSidebar = localStorage.getItem('showSidebar') == 'true' ? true : false;
      } else {
        state.showSidebar = true
      }
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
