<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-card card shadow-lg">
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <i class="bi bi-shop-window fs-1 text-primary"></i>
          <h2 class="mt-3 fw-bold">Fashion Store</h2>
          <p class="text-muted">Inicia sesión para continuar</p>
        </div>

        <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          {{ error }}
          <button type="button" class="btn-close" @click="error = null"></button>
        </div>

        <form @submit.prevent="iniciarSesion">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input 
                v-model="credenciales.usuario" 
                type="text" 
                class="form-control" 
                placeholder="Ingresa tu usuario"
                required
              >
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input 
                v-model="credenciales.password" 
                type="password" 
                class="form-control" 
                placeholder="Ingresa tu contraseña"
                required
              >
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Iniciar Sesión
          </button>
        </form>

        <div class="mt-4 text-center">
          <small class="text-muted">
            <strong>Usuarios de prueba:</strong><br>
            admin / admin123<br>
            harol / harol123<br>
            jhorman / jhorman123
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      credenciales: {
        usuario: '',
        password: ''
      },
      error: null
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        this.error = null;
        const response = await axios.get('/usuarios.json');
        const usuarios = response.data;

        const usuarioEncontrado = usuarios.find(
          u => u.usuario === this.credenciales.usuario && u.password === this.credenciales.password
        );

        if (usuarioEncontrado) {
          localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
          this.$router.push('/dashboard');
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      } catch (err) {
        this.error = 'Error al intentar iniciar sesión';
        console.error(err);
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 450px;
  border-radius: 1rem;
  border: none;
}

.input-group-text {
  background-color: #f8f9fa;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
}
</style>
