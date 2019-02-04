<template>
  <header class="w-100 nab-bg-container">
    <div class="container">
      <nav class="row nav-bg align-items-center pt-2 pb-2" id="navPanel">
        <div class="col-9 col-md order-12 text-right p-1">
          <div class="row">
            <span class="col-12 logo-1">Exams<span class="logo-2" >Simulator</span></span>
          </div>
        </div>
        <div class="col-12 col-md-auto d-lg-block" id="menuContent">
          <div class="row pr-3 pl-3">
            <router-link to="/" exact tag="div" class="col-12 col-md-auto p-1 pl-2 pr-2" active-class="active">
              <a class="nav-link-1">Головна</a>
            </router-link>
            <router-link to="/constructor" tag="div" class="col-12 col-md-auto p-1 pl-2 pr-2" active-class="active">
              <a class="nav-link-1">Конструктор тестів</a>
            </router-link>
          </div>
        </div>
        <div @click="slideMenu" class="col-3 order-1" id="menuBtn"><img src="../assets/img/menu.png" width="24" height="24" alt="Меню"></div>
      </nav>
    </div>
  </header>
</template>

<script>
    export default {
      methods: {
        slideMenu() {
          $("#menuContent").slideToggle(150);
        }
      }
    }
</script>

<style scoped>

</style>
