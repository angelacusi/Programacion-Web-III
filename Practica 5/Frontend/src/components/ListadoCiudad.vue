<template>
  <div>
    <el-button type="primary" @click="abrirModalAgregar">Agregar Ciudad</el-button>

    <el-table :data="ciudades" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="poblacion" label="Población" />
      <el-table-column prop="pais_nombre" label="País" />
      <el-table-column label="Acciones" width="180">
        <template #default="{ row }">
          <el-button size="small" type="warning" @click="abrirModalEditar(row)">Editar</el-button>
          <el-button size="small" type="danger" @click="confirmarEliminar(row)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AgregarCiudad
      v-if="modalVisible"
      :visible="modalVisible"
      :ciudadEditar="ciudadSeleccionada"
      @cerrar="cerrarModal"
      @guardado="ciudadGuardada"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AgregarCiudad from './AgregarCiudad.vue';
import { obtenerCiudades, eliminarCiudad } from '../api/apis.js';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  components: { AgregarCiudad },
  setup() {
    const ciudades = ref([]);
    const modalVisible = ref(false);
    const ciudadSeleccionada = ref(null);

    const cargarCiudades = async () => {
      try {
        const res = await obtenerCiudades();
        ciudades.value = res.data;
      } catch (error) {
        ElMessage.error('Error al cargar ciudades');
      }
    };

    const abrirModalAgregar = () => {
      ciudadSeleccionada.value = null;
      modalVisible.value = true;
    };

    const abrirModalEditar = (ciudad) => {
      ciudadSeleccionada.value = { ...ciudad };
      modalVisible.value = true;
    };

    const cerrarModal = () => {
      modalVisible.value = false;
      ciudadSeleccionada.value = null;
    };

    const ciudadGuardada = async () => {
      await cargarCiudades();
    };

    const confirmarEliminar = (ciudad) => {
      ElMessageBox.confirm(`¿Eliminar ciudad ?`, 'Atención', {
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        type: 'warning',
      }).then(async () => {
        try {
          await eliminarCiudad(ciudad.id_ciudad);
          ElMessage.success('Ciudad eliminada');
          cargarCiudades();
        } catch {
          ElMessage.error('Error al eliminar ciudad');
        }
      });
    };

    onMounted(cargarCiudades);

    return {
      ciudades,
      modalVisible,
      ciudadSeleccionada,
      abrirModalAgregar,
      abrirModalEditar,
      cerrarModal,
      ciudadGuardada,
      confirmarEliminar,
    };
  },
};
</script>
