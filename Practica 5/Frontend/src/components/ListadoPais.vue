<template>
  <div>
    <el-button type="primary" @click="abrirModalAgregar">Agregar País</el-button>

    <el-table :data="paises" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="capital" label="Capital" />
      <el-table-column prop="continente" label="Continente" />
      <el-table-column label="Acciones" width="180">
        <template #default="{ row }">
          <el-button size="small" type="warning" @click="abrirModalEditar(row)">Editar</el-button>
          <el-button size="small" type="danger" @click="confirmarEliminar(row)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AgregarPais
      v-if="modalVisible"
      :visible="modalVisible"
      :paisEditar="paisSeleccionado"
      @cerrar="cerrarModal"
      @guardado="paisGuardado"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AgregarPais from './AgregarPais.vue';
import { obtenerPaises, eliminarPais } from '../api/apis.js';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  components: { AgregarPais },
  setup() {
    const paises = ref([]);
    const modalVisible = ref(false);
    const paisSeleccionado = ref(null);

    const cargarPaises = async () => {
      try {
        const res = await obtenerPaises();
        paises.value = res.data;
      } catch (error) {
        ElMessage.error('Error al cargar países');
      }
    };

    const abrirModalAgregar = () => {
      paisSeleccionado.value = null;
      modalVisible.value = true;
    };

    const abrirModalEditar = (pais) => {
      paisSeleccionado.value = { ...pais };
      modalVisible.value = true;
    };

    const cerrarModal = () => {
      modalVisible.value = false;
      paisSeleccionado.value = null;
    };

    const paisGuardado = async () => {
      await cargarPaises();
    };

    const confirmarEliminar = (pais) => {
      ElMessageBox.confirm(`¿Eliminar país ${pais.nombre}?`, 'Atención', {
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        type: 'warning',
      }).then(async () => {
        try {
          await eliminarPais(pais.id_pais);
          ElMessage.success('País eliminado');
          cargarPaises();
        } catch {
          ElMessage.error('Error al eliminar país');
        }
      });
    };

    onMounted(cargarPaises);

    return {
      paises,
      modalVisible,
      paisSeleccionado,
      abrirModalAgregar,
      abrirModalEditar,
      cerrarModal,
      paisGuardado,
      confirmarEliminar,
    };
  },
};
</script>
