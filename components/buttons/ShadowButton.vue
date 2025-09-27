<template>
  <div class="w-full relative inline-block group focus:outline-none focus:ring">
    <span
      class="w-full rounded-md absolute inset-0 transition-transform translate-x-0 translate-y-0 group-hover:translate-x-1.5 group-hover:translate-y-1.5"
      :class="color"></span>

    <UButton :label="$t(text)" :icon="icon" :trailing-icon="trailingIcon" :type="type" :loading="loading"
      :disabled="disabled" variant="solid" color="black" :ui="{
        base: 'text-center',
        label: 'text-white font-bold uppercase mx-auto',
        leadingIcon: 'text-white',
        trailingIcon: 'text-white'
      }" class="w-full relative border-2 border-black" @click="handleClick">
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  color?: string
  icon?: string
  trailingIcon?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  onClick: []
}>()

const handleClick = () => {
  // Only emit onClick for non-submit buttons to avoid interference with form submission
  if (props.type !== 'submit') {
    emit('onClick')
  }
}

</script>
