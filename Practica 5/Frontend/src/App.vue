<template>
  <el-container style="height: 100vh;">
    <el-header>
      <el-menu :default-active="menuActivo" mode="horizontal" @select="menuActivo = $event">
        <el-menu-item index="paises">Países</el-menu-item>
        <el-menu-item index="ciudades">Ciudades</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <ListadoPais v-if="menuActivo === 'paises'" />
      <ListadoCiudad v-if="menuActivo === 'ciudades'" />
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue';
import ListadoPais from './components/ListadoPais.vue';
import ListadoCiudad from './components/ListadoCiudad.vue';

export default {
  components: { ListadoPais, ListadoCiudad },
  setup() {
    const menuActivo = ref('paises');
    return { menuActivo };
  },
};
</script>
