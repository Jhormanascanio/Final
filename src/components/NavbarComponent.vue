<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <i class="bi bi-shop-window fs-3 me-2"></i>
        <span class="fw-bold">Fashion Store</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="usuario">
            <span class="nav-link">
              <i class="bi bi-person-circle me-1"></i>
              {{ usuario }}
            </span>
          </li>
          <li class="nav-item" v-if="showLogout">
            <button @click="cerrarSesion" class="btn btn-outline-light btn-sm ms-2">
              <i class="bi bi-box-arrow-right me-1"></i>
              Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  props: {
    usuario: {
      type: String,
      default: null
    },
    showLogout: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cerrarSesion() {
      this.$emit('logout');
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}
</style>
