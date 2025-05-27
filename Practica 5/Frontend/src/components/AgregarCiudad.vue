<template>
  <el-dialog
    :title="ciudadEditar ? 'Editar Ciudad' : 'Agregar Ciudad'"
    :model-value="visible"
    @close="cerrar"
    width="500px"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Población" prop="poblacion">
        <el-input v-model.number="form.poblacion" type="number" min="1" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Región" prop="region">
        <el-input v-model="form.region" autocomplete="off" />
      </el-form-item>

      <el-form-item label="ID País" prop="id_pais">
        <el-input v-model.number="form.id_pais" type="number" min="1" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="cerrar">Cancelar</el-button>
      <el-button type="primary" @click="guardar">Guardar</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue';
import { crearCiudad, actualizarCiudad } from '../api/apis.js';
import { ElMessage } from 'element-plus';

export default {
  props: {
    visible: Boolean,
    ciudadEditar: Object,
  },
  emits: ['cerrar', 'guardado'],
  setup(props, { emit }) {
    const formRef = ref(null);

    const form = ref({
      nombre: '',
      poblacion: null,
      region: '',
      id_pais: null,
    });

    const rules = {
      nombre: [
        { required: true, message: 'Nombre requerido', trigger: 'blur' },
        { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/, message: 'Nombre inválido', trigger: 'blur' },
      ],
      poblacion: [
        { required: true, message: 'Población requerida', trigger: 'blur' },
        { type: 'number', min: 1, message: 'Debe ser mayor que 0', trigger: 'blur' },
      ],
      region: [{ required: true, message: 'Región requerida', trigger: 'blur' }],
      id_pais: [
        { required: true, message: 'ID País requerido', trigger: 'blur' },
        { type: 'number', min: 1, message: 'ID País inválido', trigger: 'blur' },
      ],
    };

    watch(() => props.ciudadEditar, (nueva) => {
      if (nueva) {
        form.value = { ...nueva };
      } else {
        form.value = { nombre: '', poblacion: null, region: '', id_pais: null };
      }
    }, { immediate: true });

    const cerrar = () => {
      emit('cerrar');
    };

    const guardar = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          if (props.ciudadEditar) {
            await actualizarCiudad(props.ciudadEditar.id_ciudad, form.value);
            ElMessage.success('Ciudad actualizada');
          } else {
            await crearCiudad(form.value);
            ElMessage.success('Ciudad creada');
          }
          emit('guardado');
          cerrar();
        } catch {
          ElMessage.error('Error al guardar ciudad');
        }
      });
    };

    return {
      form,
      rules,
      formRef,
      cerrar,
      guardar,
    };
  },
};
</script>
