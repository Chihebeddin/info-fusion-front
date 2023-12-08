<template>
  <div class="field">
    <div class="label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <VField v-slot="{ field, meta, errors }" :name="name">
            <input
              v-bind="field"
              class="input"
              :class="{
                'is-success': meta.valid && meta.touched,
                'is-danger': !meta.valid && meta.touched,
              }"
              :placeholder="placeholder"
              :type="type"
            >
            <span class="icon is-small is-left">
              <i class="fas" :class="leftIcon" />
            </span>
            <span
              v-if="meta.valid && meta.touched"
              class="icon is-small is-right"
            >
              <i class="fas fa-check has-text-success" />
            </span>
            <span
              v-else-if="!meta.valid && meta.touched"
              class="icon is-small is-right"
            >
              <i class="fas fa-x has-text-danger" />
            </span>
            <!-- <template v-if="Object.keys(errors).length">
                  <ul>
                    <li
                      v-for="(message, field) in errors"
                      :key="field"
                      class="help is-danger"
                    >
                      {{ message }}
                    </li>
                  </ul>
                </template> -->
            <VErrorMessage :name="name" as="div" class="help is-danger" />
            <div v-if="debug" class="debug">
              <pre>{{ errors }}</pre>
              <pre>{{ meta }}</pre>
            </div>
          </VField>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: ''
  },
  debug: {
    type: Boolean,
    default: false
  }
})
</script>
