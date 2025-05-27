<template>
  <el-dialog
    :title="paisEditar ? 'Editar País' : 'Agregar País'"
    :model-value="visible"
    @close="cerrar"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="form.nombre" />
      </el-form-item>
      <el-form-item label="Capital" prop="capital">
        <el-input v-model="form.capital" />
      </el-form-item>
      <el-form-item label="Continente" prop="continente">
        <el-input v-model="form.continente" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cerrar">Cancelar</el-button>
      <el-button type="primary" @click="guardar">Guardar</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { crearPais, actualizarPais } from '../api/apis';
import { ElMessage } from 'element-plus';

export default {
  props: {
    paisEditar: Object,
    visible: Boolean,
  },
  emits: ['cerrar', 'guardado'],
  setup(props, { emit }) {
    const formRef = ref(null);

    const form = ref({
      nombre: '',
      capital: '',
      continente: '',
    });

    const rules = {
      nombre: [
        { required: true, message: 'Nombre requerido', trigger: 'blur' },
        { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/, message: 'Nombre inválido', trigger: 'blur' },
      ],
      capital: [
        { required: true, message: 'Capital requerida', trigger: 'blur' },
        { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/, message: 'Capital inválida', trigger: 'blur' },
      ],
      continente: [{ required: true, message: 'Continente requerido', trigger: 'blur' }],
    };

    const cerrar = () => {
      emit('cerrar');
    };

    const guardar = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          if (props.paisEditar) {
            await actualizarPais(props.paisEditar.id_pais, form.value);
            ElMessage.success('País actualizado');
          } else {
            await crearPais(form.value);
            ElMessage.success('País creado');
          }
          emit('guardado');
          cerrar();
        } catch (error) {
          ElMessage.error('Error al guardar país kkk');
        }
      });
    };

    watch(() => props.paisEditar, (nuevo) => {
      if (nuevo) {
        form.value = { ...nuevo };
      } else {
        form.value = { nombre: '', capital: '', continente: '' };
      }
    }, { immediate: true });

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
